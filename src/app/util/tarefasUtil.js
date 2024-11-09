import * as Yup from 'yup';
import { Op } from 'sequelize';
//import { SharedUtils } from './sharedUtil';

const schemaValidatorCriarTarefa = () =>
    Yup.object().shape({
        nome: Yup.string().required(),
        concluida: Yup.boolean(),
    });

const getQueryListarTarefas = (body) => {
    console.log('body: ', body);
    //TODO: Verificar se é necessário...
    try {
        // eslint-disable-next-line prefer-const
        let query = {
            nome: body.nome ? { [Op.substring]: body.nome } : null,
            concluida: body.concluida ?? { [Op.in]: [true, false] },
            usuario_id: body.usuario_id ?? null,
        };

        if(query.nome === null) delete query['nome'];
        if(query.usuario_id === null) delete query['usuario_id'];

        return query;
    } catch (error) {
        console.error(
            'Erro ao tentar gerar query de consulta de tarefas',
            error,
        );
        return {};
    }
};

export const TarefasUtil = {
    schemaValidatorCriarTarefa,
    getQueryListarTarefas,
};
