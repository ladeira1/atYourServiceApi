const authConfig = {
  secret: process.env.TOKEN_SECRET,
  expiresIn: process.env.EXPIRATION_DATE,
};

export default authConfig;
