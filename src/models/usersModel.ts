import mongoose from "mongoose";
import { UserRole } from "@/enums/userRole";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please provide a username'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'please provide email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'please provide password']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User