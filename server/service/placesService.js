const db = require('../db')
const ApiError = require('../exceptions/apiError')

class PlacesService {
  async getAll() {

    const places = await db.execute(`SELECT id, name_centre as nameCentre, latitude, longitude FROM infocentre `)
      .then( ([rows]) => rows)
      .catch( err => console.log(err))

    return places
  }

  async limitTest(page, limit = 11) {
    const offsetPage = (page - 1) * limit

    const countPage = await db.execute(`SELECT COUNT(*) as count FROM infocentre`)
      .then( ([rows]) => Math.ceil(rows[0].count/ limit))
  
    const places = await db.execute(`SELECT id, name_centre as name, latitude, longitude 
    FROM infocentre ORDER BY id LIMIT ${limit} OFFSET ${offsetPage}`)
      .then( ([rows]) => rows)
      .catch( err => console.log(err))
  
    return {places: places, countPage: countPage, currentPage: page }
  }

  async add(nameCentre, latitude, longitude) {

    const places = await db.execute(`INSERT INTO infocentre (name_centre, latitude, longitude) 
      VALUES (?,?,?)`, [nameCentre, latitude, longitude])
      .then( ([rows]) => rows)
      .catch( (e) => console.log(e))

    return places 
  }

  async put(id, nameCentre, latitude, longitude) {

    console.log(id)
    const places = await db.execute('UPDATE infocentre SET name_centre =?, latitude = ? , longitude = ? WHERE id=?', [nameCentre, latitude, longitude, id])
    .then( ([rows]) => rows)  
    .catch( (e) => console.log(e))

    return places 
  }

  async delete(id) {
    const places = await db.execute("DELETE FROM infocentre WHERE id=?", [id])
      .catch(e => console.log(e))
      
    return places
  }
}

module.exports = new PlacesService()