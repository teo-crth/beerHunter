const AbstractManager = require("./AbstractManager");

class BarCityManager extends AbstractManager {
    constructor() {
        super({ table: "bar_city" });
    }

    insert(barCity) {
        return this.database.query(`INSERT INTO ${this.table} (bar_id, city_id) VALUES ($1, $2)`, [
            barCity.bar_id,
            barCity.city_id
        ]);
    }

    update(barCity) {
        return this.database.query(`UPDATE ${this.table} SET bar_id = $1, city_id = $2 WHERE id = $3`, [
            barCity.bar_id,
            barCity.city_id,
            barCity.id
        ]);
    }
}

module.exports = BarCityManager;
