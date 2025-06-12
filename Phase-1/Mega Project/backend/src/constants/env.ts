const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Missing enviourment key: ${key}`);
  }

  return value;
};

export const PORT = getEnv("PORT", "3000");
export const MONGO_URI = getEnv("MONGO_URI");
export const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET");
export const ACCESS_TOKEN_EXPIRY = getEnv("ACCESS_TOKEN_EXPIRY", "1d");
export const REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET");
export const REFRESH_TOKEN_EXPIRY = getEnv("REFRESH_TOKEN_EXPIRY", "15m");
