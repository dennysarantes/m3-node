//import jwt from 'jsonwebtoken';
import { Usuarios } from '../../../models';
import { CriptografiaUtils } from '../util/criptografia';
import { JWTUtils } from '../util/jwtUtil';

class SessionController {
    async autenticar(req, res) {
        try {
            const { email, password } = req.body;
            const usuario = await Usuarios.findOne({ where: { email: email } });

            if (!usuario) {
                return res
                    .status(400)
                    .json({ mensagem: 'Usuário ou senha inválido.' });
            }

            const senhaDecrypted = CriptografiaUtils.descriptografar(usuario.password_hash);

            if(senhaDecrypted === password){
                const token = await JWTUtils.gerarToken(usuario);
                return res.json({ token });
            }else{
                return res
                    .status(400)
                    .json({ mensagem: 'Usuário ou senha inválido.' });
            }


        // eslint-disable-next-line no-unused-vars
        } catch (_) {
            return res
                .status(500)
                .json({ mensagem: 'Ocorreu um problema na autenticação.' });
        }
    }

    async validarTokenJWT(req, res, next) {

        const auth = req.headers['authorization'];
        if (!auth) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }
        try {
            const dadosValidacao = await JWTUtils.validarToken(JWTUtils.limparToken(auth));

            if(dadosValidacao.ehValido){
                //Insere o id do usuário na requisição para evitar uma nova consulta ao banco.

                req.idUsuario = dadosValidacao.idUsuario;
                next(); // Permite a utilização da rota.
            }else{
                throw new Error("");
            }

        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }

    }
}

export default new SessionController();
