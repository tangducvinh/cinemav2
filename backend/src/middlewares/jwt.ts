import jwt from "jsonwebtoken";

const generateAccessToken = (uid, role) => {
  return jwt.sign({ id: uid, role }, "dfdsfsdfdf", { expiresIn: "1d" });
};

const generateRefreshToken = (uid, role) => {
  return jwt.sign({ id: uid, role }, "dfdfdfdf", { expiresIn: "365d" });
};

export { generateAccessToken, generateRefreshToken };
