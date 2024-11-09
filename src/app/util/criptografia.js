const crypto = require('crypto');
const { sequelize } = require('./../../../models');

const criptografar = (informacacao) => {
    // Gera um vetor de inicialização (IV) aleatório
    let key = process.env.SECRET_KEY;

    if (key.length !== 32) {
        key = crypto
            .createHash('sha256')
            .update(key)
            .digest('base64')
            .substr(0, 32);
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(informacacao);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Retorna o IV e o texto criptografado como uma string em Base64
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const descriptografar = (informacaoCriptografada) => {
    // Divide o IV e o texto criptografado
    let key = process.env.SECRET_KEY;

    if (key.length !== 32) {
        key = crypto
            .createHash('sha256')
            .update(key)
            .digest('base64')
            .substr(0, 32);
    }

    const [ivHex, encryptedTextHex] = informacaoCriptografada.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedTextHex, 'hex');

    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(key),
        iv,
    );

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
};

// DEPRECATED -> usar a própria chave da variável de ambiente.
const getSecretHash = async () => {
    // Tornar a função assíncrona com 'async'
    try {
        const query = `SELECT p.valor FROM propriedades p WHERE p.chave = 'hashSecret'`;

        // eslint-disable-next-line no-unused-vars
        const [results, _] = await sequelize.query(query);

        return results[0].valor;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
};

export const CriptografiaUtils = {
    criptografar,
    descriptografar,
    getSecretHash,
};
