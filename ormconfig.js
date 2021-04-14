const env = require('./env.json');

const environment = String(process.env.NODE_ENV).trim()
console.log(`🍃 Using environment: '${environment}'`);

const devConfig = {
  type: env.database.type,
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.database,
  entities: [
    "src/models/*.ts"
  ],
  migrations: [
    "src/database/migrations/*.ts"
  ],
  cli: {
    migrationsDir: "src/database/migrations",
    entitiesDir: "src/models",
  }
}

const prodConfig = {
  type: env.database.type,
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.database,
  entities: [
    "dist/models/*.js"
  ],
  migrations: [
    "dist/database/migrations/*.js"
  ],
  cli: {
    migrationsDir: "dist/database/migrations",
    entitiesDir: "dist/models",
  }
}

module.exports = environment == 'dev' ? devConfig : prodConfig;
