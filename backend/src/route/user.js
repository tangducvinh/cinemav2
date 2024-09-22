const {
  signUp,
  signIn,
  getProfileInformation,
  changePassword,
} = require("../controllers/user");
const { verifyAccessToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

const initUserRouter = (app) => {
  router.post("/sign-up", signUp);
  router.post("/sign-in", signIn);
  router.get("/profile", verifyAccessToken, getProfileInformation);
  router.put("/change-password", verifyAccessToken, changePassword);

  return app.use("/api/user", router);
};

module.exports = initUserRouter;
