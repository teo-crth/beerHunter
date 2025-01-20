const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(users) {
    return this.database.query(
        `INSERT INTO ${this.table} (email, birth_date, password, address, city, name, theme) values ($1, $2, $3, $4, $5, $6, $7)`,
        [users.email, users.birth_date, users.password, users.address, users.city, users.name, users.theme]);
  }

  update(users) {
    return this.database.query(
      `UPDATE ${this.table} SET email = $1, birth_date = $2, password = $3, address = $4, city = $5, name = $6, theme = $7  WHERE id = $8`,
      [users.email, users.birth_date, users.password, users.address, users.city, users.name, users.theme, users.id]
    );
  }
}

module.exports = UsersManager;
