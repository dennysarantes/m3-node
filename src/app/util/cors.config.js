const whitelistCors = () => {
    return ['http://localhost'];
};

const options = () => {
    return {
       origin: function (origin, callback) {
            if (whitelistCors().indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Acesso negado CORS'));
            }
        }
    };
};

export const CorsConfig = {
    options,
};
