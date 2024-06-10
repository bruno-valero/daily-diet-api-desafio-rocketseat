import { Encrypter } from '@/domain/application/cryptography/encrypter'
import { hash, compare } from 'bcryptjs'

export class BcryptEncrypter implements Encrypter {
  hash(plainText: string): Promise<string> {
    return hash(plainText, 8)
  }

  compare(plainText: string, hash: string): Promise<boolean> {
    return compare(plainText, hash)
  }
}
