// /lib/dbConnect.js
import mongoose from 'mongoose';

async function dbConnect() {
    mongoose.connect(process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (error) => {
            if (error)
                console.log(error)
            else
                console.log('Mongo Connected')
        })
}

export default dbConnect;
