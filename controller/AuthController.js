import User from "../Models/UserModel.js";
import { loginModel } from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from "../config/EmailSender.js";

export const register = async (req, res) => {
  const { nama, email, password, confirmPassword } = req.body;
  let result = {
    email: {
      value: email,
      message: null,
    },
  };

  try {
    const uniqueEmail = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log(nama);
    if (uniqueEmail) {
      result.email.message = "Email sudah terdaftar!";
      return res.status(200).json(result);
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    await User.create({ nama, email, password: hashPassword });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

function generateRandomCode(length) {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const forgotPassword = (req, res) => {
  let randomCode = generateRandomCode(5);
  const { email } = req.body;
  let mailOptions = {
    from: "yosanokta12@gmail.com",
    to: email,
    subject: "Test Email dari Nodemailer",
    text: "Ini adalah email test yang dikirim menggunakan Nodemailer!",
    html: `<p>Your code</p><h1><center>${randomCode}</center></h1>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email terkirim: " + info.response);
      res.status(200).json(randomCode);
    }
  });
};

export const isAvailableEmail = async (req, res) => {
  try {
    const result = await User.findAll({
      where: {
        email: req.query.search,
      },
    });
    return res
      .status(200)
      .json({ isAvailable: result.length > 0 ? false : true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const result = await User.findAll({
      where: {
        email: req.query.search,
      },
    });
    console.log(result);
    return res
      .status(200)
      .json({ checkEmailExists: result.length > 0 ? true : false });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

let refreshToken = [];

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const account = await User.findOne({ where: { email } });
    if (!account) {
      return res
        .status(401)
        .json({ message: "Email atau password salah!", status: false });
    }
    const passwordValidate = await bcrypt.compare(password, account.password);
    if (!passwordValidate) {
      return res
        .status(401)
        .json({ message: "Email atau password salah!pass", status: false });
    }
    // result.status = (bcrypt.compare(password, account.password, (err, result) => result))
    const payload = {
      id: account.id,
      nama: account.nama,
      email: account.email,
    };

    let refreshTokenUsers = getRefreshToken(payload);
    refreshToken.push(refreshTokenUsers);

    return res.status(200).json({
      data: {
        id: payload.id,
        nama: payload.nama,
        email: payload.email,
        status: true,
      },
      token: {
        accessToken: getAccessToken(payload),
        refreshToken: refreshTokenUsers,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function getAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
}
function getRefreshToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

export const logout = async (req, res) => {
  refreshToken.filter((item) => item !== req.body.refreshToken);
  return res.status(200).json({ status: true });
};

export const authenticationToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export const testAuthToken = (req, res) => {
  return res.status(200).json({ status: true });
};

export const refreshNewToken = (req, res) => {
  const refreshToken_user = req.body.refreshToken;
  if (!refreshToken_user) {
    return res.sendStatus(401);
  } else if (!refreshToken_user in refreshToken) {
    return res.sendStatus(403);
  } else {
    jwt.verify(
      refreshToken_user,
      process.env.JWT_REFRESH_SECRET,
      (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = getAccessToken({ id: user.id });
        const refreshToken_new = getRefreshToken({ id: user.id });
        refreshToken.push(refreshToken_new);
        return res
          .status(200)
          .json({ accessToken: accessToken, refreshToken: refreshToken_new });
      }
    );
  }
};
