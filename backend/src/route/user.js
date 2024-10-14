const sendMail = require("../config/sendmail");
const {
  signUp,
  signIn,
  getProfileInformation,
  changePassword,
  refreshToken,
  logout,
} = require("../controllers/user");
const { verifyAccessToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

const initUserRouter = (app) => {
  router.post("/sign-up", signUp);
  router.post("/sign-in", signIn);
  router.get("/refresh", refreshToken);
  router.post("/logout", logout)
  router.get("/profile", verifyAccessToken, getProfileInformation);
  router.put("/change-password", verifyAccessToken, changePassword);

  return app.use("/api/user", router);
};

module.exports = initUserRouter;
