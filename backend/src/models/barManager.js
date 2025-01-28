const AbstractManager = require("./AbstractManager");

class BarManager extends AbstractManager {
    constructor() {
        super({ table: "bar" });
    }

    findCommentsOfOneBar(id) {
        return this.database.query(`SELECT * FROM  user_comment WHERE bar_id = $1`,
            [id]);
    }

    findBeersOfOneBar(id) {
        return this.database.query(`SELECT bar.*, beer.*
            FROM bar
            JOIN beer_available ON bar.id = beer_available.bar_id
            JOIN beer ON beer_available.beer_id = beer.id
            WHERE bar.id = $1`, [id]);
    }




    insert(bar) {
        return this.database.query(`INSERT INTO ${this.table} (name, address, latitude, longitude, rate, opening_hours, city_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
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
        return this.database.query(`UPDATE ${this.table} SET name = $1, address = $2, latitude = $3, longitude = $4, rate = $5, opening_hours = $6, city_id = $7 WHERE id = $8`, [
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
