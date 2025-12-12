// src/database/sequelize.config.ts (example)
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

export const SequelizeRoot = SequelizeModule.forRootAsync({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  inject: [ConfigService],
  useFactory: (cfg: ConfigService) => ({
    dialect: "postgres",
    host: cfg.get<string>("DB_HOST"),
    port: cfg.get<number>("DB_PORT"),
    username: cfg.get<string>("DB_USER"),
    password: cfg.get<string>("DB_PASS"),
    database: cfg.get<string>("DB_NAME"),
    autoLoadModels: true,
    synchronize: true, // DEV only
    dialectOptions:
      cfg.get("DB_SSL") === "true"
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
  }),
});
