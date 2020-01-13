import { Request, Response } from 'express';
import User from '../models/Users';

// GET all users
export const allUsers = (req: Request, res: Response) => {
  User.find((err: any, users) => {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
};

// GET single user
export const getUser = (req: Request, res: Response) => {
  User.findById(req.params.id, (err: any, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};

// PUT user
export const addUser = (req: Request, res: Response) => {
  const user = new User(req.body);

  user.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};

// DELETE user
export const removeUser = (req: Request, res: Response) => {
  User.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully deleted user');
    }
  });
};

// POST user
export const updateUser = (req: Request, res: Response) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err: any, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully updated user');
    }
  });
};
