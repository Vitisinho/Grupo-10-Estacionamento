const axios = require('axios');

exports.buscarCep = async (cep) => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
        throw new Error('CEP inválido ou não encontrado.');
    }
    return response.data;
};