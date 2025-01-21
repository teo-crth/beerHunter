const AbstractManager = require("./AbstractManager");

class BarManager extends AbstractManager {
    constructor() {
        super({ table: "bar" });
    }

    findCommentsOfOneBar(id) {
        return this.database.query(`SELECT * FROM  user_comment WHERE bar_id = ?`, 
          [id]);
      }



    insert(bar) {
        return this.database.query(`INSERT INTO ${this.table} (name, address, latitude, longitude, rate, opening_hours, city_id) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
            bar.name,
            bar.address,
            bar.latitude,
            bar.longitude,
            bar.rate,
            bar.opening_hours,
            bar.city_id
        ]);
    }

    update(bar) {
        return this.database.query(`UPDATE ${this.table} SET name = ?, address = ?, latitude = ?, longitude = ?, rate = ?, opening_hours = ?, city_id = ? WHERE id = ?`, [
            bar.name,
            bar.address,
            bar.latitude,
            bar.longitude,
            bar.rate,
            bar.opening_hours,
            bar.city_id,
            bar.id
        ]);
    }

}

module.exports = BarManager;
