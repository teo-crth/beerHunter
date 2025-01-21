const AbstractManager = require("./AbstractManager");

class BeerAvailableManager extends AbstractManager {
    constructor() {
        super({ table: "beer_available" });
    }

    insert(beerAvailable) {
        return this.database.query(`INSERT INTO ${this.table} (bar_id, beer_id) VALUES (?, ?)`, [
            beerAvailable.bar_id,
            beerAvailable.beer_id
        ]);
    }

    update(beerAvailable) {
        return this.database.query(`UPDATE ${this.table} SET bar_id = ?, beer_id = ? WHERE id = ?`, [
            beerAvailable.bar_id,
            beerAvailable.beer_id,
            beerAvailable.id
        ]);
    }
}

module.exports = BeerAvailableManager;
