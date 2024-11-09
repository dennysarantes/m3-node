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

    Usuarios.beforeBulkUpdate((usuario) => {
        atualizarPasswordHash(usuario, "update");
    });

    Usuarios.beforeSave((usuario) => {
        atualizarPasswordHash(usuario);
    });

    function atualizarPasswordHash(usuario, tipo) {
        const { CriptografiaUtils } = require("../src/app/util/criptografia");

        const ehUpdate = tipo === "update";
        if (usuario.password ?? usuario.attributes.password) {
            const senhaCrypted = (usuario.password_hash =
                CriptografiaUtils.criptografar(
                    usuario.password ?? usuario.attributes.password,
                ));
            if (ehUpdate) {
                usuario.attributes.password_hash = senhaCrypted;
            } else {
                usuario.password_hash = senhaCrypted;
            }
        }
    }

    return Usuarios;
};
