import { config } from 'dotenv';

config( {path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const { 
    PORT, 
    SERVER_URL,
    NODE_ENV, 
    DATABASE_URL,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    QSTASH_URL,
    QSTASH_TOKEN,
    QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_NEXT_SIGNING_KEY,
    EMAIL_PASSWORD
} = process.env;