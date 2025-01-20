const AbstractManager = require("./AbstractManager");

class usersManager extends AbstractManager {
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
      `UPDATE ${this.table} SET name = $1, subtitle = $2, alcool_degree = $3, description = $4, image_link = $5 WHERE id = $6`,
      [users.name, users.subtitle, users.alcool_degree, users.description, users.image_link, users.id]
    );
  }
}

module.exports = usersManager;
