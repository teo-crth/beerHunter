require("dotenv").config();
const pg = require("pg");

// Récupération des variables d'environnement pour la connexion à la base de données
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Création du pool de connexions PostgreSQL
const pool = new pg.Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  client_encoding: "UTF8", // 🔥 Force l'encodage en UTF-8
  ssl: {
    rejectUnauthorized: false, // Important pour les connexions SSL
  },
});

// Vérification de la connexion et de l'encodage
pool.connect()
  .then(client => {
    console.info(`✅ Connecté à la base de données : ${DB_NAME}`);

    // Vérifier si PostgreSQL envoie bien des données en UTF-8
    return client.query("SHOW client_encoding;")
      .then(res => {
        console.log(`🔍 Encodage client PostgreSQL : ${res.rows[0].client_encoding}`);
        if (res.rows[0].client_encoding !== "UTF8") {
          console.warn("⚠️ Attention : l'encodage client n'est pas UTF-8 !");
        }
        client.release();
      })
      .catch(err => {
        console.error("❌ Erreur lors de la vérification de l'encodage :", err);
        client.release();
      });
  })
  .catch(() => {
    console.warn(
      "⚠️ Warning: Impossible de se connecter à la base de données.",
      "Vérifiez votre fichier .env et assurez-vous que la base est accessible."
    );
  });

// Initialisation des modèles
const models = {};

// Ajout de chaque manager (gestionnaire de modèles)
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

// Proxy pour capturer les erreurs de modèle manquant
const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not défini. Avez-vous créé ${pascalize(
        prop
      )}Manager.js et l'avez-vous enregistré dans backend/src/models/index.js ?`
    );
  },
};

// Exporter les modèles avec un proxy pour gérer les erreurs
module.exports = new Proxy(models, handler);