import { Usuarios } from '../../../models';



class UsuariosController {
    constructor() {}


    async criarUsuario(req, res) {

        try {
            const usuarioCriado = await Usuarios.create(req.body);
            //console.log("usuarioCriado: ", usuarioCriado);

            if(usuarioCriado.id){
                return res.status(201).json({ msg: 'Usuário criado com sucesso.' });
            }else{
                throw new Error("Erro!!");
            }
        } catch (error) {
            const erroMsg = error.parent.detail ?? 'usuário não foi criado.';
            return res.status(500).json({mensagem: 'ERRO: ' +  erroMsg});
        }

    }

    async criarUsuarioTeste(req, res){

        try {
            const usuarioTeste = await  Usuarios.create({
                nome: 'teste usuario',
                email:'usuario@teste.com',
                password_hash:'123456'
            });

            return res.json(usuarioTeste);

        } catch (error) {
            const erroMsg = error.parent.detail ?? 'ERRO desconhecido.';
            return res.status(500).json({mensagem: erroMsg});
        }
    }
}

export default new UsuariosController();
