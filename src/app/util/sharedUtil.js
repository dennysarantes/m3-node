const removerAtributosNulosObjeto = (obj) => {
    // Cria um novo objeto onde os atributos válidos serão armazenados
    return Object.entries(obj).reduce((acc, [key, value]) => {
        // Se o valor for um objeto, aplica a função recursivamente
        if (value && typeof value === 'object') {
            const nested = removerAtributosNulosObjeto(value);
            // Adiciona apenas se o objeto aninhado não estiver vazio
            if (Object.keys(nested).length > 0) {
                acc[key] = nested;
            }
        }
        // Adiciona ao acumulador se o valor não for nulo ou undefined
        else if (value !== null && value !== undefined) {
            acc[key] = value;
        }
        return acc;
    }, {});
};

export const SharedUtils = {
    removerAtributosNulosObjeto,
};
