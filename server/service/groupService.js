const db = require('../db')
const ApiError = require('../exceptions/apiError')

class GroupService {
  async getAll() {

      const groups = await db.execute(`SELECT 
      groups.id as id,
      groups.name as name,
      COUNT(users.id) as count
      FROM users RIGHT JOIN groups 
      ON users.id_group = groups.id GROUP bY name  ORDER BY id`)
        .then( ([rows]) => rows)
        .catch( err => console.log(err))
  
      return {groups: groups}

  }


  async limitGroups(page, limit = 11) {
    const offsetPage = (page - 1) * limit

      const countPage = await db.execute(`SELECT COUNT(*) as count FROM groups`)
        .then( ([rows]) => Math.ceil(rows[0].count/ limit))
  
      const groups = await db.execute(`SELECT 
      groups.id as id,
      groups.name as name,
      COUNT(users.id) as count
      FROM users RIGHT JOIN groups 
      ON users.id_group = groups.id GROUP bY name ORDER BY id LIMIT ${limit} OFFSET ${offsetPage}`)
        .then( ([rows]) => rows)
        .catch( err => console.log(err))
  
      return {groups: groups, countPage: countPage }
  }

  async add(name) {
    const candidate = await db.execute(`SELECT * FROM groups WHERE name=?`, [name])
    
    if(candidate[0][0]) {
      throw ApiError.BadRequest('Группа с таким именем уже существует') 
    }

    const groups = await db.execute('INSERT INTO groups (name) VALUES (?)', [name])
      .catch( (e) => console.log(e))

    return groups  
  }

  async put(id, name) {
    const candidate = await db.execute(`SELECT * FROM groups WHERE name=?`, [name])
    
    if(candidate[0][0]) {
      throw ApiError.BadRequest('Группа с таким именем уже существует') 
    }

    const groups = await db.execute('UPDATE groups SET name=? WHERE id=?', [name, id])
      .catch( (e) => console.log(e))

    return groups  
  }

  async delete(id) {
    const groups = await db.execute("DELETE FROM groups WHERE id=?", [id])
      .catch(e => console.log(e))
      
    return groups
  }
}

module.exports = new GroupService()