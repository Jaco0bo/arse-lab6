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
