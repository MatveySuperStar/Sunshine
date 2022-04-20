const db = require('../db')
const testService = require('../service/testService.js') 
const { validationResult } = require('express-validator')

class TestController {

  async getAll(req, res, next) {
    try{
      const {idUser} = req.query

      if(!isNaN(idUser)) {
        const test = await testService.getAllOne(idUser)

        return res.status(200).json(test)
      } else {
        const test = await testService.getAll()

        return res.status(200).json(test)
      }      
    } catch(e) {
      next(e)
    }
  }

  async getOne(req, res, next) {
    try{
      const {id} = req.query

      const test = await testService.getOne(id)

      return res.status(200).json(test)
      
    } catch(e) {
      next(e)
    }
  }

  async add(req, res, next) {
    try{
      const {tests, title, description, idUser} = req.body

      const testData = await testService.addTest(tests, title, description, idUser)

      return res.status(200).json(testData)
      
    } catch(e) {
      next(e)
    }
  }

  async put(req, res, next) {
    try{
      const {tests, title, description, id} = req.body

      const testData = await testService.putTest(tests, title, description, id)

      return res.status(200).json(testData)
      
    } catch(e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try{
      const {id} = req.body

      const testData = await testService.deleteTest(id)

      return res.status(200).json(testData)
      
    } catch(e) {
      next(e)
    }
  }
}

module.exports = new TestController()