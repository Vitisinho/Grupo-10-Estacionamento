const viaCepService = require('../services/viaCepService');
const db = require('../data/db');

exports.cadastrarMensalista = async (req, res) => {
    try {
        const { placa, tipo, proprietario, cep } = req.body;

        // Placa obrigatória
        if (!placa || placa.trim() === '') {
            return res.status(400).json({
                erro: 'Placa é obrigatória.'
            });
        }

        // Tipo válido
        const tiposValidos = ['carro', 'moto'];

        if (!tiposValidos.includes(tipo?.toLowerCase())) {
            return res.status(400).json({
                erro: 'Tipo deve ser carro ou moto.'
            });
        }

        // Proprietário obrigatório
        if (!proprietario || proprietario.trim() === '') {
            return res.status(400).json({
                erro: 'Nome do proprietário é obrigatório.'
            });
        }

        const mensalistaExistente = db.veiculos.find(
            v => v.placa.toUpperCase() === placa.toUpperCase()
        );

        if (mensalistaExistente) {
            return res.status(400).json({
                erro: 'Veículo já cadastrado como mensalista.'
            });
        }

        // Exigência da regra de negócio: Validar e salvar endereço pelo CEP
        const endereco = await viaCepService.buscarCep(cep);

        const novoMensalista = {
            placa,
            tipo,
            proprietario,
            mensalista: true,
            endereco: {
                logradouro: endereco.logradouro,
                bairro: endereco.bairro,
                localidade: endereco.localidade,
                uf: endereco.uf
            }
        };

        db.veiculos.push(novoMensalista);
        res.status(201).json({ mensagem: 'Mensalista cadastrado!', dados: novoMensalista });
    } catch (error) {
        // Exigência: CEP inválido retornar 400 antes de cadastrar
        res.status(400).json({ erro: error.message });
    }
};

exports.listarMensalistas = (req, res) => {
    res.json(db.veiculos);
};

exports.buscarCep = async (req, res) => {
    try {
        const endereco = await viaCepService.buscarCep(req.params.cep);
        res.json(endereco);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};