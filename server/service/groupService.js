const db = require('../db')
const ApiError = require('../exceptions/apiError')

class GroupService {
  async getAll() {
    const groups = await db.execute('SELECT * FROM groups')
      .then( result => result[0])
      .catch( err => console.log(err))

    return groups
  }

  async add(name) {
    const candidate = await db.execute(`SELECT * FROM groups WHERE name=?`, [name])
    
    if(candidate[0][0]) {
      throw ApiError.BadRequest('Группа с таким именем уже существует') 
    }

    const groups = await db.execute('INSERT INTO groups (name) VALUES (?)', [name])
      .then( () => db.execute('SELECT * FROM groups'))
      .then( result => result[0])
      .catch( (e) => console.log(e))

    return groups  
  }

  async put(id, name) {
    const candidate = await db.execute(`SELECT * FROM groups WHERE name=?`, [name])
    
    if(candidate[0][0]) {
      throw ApiError.BadRequest('Группа с таким именем уже существует') 
    }

    const groups = await db.execute('UPDATE groups SET name=? WHERE id=?', [name, id])
      .then( () => db.execute('SELECT * FROM groups'))
      .then( result => result[0])
      .catch( (e) => console.log(e))

    return groups  
  }

  async delete(name) {
    const groups = await db.execute("DELETE FROM groups WHERE name=?", [name])
      .then(() => db.execute("SELECT * FROM groups"))
      .then(result => result[0])
      .catch(e => console.log(e))
      
    return groups
  }
}

module.exports = new GroupService()