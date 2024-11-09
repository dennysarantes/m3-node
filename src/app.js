import express from 'express';
import routes from './routes';
import cors from 'cors';
//import { variaveis } from '../enviroments/env';

// Configurações do database
import '../models/index.js';

// Configurações de CORS
import { CorsConfig } from './app/util/cors.config.js';

class App {

    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();


    }
    middlewares(){
        this.server.use(
            express.json(),
            cors(CorsConfig.options())
        );
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
