const AbstractManager = require("./AbstractManager");

class BeerTypeManager extends AbstractManager {
  constructor() {
    super({ table: "beer_type" });
  }

  insert(beer_type) {
    return this.database.query(
        `INSERT INTO ${this.table} (name) values ($1)`,
        [beer_type.name]);
  }

  update(beer_type) {
    return this.database.query(
      `UPDATE ${this.table} SET name = $1 WHERE id = $2`,
      [beer_type.name]
    );
  }
}

module.exports = BeerTypeManager;
