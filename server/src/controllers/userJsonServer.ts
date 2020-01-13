import { Request, Response } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator';
import axios, { AxiosResponse } from 'axios';
import { Methods, UserFields } from '../enums';

const dbUrl = 'http://localhost:3000/users';

// Validator
export const validate = (method: string): ValidationChain[] => {
  switch (method) {
    case Methods.addUser:
    case Methods.updateUser: {
      return [
        check(UserFields.name, 'Missing param').exists(),
        check(UserFields.email, 'Invalid email').isEmail()
      ];
    }
  }

  return [];
};

export const getAllUsers = (req: Request, res: Response): void => {
  axios
    .get(dbUrl)
    .then((dbRes: AxiosResponse) => {
      const users = dbRes.data;

      if (users) {
        res.send(users);
      }
    })
    .catch(err => {
      res.send(err);
    });
};

export const getUser = (req: Request, res: Response): void => {
  const userId = req.params.id;

  if (userId) {
    axios
      .get(`${dbUrl}/${userId}`)
      .then((dbRes: AxiosResponse) => {
        const user = dbRes.data;

        if (user) {
          res.send(user);
        }
      })
      .catch(err => {
        res.send(err);
      });
  }
};

export const addUser = (req: Request, res: Response): void | Response => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = req.body;

  axios
    .post(dbUrl, user)
    .then(() => {
      res.send('Added user');
    })
    .catch(err => {
      res.send(err);
    });
};

export const updateUser = (req: Request, res: Response): void | Response => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const userId = req.params.id;
  const updatedUser = req.body;

  axios
    .put(`${dbUrl}/${userId}`, updatedUser)
    .then(() => {
      res.send(`Updated user ${userId}`);
    })
    .catch(err => {
      res.send(err);
    });
};

export const deleteUser = (req: Request, res: Response): void => {
  const userId = req.params.id;

  if (userId) {
    axios
      .delete(`${dbUrl}/${userId}`)
      .then(() => {
        res.send(`Deleted user ${userId}`);
      })
      .catch(err => {
        res.send(err);
      });
  }
};
