import app from './app';
const portApp = 3333;

app.listen(portApp, () => console.log(`Serviço carregado com sucesso: http://localhost:${portApp}`));
