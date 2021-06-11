module.exports = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE || 'dragonstackdb',
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
};
