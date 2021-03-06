const router = require('express').Router();
const User = require('../models/User');
const { AES, enc } = require('crypto-js');
const { sign } = require('jsonwebtoken');
// registratation

router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: AES.encrypt(req.body.password, process.env.CRYPTO_PWD).toString(),
        email: req.body.email,
    });

    try {
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    } catch (e) {
        res.status(500).json({
            message: 'register failed',
            data: e
        })
    }
});
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        const hashPwd = AES.decrypt(user.password, process.env.CRYPTO_PWD);
        const yourPassword = hashPwd.toString(enc.Utf8);
        const { password, ...others } = user._doc;
        const accessToken = sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT,
            {
                expiresIn: "3d"
            }
        )
        if (!user) {
            res.status(401).json('credential is wrong')
        }
        if (yourPassword !== req.body.password) {
            res.status(401).json('credential is wrong');
        }
        res.status(200).json({ ...others, accessToken });

    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router;