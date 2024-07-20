const express = require('express');
const User = require('./db/user'); // User modelini bu yerda import qilamiz

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// user info
async function getMyInfo(phone) {
    app.post('/api/userByPhone', async (req, res) => {
    const { phone } = req.body;
        try {
            const user = await User.findOne({ phone });
            if (user) {
                res.json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (err) {
            res.status(500).send('Error: ' + err.message);
        }
    });
}
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
module.exports = {getUsers, getMyInfo};
