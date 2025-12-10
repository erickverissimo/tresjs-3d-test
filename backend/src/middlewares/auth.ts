import { Request, Response, NextFunction } from 'express';

import jwt from '../utils/jwt';
import { Errors } from '../core/shared/errors';
import { AuthPermissions } from '../core';

async function checkToken(authorization?: string | null): Promise<object> {
  return new Promise((resolve, reject) => {
    if (!authorization) {
      return reject({
        status: 401,
        auth: false,
        message: Errors.TOKEN_NOT_FOUND,
      });
    }

    const parts = authorization.split(' ');
    if (parts.length !== 2) {
      return reject({
        status: 401,
        auth: false,
        message: Errors.INVALID_TOKEN,
      });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return reject({
        status: 401,
        auth: false,
        message: Errors.INVALID_TOKEN,
      });
    }

    jwt.verify(token, function (err: any, decoded: any) {
      if (err) {
        return reject({
          status: 401,
          auth: false,
          message: Errors.INVALID_TOKEN,
        });
      }

      resolve(decoded);
    });
  });
}
export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const decoded = await checkToken(req.headers?.authorization);
    req['userId'] = decoded['id'];
    req['roles'] = decoded['roles'] ?? [];
    req['permissions'] = decoded['permissions'] ?? [];
    return next();
  } catch (e) {
    return res.status(e.status).json(e);
  }
}

export async function authSocket(socket: any, next: any) {
  try {
    const token = socket.handshake.auth.token;
    const decoded = await checkToken(token);
    // se tudo estiver ok, salva no request para uso posterior
    socket['userId'] = decoded['id'];
    socket['roles'] = decoded['roles'] ?? [];
    socket['permissions'] = decoded['permissions'] ?? [];
    return next();
  } catch (e) {
    return next(new Error(e.message));
  }
}

export function hasRole(...roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRoles = req['roles'] ?? [];
      if (roles.every((role) => userRoles.includes(role))) {
        return next();
      }
      return res
        .status(401)
        .json({ auth: false, message: Errors.UNAUTHORIZED });
    } catch (e) {
      return res
        .status(401)
        .json({ auth: false, message: Errors.UNAUTHORIZED });
    }
  };
}

export function hasPermission({
  resource,
  action,
}: AuthPermissions.Permission) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userPermissions = req['permissions'] ?? [];
      for (const permission of userPermissions) {
        if (permission.resource === resource && permission.action === action) {
          return next();
        }
      }
      return res
        .status(401)
        .json({ auth: false, message: Errors.UNAUTHORIZED });
    } catch (e) {
      return res
        .status(401)
        .json({ auth: false, message: Errors.UNAUTHORIZED });
    }
  };
}

export function hasPermissions(permissions: AuthPermissions.Permission[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userPermissions = req['permissions'] ?? [];
      for (const permission of userPermissions) {
        if (
          permissions.some(
            (item) =>
              item.action === permission.action &&
              item.resource === permission.resource
          )
        ) {
          return next();
        }
      }
      return res
        .status(401)
        .json({ auth: false, message: Errors.UNAUTHORIZED });
    } catch (e) {
      return res
        .status(401)
        .json({ auth: false, message: Errors.UNAUTHORIZED });
    }
  };
}

export interface AuthenticatedRequest extends Request {
  userId: string;
  roles: string[];
}
