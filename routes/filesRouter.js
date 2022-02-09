import express from 'express';
import bodyParser from 'body-parser';
import { readFiles, readFile, listFiles, processFile } from "../app/csv-reader.js";


const filesRouter = express.Router();

filesRouter.use(bodyParser.json());


filesRouter.route('/data')
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get((req, res, next)=>{
    listFiles(function (error, files) {
        if (error) {
          res.statusCode = 500;
          res.end({
            "code": "SYS-ERR",
            "message": "Error reading list files",
            "details": JSON.stringify(error),
            "status": 500
          });
        } else {
            readFiles(files,function(csvFiles){                    
                    res.send(csvFiles);
                    next();                    
            });
        }
    });
});

export default filesRouter;