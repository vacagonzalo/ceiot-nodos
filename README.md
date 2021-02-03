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
* node
* angular-cli
* http-server - npm

## Instrucciones
A continuación se detallan los pasos a seguir para hacer funcionar la aplicación

* Satisfacer los requisitos mencionados
* Clonar o descargar este repositorio
* Verificar que el script *start.sh* tenga permisos de ejecución
* Correr el script *start.sh*
* Colocar la dirección de ip de su máquina en el archivo frontend/src/enviroments/enviroment.prod.ts
* Con su terminal dentro de la carpeta frontend ejecutar el comando *ng build --prod*
* En la misma posición ejecutar http-server ./dist/frontend -p 8181 (o el puerto que usted desee)

En este punto usted debería tener el sistema listo para usar. Use su browser predilecto para navegar al socket de su máquina.
