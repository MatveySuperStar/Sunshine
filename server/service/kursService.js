const db = require('../db')

class KursService {

  async get(page, limit = 11) {
    const offsetPage = (page - 1) * limit

    const countPage = await db.execute(`SELECT COUNT(*) as count FROM kurs`)
      .then( ([rows]) => Math.ceil(rows[0].count/ limit))

    const kurs = await db.execute(`SELECT * FROM kurs LIMIT ${limit} OFFSET ${offsetPage}`)
      .then( result => result[0])
      .catch( err => console.log(err))

    return {kurs: kurs, countPage: countPage }
  }

  async add(title, description, price, time) {

    const kurs = await db.execute(`INSERT INTO kurs
      (title, description, price, time) 
      VALUES (?,?,?,?)`, [title, description, price, time])
      .catch( err => { throw new Error(err)} )

    return kurs
  }

  async put(id, title, description, price, time) {

    const kurs = await db.execute(`UPDATE kurs SET 
      title=?, description=?, price=?, time=? WHERE id='${id}'`, 
      [title, description, price, time])
      .catch(e => {
        throw new Error(e) 
      })
    
    return kurs
  }

  async delete(id) {
    const kurs = await db.execute("DELETE FROM kurs WHERE id=?", [id])
      .catch(e => {
        throw new Error(e) 
      })
      
    return kurs
  }
}

module.exports = new KursService()