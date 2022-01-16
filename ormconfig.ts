import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config: SqliteConnectionOptions = {
   type: 'sqlite',
   database: './data/db.sqlite',
   synchronize: false,
   migrations: [
      'src/databases/migrations/*.ts'
   ],
   cli: {
      migrationsDir: 'src/databases/migrations'
   }
}

export default config;