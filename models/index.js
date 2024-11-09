'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../src/config/database.js')[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
    // Setar configurações padrões => TODO: deve ser configurado o ambiente de acordo com o enviroment
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    // Por default será utilizado o env development
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

try {
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

} catch (error) {
    console.error("error: ", error);

}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
