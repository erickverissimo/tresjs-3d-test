import jwt from 'jsonwebtoken';
import { Environment } from '../config/environment';

function sign(
  payload: string | object | Buffer,
  expiresIn = Environment.getTokenExpiresInSeconds()
) {
  return jwt.sign(payload, Environment.getTokenSecret(), {
    expiresIn,
  });
}

function verify(token: string, cb: jwt.VerifyCallback) {
  jwt.verify(token, Environment.getTokenSecret(), cb);
}

export default {
  sign,
  verify,
};
