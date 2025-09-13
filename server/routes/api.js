const express = require('express');
const router = express.Router();
const Rsvp = require('../models/Rsvp');

// Rota: POST /api/rsvp
// Descrição: Salva uma nova confirmação de presença
router.post('/rsvp', async (req, res) => {
  console.log('Dados recebidos:', req.body); // Log para verificar os dados recebidos
  try {
    const rsvp = new Rsvp(req.body);
    await rsvp.save();
    res.status(201).json({ message: 'Dados salvos com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    res.status(500).json({ message: 'Erro ao salvar os dados.' });
  }
});

// Rota: GET /api/rsvp
// Descrição: Lista todas as confirmações de presença
router.get('/rsvp', async (req, res) => {
  try {
    const rsvps = await Rsvp.find();
    res.status(200).json(rsvps);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    res.status(500).json({ message: 'Erro ao buscar os dados.' });
  }
});

module.exports = router;