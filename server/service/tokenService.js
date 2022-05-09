const db = require('../db')
const jwt = require('jsonwebtoken')

class TokenService {
  
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '30d'})

    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
      return userData
    } catch(e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
      return userData
    } catch(e) {
      return null
    }
  }

  async saveToken(userId, refreshToken, cookieToken) {
    const tokenData = await db.execute('SELECT * FROM tokens WHERE id_user=?',[userId])
      .then(([rows]) => rows)
    const id_device = parseInt((Math.random()*(new Date).getTime())/10000)

    if(tokenData.length != 0) {
      
      const arrayTokens = await Promise.all(tokenData.map( async (item) => {
        if(!jwt.verify(item.refreshToken , process.env.JWT_REFRESH_SECRET_KEY)) {
          await db.execute('DELETE FROM tokens WHERE id_device=? and id_user=?', [item.id_device, item.id_user])
        } else if(item.refreshToken === cookieToken) {
          await db.execute(`UPDATE tokens SET refreshToken=? WHERE id_device=? and id_user=?`, [refreshToken, item.id_device, item.id_user])
          return refreshToken
        }
      }))

      if(arrayTokens.find(item => item === refreshToken)) {
        return refreshToken
      } else {
        return addToken(userId, id_device, refreshToken)
      }
    }

    return addToken(userId, id_device, refreshToken)

    async function addToken(userId, id_device, refreshToken) {
      await db.execute('INSERT INTO tokens (id_user, id_device, refreshToken) VALUES (?,?,?)',[userId, id_device, refreshToken])
        .then(([row]) => row)
        .catch()
      return refreshToken
    }
  }

  async findToken(refreshToken) {
    const tokenData = await db.execute('SELECT * FROM tokens WHERE refreshToken=?',[refreshToken])
      .then(([row]) => row)
    return tokenData
  }

  async removeToken(refreshToken) {
    const tokenData = await db.execute('DELETE FROM tokens WHERE refreshToken=?',[refreshToken])
    return tokenData
  }

}

module.exports = new TokenService()