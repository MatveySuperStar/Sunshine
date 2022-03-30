const jwt = require('jsonwebtoken')

class TokenService {
  
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'})

    return accessToken
  }

}

module.exports = new TokenService()