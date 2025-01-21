const AbstractManager = require("./AbstractManager");

class BeerTypeManager extends AbstractManager {
  constructor() {
    super({ table: "beer_type" });
  }

  insert(beer_type) {
    return this.database.query(
        `INSERT INTO ${this.table} (name) values (?)`,
        [beer_type.name]);
  }

  update(beer_type) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ? WHERE id = ?`,
      [beer_type.name,
        beer_type.id
    ]

    );
  }
}

module.exports = BeerTypeManager;
