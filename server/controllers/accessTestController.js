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
      const {idTest, idGroup, access, dateTime} = req.body

      const testData = await accessTestService.addAccessTest(idTest, idGroup, access, dateTime)

      return res.status(200).json(testData)
      
    } catch(e) {
      next(e)
    }
  }

  async put(req, res, next) {
    try{
      const {accessTest, date, idAccess} = req.body

      const testData = await accessTestService.putAccessTest(accessTest, date, idAccess)

      return res.status(200).json(testData)
      
    } catch(e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try{
      const {idAccess} = req.body

      const testData = await accessTestService.deleteAccessTest(idAccess)

      return res.status(200).json(testData)
      
    } catch(e) {
      next(e)
    }
  }
}

module.exports = new AccessTestController()