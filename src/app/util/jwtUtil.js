import { CriptografiaUtils } from './criptografia';

const jwt = require('jsonwebtoken');

// O tempo de expiração do token é de 1 hora.
const tempoExpiracao = () => Math.floor(Date.now() / 1000) + 60 * 60;

const gerarToken = async (dadosUsuario) => {
    const data = {
        id: dadosUsuario.id,
        nome: dadosUsuario.nome,
        email: dadosUsuario.email,
    };

    const secret = await CriptografiaUtils.getSecretHash();

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
    let dadosValidacao = {ehValido: false, idUsuario: null};
    try {
        const secret = await CriptografiaUtils.getSecretHash();

        jwt.verify(token, secret, function (err, decoded) {
            err && console.error('err: ', err);
            if (decoded && !tokenExpirado()) {
                dadosValidacao = {ehValido: true, idUsuario: decoded.data.id};
            }
        });

        return dadosValidacao;
    } catch (error) {
        console.error('Erro ao tentar validar token', error);
        return dadosValidacao;
    }
};

// A validação já realiza a comparação, porém essa redundância aumenta a segurança da API
const tokenExpirado = (token) => {
    return token && getAgora() > token.exp;
};

const getAgora = () => {
    return Math.floor(Date.now() / 1000);
};

const limparToken = (tokenOriginal) => {
    try {
        if (tokenOriginal.toLowerCase().startsWith('bearer')) {
            // Esse split é interessante, ele cria um array com dois itens, o bearer e o token e descarta o bearer
            const [, token] = tokenOriginal.split(' ');
            return token.trim();
        }

        return tokenOriginal.trim();
    } catch (error) {
        console.error('error: ', error);
        return tokenOriginal;
    }
};

export const JWTUtils = {
    gerarToken,
    validarToken,
    limparToken,
};
