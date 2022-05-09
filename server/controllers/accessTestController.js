const db = require('../db')
const accessTestService = require('../service/accessTestService.js') 
const { validationResult } = require('express-validator')

class AccessTestController {

  async getAll(req, res, next) {
    try{
      const {idTest} = req.query

      const accessTest = await accessTestService.getAccessTest(idTest)

      return res.status(200).json(accessTest)
    } catch(e) {
      next(e)
    }
  }

  async add(req, res, next) {
    try{
      const {idTest, idGroup, date} = req.body

      console.log(req.body)
      const testData = await accessTestService.addAccessTest(idTest, idGroup, date)

      return res.status(200).json(testData)
      
    } catch(e) {
      next(e)
    }
  }

  async put(req, res, next) {
    try{
      const {idGroup, idTest, date} = req.body

      const testData = await accessTestService.putAccessTest(idGroup, idTest, date)

      return res.status(200).json(testData)
      
    } catch(e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try{
      const {idGroup, idTest} = req.body

      const testData = await accessTestService.deleteAccessTest(idGroup, idTest)

      return res.status(200).json(testData)
      
    } catch(e) {
      next(e)
    }
  }
}

module.exports = new AccessTestController()