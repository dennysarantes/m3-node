
module.exports = {
    "development": {
        "username": "postgres",
        "password": process.env.BANCO_LOCALHOST,
        "database": "bancoM3",
        "host": "localhost",
        "dialect": "postgres"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};
