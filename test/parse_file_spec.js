import chai from "chai";
import { readFile, listFiles, processFile, readFiles } from "../app/csv-reader.js";

describe("Parse files Test: ", function () {
  describe("Parse csv files: ", function () {
    it("Read files test", function () {
      let files = [
        "test1.csv",
        "test2.csv",
        "test3.csv",
        "test4.csv",
        "test5.csv",
        "test6.csv",
        "test9.csv",
      ];

      files.forEach((file) => {
        readFile(file, function (error, result) {
          if (error) {
            console.log(`Error al leer el archivo ${file}`);
            chai.assert.exists(error);
          } else {
            chai.assert.isNotEmpty(result);
          }
        });
      });
    });

    it("List files is not empty test", function () {
      listFiles(function (error, result) {
        if (error) {
          console.log(`Error al leer el archivo: ${error}`);
          chai.assert.exists(error);
        } else {
          chai.assert.isArray(result);
        }
      });
    });

    it("Process file test case ok", function () {
      let fileData = `file,text,number,hex
      test3.csv,YUpng
      test3.csv,iWIoiilHdlDaPhgwGVDjBajhOFR,66332912,d36546505e7e518bac4417be7b359ab0
      test3.csv,OpiTbumymMqgAHNbLvlUhQVcstx,52143,44ea3798fabd921c567a7fd2d4a4731c
      test3.csv,jJLRLQHuEJcHb,1557652439,59e7a2af6cf1085464aa50b10ce599b1`;

      let spectedResult = `{"fileName":"test3.csv","lines":[{"text":"iWIoiilHdlDaPhgwGVDjBajhOFR","number":66332912,"hex":"d36546505e7e518bac4417be7b359ab0"},{"text":"OpiTbumymMqgAHNbLvlUhQVcstx","number":52143,"hex":"44ea3798fabd921c567a7fd2d4a4731c"},{"text":"jJLRLQHuEJcHb","number":1557652439,"hex":"59e7a2af6cf1085464aa50b10ce599b1"}]}`;

      let result = processFile(fileData);
      chai.assert.equal(JSON.stringify(result),spectedResult);
    });

    it("Process file test case error response", function () {
      let fileData = `{
        "code": "SYS-ERR",
        "message": "Not Found",
        "details": null,
        "status": 404
      }`;


      let result = processFile(fileData);
      chai.assert.isNull(result);
    });
    it("Process file test empty response", function () {
      let fileData = `file,text,number,hex`;
      let result = processFile("test4.csv", fileData);
      chai.assert.isNull(result);
    });
    it("Process all files", function () {
      let files = [
        "test1.csv",
        "test2.csv",
        "test3.csv",
        "test4.csv",
        "test5.csv",
        "test6.csv",
        "test9.csv",
      ];
      readFiles(files, function(csvFiles){                    
        chai.assert.isNotEmpty(csvFiles);                   
      });
      
    });
  });
});
