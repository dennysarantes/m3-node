import { CriptografiaUtils } from './criptografia';
import * as Yup from 'yup';

const checkSenhasUmHashs = async (hashSenha1, senha2) => {
    if (!hashSenha1 || !senha2) {
        throw new Error('senhas não fornecidas');
    }

    try {
        const senha1 = await CriptografiaUtils.descriptografar(hashSenha1);
        return senha1 === senha2;
    } catch (error) {
        console.error('ERRO ao tentar comparar senhas: ', error);
        return false;
    }
};

const checkSenhasDoisHashs = async (hashSenha1, hashSenha2) => {
    if (!hashSenha1 || !hashSenha2) {
        throw new Error('senhas não fornecidas');
    }

    try {
        const senha1 = await CriptografiaUtils.descriptografar(hashSenha1);
        const senha2 = await CriptografiaUtils.descriptografar(hashSenha2);

        return senha1 === senha2;
    } catch (error) {
        console.error('ERRO ao tentar comparar senhas: ', error);
        return false;
    }
};

const schemaValidatorCriarUsuario = () =>
    Yup.object().shape({
        nome: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
    });

const schemaValidatorAtualizarUsuario = () =>
    Yup.object().shape({
        nome: Yup.string(),
        email: Yup.string().email(),
        // Se o campo password_antigo for preenchido, então o password deve ser obrigatório e vice-versa
        password_antigo: Yup.string(),
        password: Yup.string()
            .min(6)
            .when('password_antigo', (password_antigo, campoPassword) =>
                password_antigo ? campoPassword.required() : campoPassword,
            ),
    });

export const UsuariosUtils = {
    checkSenhasDoisHashs,
    checkSenhasUmHashs,
    schemaValidatorCriarUsuario,
    schemaValidatorAtualizarUsuario,
};
