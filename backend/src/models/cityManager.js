const AbstractManager = require("./AbstractManager");

class CityManager extends AbstractManager {
  constructor() {
    super({ table: "city" });
  }

  findBarOfOneCity(id) {
    return this.database.query(`SELECT * FROM  bar WHERE city_id = ?`, 
      [id]);
  }

  insert(city) {
    return this.database.query(
        `INSERT INTO ${this.table} (name, region) values (?, ?)`,
        [city.name, city.region]);
  }

  update(city) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, region = ? WHERE id = ?`,
      [city.name, city.region, city.id]
    );
  }
}

module.exports = BeerManager;
