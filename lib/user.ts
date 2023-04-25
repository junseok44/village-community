import User from "@/model/UserSchema";
import dbConnect from "./db";

export const createUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    await dbConnect();
    const user = new User({
      username,
      password,
    });
    await user.hashPassword(user.password);
    await user.save();

    return user;
  } catch (e) {
    console.log(e);
    throw Error("user creation failed");
  }
};

export const findUser = async (username: string) => {
  try {
    return await User.findOne({ username });
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async () => {};
