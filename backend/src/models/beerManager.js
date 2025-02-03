const AbstractManager = require("./AbstractManager");

class BeerManager extends AbstractManager {
  constructor() {
    super({ table: "beer" });
  }

  insert(beer) {
    return this.database.query(
        `INSERT INTO ${this.table} (name, subtitle, alcool_degree, description, image_link, beer_type_id) values ($1, $2, $3, $4, $5, $6)`,
        [beer.name, beer.subtitle, beer.alcool_degree, beer.description, beer.image_link, beer.beer_type_id]);
  }

  update(beer) {
    return this.database.query(
      `UPDATE ${this.table} SET name = $1, subtitle = $2, alcool_degree = $3, description = $4, image_link = $5, beer_type_id = $6 WHERE id = $7`,
      [beer.name, beer.subtitle, beer.alcool_degree, beer.description, beer.image_link, beer.beer_type_id, beer.id]
    );
  }
}

module.exports = BeerManager;
