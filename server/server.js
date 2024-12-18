const express = require('express');
const vld = require('express-validator');
const bodyParser = require('body-parser');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const db = require("./db");
const User = require('./models/User');
const Message = require("./models/Message");

const authenticateToken = require('./middleware/authenticateToken.js');

//---------------------

db.authenticate()
    .then(() => { console.log("Connessione riuscita."); })
    .catch((err) => { console.error(`Connessione non riuscita. (${err})`); });

db.sync({alter: true})
    .then(() => console.log('Database sincronizzato!'))
    .catch((err) => console.error(`Errore nella sincronizzazione. (${err})`));

//---------------------

const app = express();
app.use(bodyParser.json());

app.get('/', async(req, res) => {
    const { message_number } = req.body;
    
    if (typeof Number(message_number) !== "number"){
        res.status(400).json({message: 'Errore: numero non valido.'});
    };

    try {
        const messages = await Message.findAll({
            attributes: ['message_id', 'author', 'content'],
            limit: Number(message_number),
            order: [['message_id', 'DESC']]
        });

        res.status(200).json({message_list: messages.reverse()});
    } catch(err) {
        res.status(500).json({message: 'Errore interno del server.'});
    }
});

app.post('/', authenticateToken, async (req, res) => {
    const { content } = req.body; //body.user from authenticateToken middleware

    try {
        const newMessage = await Message.create({
            author: req.user.username,
            content
        });
        
        res.status(200).json({
            message: 'Messaggio inviato.',
            sent: newMessage
        });
    } catch(err){
        res.status(500).json({message: 'Errore interno del server.'});
    }
})

//------------------------

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({where: { username }});
        if (existingUser) {
            return res.status(400).json({message: 'Utente già registrato!'});
        }

        const hashedPassword = await argon2.hash(password);
        
        const newUser = await User.create({username, password: hashedPassword});
        res.status(201).json({message: `Utente registrato: ${username}!`, user: newUser});
    } catch(err) {
        res.status(500).json({message: 'Errore interno del server.'});
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({where: { username }});
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato. Per favore riprova.' });
        };

        const verifyPassword = await argon2.verify(user.password, password);
        if (!verifyPassword){
            return res.status(400).json({ message: 'Password errata.' });
        };

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login effettuato con successo!', token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Errore interno del server.' });
    }
});

//---------------------

app.get('/protected', authenticateToken, (req, res) => {
    res.json({
        message: 'Accesso alle risorse protette riuscito!',
        user: req.user, // Informazioni sull'utente decodificate dal token
    });
});

//---------------------

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});