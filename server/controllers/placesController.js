const db = require('../db')
const placesService = require('../service/placesService.js') 
const { validationResult } = require('express-validator')

class PlacesController {

  async getAll(req, res, next) {
    try{
      const {page} = req.query

      if(page) {
        const placesData = await placesService.limitTest(page)

        return res.status(200).json(placesData)
      } else {
        const placesData = await placesService.getAll()

        return res.status(200).json(placesData)
      }
    } catch(e) {
      next(e)
    }
  }

  async add(req, res, next) {
    try{
      let {nameCentre, latitude, longitude, page} = req.body

      console.log(req.body)
      const a = await placesService.add(nameCentre, latitude, longitude)
      const placesData = await placesService.limitTest(page)

      return res.status(200).json(placesData)
    } catch(e) {
      next(e)
    }
  }

  async put(req, res, next) {
    try{

      let {id, nameCentre, latitude, longitude, page} = req.body

      const a = await placesService.put(id, nameCentre, latitude, longitude)
      const placesData = await placesService.limitTest(page)

      return res.status(200).json(placesData)
    } catch(e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try{
      let {id, page} = req.body

      console.log(req.body)

      const a = await placesService.delete(id)
      const placesData = await placesService.limitTest(page)

      return res.status(200).json(placesData)
      
    } catch(e) {
      next(e)
    }
  }
}

module.exports = new PlacesController()