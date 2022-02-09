# toolbox-files-api
API para mostrar informacion de archivos para Toolbox.

## Construir y levantar API en ambiente de desarrollo
Para probar los servicios REST disponibles, abrir [http://localhost:3000](http://localhost:3000) en su navegador.  
        [http://localhost:3000/files/list](http://localhost:3000/files/list)   
        [http://localhost:3000/files/data](http://localhost:3000/files/data)  
        [http://localhost:3000/files/data?fileName=test9.csv](http://localhost:3000/files/data?fileName=test9.csv)
### `npm install` 
Construir la aplicacion para ambiente desarrollo, instar sus dependencias 
### `npm start`
Levantar el servidor para ambiente desarrollo
### `npm test`
Ejecutar las pruebas unitarias del proyecto
### `docker build --no-cache -t toolbox/toolbox-files-api:latest .`  
Generar la imagen Docker de los servicios web, desactivar la cache es importante para hacer una compilación completa.
### `docker run --name toolbox-files-api -p 3000:3000 -d toolbox/toolbox-files-api`  
Desplegar la aplicacion backend.
