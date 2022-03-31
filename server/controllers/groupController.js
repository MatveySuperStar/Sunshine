const db = require('../db')
const GroupService = require('../service/groupService') 
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError')

class GroupController {
  async getAll(req, res, next) {
    try {
      const groupsData = await GroupService.getAll()

      return res.status(200).json(groupsData)
    } catch {
      next()
    }
  }

  async add(req, res, next) {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return next(ApiError.BadRequest('Ошибка при регистрации', errors.array()))
      }

      const {name} = req.body
      const groupsData = await GroupService.add(name)

      return res.status(200).json(groupsData)
    } catch(e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      const {name} = req.body
      const groupsData = await GroupService.delete(name)

      return res.status(200).json(groupsData)
    } catch(e) {
      next(e)
    }
  }

  async put(req, res, next) {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({message: 'Ошибка при регистрации', errors})
      }

      const {id, name} = req.body
      const groupsData = await GroupService.put(id, name)

      return res.status(200).json(groupsData)
    } catch(e) {
      next(e)
    }
  }
}

module.exports = new GroupController()