const db = require('../data/db');

const calcularValor = (tipo, minutosTotais, isMensalista) => {
    // Tolerância de 15 minutos gratuitos
    if (minutosTotais <= 15) return 0.00;

    // Arredonda para cima: passou de 1 hora, já conta como 2
    const horasCobradas = Math.ceil(minutosTotais / 60);
    let valorHora = tipo.toLowerCase() === 'carro' ? 5.00 : 3.00;
    let total = horasCobradas * valorHora;

    // Desconto de 40% para mensalistas
    if (isMensalista) {
        total = total * 0.60;
    }

    return parseFloat(total.toFixed(2));
};

const registrarEntrada = (placa, tipo) => {

    if (!placa || placa.trim() === '') { //Verifica se a placa é válida
        throw new Error('Placa é obrigatória.');
    }

    const tiposValidos = ['carro', 'moto']; // Verifica se o tipo de veículo é válido

    if (!tiposValidos.includes(tipo?.toLowerCase())) {
        throw new Error('Tipo deve ser carro ou moto.');
    }

    // Regra: Veículo já no estacionamento
    const ticketAberto = db.tickets.find(t => t.placa === placa && !t.pago);
    if (ticketAberto) {
        throw new Error('Veículo já se encontra no estacionamento.');
    }

    const novoTicket = {
        id: db.tickets.length + 1,
        veiculoId: placa,
        placa,
        tipo,
        entrada: new Date(),
        saida: null,
        horas: 0,
        valor: 0,
        pago: false
    };
    db.tickets.push(novoTicket);
    return novoTicket;
};

const registrarSaida = (placa) => {
    const ticket = db.tickets.find(t => t.placa === placa && !t.pago);
    if (!ticket) throw new Error('Ticket não encontrado ou já foi pago.');

    ticket.saida = new Date();
    
    // Calcula a diferença em minutos
    const diffMs = ticket.saida - ticket.entrada;
    const minutosTotais = Math.floor(diffMs / 60000);
    
    ticket.horas = parseFloat((minutosTotais / 60).toFixed(2));

    // Checa se o veículo está cadastrado como mensalista
    const isMensalista = db.veiculos.some(v => v.placa === placa && v.mensalista);

    ticket.valor = calcularValor(ticket.tipo, minutosTotais, isMensalista);
    ticket.pago = true;

    return ticket;
};

module.exports = { calcularValor, registrarEntrada, registrarSaida };