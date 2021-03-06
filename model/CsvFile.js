import CsvLine from '../model/CsvLine.js'

class CsvFile {
  constructor () {
    this.fileName = ''
    this.lines = []
  }

  addLine (line) {
    const tokens = line.split(',')
    if (tokens.length === 4) {
      this.fileName = tokens[0].trim()
      const text = tokens[1].trim()
      const number = tokens[2].trim()
      const hex = tokens[3].trim()

      if (this.lineIsValid(text, number, hex)) {
        this.lines.push(new CsvLine(text, Number(number), hex))
      }
    }
  }

  lineIsValid (text, number, hex) {
    return (
      this.validateText(text) &&
      this.validateNumber(number) &&
      this.validateHex(hex)
    )
  }

  validateText (text) {
    return /^\w+$/.test(text)
  }

  validateNumber (number) {
    return /^[0-9]+$/.test(number)
  }

  validateHex (hex) {
    return /^[0-9a-fA-F]+$/.test(hex)
  }
}

export default CsvFile
