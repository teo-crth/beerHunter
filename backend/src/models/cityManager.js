const AbstractManager = require("./AbstractManager");

class CityManager extends AbstractManager {
  constructor() {
    super({ table: "city" });
  }

  findBarsOfOneCity(city, region) {

    return this.database.query(`SELECT bar.* 
     FROM bar
     JOIN city ON bar.city_id = city.id 
     WHERE city.name= $1 AND city.region = $2 `,
    [city, region] );
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
