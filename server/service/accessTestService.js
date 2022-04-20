const db = require('../db')
const ApiError = require('../exceptions/apiError')

class AccessTestService {
  
  async getAccessTest(idTest) {
      
    const groups = await db.execute(`SELECT 
    accesstest.id as id,
    accesstest.id_test as testId,
    groups.id as groupId,
    groups.name as name
    FROM accesstest LEFT JOIN groups 
    ON accesstest.id_group = groups.id WHERE accesstest.id_test = ${idTest}`)
      .then( ([rows]) => rows)
      .catch( err => console.log(err))

    return groups
  }

  async addAccessTest(idTest, idGroup, dateTime) {
      
    const groups = await db.execute(`INSERT INTO accesstest (id_test, id_group, date) VALUES (?)`,
    [idTest, idGroup, dateTime])
      .then( ([rows]) => rows)
      .catch( err => console.log(err))

    return {groups: groups}
  }

  async putAccessTest(accessTest, date, idAccess) {
      
    const groups = await db.execute(`UPDATE 
    accesstest
    SET access=?, date=? WHERE accesstest.id = ?`, [accessTest, date, idAccess])
      .then( ([rows]) => rows)
      .catch( err => console.log(err))

    return {groups: groups}
  }

  async deleteAccessTest(idAccess) {
      
    const groups = await db.execute(`DELETE FROM accesstest
    WHERE accesstest.id = ?`, [idAccess])
      .then( ([rows]) => rows)
      .catch( err => console.log(err))

    return {groups: groups}
  }
}

module.exports = new AccessTestService()