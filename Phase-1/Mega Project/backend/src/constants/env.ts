const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Missing enviourment key: ${key}`);
  }

  return value;
};

export const PORT = getEnv("PORT", "3000");
export const MONGO_URI = getEnv("MONGO_URI");
