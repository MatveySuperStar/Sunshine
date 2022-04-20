const db = require('../db')
const ApiError = require('../exceptions/apiError')

class TestService {
  async getAll() {

    const test = await db.execute(`SELECT * FROM test`)
      .then( ([rows]) => rows)
      .catch( err => console.log(err))

    return test
  }

  async getAllOne(idUser) {

    const test = await db.execute(`SELECT * FROM test WHERE id_user=?`,[idUser])
      .then( ([rows]) => rows)
      .catch( err => console.log(err))

    return test
  }

  async getOne(id) {

    const test = await db.execute(`SELECT * FROM test WHERE id=?`,[id])
      .then( ([rows]) => rows[0])
      .catch( err => console.log(err))

    return test
  }

  async addTest(questions, title, description, idUser) {

    const test = await db.execute(`INSERT INTO
    test (title, questions, description, id_user) VALUES (?,?,?,?)
    `, [title, questions, description, idUser])
      .then( ([rows]) => rows)
      .catch( err => console.log(err))

    return {test: test}
  }

  async putTest(questions, title, description, id) {

    const test = await db.execute(`UPDATE test SET 
    title=?, questions=?, description=? WHERE id=?
    `, [title, questions, description, id])
      .then( ([rows]) => rows)
      .catch( err => console.log(err))

    return {test: test}
  }

  async deleteTest(id) {

    const test = await db.execute(`UPDATE test SET 
    title=?, questions=?, description=? WHERE id=?
    `, [title, questions, description, id])
      .then( ([rows]) => rows)
      .catch( err => console.log(err))

    return {test: test}
  }
}

module.exports = new TestService()