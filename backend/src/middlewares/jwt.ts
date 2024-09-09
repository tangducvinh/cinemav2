import jwt from "jsonwebtoken";

const generateAccessToken = (uid, role) => {
  return jwt.sign({ id: uid, role }, process.env.SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (uid, role) => {
  return jwt.sign({ id: uid, role }, process.env.SECRET_KEY_REFRESH_TOKEN, {
    expiresIn: "365d",
  });
};

export { generateAccessToken, generateRefreshToken };
