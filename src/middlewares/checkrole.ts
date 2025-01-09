import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";


export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const userRole = res.locals.jwtPayload.role;
    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(userRole)>-1) next();
    else res.status(401).send('Unauthorized');
  };
};
