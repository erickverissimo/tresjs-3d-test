import jwt from 'jsonwebtoken';

export class Token {
  constructor(
    readonly payload: string | object | Buffer,
    readonly token_secret: string,
    readonly expiresIn: number = 60 * 60 * 24 * 30
  ) {}

  sign() {
    return jwt.sign(this.payload, this.token_secret, {
      expiresIn: this.expiresIn,
    });
  }

  static verify(token: string, secret: string, cb: jwt.VerifyCallback) {
    jwt.verify(token, secret, cb);
  }
}
