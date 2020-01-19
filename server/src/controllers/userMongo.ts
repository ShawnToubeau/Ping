import { Request, Response } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator';
import User from '../models/Users';
import { Methods, UserFields } from '../enums';
import bcrypt from 'bcryptjs';

// Validator
export const validate = (method: string): ValidationChain[] => {
  switch (method) {
    case Methods.addUser: {
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
    case Methods.updateUser: {
      return [
        check(UserFields.name, 'Missing param').exists(),
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
