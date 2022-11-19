import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
const tokenSecret = process.env.TOKEN_SECRET;

async function handleUserData(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            const { token } = req.body;

            try {
                const selectedUser = jwt.verify(token, tokenSecret);
                await User.findOne({ email: selectedUser.email })
                    .then(data => res.status(201).json({ success: true, data: data }))
                    .catch(error => res.status(400).json({ success: false, data: error }))
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break;
    }
}

export default handleUserData;
