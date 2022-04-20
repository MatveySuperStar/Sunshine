const db = require('../db')
const ApiError = require('../exceptions/apiError')

class ParametrsService {
  async getAll() {

    const countStudents = await db.execute(`SELECT COUNT(id) as count FROM users WHERE status='Ученик' `)
      .then( ([rows]) => rows[0].count)
      .catch( err => console.log(err))

    const countPlaces = await db.execute(`SELECT COUNT(id) as count FROM users WHERE status='Преподаватель' `)
    .then( ([rows]) => rows[0].count)
    .catch( err => console.log(err))

    const countTeachers = await db.execute(`SELECT COUNT(id) as count FROM infocentre `)
    .then( ([rows]) => rows[0].count)
    .catch( err => console.log(err))

    return {countStudents: countStudents, countPlaces: countPlaces, countTeachers: countTeachers}
  }
}

module.exports = new ParametrsService()