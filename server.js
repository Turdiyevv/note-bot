const express = require('express');
const User = require('./db/user');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// user info
app.post('/api/userByPhone', async (req, res) => {
const { phone } = req.body;
try {
    const user = await User.findOne({ phone }).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
} catch (err) {
    res.status(500).json({ message: 'Server error' });
}
});
// Barcha foydalanuvchilarni olish
function getUsers() {
    app.get('/api/users', async (req, res) => {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            res.status(500).send(`${err}`);
        }
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = {getUsers};
