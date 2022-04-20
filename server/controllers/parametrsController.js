const db = require('../db')
const parametrsService = require('../service/parametrsService.js') 
const { validationResult } = require('express-validator')

class ParametrsController {

  async getAll(req, res, next) { 
    try{
      const test = await parametrsService.getAll()

      return res.status(200).json(test) 
    } catch(e) {
      next(e)
    }
  }
}

module.exports = new ParametrsController()