import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Invalid credentials');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRETKEY, { expiresIn: '1h' });

        res.header('Authorization', token).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};


const registerUser = async(req, res) => {
    try{
        const {name, phone, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            phone,
            password: hashedPassword
        })
        await user.save();
        res.status(201).send(user)
    } catch(error){
        console.log(error);
        res.status(500).send('Server error')
    }
}

const authorization = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Unauthorized');

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
        if (err) return res.status(403).send('Forbidden');
        req.user = user;
        next();
    });
};

export { login, registerUser, authorization };
