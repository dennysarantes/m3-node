

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {


    class Usuarios extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        //static associate(models) {
        // define association here
        //}
    }
    Usuarios.init(
        {
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.VIRTUAL,
            password_hash: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Usuarios",
        },
    );

    Usuarios.beforeSave((usuario) => {
        // Carregamento de arqs e libs externas exclusivas
        const { CriptografiaUtils } = require('../src/app/util/criptografia');

        usuario.password && (usuario.password_hash = CriptografiaUtils.criptografar(usuario.password));
    });

    return Usuarios;
};


