const db = require('../db')
const tokenService = require('./tokenService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../exceptions/apiError')

class UserService {

  async getAll(page, limit = 11) {
    const offsetPage = (page - 1) * limit

    const countPage = await db.execute(`SELECT COUNT(*) as count FROM users`)
      .then( ([rows]) => Math.ceil(rows[0].count/ limit))

    const users = await db.execute(`SELECT 
    users.id as id,
    users.name as name,
    users.surname,
    users.patronymic,
    users.email,
    users.phone,
    users.status,
    groups.id as groupId,
    groups.name as groupName
    FROM users LEFT JOIN groups 
    ON users.id_group = groups.id ORDER BY id LIMIT ${limit} OFFSET ${offsetPage}`)
      .then( result => result[0])
      .catch( err => console.log(err))

    return {users: users, countPage: countPage }
  }

  async like(fio = ' ', phone='', idGroup='') {
    
    const users = await db.execute(
      `SELECT id, CONCAT_WS(' ', name, surname, patronymic) as fio, phone FROM users 
      WHERE CONCAT_WS(' ', name, surname, patronymic) LIKE '%${fio}%' and phone LIKE '%${phone}%'  LIMIT 5 `
    ).then( result => result[0])
    .catch( err => console.log(err))

    if(users.length === 1) {
      const user = await db.execute(
        `SELECT id FROM users WHERE id=? AND id_group=?`, [users[0].id, idGroup]
      )
      
      if(user[0].length === 1) {
        return {users: users, existenceUser: true}
      } else {
        return {users: users, existenceUser: false}
      }
    }
    return {users: users, existenceUser: false}
  }

  async patchGroup(fio = '', phone = '', idGroup) {
    
  }

  async getAllUsersInGroups(idGroup) {

    const users = await db.execute(`SELECT 
    users.id as id,
    users.name as name,
    users.surname,
    users.patronymic,
    users.status,
    groups.id as groupId,
    groups.name as groupName
    FROM users LEFT JOIN groups 
    ON users.id_group = groups.id WHERE groups.id=? ORDER BY users.status`, [idGroup])
      .then( result => result[0])
      .catch( err => console.log(err))

    return {users: users}
  }

  async login(email, password, cookeiToken, id_device) {
    const user = await db.execute('SELECT * FROM users WHERE email=?', [email])
      .then( ([rows]) => rows[0])
      .catch( err => {console.log(err)})
      
    if(!user) {
      throw ApiError.BadRequest('Такой почты не существует', 
        [{param: 'email', msg: 'Такой почты не существует'}]) 
    }

    let comparePassword = bcrypt.compareSync(password, user.password)

    if(!comparePassword) {
      throw ApiError.BadRequest('Пароли не совпадает',
      [{param: 'password', msg: 'Пароль не совпадает'}]) 
    }

    let tokens = tokenService.generateToken({id: user.id, email: user.email, role: user.status})

    tokens.refreshToken = await tokenService.saveToken(user.id, tokens.refreshToken, cookeiToken, id_device)
    return {...tokens, user}
  }

  async registration(name, surname, patronymic, email, password, phone, status = 'Ученик', group = null) {
    const candidate = await db.execute(`SELECT * FROM users WHERE email=?`, [email])
    
    if(candidate[0][0]) {
      throw ApiError.BadRequest('Пользователь с таким email уже существует') 
    }

    const hashPassword = bcrypt.hashSync(password, 2)
    const user = [name, surname, patronymic, email, hashPassword, phone, status ? status : 'Ученик', group != 0 ? group : null]

    const users = await db.execute(`INSERT INTO users
      (name, surname, patronymic, email, password, phone, status, id_group) 
      VALUES (?,?,?,?,?,?,?,?)`, user)
      .catch( err => { throw new Error(err)} )

    return users
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async put(id, name, surname, patronymic, email, password, phone, status = 'Ученик', id_group = null) {

    if(!password) {
      password =  await db.execute(`SELECT password FROM users WHERE id=?`, [id])
      .then( result => result[0][0].password)
      .catch( err => {
        throw new Error(err) 
      })
    } else {
      password = bcrypt.hashSync(password, 2)
    }

    const newUser = [name, surname, patronymic, email, password, phone, status ? status : 'Ученик', id_group != 0 ? id_group : null]
    
    const users = await db.execute(`UPDATE users SET 
      name=?, surname=?, patronymic=?, email=?, password=?, phone=?, status=?, id_group=? 
      WHERE id='${id}'`, newUser)
      .catch(e => {
        throw new Error(e) 
      })
    
    return users
  }

  async putUserGroup(idUser, idGroup, isNull) {
    if(isNull) {
      console.log(idUser, idGroup, isNull)
      const users = await db.execute(`UPDATE users SET 
      id_group=NULL 
      WHERE id=?`, [idUser])
      .catch(e => {
        throw new Error(e) 
      })

      return users
    } else {
      console.log(idUser)
      console.log(idGroup)
      
      const users = await db.execute(`UPDATE users SET 
        id_group=? 
        WHERE id=?`, [idGroup, idUser])
        .catch(e => {
          throw new Error(e) 
        })

      return users
    }
  }

  async delete(id) {
    const users = await db.execute("DELETE FROM users WHERE id=?", [id])
      .catch(e => {
        throw new Error(e) 
      })
      
    return users
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if(!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await db.execute('SELECT * FROM users WHERE id=?', [userData.id])
      .then( ([rows]) => rows[0])
      .catch( err => {console.log(err)})

    let tokens = tokenService.generateToken({id: user.id, email: user.email, role: user.status})

    tokens.refreshToken = await tokenService.saveToken(user.id, tokens.refreshToken, refreshToken)
    return {...tokens, user}
  }
}

module.exports = new UserService()