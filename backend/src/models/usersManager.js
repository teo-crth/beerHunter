const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  checkLogin(email, password) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ? AND password = ?`, [email, password]);
  }

  findCommentsOfOneUser(id) {
    return this.database.query(`SELECT * FROM  user_comment WHERE user_id = ?`, 
      [id]);
  }

  findFavoriteBarsOfOneUser(id) {
    return this.database.query(`
        SELECT bar.* 
        FROM favorite_bar
        JOIN bar ON favorite_bar.bar_id = bar.id
        WHERE favorite_bar.user_id = ?`, 
        [id]
    );
}

  insert(users) {
    return this.database.query(
        `INSERT INTO ${this.table} (email, birth_date, password, city, name, theme) values (?, ?, ?, ?, ?, ?)`,
        [users.email, users.birth_date, users.password, users.city, users.name, users.theme]);
  }

  update(users) {
    return this.database.query(
      `UPDATE ${this.table} SET email = ?, birth_date = ?, password = ?, address = ?, city = ?, name = ?, theme = ?, profil_picture = ? WHERE id = ?`,
      [users.email, users.birth_date, users.password, users.address, users.city, users.name, users.theme, users.profil_picture, users.id]
    );
  }
}

module.exports = UsersManager;
