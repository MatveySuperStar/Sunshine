const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { query } = require('../db')

const generateJwt = (id, email, role) => {
  return jwt.sign(
    {id: id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class UserController {
  async getAll(req, res) {
    const users = await db.execute('SELECT * FROM users')
    .then( result => result[0])
    .catch( err => console.log(err))
    
    return res.json({status: 200, data: users})
  }

  async put(req, res) {
    let {id, first_name, second_name, patronymic, email, password, phone, status} = req.query

    const newUser = [
      first_name, 
      second_name,
      patronymic,
      email,
      password,
      phone,
      status,
      id
    ]

    await db.execute(`UPDATE users SET 
      first_name=?, second_name=?, patronymic=?, mail=?, password=?, phone=?, status=? 
      WHERE id=?`, [newUser])
    .then(result =>{ 
      return db.execute(`SELECT * FROM users WHERE id=${id}`)
    })
    .then(result =>{
      db.end()
      return res.json({status:200, data: result[0]})
    })
    .then(e => {
      return res.json({status:500, data: e})
    })
  }

  async delete(req, res) {
    const {email} = req.query

    await db.execute('DELETE FROM users WHERE mail=?', [email])
    .then(result =>{ 
      return db.execute("SELECT * FROM users")
    })
    .then(result =>{
      db.end()
      return res.json({status:200, data: result[0]})
    })

  }

  async registration(req, res) {
    const {first_name, second_name, patronymic, email, password, phone, status} = req.query
    const candidate = await db.execute('SELECT * FROM users mail=?', [email])
    
    if(candidate) {
      return res.status(400).json({message: 'Пользователь с таким email уже существует'})
    }

    const hashPassword = bcrypt.hashSync(password, 2)
    const user = [first_name, second_name, patronymic, email, hashPassword, phone, status]
    
    await db.execute('INSERT INTO users(first_name, second_name, patronymic, email, password, phone, status) VALUES ?',  user)
     .then( result => {
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
      })
      .catch( err => res.status(500).json({message: err}))
  }

  async login(req, res, next) {
    const {email, password} = req.query

    const user = await db.execute('SELECT * FROM users WHERE mail=?', [email])
      .then( result => {
        return result[0][0]
      })
      .catch( err => {
        console.log(err)
      })

    if(!user) {
      return res.json({status: 200, value: 'Такой почты не существует'})
    }

    let comparePassword = bcrypt.compareSync(password, user.password)

    if(!comparePassword) {
      return res.json({status: 200, value: 'Пароли не совпадают'})
    }

    const token = generateJwt(user.id, user.email, user.role)
    
    return res.json({token})
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)

    return res.json({token})
  }
}

module.exports = new UserController()