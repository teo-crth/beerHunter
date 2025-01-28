const AbstractManager = require("./AbstractManager");

class BeerManager extends AbstractManager {
  constructor() {
    super({ table: "beer" });
  }

  insert(beer) {
    return this.database.query(
        `INSERT INTO ${this.table} (name, subtitle, alcool_degree, description, image_link) values ($1, $2, $3, $4, $5)`,
        [beer.name, beer.subtitle, beer.alcool_degree, beer.description, beer.image_link]);
  }

  update(beer) {
    return this.database.query(
      `UPDATE ${this.table} SET name = $1, subtitle = $2, alcool_degree = $3, description = $4, image_link = $5 WHERE id = $6`,
      [beer.name, beer.subtitle, beer.alcool_degree, beer.description, beer.image_link, beer.id]
    );
  }
}

module.exports = BeerManager;
