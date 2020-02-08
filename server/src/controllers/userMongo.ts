import { Request, Response } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator';
import User from '../models/User';
import { UserControllerMethods, UserFields } from '../enums';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config();

// Validator
export const validate = (method: string): ValidationChain[] => {
  switch (method) {
    case UserControllerMethods.addUser: {
      return [
        check(UserFields.name, 'Missing name').exists(),
        check(UserFields.email, 'Invalid email').isEmail(),
        check(UserFields.password, 'Missing password').exists(),
        check(UserFields.email, 'Email is already in use').custom(value => {
          return User.findOne({ email: value }).then(user => {
            if (user) {
              return Promise.reject();
            }
          });
        })
      ];
    }
    case UserControllerMethods.updateUser: {
      return [
        check(UserFields.name, 'Missing param').exists(),
        check(UserFields.email, 'Invalid email').isEmail(),
        check(UserFields.password, 'Missing password').exists()
      ];
    }
    case UserControllerMethods.loginUser: {
      return [
        check(UserFields.email, 'Invalid email').isEmail(),
        check(UserFields.password, 'Missing password').exists()
      ];
    }
  }

  return [];
};

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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password
  });

  // Hash password
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;

      // Set password to hashed
      user.password = hash;
      // Save user
      user
        .save()
        .then(user => {
          res.send('Added user');
        })
        .catch(err => res.send(err));
    })
  );
};

// DELETE user
export const deleteUser = (req: Request, res: Response) => {
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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.findByIdAndUpdate(req.params.id, req.body, (err: any, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully updated user');
    }
  });
};

// POST login
export const loginUser = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ userNotFound: 'The user is not found' });
    }

    // Match password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };

        const secretOrKey = process.env.SECRET || 'secret';
        jwt.sign(
          payload,
          secretOrKey,
          { expiresIn: 31556926 },
          (err, token) => {
            res.json({ success: true, token: `Bearer ${token}` });
          }
        );
      } else {
        return res.status(404).json({ wrongPassword: 'Password is incorrect' });
      }
    });
  });
};
