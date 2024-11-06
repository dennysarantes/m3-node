import express from 'express';
import routes from './routes';
//import { variaveis } from '../enviroments/env';

// Importando o database
import '../models/index.js';

class App {

    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();


    }

    middlewares(){
        this.server.use(express.json());
    }

    routes(){
        try {
            this.server.use(routes);
        } catch (error) {
            console.error('erro no carregamento de rotas...', error);
        }
    }

    // sincronizarModelosSequelize(){
    //     try {
    //         db.sequelize.sync().then(() => {
    //             console.log("Banco de dados synchronized");
    //         });
    //     } catch (_) {
    //         console.error('ERRO ao tentar sincronizar modelos de dados.', _);
    //     }
    // }

}

export default new App().server;
