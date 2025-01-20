const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
    constructor() {
        super({ table: "user_comment" });
    }

    insert(comment) {
        return this.database.query(`INSERT INTO ${this.table} (text, date, rate, comment_image_id, user_id, bar_id) VALUES ($1, $2, $3, $4, $5, $6)`, [
            comment.text,
            comment.date,
            comment.rate,
            comment.comment_image_id,
            comment.user_id,
            comment.bar_id
        ]);
    }

    update(bar) {
        return this.database.query(`UPDATE ${this.table} SET text = $1, date = $2, rate = $3, comment_image_id = $4, user_id = $5, bar_id = $6`, [
            comment.text,
            comment.date,
            comment.rate,
            comment.comment_image_id,
            comment.user_id,
            comment.bar_id                    
        ]);
    }

}
module.exports = commentManager;