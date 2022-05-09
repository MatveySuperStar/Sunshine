const db = require('../db')
const GroupService = require('../service/groupService') 
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError')

class GroupController {
  async getAll(req, res, next) {
    try {
      const {page} = req.query

      if(isNaN(page)) {
        const groupsData = await GroupService.getAll()
        return res.status(200).json(groupsData)
      } else {
        const groupsData = await GroupService.limitGroups(page)
        return res.status(200).json(groupsData)
      }

    } catch {
      next()
    }
  }

  async accessTest(req, res, next) {
    try {
     const {groupId}= req.query

     const groupsData = await GroupService.getAccessTest()

     return res.status(200).json(groupsData)
    } catch {
      next()
    }
  }

  async like(req, res, next) {
    try {
      const {nameGroup, idTest}= req.body
      const groupsData = await GroupService.likeGroupInTest(nameGroup, idTest)

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

      const {name, page} = req.body
      const a = await GroupService.add(name)
      const groupsData = await GroupService.limitGroups(page)

      return res.status(200).json(groupsData)
    } catch(e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      
      const {id, page} = req.body
      const a = await GroupService.delete(id)

      const groupsData = await GroupService.limitGroups(page)

      return res.status(200).json(groupsData)
    } catch(e) {
      next(e)
    }
  }

  async put(req, res, next) {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({message: 'Ошибка пе', errors})
      }

      const {id, name, page} = req.body
      const a = await GroupService.put(id, name)

      const groupsData = await GroupService.limitGroups(page)

      return res.status(200).json(groupsData)
    } catch(e) {
      next(e)
    }
  }
}

module.exports = new GroupController()