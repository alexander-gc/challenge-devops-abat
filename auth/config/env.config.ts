export const EnvConfiguration = () => ({
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  token: process.env.TOKEN,
});
