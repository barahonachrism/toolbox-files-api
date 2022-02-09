import axios from 'axios'
import CsvFile from '../model/CsvFile.js'

const authToken = 'Bearer aSuperSecretKey'
const readFiles = (files, callback) => {
  const calls = []
  files.sort().forEach((fileName) => {
    calls.push(
      axios
        .get(`https://echo-serv.tbxnet.com/v1/secret/file/${fileName}`, {
          headers: {
            Authorization: authToken
          }
        })
        .catch((error) => {
          console.error(
            `Error al procesar el archivo ${fileName} ${error.message}`
          )
        })
    )
  })

  axios
    .all(calls)
    .then(
      axios.spread((...responses) => {
        const csvFiles = []
        responses.forEach((response) => {
          if (response && response.data) {
            const jsonData = processFile(response.data)
            if (jsonData) {
              csvFiles.push(jsonData)
            }
          }
        })
        callback(csvFiles)
      })
    )
    .catch((errors) => {
      console.log('Error', errors)
    })
}

const readFile = async (filename, callback) => {
  axios
    .get(`https://echo-serv.tbxnet.com/v1/secret/file/${filename}`, {
      headers: {
        Authorization: authToken
      }
    })
    .then(function (response) {
      callback(null, response.data)
    })
    .catch(function (error) {
      callback(error, null)
    })
}

const listFiles = (callback) => {
  axios
    .get('https://echo-serv.tbxnet.com/v1/secret/files', {
      headers: {
        Authorization: authToken
      }
    })
    .then(function (response) {
      callback(null, response.data.files)
    })
    .catch(function (error) {
      callback(error, null)
    })
}

const processFile = (fileData) => {
  const lines = fileData.split('\n')
  const csvFile = new CsvFile()
  for (let i = 1; i < lines.length; i++) {
    csvFile.addLine(lines[i])
  }
  if (csvFile.lines.length > 0) {
    return csvFile
  }
  return null
}

export { readFiles, readFile, listFiles, processFile }
