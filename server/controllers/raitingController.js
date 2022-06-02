const db = require('../db')
const raitingService = require('../service/raitingService.js') 
const { validationResult } = require('express-validator')

class RaitingController {

  async add(req, res, next) {
    try{
      const {idTest, idUser, raiting, answers} = req.body;

      const testData = await raitingService.add(idTest, idUser, raiting, answers);

      return res.status(200).json(testData);
    } catch(e) {
      next(e)
    }
  }

  async all(req, res, next) {
    try{
      const testData = await raitingService.all();

      return res.status(200).json(testData);
    } catch(e) {
      next(e)
    }
  }

  async getMyRating(req, res, next) {
    try{
      const {idUser} = req.query;

      const testData = await raitingService.getMyRating(idUser);

      return res.status(200).json(testData);
    } catch(e) {
      next(e)
    }
  }

  async getGroupRating(req, res, next) {
    try{
      const { idGroup } = req.query;

      const testData = await raitingService.getGroupRating(idGroup);

      return res.status(200).json(testData);
    } catch(e) {
      next(e)
    }
  }

  async getUserRating(req, res, next) {
    try{
      const { idUser } = req.query;

      const testData = await raitingService.getUserRating(idUser);

      return res.status(200).json(testData);
    } catch(e) {
      next(e)
    }
  }

  async getGroupUsersRating(req, res, next) {
    try{
      const { idTest, idGroup, date } = req.query;

      const testData = await raitingService.getGroupUsersRating(idTest, idGroup, date);

      
      return res.status(200).json(testData);
    } catch(e) {
      next(e)
    }
  }

  async deleteAllGroupRating(req, res, next) {
    try{
      const { idTest, nameGroup, date } = req.body;

      const testData = await raitingService.deleteAllGroupRating(idTest, nameGroup, date);

      return res.status(200).json(testData);
    } catch(e) {
      next(e)
    }
  }

  async deleteOneGroupRating(req, res, next) {
    try{
      const { id } = req.body;

      const testData = await raitingService.deleteUserRating(id);

      return res.status(200).json(testData);
    } catch(e) {
      next(e)
    }
  }
}

module.exports = new RaitingController()