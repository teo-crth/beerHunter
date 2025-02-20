const AbstractManager = require("./AbstractManager");

class FavoriteBarManager extends AbstractManager {
    constructor(){
        super({table: "favorite_bar"});
    }

    insert(favorite_bar){
        return this.database.query(
            `INSERT INTO ${this.table} (user_id, bar_id) VALUES ($1, $2)`,
            [favorite_bar.user_id, favorite_bar.bar_id]
        )
    }

    deleteFavoriteBar(userId, barId){
        return this.database.query(
            `DELETE FROM ${this.table} WHERE user_id = $1 AND bar_id = $2`,
            [userId, barId]
        )
    }

    update(favorite_bar) {
        return this.database.query(
          `UPDATE ${this.table} SET user_id= $1, bar_id= $2 WHERE id = $3`,
          [favorite_bar.user_id, favorite_bar.bar_id, favorite_bar.id]
        );
      }
}

module.exports = FavoriteBarManager;
