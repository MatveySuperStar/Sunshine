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

  async getAccessTest(idGroup) {
    
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

  async likeGroupInTest(nameGroup='', idTest='') {
    const groups = await db.execute(
      `SELECT id, name FROM groups 
      WHERE name LIKE '%${nameGroup}%' LIMIT 5 `
    ).then( result => result[0])
    .catch( err => console.log(err))

    if(groups.length === 1) {
      const accessGroups = await db.execute(
        `SELECT id FROM accesstest WHERE id_group=? AND id_test=?`, [groups[0].id, idTest]
      )

      if(accessGroups[0].length === 1 && groups[0].name === nameGroup) {
        return {groups: groups, accessGroups: true}
      } else {
        return {groups: groups, accessGroups: false}
      }
    }

    return {groups: groups, accessGroups: false}
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