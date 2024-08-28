import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  _id: string;
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpire: Date;
  isAcceptingMessage: boolean;
  isVerified: true;
  messages: Message[];
}
const UserSchema: Schema<User> = new Schema({
  username: { type: String, required: true, trim: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Please fill a valid email address",
    ],
  },
  password: { type: String, required: [true, "Password is required!"] },
  verifyCode: { type: String, required: [true, "Verify code is required!"] },
  verifyCodeExpire: { type: Date, required: true },
  isAcceptingMessage: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: true },
  messages: [messageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
export default UserModel;
