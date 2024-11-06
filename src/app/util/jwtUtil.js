import { CriptografiaUtils } from './criptografia';

const jwt = require('jsonwebtoken');

// O tempo de expiração do token é de 1 hora.
const tempoExpiracao = () => Math.floor(Date.now() / 1000) + 60 * 60;

const gerarToken = async (dadosUsuario) => {
    const data = {
        nome: dadosUsuario.nome,
        email: dadosUsuario.email,
    };

    const secret = await CriptografiaUtils.getSecretHash();
    console.log('secret: ', secret);

    const token = jwt.sign(
        {
            exp: tempoExpiracao(),
            data,
        },
        secret,
    );

    return token;
};

const validarToken = async (token) => {
    let ehValido = false;
    try {
        const secret = await CriptografiaUtils.getSecretHash();

        jwt.verify(token, secret, function (err, decoded) {
            err && console.error('err: ', err);
            if (decoded) {
                console.log(decoded);
                ehValido = true;
            }
        });

        return ehValido;
    } catch (error) {
        console.error('Erro ao tentar validar token', error);
        return false;
    }
};

export const JWTUtils = {
    gerarToken,
    validarToken,
};
