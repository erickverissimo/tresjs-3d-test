import 'dotenv/config';
import path from 'path';
import { readdir, writeFile } from 'fs/promises';
import { connectDatabase, closeConnection } from './database';
import {
  IMigration,
  Migration,
} from './externals/db/mongoose/models/MigrationsMongoose';
import logger from './logger';

type MigrationFile = {
  fileName: string;
  up: () => Promise<void>;
  down: () => Promise<void>;
};

async function loadMigrations(): Promise<MigrationFile[]> {
  const migrationsPath = path.join(__dirname, '/migrations');
  const migrationsPaths = await readdir(migrationsPath);

  const migrations = await Promise.all(
    migrationsPaths.map(async (migrationPath) => {
      const fullPath = path.join(migrationsPath, migrationPath);
      const migrationFile: MigrationFile = (await import(fullPath)) as any;
      return {
        ...migrationFile,
        fileName: migrationPath,
      };
    })
  );
  return migrations.sort((a, b) => a.fileName.localeCompare(b.fileName));
}

const commands = {
  async up() {
    await connectDatabase();
    const migrations = await loadMigrations();
    for (const migrationProps of migrations) {
      let migration: IMigration | null = null;
      try {
        const exists = await Migration.exists({
          file: migrationProps.fileName,
        });
        if (exists === null) {
          logger.info(`Executando migration up: ${migrationProps.fileName}`);
          await migrationProps.up();
          migration = new Migration({
            file: migrationProps.fileName,
          });
        }
      } catch (e) {
        logger.error(e);
        logger.info(
          `Falha ao executar migration up: ${migrationProps.fileName}`
        );
      } finally {
        if (migration) {
          await migration?.save();
        }
      }
    }
    await closeConnection();
  },
  async down() {
    await connectDatabase();
    const migrations = await loadMigrations();
    for (let i = migrations.length - 1; i >= 0; i--) {
      const migrationProps = migrations[i];
      const migration = await Migration.findOne({
        file: migrationProps.fileName,
      });

      if (migration) {
        logger.info(`Executando migration down: ${migrationProps.fileName}`);
        await migrationProps.down();
        await Migration.deleteOne({ file: migrationProps.fileName });
        break;
      }
    }
    await closeConnection();
  },
  async create(filename: string) {
    const migrationsPath = path.join(
      __dirname,
      '/migrations',
      `migration-${new Date().getTime()}-${filename}.ts`
    );
    let data = 'export async function up (): Promise<void> { }';
    data += '\nexport async function down(): Promise<void> { }';
    await writeFile(migrationsPath, data);
  },
};

async function execute() {
  const [_, __, command, ...args] = process.argv;
  if (!['up', 'down', 'create'].includes(command)) {
    throw new Error('Migration error, required one of [up, down]');
  }

  await commands[command](...args);
}

execute()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
