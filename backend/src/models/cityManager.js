const AbstractManager = require("./AbstractManager");

class CityManager extends AbstractManager {
  constructor() {
    super({ table: "city" });
  }

  findBarsOfOneCity(cityId) {

    return this.database.query(`SELECT bar.* 
     FROM bar
     JOIN city ON bar.city_id = city.id 
     WHERE city.id= $1`,
    [cityId] );
  }

  insert(city) {
    return this.database.query(
        `INSERT INTO ${this.table} (name, region) values ($1, $2)`,
        [city.name, city.region]);
  }

  update(city) {
    return this.database.query(
      `UPDATE ${this.table} SET name = $1, region = $2 WHERE id = $3`,
      [city.name, city.region, city.id]
    );
  }
}

module.exports = CityManager;
