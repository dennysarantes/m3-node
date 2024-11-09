import { Usuarios } from '../../../models';
import { SharedUtils } from '../util/sharedUtil';
import { UsuariosUtils } from '../util/usuariosUtil';

class UsuariosController {
    constructor() {}

    async criarUsuario(req, res) {

        // Valida os parâmetros de entrada


        // O ID do usuário é disponibilizado automaticamente pelo middleware de validação JWT
        // eslint-disable-next-line no-unused-vars
        const idUsuario = req.idUsuario;
        try {
            if(!await UsuariosUtils.schemaValidatorCriarUsuario().isValid(req.body)){
                return res.status(400).json({mensagem: 'Falha na validação'});
            }
            const usuarioCriado = await Usuarios.create(req.body);
            //console.log("usuarioCriado: ", usuarioCriado);

            if (usuarioCriado.id) {
                return res
                    .status(201)
                    .json({ msg: 'Usuário criado com sucesso.' });
            } else {
                throw new Error('Erro!!');
            }
        } catch (error) {
            const erroMsg = error.parent.detail ?? 'usuário não foi criado.';
            return res.status(500).json({ mensagem: 'ERRO: ' + erroMsg });
        }
    }

    async atualizarUsuario(req, res) {
        try {
            if(!await UsuariosUtils.schemaValidatorAtualizarUsuario().isValid(req.body)){
                return res.status(400).json({mensagem: 'Falha na validação'});
            }

            // O ID do usuário é disponibilizado automaticamente pelo middleware de validação JWT
            const idUsuario = req.idUsuario;

            // Pega os dados informados no body
            const { nome, email, password_antigo, password } = req.body;

            // Verifica se o password antiogo foi informado, em caso de alteração de senha
            if (password && !password_antigo) {
                return res.status(403).json({
                    mensagem:
                        'Para alterar a senha, deve ser informada a senha antiga.',
                });
            }

            // Busca os dados atuais do usuário
            const dadosUsuarioAtual = await Usuarios.findByPk(idUsuario);

            // Em caso de atualização de senha, verifica se a senha fornecida está correta.
            if (password) {
                const senhasValidas = await UsuariosUtils.checkSenhasUmHashs(
                    dadosUsuarioAtual.dataValues.password_hash,
                    password_antigo,
                );

                if (!senhasValidas) {
                    return res.status(403).json({
                        mensagem: 'Senha atual não é válida, tente novamente.',
                    });
                }
            }

            // Define o objeto de campos a serem atualizados.
            const camposAtualizar = SharedUtils.removerAtributosNulosObjeto({
                nome: dadosUsuarioAtual.dataValues.nome === nome ? null : nome,
                email:
                    dadosUsuarioAtual.dataValues.email === email ? null : email,
                password,
            });


            if (!Object.keys(camposAtualizar).length) {
                return res
                    .status(400)
                    .json({
                        mensagem:
                            'Os dados fornecidos já estão atualizados, altere as informações e tente novamente.',
                    });
            }

            const dadosUsuarioAtualizado = await Usuarios.update(
                {
                    ...camposAtualizar,
                },
                {
                    where: {
                        id: idUsuario,
                    },
                    fields: ['nome', 'password', 'password_hash', 'email'],
                },
            );

            if (dadosUsuarioAtualizado) {
                const keys = Object.keys(camposAtualizar);
                return res.json({
                    mensagem: 'Dados atualizados com sucesso',
                    DadosAtualizados: keys,
                });
            }
            throw new Error('Erro ao tentar atualiza usuário.');
        } catch (error) {
            console.error('erro>>>>', error);
            const erroMsg = 'usuário não foi atualizado.';
            return res
                .status(500)
                .json({ mensagem: 'ERRO: ' + erroMsg, error });
        }
    }

    async criarUsuarioTeste(req, res) {
        try {
            const usuarioTeste = await Usuarios.create({
                nome: 'teste usuario',
                email: 'usuario@teste.com',
                password_hash: '123456',
            });

            return res.json(usuarioTeste);
        } catch (error) {
            const erroMsg = error.parent.detail ?? 'ERRO desconhecido.';
            return res.status(500).json({ mensagem: erroMsg });
        }
    }
}

export default new UsuariosController();
