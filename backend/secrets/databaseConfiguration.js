module.exports = {
  user: 'node_user',
  host: 'localhost',
  database: 'dragonstackdb',
  password: 'node_password',
  port: 5432,
  ssl: {
    rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
  },
};
