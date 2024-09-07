import jwt from "jsonwebtoken";
import { Account, Profile } from "next-auth";

const AUTH_JWT_SECRET_KEY = process.env.AUTH_JWT_SECRET_KEY ?? "";
const AUTH_JWT_EXPIRES_IN = process.env.AUTH_JWT_EXPIRES_IN;

const USER_DATA_SECRET_KEY = process.env.USER_DATA_SECRET_KEY ?? "";
const USER_DATA_EXPIRES_IN = process.env.USER_DATA_EXPIRES_IN;

export const signServerJWT = ({ user }: { user: Object }) => {
  try {
    const signedServerJWT = jwt.sign(user, AUTH_JWT_SECRET_KEY, {
      expiresIn: AUTH_JWT_EXPIRES_IN,
    });

    return signedServerJWT;
  } catch (error) {
    throw error;
  }
};

export const signUserDataJWT = ({
  user,
  account,
  profile,
}: {
  user: Object;
  account: Account | null;
  profile?: Profile;
}) => {
  try {
    const userData = { user, account: account ?? {}, profile: profile ?? {} };

    const signedUserDataJWT = jwt.sign(userData, USER_DATA_SECRET_KEY, {
      expiresIn: USER_DATA_EXPIRES_IN,
    });

    return signedUserDataJWT;
  } catch (error) {
    throw error;
  }
};

export const convertStringDaysToSeconds = ({ key }: { key: String }) => {
  return Number(key.replace("d", "")) * 24 * 60 * 60;
};
