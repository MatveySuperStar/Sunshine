const db = require('../db')
const ApiError = require('../exceptions/apiError')

class RaitingService {
  async add(idTest, idUser, raiting, answers) {
    const date = new Date();
    const testRaiting = await db.execute(`INSERT INTO testrating (id_test, id_user, raiting, answers, date) 
    VALUES (?,?,?,?,?)`, [idTest, idUser, raiting, answers, date])
    .then( ([rows]) => rows)
    .catch( (e) => console.log(e))

    return testRaiting
  }

  async all() {
    /*
    const testRaiting = await db.execute(`SELECT 
    testrating.id as id,
    test.title as nameTest,
    groups.name as nameGroup,
    testrating.date as date
    FROM testrating 
    INNER JOIN test ON testrating.id_test = test.id
    INNER JOIN groups ON testrating.id_group = groups.id`)
      .then( ([rows]) => rows)
      .catch( (e) => console.log(e))
    */
      const testRaiting = await db.execute(`SELECT testrating.id as id,
      test.title as nameTest,
      groups.name as nameGroup,
      testrating.date as date,
      test.id as idTest 
      FROM testrating INNER JOIN users ON testrating.id_user = users.id
      INNER JOIN test ON testrating.id_test = test.id
      INNER JOIN groups ON users.id_group = groups.id
      GROUP BY testrating.date`)
      .then( ([rows]) => rows)
      .catch( (e) => console.log(e))

      return testRaiting

  }

  async getMyRating(idUser) {

    const testRaiting = await db.execute(`SELECT
    testrating.id as id,
    test.title as nameTest,
    testrating.raiting as rating,
    testrating.date as date
    FROM testrating LEFT JOIN test 
    ON testrating.id_test = test.id
     WHERE testrating.id_user=?
     ORDER BY testrating.date`, [idUser])
    .then( ([rows]) => rows)
    .catch( (e) => console.log(e))

    return testRaiting
  }

  async getGroupRating(idGroup) {

    const testRaiting = await db.execute(`SELECT testrating.id as id,
    test.title as nameTest,
    groups.name as nameGroup,
    testrating.date as date,
    test.id as idTest 
    FROM testrating INNER JOIN users ON testrating.id_user = users.id
    INNER JOIN test ON testrating.id_test = test.id
    INNER JOIN groups ON users.id_group = groups.id
    where users.id_group = ?
    GROUP BY testrating.date`, [idGroup])
    .then( ([rows]) => rows)
    .catch( (e) => console.log(e))

    console.log(testRaiting)
    return testRaiting
  }

  async getUserRating(idUser) {
    const testRaiting = await db.execute(`SELECT
    testrating.id as id,
    test.title as nameTest,
    testrating.rating as rating,
    testrating.date as date,
    FROM testrating LEFT JOIN test 
    ON testrating.id_test = test.id
     WHERE accesstest.id_user=?
     GROUP BY testrating.date`, [idUser])
    .then( ([rows]) => rows)
    .catch( (e) => console.log(e))

    return testRaiting
  }

  async getGroupUsersRating(idTest, idGroup, date) {

    const testRaiting = await db.execute(`SELECT 
    testrating.id as id,
    test.id as idTest, 
    users.name as name,
    users.surname as surname, 
    users.patronymic as patronymic, 
    testrating.raiting as raiting, 
    testrating.date as date 
    FROM testrating 
    INNER JOIN test ON testrating.id_test = test.id 
    INNER JOIN users ON testrating.id_user = users.id 
    WHERE testrating.id_test=? and users.id_group=? and 
    testrating.date='${new Date(date).getFullYear()}-${new Date(date).getMonth()+1}-${new Date(date).getDate()}'
    ORDER BY testrating.raiting
    `, [idTest, idGroup])
    .then( ([rows]) => rows)
    .catch( (e) => console.log(e))

    return testRaiting
  }

  async deleteAllGroupRating(idTest, nameGroup, date) {
    console.log(idTest, nameGroup, `${new Date(date).getFullYear()}-${new Date(date).getMonth()}-${new Date(date).getDate()}`)
    const idGroup = await db.execute(`SELECT id FROM groups WHERE name='${nameGroup}' `).then(([rows]) => rows )

    const testRaiting = await db.execute(`
    DELETE FROM testrating WHERE testrating.id_test='${idTest}' and
    testrating.date='${new Date(date).getFullYear()}-${new Date(date).getMonth()+1}-${new Date(date).getDate()}'
    and
    testrating.id_user IN(
      Select id FROM users WHERE users.id_group=${idGroup[0].id}
    )`)
    .then( ([rows]) => rows)
    .catch( (e) => console.log(e))
    
    return testRaiting
  }

  async deleteUserRating(id) {
    const testRaiting = await db.execute(`DELETE FROM testrating 
    WHERE testrating.id=?`, [id])
    .then( ([rows]) => rows)
    .catch( (e) => console.log(e))
    
    return testRaiting
  }

}

module.exports = new RaitingService()