"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class Tarefas extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        //static associate(models) {
        // define association here
        //}

         static associate(models){
             this.belongsTo(models.Usuarios, { foreignKey: 'usuario_id', as: 'usuarioId'});
        }
    }
    Tarefas.init(
        {
            nome: DataTypes.STRING,
            concluida: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Tarefas",
        },
    );



    return Tarefas;
};
