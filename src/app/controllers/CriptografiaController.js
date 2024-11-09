import { CriptografiaUtils } from '../util/criptografia';

class CriptografiaController {
    constructor() {}

    async descriptografar(req, res) {
        const { hash } = req.body;
        const sec = CriptografiaUtils.descriptografar(hash);

        return res.json({ msg: sec });
    }

    async criptografarVariavel(req, res) {
        const { variavel } = req.body;
        const sec = CriptografiaUtils.criptografar(variavel);

        return res.json({ msg: sec });
    }
}

export default new CriptografiaController();
