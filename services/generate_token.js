const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { accessSecret, refreshSecret } = require("../keys").jwt;

const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, accessSecret);
  if (!token) return createError.InternalServerError();
  return token;
};

const generateRefreshToken = (payload, expiresIn) => {
  const token = jwt.sign(payload, refreshSecret, { expiresIn });
  if (!token) return createError.InternalServerError();
  return token;
};

// const generateCryptoKey = () => crypto.randomBytes(32).toString("hex");

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  // generateCryptoKey,
};
