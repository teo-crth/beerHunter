const AbstractManager = require("./AbstractManager");

class CommentImageManager extends AbstractManager {
    constructor() {
        super({ table: "comment_image" });
    }

    insert(comment_image) {
        return this.database.query(`INSERT INTO ${this.table} (image_link, image_alt, user_comment_id) VALUES ($1, $2, $3)`, [
            comment_image.image_link,
            comment_image.image_alt,
            comment_image.user_comment_id,
            comment_image.id
        ]);
    }

    update(bar) {
        return this.database.query(`UPDATE ${this.table} SET image_link = $1, image_alt = $2, user_comment_id = $3 WHERE id = $4`, [
            comment_image.image_link,
            comment_image.image_alt,
            comment_image.user_comment_id,
            comment_image.id                  
        ]);
    }

}
module.exports = CommentImageManager;