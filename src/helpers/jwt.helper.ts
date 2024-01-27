import jwt from "jsonwebtoken";

const AUTH_JWT_SECRET_KEY = process.env.AUTH_JWT_SECRET_KEY ?? "";
const AUTH_JWT_EXPIRES_IN = process.env.AUTH_JWT_EXPIRES_IN;

export const signJwt = ({ user }: { user: Object }) => {
  try {
    const token = jwt.sign(user, AUTH_JWT_SECRET_KEY, {
      expiresIn: AUTH_JWT_EXPIRES_IN,
    });

    return token;
  } catch (error) {
    throw error;
  }
};
