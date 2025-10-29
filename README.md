# Spring.io, Websockets, ReactJs-18, P5.js,AWS: buenas prácticas de Diseño

Vamos ahora a construir una aplicación interactiva en tiempo real usando una
buena estrategia de diseño. Para esto vamos a construir una aplicación que
permite dibujar de manera colaborativa en tiempo real.

La aplicación soporta múltiples clientes. La comunicación es en tiempo real.

## Arquitectura

Queremos construir una aplicación web con comunicación bidirectional entre el
cliente y el servidor. Los clientes inician su dibujo y se puede diferenciar su trazo
del trazo de los clientes remotos.

La arquitectura usará ReactJs del lado del cliente y Spring.io del lado del servidor.
En le taller le mostraremos cómo construir una arquitectura escalable y entendible
usando estos elementos.

## Vamos ahora a construir nuestro ejemplo.

### Cree la estructura básica del proyecto

**1. Crear una aplicación java básica usando maven**

**2. Actualizar el pom para utilizar la configuración web-MVC de spring boot. Incluya lo siguiente en su pom**

**3. Cree la siguiente clase que iniciará el servidor de aplicaciones de Spring**

Para los pasos 1,2 y 3 hacemos uso de spring initializr que nos genera de manera automatica todo lo anterior, importante añadir la dependencia de web para el punto 2.

**Clase Main:**

![](./images/imagen1.png)

**Archivo POM:**

![](./images/imagen2.png)

**4. Cree un controlador Web que le permitirá cargar la configuración mínima Web-MVC**

![](./images/imagen3.png)

**5. Cree un index html en la siguiente localización: ``/src/main/resources/static``, corra la clase que acabamos de crear y su servidor debe iniciar la ejecución:**

![](./images/imagen4.png)

![](./images/imagen5.png)

**6. Verifique que se esté ejecutando accediendo a: ``localhost:8080/status``**

![](./images/imagen6.png)

**7. Verifique que el servidor esté entregando elementos estáticos web entrando a: ``localhost:8080/index.html``**

![](./images/imagen7.png)

### Ahora construimos el cliente Web

El index.html sería. Solo contiene un elemento “div” con identificador root. A Partir
de este elemento construiremos la aplicación. Observe que esta página se encarga
de cargar las librerías necesarias y el único script dónde estarán nuestros
componentes. Observe que solo usaremos un elemento JSX, es decir no usaremos
archivos Js y JSX, esto facilita la depuración y el mantenimiento.

**8. Editamos el index.html para que quede así:**

![](./images/imagen8.png)

### Construyamos el componente ReactJS paso a paso.

**9. Primero construimos una versión simple, en el archivo js/bbComponents.jsx ponemos:**

![](./images/imagen9.png)

**10. Ahora extendamos una poco y iremos los elementos principales de la interfaz gráfica:**

![](./images/imagen10.png)

**11. Ahora creemos un componente para representar el canvas del tablero:**

![](./images/imagen11.png)

**12. Ahora vamos a modificarlo para poder interactuar con el servidor usando web sockets:**

![](./images/imagen12.png)

**13. Modifiquemos el componente BBCanvas para utilizar este web socket:**

![](./images/imagen13.png)

### Antes de ejecutar vamos a crear los componentes del servidor

**14. Primero el Endpoint:**

![](./images/imagen14.png)

**15. Luego el configurador:**

![](./images/imagen15.png)

### ¿Podemos subirlo a AWS?

#### Para subirlo a AWS siga los siguientes pasos

**16. Modifique el POM para copiar las dependencias:**

![](./images/imagen16.png)

**El git ignore se creó junto al repositorio al inicio del proyecto**

**17. Corra su aplicación desde la línea de comandos**

**Para ello primero ejecutamos ``mvn clean package``**

![](./images/imagen17.png)

**Luego ejecutamos ``java -jar target/lab6-0.0.1-SNAPSHOT.jar``**

![](./images/imagen18.png)

**Evidencia de que la aplicación corre localmente:**

![](./images/imagen19.png)

### Prepare su aplicación para correr en un servidor desconocido

Calcule la dirección del servicio y utilice wss (Protocolo seguro) en cambio de ws
(Protocolo no seguro). Utilice esto solo si el protocolo del servidor será seguro.

![](./images/imagen20.png)

**18. Inicie Spring en el puerto indicado por el entorno:**

![](./images/imagen21.png)

**Evidencias de que se puede ingresar variables de entorno:**

![](./images/imagen22.png)

![](./images/imagen23.png)
