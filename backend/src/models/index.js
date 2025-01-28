require("dotenv").config();

// const mysql = require("mysql2/promise");
const pg = require("pg");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// const pool = mysql.createPool({
//   host: DB_HOST,
//   port: DB_PORT,
//   user: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_NAME,
// });

const pool = new pg.Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Important si tu utilises SSL
  },
});

// try a connection

// pool.getConnection().catch(() => {
//   console.warn(
//     "Warning:",
//     "Failed to get a DB connection.",
//     "Did you create a .env file with valid credentials?",
//     "Routes using models won't work as intended"
//   );
// });

pool.connect().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});
// declare and fill models: that's where you should register your own managers

const models = {};

// const ItemManager = require("./ItemManager");
// models.item = new ItemManager();
// models.item.setDatabase(pool);

const BarManager = require("./barManager");
models.bar = new BarManager();
models.bar.setDatabase(pool);

const BeerManager = require("./beerManager");
models.beer = new BeerManager();
models.beer.setDatabase(pool);

const UserCommentManager = require("./userCommentManager");
models.user_comment = new UserCommentManager();
models.user_comment.setDatabase(pool);

const UsersManager = require("./usersManager");
models.users = new UsersManager();
models.users.setDatabase(pool);

const BeerAvailableManager = require("./beerAvailableManager");
models.beerAvailable = new BeerAvailableManager();
models.beerAvailable.setDatabase(pool);

const CommentImageManager = require("./commentImageManager");
models.comment_image = new CommentImageManager();
models.comment_image.setDatabase(pool);

const FavoriteBarManager = require("./favoriteBarManager");
models.favorite_bar = new FavoriteBarManager();
models.favorite_bar.setDatabase(pool);

const BeerTypeManager = require("./beerTypeManager");
models.beer_type = new BeerTypeManager();
models.beer_type.setDatabase(pool);

const CityManager = require("./cityManager");
models.city = new CityManager();
models.city.setDatabase(pool);

const BarCityManager = require("./barCityManager");
models.bar_city = new BarCityManager();
models.bar_city.setDatabase(pool);


// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
