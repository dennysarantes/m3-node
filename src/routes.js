import { Router } from "express";
import UsuarioController from './app/controllers/UsuarioController';
import CriptografiaController from './app/controllers/CriptografiaController';
import SessionController from "./app/controllers/SessionController";
import TarefasController from "./app/controllers/TarefasController";

const routes = new Router();
// Este método garante que apenas requisições com token válido irão acessar a rota
// O token deve ser enviado no header authorization como bearer
const validaToken = SessionController.validarTokenJWT;


///////////// Rotas Públicas ///////////////////////////////////////
/*
*  Estas rotas não possuem a implementação de validação token
*  Data: 06/11/2024
*  Autor: Dennys Arantes
*/
// Rota de teste (públicas)
routes.get('/teste/adicionarUsuarioTeste', UsuarioController.criarUsuarioTeste);

// Rotas de criptografia (públicas)
routes.post('/criptografarVariavel', CriptografiaController.criptografarVariavel);
routes.post('/descriptografarVariavel', CriptografiaController.descriptografar);

// Rotas de sessão (públicas)
routes.post('/autenticar', SessionController.autenticar);

///////////// Rotas Protegidas com JWT ///////////////////////////
/*
*  As rotas abaixo passam necessariamente pela validação de token JWT
*  Data: 06/11/2024
*  Autor: Dennys Arantes
*/
routes.use(validaToken);

//Rotas de usuarios
routes.post('/usuarios/adicionar', UsuarioController.criarUsuario);
routes.put('/usuarios/atualizar', UsuarioController.atualizarUsuario);

//Rotas de tarefas
routes.post('/tarefas/adicionar', TarefasController.criarTarefa);
routes.post('/tarefas/listar', TarefasController.listarTarefas);
routes.delete('/tarefas/deletar/:tarefa_id', TarefasController.deleteTarefa);


export default routes;
