class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  find(id) {
    return this.database.query(`SELECT * FROM  ${this.table} WHERE id = $1`, 
      [id]);
  }

  findAll() {
    return this.database.query(`SELECT * FROM  ${this.table}`);
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
  }

  setDatabase(database) {
    this.database = database;
  }
}

module.exports = AbstractManager;
