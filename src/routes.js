import { Router } from "express";
import UsuarioController from './app/controllers/UsuarioController';
import CriptografiaController from './app/controllers/CriptografiaController';
import SessionController from "./app/controllers/SessionController";

const routes = new Router();
// Este método garante que apenas requisições com token válido irão acessar a rota
// O token deve ser enviado no header authorization como bearer
const validaToken = SessionController.validarTokenJWT;


// Rota de teste
routes.get('/teste/adicionarUsuarioTeste', UsuarioController.criarUsuarioTeste);

//Rotas de usuarios
routes.post('/usuarios/adicionar', validaToken, UsuarioController.criarUsuario);

// Rotas de criptografia
routes.post('/criptografarVariavel', CriptografiaController.criptografarVariavel);
routes.post('/descriptografarVariavel', CriptografiaController.descriptografar);

// Rotas de sessão
routes.post('/autenticar', SessionController.gerarJWT);

export default routes;
