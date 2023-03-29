const fs = require('fs')
const path = require('path')
const event = require('events')
const uid = require('uid')
const { EventEmitter } = require('stream')

class fileAction {
  constructor(filePath) {
    this.filePath = filePath
    this.fileName = path.basename(filepath)
    this.file = fs.createReadStream(filePath)
    this.events = new EventEmitter()
  }

  findMasterDir() {
    //find a directory in storage called temp and return the path if it exists
    //else  return false
  }

  createNewPath(name) {
    var newPathName = ''
    var tempPathArray = this.filePath.split('/')
    for (var i = 0; i < tempPathArray.length - 1; i++) {
      newPathName += tempPathArray[i] + '/'
    }
    return (newPathName += '/' + name)
  }

  generateName(options) {
    var newName = null
    if (
      this.filePath === undefined ||
      this.filePath === '' ||
      this.filePath == null
    ) {
      return 'file not found'
    }

    if (options === null || options === undefined) {
      return 'options not set'
    }

    options.file === true
      ? (newName = uid() + this.file.type)
      : (newName = uid())
    return newName
  }

  appendFileToFolder(fileId) {
    var fileToWrite = file
    var masterDir = this.findMasterDir()

    if (masterDir) {
      var path = masterDir + '/' + fileId
      if (fs.existsSync(path)) {
        fs.writeFile(path, fileToWrite).then((res) => {
          console.log('file update')
        })
      } else {
        fs.mkdir(path).then(() => {
          fs.writeFile(path, fileToWrite).then((res) => {
            console.log('file appended')
          })
        })
      }
    }
  }

  sanitize() {
    this.events.on('file uploaded', (fileName) => {
      var filePath = this.constructPath(fileName)
      fs.unlink(filePath).then((res) => {
        this.events.emit('folder sanitized')
      })
    })
  }
}

module.exports = fileAction
