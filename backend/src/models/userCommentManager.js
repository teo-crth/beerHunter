const AbstractManager = require("./AbstractManager");

class UserCommentManager extends AbstractManager {
    constructor(){
        super({table: "user_comment"});
    }

    insert(user_comment){
        return this.database.query(
            `INSERT INTO ${this.table} (text , date, rate, comment_image_id, user_id, bar_id) VALUES ($1, $2, $3, $4, $5, $6)`,
            [user_comment.text, user_comment.date, user_comment.rate, user_comment.comment_image_id, user_comment.user_id, user_comment.bar_id]
        )
    }

    update(user_comment) {
        return this.database.query(
          `UPDATE ${this.table} SET text= $1, date= $2, rate= $3, comment_image_id= $4, user_id= $5, bar_id= $6 WHERE id = $7`,
          [user_comment.text, user_comment.date, user_comment.rate, user_comment.comment_image_id, user_comment.user_id, user_comment.bar_id, user_comment.id]
        );
      }
}

module.exports = UserCommentManager;
