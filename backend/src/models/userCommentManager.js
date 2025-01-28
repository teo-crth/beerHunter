const AbstractManager = require("./AbstractManager");

class UserCommentManager extends AbstractManager {
    constructor(){
        super({table: "user_comment"});
    }

    findCommentImages(id) {
        return this.database.query(`
          SELECT * FROM comment_image WHERE user_comment_id = $1`,
          [id]
        );
    }

    insert(user_comment){
        return this.database.query(
            `INSERT INTO ${this.table} (text, rate, comment_image_id, user_id, bar_id) VALUES ($1, $2, $3, $4, $5)`,
            [user_comment.text, user_comment.rate, user_comment.comment_image_id, user_comment.user_id, user_comment.bar_id]
        )
    }

    update(user_comment) {
        return this.database.query(
          `UPDATE ${this.table} SET text= $1, rate= $2, comment_image_id= $3, user_id= $4, bar_id= $5 WHERE id = $6`,
          [user_comment.text, user_comment.rate, user_comment.comment_image_id, user_comment.user_id, user_comment.bar_id, user_comment.id]
        );
      }
}

module.exports = UserCommentManager;
