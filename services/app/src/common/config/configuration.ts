export default () => ({
  //? =========== Backend Configuration ===========
  NATS_URL: process.env.NATS_URL,
  NODE_ENV: process.env.NODE_ENV,
  API_GATEWAY_ORIGIN: process.env.API_GATEWAY_ORIGIN,

  // Swagger Docs Configuration
  SWAGGER_USER: process.env.SWAGGER_USER,
  SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD,

  //* Database configuration (PostgreSQL)
  POSTGRESQL_URI_REMOTE: process.env.POSTGRESQL_URI_REMOTE,
  POSTGRESQL_URI_LOCAL: process.env.POSTGRESQL_URI_LOCAL,
  POSTGRESQL_DB_NAME: process.env.POSTGRESQL_DB_NAME,

  //* Database configuration (MongoDB),
  MONGO_URI_REMOTE: process.env.MONGO_URI_REMOTE,
  MONGO_URI_LOCAL: process.env.MONGO_URI_LOCAL,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,

  //! =========== Authentication Layer ===========
  JWT: {
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  },

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  FRONTEND_GOOGLE_CALLBACK_URL: process.env.FRONTEND_GOOGLE_CALLBACK_URL,

  //? Email configuration (NodeMailer STMP)
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || '465'),
  EMAIL_SECURE: process.env.EMAIL_SECURE === 'true',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_FROM: process.env.EMAIL_FROM,
  //* Resend (Email Service)
  RESEND_API_KEY: process.env.RESEND_API_KEY,

  //! =========== Security Layer===========
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,
  GLOBAL_RATE_LIMIT_WINDOW_MS: process.env.GLOBAL_RATE_LIMIT_WINDOW_MS,
  GLOBAL_RATE_LIMIT_MAX_REQUESTS: process.env.GLOBAL_RATE_LIMIT_MAX_REQUESTS,
  STRICT_RATE_LIMIT_WINDOW_MS: process.env.STRICT_RATE_LIMIT_WINDOW_MS,
  STRICT_RATE_LIMIT_MAX_REQUESTS: process.env.STRICT_RATE_LIMIT_MAX_REQUESTS,
  TRUSTED_IPS: process.env.TRUSTED_IPS,

  // DDoS Protection
  DDOS_LIMIT: process.env.DDOS_LIMIT,
  DDOS_BURST: process.env.DDOS_BURST,
  DDOS_WINDOW_MS: process.env.DDOS_WINDOW_MS,
  DDOS_BLACKLIST: process.env.DDOS_BLACKLIST,
  DDOS_WHITELIST: process.env.DDOS_WHITELIST,
  DDOS_AUTO_BAN_COUNT: process.env.DDOS_AUTO_BAN_COUNT,
  DDOS_AUTO_BAN_TIME: process.env.DDOS_AUTO_BAN_TIME,

  // CORS Protection
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  CORS_METHODS: process.env.CORS_METHODS,
  CORS_ALLOWED_HEADERS: process.env.CORS_ALLOWED_HEADERS,
  CORS_EXPOSED_HEADERS: process.env.CORS_EXPOSED_HEADERS,
  CORS_CREDENTIALS: process.env.CORS_CREDENTIALS,
  CORS_MAX_AGE: process.env.CORS_MAX_AGE,
  CORS_WHITELIST: process.env.CORS_WHITELIST,
  CORS_BLACKLIST: process.env.CORS_BLACKLIST,
  CORS_SECURITY_HEADERS: process.env.CORS_SECURITY_HEADERS,
});
