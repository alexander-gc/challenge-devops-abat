import { DataSource, DataSourceOptions } from 'typeorm';

import { EnvConfiguration } from 'config/env.config';

const { dbHost, dbName, dbPassword, dbUser, dbPort } = EnvConfiguration();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  logging: true,
  entities: ['dist/**/*.entity.js'],
  //synchronize: false,
  //migrations: ['dist/database/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export { dataSourceOptions, dataSource };
