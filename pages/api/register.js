import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

async function handleRegister(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            const { name, email, password } = req.body;
            const encryptedPassword = bcrypt.hashSync(password, 10);

            try {
                const selectedUser = await User.findOne({ email });
                if (selectedUser) {
                    return res.status(400).json({ success: false, error: 'User Exists' })
                }
                await User.create({
                    name: name,
                    email: email,
                    password: encryptedPassword
                });
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break;
    }
}

export default handleRegister;
