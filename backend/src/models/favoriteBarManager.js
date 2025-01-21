const AbstractManager = require("./AbstractManager");

class FavoriteBarManager extends AbstractManager {
    constructor(){
        super({table: "favorite_bar"});
    }

    insert(favorite_bar){
        return this.database.query(
            `INSERT INTO ${this.table} (user_id, bar_id) VALUES (?, ?)`,
            [favorite_bar.user_id, favorite_bar.bar_id]
        )
    }

    update(favorite_bar) {
        return this.database.query(
          `UPDATE ${this.table} SET user_id= ?, bar_id= ? WHERE id = ?`,
          [favorite_bar.user_id, favorite_bar.bar_id, favorite_bar.id]
        );
      }
}

module.exports = FavoriteBarManager;
