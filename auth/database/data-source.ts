import { DataSource, DataSourceOptions } from 'typeorm';

import { EnvConfiguration } from 'config/env.config';

const { dbHost, dbName, dbPassword, dbUser, dbPort } = EnvConfiguration();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: dbHost,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  port: parseInt(dbPort),
  logging: true,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions); // DESIGN PATTERN: SINGLETON

export { dataSourceOptions, dataSource };
