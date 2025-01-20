const AbstractManager = require("./AbstractManager");

class favoriteBarManager extends AbstractManager {
    constructor(){
        super({table: "favorite_bar"});
    }

    insert(favorite_bar){
        return this.database.query(
            `INSERT INTO ${this.table} (user_id, bar_id) VALUES ($1, $2)`,
            [favorite_bar.user_id, favorite_bar.bar_id]
        )
    }

    update(favorite_bar) {
        return this.database.query(
          `UPDATE ${this.table} SET user_id= $1, bar_id= $2 WHERE id = $3`,
          [favorite_bar.user_id, favorite_bar.bar_id, favorite_bar.id]
        );
      }
}

module.exports = favoriteBarManager;
