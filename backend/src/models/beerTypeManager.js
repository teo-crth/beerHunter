const AbstractManager = require("./AbstractManager");

class BeerTypeManager extends AbstractManager {
  constructor() {
    super({ table: "beer_type" });
  }

  findBeerOfOneType(type) {
    return this.database.query(`SELECT *
    FROM beer
    JOIN beer_type ON beer.beer_type_id = beer_type.id
    WHERE beer_type.name = $1`,[type]);
  }

  insert(beer_type) {
    return this.database.query(
        `INSERT INTO ${this.table} (name) values ($1)`,
        [beer_type.name]);
  }

  update(beer_type) {
    return this.database.query(
      `UPDATE ${this.table} SET name = $1, description =$2 WHERE id = $3`,
      [beer_type.name, beer_type.description, beer_type.id]);
  }
}

module.exports = BeerTypeManager;
