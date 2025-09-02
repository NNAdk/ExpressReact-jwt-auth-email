import jwt from "jsonwebtoken";
import Token from '../models/token.js';

export const tokenService = {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    },

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const newToken = await Token.create({ user: userId, refreshToken });
        return newToken;
    },
    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return null;
        }
    },

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            return null;
        }
    },

    async findToken(refreshToken) {
        return await Token.findOne({ refreshToken });
    }
};


