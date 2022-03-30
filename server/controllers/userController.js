const db = require('../db')
const userService = require('../service/userService') 
const { validationResult } = require('express-validator')

class UserController {
  async getAll(req, res, next) {
    try{
      const users = await userService.getAll()
      
      return res.status(200).json(users)
    } catch(e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({message: 'Ошибка при регистрации', errors})
      }

      const {email, password} = req.body
      const userData = await userService.login(email, password)

    return res.status(200).json(userData)
    } catch (e) {
      next(e) 
    }
  }

  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({message: 'Ошибка при регистрации', errors})
      }

      const {name, surname, patronymic, email, password, phone, status, group} = req.body
      const usersData = await userService.registration(name, surname, patronymic, email, password, phone, status, group)

      return res.status(200).json(usersData)
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

      let {id, name, surname, patronymic, email, password, phone, status, group} = req.body
      const usersData = await userService.put(id, name, surname, patronymic, email, password, phone, status, group)

      return res.status(200).json(usersData)
    } catch(e) {
      next(e)
    }

  }

  async delete(req, res, next) {
    try{
      const {email} = req.body
      const users = await userService.delete(email)

      return res.status(200).json(users)
    } catch(e) {
      next(e)
    }
  }


  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)

    return res.json({token})
  }
}

module.exports = new UserController()