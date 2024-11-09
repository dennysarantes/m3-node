import { TarefasUtil } from '../util/tarefasUtil';
import { Tarefas } from '../../../models';

class TarefasController {
    constructor() {}

    async criarTarefa(req, res) {
        // O ID do usuário é disponibilizado automaticamente pelo middleware de validação JWT
        const usuario_id = req.idUsuario;

        try {
            if (
                !(await TarefasUtil.schemaValidatorCriarTarefa().isValid(
                    req.body,
                ))
            ) {
                return res.status(400).json({ mensagem: 'Falha na validação' });
            }

            const tarefaCriada = await Tarefas.create({
                usuario_id,
                ...req.body,
            });

            if (tarefaCriada.id) {
                return res
                    .status(201)
                    .json({ msg: 'Tarefa criada com sucesso.' });
            } else {
                throw new Error('Erro!!');
            }
        } catch (error) {
            const erroMsg = error.parent.detail ?? 'tarefa não foi criada.';
            return res.status(500).json({ mensagem: 'ERRO: ' + erroMsg });
        }
    }

    async listarTarefas(req, res) {
        // O ID do usuário é disponibilizado automaticamente pelo middleware de validação JWT
        //const usuario_id = req.idUsuario;

        try {
            const { index, quantidade } = req.body;
            const query = TarefasUtil.getQueryListarTarefas(req.body);

            const limite = quantidade ?? 10; // Limite de registros por página
            const pagina = index ?? 1; // Página atual (índice)

            const { count, rows } = await Tarefas.findAndCountAll({
                where: {
                    ...query,
                },
                limit: limite,
                offset: (pagina - 1) * limite,
                attributes: ['nome', 'concluida', 'usuario_id'], // Campos específicos que você deseja retornar
            });

            // Calcula o total de páginas
            const totalPaginas = Math.ceil(count / limite);

            return res.json({
                dados: rows, // Registros da página atual
                totalPaginas, // Total de páginas
                paginaAtual: pagina, // Página atual
                totalRegistros: count, // Total de registros
            });
        } catch (error) {
            console.error('Erro', error);
            return res
                .status(500)
                .json({ mensagem: 'Erro ao tentar listar tarefas.' });
        }
    }

    async deleteTarefa(req, res) {
        try {
            const { tarefa_id } = req.params;

            const tarefa = await Tarefas.findByPk(tarefa_id);

            if (tarefa) {
                const resultado = await Tarefas.destroy({
                    where: {
                        id: tarefa_id,
                    },
                });

                console.log('resultado: ', resultado);

                return res.send();
            } else {
                throw new Error('');
            }
        } catch (error) {
            console.error('error: ', error);
            return res
                .status(500)
                .json({
                    mensagem: 'Ocorreu um problema. Tarefa não deletada.',
                });
        }
    }
}

export default new TarefasController();
