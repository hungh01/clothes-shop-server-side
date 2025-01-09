import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["token"];
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET_KEY || "");
    res.locals.jwtPayload = jwtPayload;

  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send('Unauthenticated');
    return;
  }
  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, email , role  } = jwtPayload;
  const newToken = jwt.sign({ userId, email, role }, 
    process.env.JWT_SECRET_KEY || "",
    {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);
  //Call the next middleware or controller
  next();
};
