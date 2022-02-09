import express from 'express';
import bodyParser from 'body-parser';
import { readFiles, readFile, listFiles, processFile } from "../app/csv-reader.js";


const filesRouter = express.Router();

filesRouter.use(bodyParser.json());

filesRouter.route('/list')
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
        res.send({files});
        next();  
      }
  });
});

filesRouter.route('/data')
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get((req, res, next)=>{
  
    listFiles(function (error, files) {
        if (error) {
          console.error(error);
          res.statusCode = 500;
          res.send({
            "code": "SYS-ERR",
            "message": "Error reading list files",
            "details": JSON.stringify(error),
            "status": 500
          });
        } else {
          let filteredFiles;
          console.log(req.query);
          if(req.query.fileName){
            filteredFiles = files.filter(file=>{
              return file === req.query.fileName;
            });

            console.log(`${filteredFiles}`);
          }
          else {
            filteredFiles = files;
          }
          readFiles(filteredFiles,function(csvFiles){                    
                  res.send(csvFiles);
                  next();                    
          });
        }
    });
});

export default filesRouter;