import { Buffer } from "buffer";

// Функция для кодирования строки в BASE64
export const encodeBase64 = (email, code) => {
  const stringToEncode = `${email}:${code}`;
  return Buffer.from(stringToEncode).toString("base64");
};

// Функция для маскирования строки, оставляя видимыми только первые `visibleStart` символов и последние `visibleEnd` символов
export const maskString = (str, visibleStart, visibleEnd) => {
  const start = str.slice(0, visibleStart);
  const end = str.slice(-visibleEnd);
  return `${start}***...***${end}`;
};

// Функция для проверки имени и фамилии на отсутствие цифр
export const containsOnlyLetters = (name) =>
  /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name);

// Функция для проверки формата email
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
