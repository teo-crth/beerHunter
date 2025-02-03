const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "item" });
  }

  insert(item) {
    return this.database.query(`insert into ${this.table} (title) values ($1)`, [
      item.title,
    ]);
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set title = $1 where id = $2`,
      [item.title, item.id]
    );
  }
}

module.exports = ItemManager;
