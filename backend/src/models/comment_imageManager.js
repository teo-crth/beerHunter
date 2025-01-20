const AbstractManager = require("./AbstractManager");

class CommentImageManager extends AbstractManager {
    constructor() {
        super({ table: "user_comment" });
    }

    insert(comment_image) {
        return this.database.query(`INSERT INTO ${this.table} (text, date, rate, comment_image_id, user_id, bar_id) VALUES ($1, $2, $3, $4, $5, $6)`, [
            comment_image.text,
            comment_image.date,
            comment_image.rate,
            comment_image.comment_image_id,
            comment_image.user_id,
            comment_image.bar_id
        ]);
    }

    update(bar) {
        return this.database.query(`UPDATE ${this.table} SET text = $1, date = $2, rate = $3, comment_image_id = $4, user_id = $5, bar_id = $6`, [
            comment_image.text,
            comment_image.date,
            comment_image.rate,
            comment_image.comment_image_id,
            comment_image.user_id,
            comment_image.bar_id                   
        ]);
    }

}
module.exports = commentManager;