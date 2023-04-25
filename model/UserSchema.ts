import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: String,
  password: String,
});

userSchema.methods.hashPassword = async function hashPassword(
  plainPassword: string
) {
  const hashedPassword = await bcrypt.hash(plainPassword, 5);
  this.password = hashedPassword;
};

userSchema.methods.comparePassword = async function comparePassword(
  plainPassword: string
) {
  return await bcrypt.compare(plainPassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);
