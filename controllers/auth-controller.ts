import UserDao from "../daos/UserDao";
import {Express, Request, Response} from "express";

const bcrypt = require('bcrypt');
const saltRounds = 10;

const AuthenticationController = (app: Express) => {
  
  const userDao: UserDao = UserDao.getInstance();

  const signup = async (req: any, res: any) => {
    const newUser = req.body;
    const password = newUser.password;
    const hash = await bcrypt.hash(password, saltRounds);
    newUser.password = hash;

    const existingUser = await userDao
        .findUserByUsername(req.body.username);
    if (existingUser) {
       res.sendStatus(403);
       return;
    } else {
      const insertedUser = await userDao
          .createUser(newUser);
        console.log(insertedUser);
      insertedUser.password = '';
      req.session['profile'] = insertedUser;
      res.json(insertedUser);
    }
  }
  app.post("/api/auth/signup", signup);

  const profile = (req: any, res: any) => {
    const profile = req.session['profile'];
    if (profile) {
      profile.password = "";
      res.json(profile);
    } else {
      res.sendStatus(403);
    }
  }
  
  const logout = (req: any, res: any) => {
     req.session.destroy();
     res.sendStatus(200);
  }
  
  app.post("/api/auth/profile", profile);
  app.post("/api/auth/logout", logout);

  const login = async (req: any, res: any) => {
    const user = req.body;
    const username = user.username;
    const password = user.password;
    const existingUser = await userDao
      .findUserByUsername(username);
    console.log(!existingUser);
    console.log(existingUser.password);
    console.log(password);
    if (!existingUser) {
      res.sendStatus(403);
      return;
    }
  
    const match = await bcrypt
      .compare(password, existingUser.password);
    console.log(match);
    if (match) {
      existingUser.password = '*****';
      req.session['profile'] = existingUser;
      res.json(existingUser);
    } else {
      res.sendStatus(403);
    }
  };
  app.post("/api/auth/login", login);
}

export default AuthenticationController;
