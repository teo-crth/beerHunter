// Charger les variables d'environnement
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Importer pg pour PostgreSQL
const pg = require("pg");

// Création d'un pool de connexions
const client = new pg.Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  client_encoding: "UTF8", // 🔥 Force UTF-8
  ssl: {
    rejectUnauthorized: false, // Important pour certaines connexions SSL
  },
});

// Connexion à la base de données
client
  .connect()
  .then(() => {
    console.info('✅ Connecté à la base de données', DB_NAME);

    // Vérifier si l'encodage de la connexion est bien UTF-8
    return client.query("SHOW client_encoding;");
  })
  .then((res) => {
    console.log('🛠️ Encodage client PostgreSQL :', res.rows[0].client_encoding);
    if (res.rows[0].client_encoding !== "UTF8") {
      console.warn("⚠️ Attention : l'encodage client n'est pas en UTF-8 !");
    }
  })
  .catch((error) => {
    console.error("❌ Erreur de connexion à la base de données :", error.message);
    console.warn("⚠️ Vérifiez les informations de connexion dans le fichier .env.");
  });

// Stocker le nom de la base de données dans le client
client.databaseName = DB_NAME;

// Exporter le client pour l'utiliser ailleurs
module.exports = client;