const jwt = require("jsonwebtoken");

const generateAccessToken = (uid, role) => {
  return jwt.sign({ id: uid, role }, process.env.SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: "3h",
  });
};

const generateRefreshToken = (uid, role) => {
  return jwt.sign({ id: uid, role }, process.env.SECRET_KEY_REFRESH_TOKEN, {
    expiresIn: "3d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
