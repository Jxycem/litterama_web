import mongoose, { Schema } from 'mongoose';

const ObjectId = Schema.ObjectId;

/*************************** */
const userSchema = new Schema({
    _id: ObjectId,
    fName: {
        type: String
    },
    lName: {
        type: String
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    
});
 

const User = mongoose.model("User", userSchema);

export default User;