const AbstractManager = require("./AbstractManager");

class CommentImageManager extends AbstractManager {
    constructor() {
        super({ table: "comment_image" });
    }

    insert(comment_image) {
        return this.database.query(`INSERT INTO ${this.table} (image_link, image_alt, user_comment_id) VALUES (?, ?, ?)`, [
            comment_image.image_link,
            comment_image.image_alt,
            comment_image.user_comment_id
        ]);
    }

    update(comment_image) {
        return this.database.query(`UPDATE ${this.table} SET image_link = ?, image_alt = ?, user_comment_id = ? WHERE id = ?`, [
            comment_image.image_link,
            comment_image.image_alt,
            comment_image.user_comment_id,
            comment_image.id                  
        ]);
    }

}
module.exports = CommentImageManager;