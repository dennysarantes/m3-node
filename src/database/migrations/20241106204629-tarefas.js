'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Tarefas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            concluida: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            usuario_id:{
                type: Sequelize.INTEGER,
                references: {model: 'Usuarios', key: 'id'},
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface /*Sequelize*/) {
        await queryInterface.dropTable('Tarefas');
    },
};
