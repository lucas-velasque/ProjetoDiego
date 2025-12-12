import { SequelizeModuleOptions } from "@nestjs/sequelize";
import * as dotenv from "dotenv";

dotenv.config();

export const databaseConfig: SequelizeModuleOptions = {
  dialect: "postgres",

  // Docker (host) default: localhost; you can override via DB_HOST in .env
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),

  username: process.env.DB_USER || "postgres",

  // IMPORTANT: .env uses DB_PASS (not DB_PASSWORD)
  // Keep compatibility with either name:
  password: process.env.DB_PASS || process.env.DB_PASSWORD || "postgres",

  database: process.env.DB_NAME || "leiloes",

  autoLoadModels: true,
  synchronize: true,

  // Mostra SQL no console
  logging: console.log,
};
