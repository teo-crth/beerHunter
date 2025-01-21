const AbstractManager = require("./AbstractManager");

class BarManager extends AbstractManager {
    constructor() {
        super({ table: "bar" });
    }

    insert(bar) {
        return this.database.query(`INSERT INTO ${this.table} (name, address, latitude, longitude, rate, opening_hours) VALUES (?, ?, ?, ?, ?, ?)`, [
            bar.name,
            bar.address,
            bar.latitude,
            bar.longitude,
            bar.rate,
            bar.opening_hours
        ]);
    }

    update(bar) {
        return this.database.query(`UPDATE ${this.table} SET name = ?, address = ?, latitude = ?, longitude = ?, rate = ?, opening_hours = ? WHERE id = ?`, [
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
