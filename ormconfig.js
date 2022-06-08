module.exports = [
  {
    name: 'default',
    type: 'postgres',
    // host: process.env.DATABASE_HOST,
    // port: process.env.DATABASE_PORT,
    // username: process.env.DATABASE_USERNAME,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_NAME,
    url: process.env.DATABASE_URL,
    synchronize: true,
    migrations: ['./src/database/migrations/*.{js,ts}'],
    entities: ['./src/entities/*.{js,ts}'],
    cli: {
      migrationsDir: './src/database/migrations',
      entitiesDir: './src/entities',
    },
  },
];
