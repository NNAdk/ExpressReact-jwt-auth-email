import { userService } from "../service/user-service.js";

export const reg = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await userService.registration(email, password);

    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (err) {
    console.error("Ошибка регистрации:", err.message);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};


export const login = async (req, res, next) => {
    try {

    } catch (err) {
        
    }
};

export const logout = async (req, res, next) => {
    try {

    } catch (err) {

    }
};

export const refresh = async (req, res, next) => {
    try {

    } catch (err) {

    }
};

export const activate = async (req, res, next) => {
    try {

    } catch (err) {

    }
};

export const getUsers = async (req, res, next) => {
    try {
        res.json(['123,','123'])

    } catch (err) {

    }
};
