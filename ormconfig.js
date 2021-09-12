module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    migrations: ['./src/database/migrations/*.ts'],
    entities: ['./src/entities/*.ts'],
    cli: {
      migrationsDir: './src/database/migrations',
      entitiesDir: './src/entities',
    },
  },
];