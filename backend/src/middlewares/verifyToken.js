const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token?.split(" ")[1];
    jwt.verify(
      accessToken,
      process.env.SECRET_KEY_ACCESS_TOKEN,
      (err, decode) => {
        if (err) {
          return res.status(403).json("Token is valid");
        }
        req.user = decode;
        next();
      }
    );
  } else {
    return res.status(401).json("Bạn chưa đăng nhập");
  }
};

module.exports = { verifyAccessToken };
