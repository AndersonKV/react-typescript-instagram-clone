import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

interface RequestProps extends Request {
  id_user?: string;
}

export default {
  auth(req: RequestProps, res: Response, next: NextFunction) {
    try {
      let authHeader = req.headers.authorization;

      // console.log(req.body.headers.authorization);

      // console.log(req.body.headers.authorization);

      if (!authHeader) {
        return res.status(401).send({ error: "no token provid" });
      }

      if (!authHeader) {
        authHeader = authHeader = req.body.headers.authorization;
      }

      const parts = authHeader.split(" ");

      if (parts.length !== 2) {
        return res.status(409).send({ error: "token erro" });
      }

      const [schema, token] = parts;

      if (!/^Bearer$/i.test(schema)) {
        return res.status(401).send({ error: "token malformated" });
      }

      jwt.verify(token, authConfig[0].secret, (err: Error, decoded: any) => {
        if (err) return res.status(401).send({ error: "token invalid" });

        req.id_user = decoded.id;

        console.log("==============PASSOU===============");
        return next();
      });
    } catch (err) {
      console.log(err);
    }
  },
};
