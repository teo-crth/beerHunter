const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  findUserByEmail(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = $1`, [email]);
  }

  findCommentsOfOneUser(id) {
    return this.database.query(`SELECT * FROM  user_comment WHERE user_id = $1`, 
      [id]);
  }

  findFavoriteBarsOfOneUser(id) {
    return this.database.query(`
        SELECT bar.* 
        FROM favorite_bar
        JOIN bar ON favorite_bar.bar_id = bar.id
        WHERE favorite_bar.user_id = $1`, 
        [id]
    );
}

  insert(name, birth_date, email, city, hashPassword, theme) {
    return this.database.query(
        `INSERT INTO ${this.table} (email, birth_date, password, city, name, theme) values ($1, $2, $3, $4, $5, $6)`,
        [email, birth_date, hashPassword, city, name, theme]);
  }

  // update(users) {
  //   return this.database.query(
  //     `UPDATE ${this.table} SET email = ?, birth_date = ?, password = ?, address = ?, city = ?, name = ?, theme = ?, profil_picture = ? WHERE id = ?`,
  //     [users.email, users.birth_date, users.password, users.address, users.city, users.name, users.theme, users.profil_picture, users.id]
  //   );
  // }

  update(users) {
    const fieldsToUpdate = [];
    const values = [];

    Object.keys(users).forEach(key => {
      if (users[key] && key !== 'id') {
        fieldsToUpdate.push(`${key} = $1`);
        values.push(users[key]);
      }
    });

    values.push(users.id);

    const sqlQuery = `
      UPDATE ${this.table} 
      SET ${fieldsToUpdate.join(', ')} 
      WHERE id = $1
    `;

    return this.database.query(sqlQuery, values);
  }

  updatePassword(id, hashPassword) {
    return this.database.query(
      `UPDATE ${this.table} SET password = $1 WHERE id = $2`,
      [hashPassword, id]
    );
  }

}

module.exports = UsersManager;
