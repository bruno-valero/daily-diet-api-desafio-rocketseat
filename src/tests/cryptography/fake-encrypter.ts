import { Encrypter } from '@/domain/application/cryptography/encrypter'

export class FakeEncrypter implements Encrypter {
  async hash(plainText: string): Promise<string> {
    return plainText.concat('-encrypted')
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return plainText.concat('-encrypted') === hash
  }
}
