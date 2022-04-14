const db = require('../db')
const EmailService = require('../service/emailService') 
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/apiError')
const e = require('express')

class EmailController {
  async send(req, res, next) {
    try {
      const errors = validationResult(req)

      if(!errors.isEmpty()){
        return res.status(400).json({message: 'Ошибка пе', errors})
      }

      const {email, phone, message, name, kurs} = req.body

      const answer = await EmailService.sendMessageMail(email, message, name, phone, kurs)

      return res.status(200).json(answer)
    } catch(e) {
      next(e)
    }
  }
}
module.exports = new EmailController()