const express = require('express');
const mongoose = require('mongoose');
const User = require('./db/user'); // User modelini bu yerda import qilamiz

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB ga ulanish
mongoose.connect('mongodb://localhost:27017/telegramBot', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

// Barcha foydalanuvchilarni olish
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
