const db = require('../db')
const userService = require('../service/userService') 
const { validationResult } = require('express-validator')

class UserController {
  async getAll(req, res, next) {
    try{
      const {page} = req.query
      const users = await userService.getAll(page)
      
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
      const {refreshToken, id_device} = req.cookies
    
      const userData = await userService.login(email, password, refreshToken, id_device)
      
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

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

  async logout(req, res, next) {
    try{
      const {refreshToken} = req.cookies
      const token = await userService.logout(refreshToken)
      
      res.clearCookie('refreshToken')
      res.json(token)
    } catch {

    }
  }

  async put(req, res, next) {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({message: 'Ошибка при регистрации', errors})
      }

      let {id, name, surname, patronymic, email, password, phone, status, id_group, page} = req.body

      console.log(req.body)

      const a = await userService.put(id, name, surname, patronymic, email, password, phone, status, id_group)
      const usersData = await userService.getAll(page)
      return res.status(200).json(usersData)
    } catch(e) {
      next(e)
    }

  }

  async delete(req, res, next) { 
    try{
      const {id, page} = req.body

      const a = await userService.delete(id)
      const usersData = await userService.getAll(page)

      return res.status(200).json(usersData)
    } catch(e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const userData = await userService.refresh(refreshToken)
      
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.status(200).json(userData)
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