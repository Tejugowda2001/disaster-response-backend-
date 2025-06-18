const express = require('express');
const router = express.Router();
const { supabase } = require('../utils/supabaseClient');
const { verifyUser } = require('../utils/auth');

router.post('/', async (req, res) => {
    const { title, location_name, description, tags, owner_id } = req.body;

    const { data, error } = await supabase.from('disasters').insert([{ title, location_name, description, tags, owner_id }]);
    if (error) return res.status(500).json({ error: error.message });

    const io = req.app.get('socketio');
    io.emit('disaster_updated', { message: 'New disaster created', disaster: data[0] });

    res.status(201).json(data[0]);
});

router.get('/', async (req, res) => {
    const { tag } = req.query;
    let query = supabase.from('disasters').select('*');

    if (tag) query = query.contains('tags', [tag]);

    const { data, error } = await query;

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
});

module.exports = router;
