import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String, required: true, minlength: 3, maxlength: 50 },
        email: { type: String, required: true, minlength: 7, maxlength: 100, unique: true },
        password: { type: String, required: true, minlength: 8, maxlength: 200 },
        admin: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    })

const User = models.UserData || model('UserData', UserSchema);

export default User;
