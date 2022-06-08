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
    migrations: ['./dist/database/migrations/*.js'],
    entities: ['./dist/entities/*.js'],
    cli: {
      migrationsDir: './dist/database/migrations',
      entitiesDir: './dist/entities',
    },
    sll: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
];
