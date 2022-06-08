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
    migrations: ['./{src, dist}/database/migrations/*.{js,ts}'],
    entities: ['./{src, dist}/entities/*.{js,ts}'],
    cli: {
      migrationsDir: './{src, dist}/database/migrations',
      entitiesDir: './{src, dist}/entities',
    },
    sll: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
];
