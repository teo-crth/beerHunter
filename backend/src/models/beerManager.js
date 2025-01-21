const AbstractManager = require("./AbstractManager");

class BeerManager extends AbstractManager {
  constructor() {
    super({ table: "beer" });
  }

  insert(beer) {
    return this.database.query(
        `INSERT INTO ${this.table} (name, subtitle, alcool_degree, description, image_link) values (?, ?, ?, ?, ?)`,
        [beer.name, beer.subtitle, beer.alcool_degree, beer.description, beer.image_link]);
  }

  update(beer) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, subtitle = ?, alcool_degree = ?, description = ?, image_link = ? WHERE id = ?`,
      [beer.name, beer.subtitle, beer.alcool_degree, beer.description, beer.image_link, beer.id]
    );
  }
}

module.exports = BeerManager;
