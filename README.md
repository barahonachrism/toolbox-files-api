# toolbox-files-api
API para mostrar informacion de archivos para Toolbox.

## Construir y levantar API en ambiente de desarrollo
1. Para construir el API, nos ubicamos en cada carpeta y ejecutamos los siguientes comandos:  
`       npm install  
`  
`
        npm start
`
2. Para probar los servicios REST disponibles, abrir [http://localhost:3000](http://localhost:3000) en su navegador.
`       http://localhost:3000/files/list  
`  
`
        http://localhost:3000/files/data  
` 
`
        http://localhost:3000/files/data?fileName=test9.csv  
` 
3. Para ejecutar los test unitarios del API, ejecutamos el siguiente comando:  
`
        npm test
`
