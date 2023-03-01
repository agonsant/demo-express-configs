import { encryptPassword } from './auth-utils.js';
import dotenv from 'dotenv';

describe('Given Auth utils', () => {
  beforeAll(() => {
    dotenv.config();
  });

  test('When encrypting the same value twice, then it should return the same encryption value', () => {
    const firstEncryptedValue = encryptPassword('hEllo123*');
    const secondEncryptedValue = encryptPassword('hEllo123*');
    expect(firstEncryptedValue).toBe(secondEncryptedValue);
  });
});
