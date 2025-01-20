const AbstractManager = require("./AbstractManager");

class BarManager extends AbstractManager {
    constructor() {
        super({ table: "bar" });
    }

    insert(bar) {
        return this.database.query(`INSERT INTO ${this.table} (name, address, latitude, longitude, rate, opening_hours) VALUES ($1, $2, $3, $4, $5, $6)`, [
            bar.name,
            bar.address,
            bar.latitude,
            bar.longitude,
            bar.rate,
            bar.opening_hours
        ]);
    }

    update(bar) {
        return this.database.query(`UPDATE ${this.table} SET name = $1, address = $2, latitude = $3, longitude = $4, rate = $5, opening_hours = $6 WHERE id = $7`, [
            bar.name,
            bar.address,
            bar.latitude,
            bar.longitude,
            bar.rate,
            bar.opening_hours,
            bar.id
        ]);
    }

}

module.exports = BarManager;
