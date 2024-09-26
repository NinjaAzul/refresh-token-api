import { hash } from 'bcrypt';

export const generateHash = (dataToEncrypt: string): Promise<string> => {
  const rounds = 10;

  return new Promise((resolve, reject) => {
    hash(dataToEncrypt, rounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};
