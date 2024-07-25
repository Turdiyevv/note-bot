const User = require('./db/user');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// user info
function userInfo(){
    app.post('/api/userByPhone', async (req, res) => {
    let { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ message: 'Noto\'g\'ri telefon raqami' });
    }
    try {
        let user = await User.findOne({ phone }).lean();
        if (!user && !String(phone).startsWith('+')) {
            phone = String(+phone)
            user = await User.findOne({ phone: `+${phone}` }).lean();
            if (!user) return res.status(404).json({message: 'User not found'});
            return res.json(user);
        }
        return res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
    });
}

function getUsers(){
    app.get('/api/users', async (req, res) => {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            res.status(500).send(`${err}`);
        }
    });
}
module.exports = {
    getUsers, userInfo
}
