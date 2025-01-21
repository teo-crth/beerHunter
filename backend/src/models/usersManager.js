const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(users) {
    return this.database.query(
        `INSERT INTO ${this.table} (email, birth_date, password, address, city, name, theme) values (?, ?, ?, ?, ?, ?, ?)`,
        [users.email, users.birth_date, users.password, users.address, users.city, users.name, users.theme]);
  }

  update(users) {
    return this.database.query(
      `UPDATE ${this.table} SET email = ?, birth_date = ?, password = ?, address = ?, city = ?, name = ?, theme = ?  WHERE id = ?`,
      [users.email, users.birth_date, users.password, users.address, users.city, users.name, users.theme, users.id]
    );
  }
}

module.exports = UsersManager;
