# Proyecto final CEIoT 2da Cohorte
Alumno: Ing. Gonzalo Nahuel Vaca

Director de tesis: Esp. Ing. Pablo Almada

## Introducción
Esta solución fue realizada en el marco de la *Especialización en Internet de las Cosas* de la **Universidad de Buenos Aires**. En calidad de *proyecto final*.

El objetivo de este sistema es proveer a los laboratorios *Gador S.A*, la capacidad de utilizar sensores inalámbricos que reporten sus mediciones utilizando el protocolo *MQTT*. Dado que se utiliza por razones normativas, el producto *EBI (Enterprise Buildings Integrator)* de la marca *Honeywell*, que utiliza el protocolo *MODBUS* para obtener las mediciones. Se decidió crear un servicio que uniera los dos protocolos.

Este proyecto se realizó a modo de prueba de concepto, dado que se necesita desarrollar el hardware para los puntos de agregación para gestionar los sensores de planta, según los comandos enviados desde nuestro sistema.

## Requisitos
Para lograr hacer funcionar esta solución se necesita satisfacer los siguientes requisitos:

* docker
* docker-compose
* Conexión a internet

## Instrucciones
A continuación se detallan los pasos a seguir para hacer funcionar la aplicación

* Satisfacer los requisitos mencionados
* Clonar o descargar este repositorio
* Colocar la dirección de ip de su máquina en el archivo frontend/src/enviroments/enviroment.prod.ts
* Verificar que el script *start.sh* tenga permisos de ejecución
* Correr el script *start.sh*

En este punto usted debería tener el sistema listo para usar. Use su browser predilecto para navegar al socket de su máquina.

## Consideraciones adicionales
La configuración "por defecto" de este sistema utiliza el puerto *5020* para la comunicación MODBUS. De igual manera, el puerto del frontend es el *8181*. Esto es así para evitar conflictos con los permisos de su sistema operativo.
Si desea usar el puerto *502* para MODBUS y el puerto *80* para el frontend, usted debe:

* Otorgar los permisos necesarios al usuario de docker
* Modificar el archivo *docker-compose.yml*

¿Que debe modificar en el archivo *docker-compose.yml*?

### MOSBUS
Antes
```yml
modbus-server:
        image: oitc/modbus-server
        container_name: modbus-server
        hostname: modbus-server
        restart: always
        ports:
            - '5020:5020'
        expose: 
            - '5020'
        networks: 
            - iot
```

Después
```yml
modbus-server:
        image: oitc/modbus-server
        container_name: modbus-server
        hostname: modbus-server
        restart: always
        ports:
            - '520:5020'
        expose: 
            - '5020'
        networks: 
            - iot
```
### FRONTEND

Antes
```yml
    frontend:
        build: ./frontend/
        image: vaca/frontend
        container_name: frontend
        hostname: frontend
        restart: always
        ports: 
        - '8181:80'
```
Después
```yml
    frontend:
        build: ./frontend/
        image: vaca/frontend
        container_name: frontend
        hostname: frontend
        restart: always
        ports: 
        - '80:80'
```