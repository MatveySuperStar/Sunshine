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
      
    const groups = await db.execute(`INSERT INTO accesstest (id_test, id_group, date) VALUES (?,?,?)`,
    [idTest, idGroup, dateTime])
      .then( ([rows]) => rows)
      .catch( err => console.log(err))

    return {groups: groups}
  }

  async putAccessTest(idGroup, idTest, date) {
      
    const groups = await db.execute(`UPDATE 
    accesstest
    SET date=? WHERE id_test = ? AND id_group=?`, [date, idTest, idGroup])
      .then( ([rows]) => rows)
      .catch( err => console.log(err))

    return {groups: groups}
  }

  async deleteAccessTest(idGroup, idTest) {
      
    const groups = await db.execute(`DELETE FROM accesstest
    WHERE id_test = ? AND id_group=?`, [idTest, idGroup])
      .then( ([rows]) => rows)
      .catch( err => console.log(err))

    return {groups: groups}
  }
}

module.exports = new AccessTestService()