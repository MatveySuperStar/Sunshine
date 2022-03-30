const db = require('../db')
const tokenService = require('./tokenService')
const bcrypt = require('bcrypt')
const ApiError = require('../exceptions/apiError')

class UserService {
  async getAll() {
    const users = await db.execute('SELECT * FROM users')
      .then( result => result[0])
      .catch( err => console.log(err))

    return {users}
  }

  async login(email, password) {
    const user = await db.execute('SELECT * FROM users WHERE mail=?', [email])
      .then( result => {
        return result[0][0]
      })
      .catch( err => {
        console.log(err)
      })

    if(!user) {
      throw ApiError.BadRequest('Такой почты не существует') 
    }

    let comparePassword = bcrypt.compareSync(password, user.password)

    if(!comparePassword) {
      throw ApiError.BadRequest('Пароли не совпадают') 
    }

    const token = tokenService.generateToken({id: user.id, email: user.email, role: user.role})
    return {token, user: user}
  }

  async registration(name, surname, patronymic, email, password, phone, status = 'student', group = null) {
    const candidate = await db.execute(`SELECT * FROM users WHERE mail=?`, [email])
    
    if(candidate[0][0]) {
      throw ApiError.BadRequest('Пользователь с таким email уже существует') 
    }

    const hashPassword = bcrypt.hashSync(password, 2)
    const user = [name, surname, patronymic, email, hashPassword, phone, status, group]

    const users = await db.execute(`INSERT INTO users
      (first_name, second_name, patronymic, mail, password, phone, status, id_group) 
      VALUES (?,?,?,?,?,?,?,?)`, user)
      .then( result => db.execute(`SELECT * FROM users`))
      .then( result => { return {users: result[0]}})
      .catch( err => { throw new Error(err)} )

    return users
  }

  async put(id, name, surname, patronymic, email, password, phone, status = 'student', group = null) {
    
    if(!password) {
      password =  await db.execute(`SELECT password FROM users WHERE id=?`, [id])
      .then( result => result[0][0].password)
      .catch( err => {
        throw new Error(err) 
      })
    }

    const newUser = [name, surname, patronymic, email, password, phone, status, group]

    const users = await db.execute(`UPDATE users SET 
      first_name=?, second_name=?, patronymic=?, mail=?, password=?, phone=?, status=?, id_group=? 
      WHERE id='${id}'`, newUser)
      .then( result =>{ 
        return db.execute(`SELECT * FROM users`)
      })
      .then(result =>{
        return {users: result[0]}
      })
      .catch(e => {
        throw new Error(e) 
      })
    
    return users
  }

  async delete(email) {
    const users = await db.execute("DELETE FROM users WHERE mail=?", [email])
      .then(result =>{ 
        return db.execute("SELECT * FROM users")
      })
      .then(result =>{
        return {users: result[0]}
      })
      
    return users
  }
}

module.exports = new UserService()