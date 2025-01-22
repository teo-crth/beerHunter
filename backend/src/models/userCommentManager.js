const AbstractManager = require("./AbstractManager");

class UserCommentManager extends AbstractManager {
    constructor(){
        super({table: "user_comment"});
    }

    findCommentImages(id) {
        return this.database.query(`
          SELECT * FROM comment_image WHERE user_comment_id = ?`,
          [id]
        );
    }

    insert(user_comment){
        return this.database.query(
            `INSERT INTO ${this.table} (text, rate, comment_image_id, user_id, bar_id) VALUES (?, ?, ?, ?, ?)`,
            [user_comment.text, user_comment.rate, user_comment.comment_image_id, user_comment.user_id, user_comment.bar_id]
        )
    }

    update(user_comment) {
        return this.database.query(
          `UPDATE ${this.table} SET text= ?, rate= ?, comment_image_id= ?, user_id= ?, bar_id= ? WHERE id = ?`,
          [user_comment.text, user_comment.rate, user_comment.comment_image_id, user_comment.user_id, user_comment.bar_id, user_comment.id]
        );
      }
}

module.exports = UserCommentManager;
