const db = require('../db')
const kursService = require('../service/kursService.js') 
const { validationResult } = require('express-validator')

class KursController {

  async get(req, res, next) {
    try{
      const {page} = req.query;
      const kursData = await kursService.get(page);

      return res.status(200).json(kursData);
    } catch(e) {
      next(e)
    }
  }

  async add(req, res, next) {
    try{
      const {title, description, price, time, page} = req.body;

      const kursDataOne = await kursService.add(title, description, price, time);

      const kursData = await kursService.get(page)

      return res.status(200).json(kursData);
    } catch(e) {
      next(e)
    }
  }

  async update(req, res, next) {
    try{
      const {id, page} = req.body;

      const testData = await kursService.put(id);
      const kursData = await kursService.get(page)

      return res.status(200).json(kursData);
    } catch(e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try{
      const {id} = req.body;

      const testData = await kursService.delete(id);
      const kursData = await kursService.get(page)

      return res.status(200).json(kursData);
    } catch(e) {
      next(e)
    }
  }
}
module.exports = new KursController()