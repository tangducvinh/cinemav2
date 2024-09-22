const bcrypt = require("bcrypt");
const db = require("../models");
const { Op } = require("sequelize");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");

const signUp = async (req, res) => {
  const { email, phone, birthday, fullName, password, sex } = req.body;

  if (!email || !phone || !birthday || !fullName || !password || !sex)
    return res.json("missing input");

  const checkPhone = await db.User.findOne({
    where: {
      phone,
    },
  });

  if (checkPhone)
    return res
      .status(400)
      .json({ success: false, message: "Số điện thoại đã tồn tại" });

  const checkEmail = await db.User.findOne({
    where: {
      email,
    },
  });

  if (checkEmail)
    return res
      .status(400)
      .json({ success: false, message: "Email đã tồn tại" });

  const hashed = bcrypt.hashSync(password, 10);
  const response = await db.User.create({
    email,
    phone,
    birthday,
    fullName,
    password: hashed,
    sex: sex === "0" ? false : true,
    role: "3",
  });

  return res.json({ success: true, message: "Đăng ký thành công" });
};

const signIn = async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    const user = await db.User.findOne({
      where: { [Op.or]: { email: email || "", phone: phone || "" } },
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Tài khoản không tồn tại" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      // tao accessToken
      const accessToken = generateAccessToken(user.id, user.role);
      // tao refreshToken
      const refreshToken = generateRefreshToken(user.id, user.role);
      // gan refreshToken vao cookie
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      // res.cookie("name", user.fullName, { httpOnly: true });

      const { phone, password, role, ...newData } = user.dataValues;
      newData.accessToken = accessToken;

      return res.status(200).json({
        success: true,
        data: user ? newData : "no data",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Tên đăng nhập hoặc mật khẩu không đúng",
      });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
const getProfileInformation = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await db.User.findOne({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: user ? true : false,
      data: user || "no data",
      message: "pk",
    });
  } catch (e) {
    console.log(e);
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { id } = req.user;

    const user = await db.User.findOne({
      where: {
        id,
      },
    });

    const checkPassword = await bcrypt.compare(currentPassword, user.password);

    if (!checkPassword) {
      return res.status(200).json({
        success: false,
        message: "Mật khẩu hiện tại không chính xác",
      });
    }

    const hashed = bcrypt.hashSync(newPassword, 10);

    await db.User.update(
      { password: hashed },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json({
      success: user ? true : false,
      message: "Thay đổi mật khẩu thành công",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

module.exports = { signUp, signIn, getProfileInformation, changePassword };
