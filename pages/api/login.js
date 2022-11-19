import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const tokenSecret = process.env.TOKEN_SECRET;

async function handleLogin(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            const { email, password } = req.body;
            const selectedUser = await User.findOne({ email });

            if (!selectedUser) {
                return res.status(404).json({ success: false, error: 'User Not found' })
            }
            if (bcrypt.compareSync(password, selectedUser.password)) {
                const token = jwt.sign({ email: selectedUser.email }, tokenSecret)
                if (res.status(201)) {
                    return res.status(201).json({ success: true, data: token });
                } else {
                    return res.status(400).json({ success: false, error: 'error' })
                }
            }
            res.status(400).json({ success: false, error: 'Email or password is incorrect' })
            break
        default:
            res.status(400).json({ success: false })
            break;
    }
}

export default handleLogin;
