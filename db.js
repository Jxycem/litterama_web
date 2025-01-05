import mongoose from 'mongoose';

import 'dotenv/config';

/****************** */

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
        .then(() => console.log('Connected!'));
    } catch (error) {
        console.log("error.message");
        process.exit(1);
    }
};

export default connectDB;