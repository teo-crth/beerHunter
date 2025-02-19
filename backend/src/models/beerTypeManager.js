const AbstractManager = require("./AbstractManager");

class BeerTypeManager extends AbstractManager {
  constructor() {
    super({ table: "beer_type" });
  }

  findBeersOfOneType(type) {
    return this.database.query(`        
      SELECT 
        beer.name AS beer_name, 
        beer.subtitle, 
        beer.id AS beer_id, 
        beer.alcool_degree, 
        beer.image_link, 
        beer_type.name AS beer_type_name,
        beer_type.description
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
