export interface DatabaseConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
}

export type ENVS = 'DEV' | 'PROD' | 'TEST';

export interface AppConfig {
  port: number;
  env: ENVS;
}
