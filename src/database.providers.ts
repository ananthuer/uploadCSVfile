import { Sequelize } from 'sequelize-typescript';


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: "1316",
        database: "sales-panel",
        pool:{
           max: 5,
           min: 0,
           acquire: 30000,
         idle: 10000
        },
        
        
      });
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
  },
]; 