import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: [true, "can't be blank"] },
  email: { type: String, unique: true, required: [true, "can't be blank"] },
  password: { type: String, required: [true, "can't be blank"] },
  image: {type: String, required: [true, "can't be blank"]},
}, { timestamps: true });

const User =  mongoose.models.User || mongoose.model('User', UserSchema);

export default User;