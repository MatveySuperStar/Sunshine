const FileService = require('../service/fileService') 
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError')

class FileController {
  
  async uploadFile(req, res, next) {
    try {
      const file = req.files.file

   
    } catch {
      next()
    }
  }
}