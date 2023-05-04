import User from "@/model/UserSchema";
import dbConnect from "./db";
import { GetServerSidePropsContext } from "next";
import { getDataFromCookie } from "./auth-cookies";
import mongoose from "mongoose";

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
      villageId: new mongoose.Types.ObjectId(),
    });
    await user.hashPassword(user.password);
    await user.save();

    return user;
  } catch (e) {
    console.log(e);
    throw Error("user creation failed");
  }
};

// find user from db.
export const findUser = async (username: string) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (e) {
    throw new Error("find user error occured");
  }
};

// delete user from db.
export const deleteUser = async () => {};

// check user from cookie.
export const checkUser = async ({ req, res }: GetServerSidePropsContext) => {
  try {
    const user = await getDataFromCookie(req, res, "user");

    return user;
  } catch (e: any) {
    return null;
  }
};
