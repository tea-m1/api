import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

class ConfigCore {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value!;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getJWTSecret() {
    return this.getValue('JWT_SECRET', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode === 'PROD'; // Changer 'DEV' par 'PROD'
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [__dirname + '/../**/*.entity.{ts,js}'],
      synchronize: !this.isProduction(),
      migrationsTableName: 'migration',
      autoLoadEntities: true,
      migrations: [__dirname + '/../migration/*.ts'],
      ssl: this.isProduction() ? false : { rejectUnauthorized: false },
      logging: true,
    };
  }
}

const configService = new ConfigCore(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'JWT_SECRET',
  'RUN_MIGRATIONS',
]);

export { configService };
