import User from "../models/user.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { tokenService } from "./token-service.js";
import { emailService } from "./email-service.js";
import { UserDto } from "../dtos/user-dto.js";

export const userService = {
  async registration(email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw new Error(`Пользователь с таким ${email} уже существует`);
    }

    const hash = await bcrypt.hash(password, 10);
    const activationLink = uuidv4();

    
    await emailService.verifyConnection(); // проверка SMTP
    await emailService.sendActivationEmail(email, `${process.env.API_URL}/api/activate/${activationLink}`);


  
    const user = await User.create({ email, password: hash, activationlink: activationLink });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  },
};
