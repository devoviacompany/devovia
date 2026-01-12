export default () => ({
  //? =========== Backend Configuration ===========
  NATS_URL: process.env.NATS_URL,
  NATS_USER: process.env.NATS_USER,
  NATS_PASSWORD: process.env.NATS_PASSWORD,
  NODE_ENV: process.env.NODE_ENV,

  //* Database configuration (PostgreSQL)
  POSTGRESQL_URI_REMOTE: process.env.POSTGRESQL_URI_REMOTE,
  POSTGRESQL_URI_LOCAL: process.env.POSTGRESQL_URI_LOCAL,
  POSTGRESQL_DB_NAME: process.env.POSTGRESQL_DB_NAME,

  //* Database configuration (MongoDB),
  MONGO_URI_REMOTE: process.env.MONGO_URI_REMOTE,
  MONGO_URI_LOCAL: process.env.MONGO_URI_LOCAL,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,

  //? Email configuration (Resend Service)
  RESEND_API_KEY: process.env.RESEND_API_KEY,
});
