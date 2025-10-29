function Editor({ name }) {
    return (
        <div>
            <h1>Hello, {name}</h1>
            <hr />
            <div id="toolstatus"></div>
            <hr />
            <div id="container"></div>
            <hr />
            <div id="info"></div>
        </div>
    );
}

function BBCanvas() {
    const [svrStatus, setSvrStatus] = React.useState({ loadingState: 'Loading Canvas...' });
    const comunicationWS = React.useRef(null);
    const myp5 = React.useRef(null);

    const sketch = function (p) {
        p.setup = function () {
            p.createCanvas(700, 410);
            p.background(255);
        };

        p.draw = function () {
            if (p.mouseIsPressed === true) {
                p.fill(0);
                p.noStroke();
                p.ellipse(p.mouseX, p.mouseY, 20, 20);
                comunicationWS.current?.send(p.mouseX, p.mouseY);
            }
        };
    };

    React.useEffect(() => {
        // Monta el canvas dentro de #container (creado por <Editor />)
        myp5.current = new p5(sketch, 'container');
        setSvrStatus({ loadingState: 'Canvas Loaded' });

        // WebSocket
        comunicationWS.current = new WSBBChannel(
            BBServiceURL(),
            (msg) => {
                try {
                    const obj = JSON.parse(msg);
                    drawPoint(obj.x, obj.y);
                } catch (e) {
                    console.error('Mensaje WS no es JSON válido:', msg, e);
                }
            }
        );

        // Cleanup
        return () => {
            console.log('Cerrando conexión ...');
            try { comunicationWS.current?.close(); } catch (e) { /* noop */ }
        };
    }, []);

    function drawPoint(x, y) {
        if (!myp5.current) return;
        myp5.current.fill(0);
        myp5.current.noStroke();
        myp5.current.ellipse(x, y, 20, 20);
    }

    return (
        <div>
            <h4>Drawing status: {svrStatus.loadingState}</h4>
        </div>
    );
}

// Retorna la url del servicio. Es una función de configuración.
function BBServiceURL() {
    var host = window.location.host;
    console.log("Host: " + host);
    var url = 'wss://' + (host) + '/bbService';
    if(host.toString().startsWith("localhost")){
        url = 'ws://' + (host) + '/bbService';
    }
    console.log("URL Calculada: " + url);
    return url;
}


class WSBBChannel {
    constructor(URL, callback) {
        this.URL = URL;
        this.wsocket = new WebSocket(URL);
        this.wsocket.onopen = (evt) => this.onOpen(evt);
        this.wsocket.onmessage = (evt) => this.onMessage(evt);
        this.wsocket.onerror = (evt) => this.onError(evt);
        this.receivef = callback;
    }
    onOpen(evt) {
        console.log('In onOpen', evt);
    }
    onMessage(evt) {
        console.log('In onMessage', evt);
        if (evt.data !== 'Connection established.') {
            this.receivef(evt.data);
        }
    }
    onError(evt) {
        console.error('In onError', evt);
    }
    send(x, y) {
        const msg = JSON.stringify({ x: Number(x), y: Number(y) });
        if (this.wsocket?.readyState === WebSocket.OPEN) {
            this.wsocket.send(msg);
        } else {
            console.warn('WS no está abierto; no se envió el mensaje');
        }
    }
    close() {
        try { this.wsocket?.close(); } catch (e) { /* noop */ }
    }
}

// Montaje raíz: renderiza Editor (crea #container) y luego BBCanvas
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Editor name="Andrés" />
        <BBCanvas />
    </>
);


