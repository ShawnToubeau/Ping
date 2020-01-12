import { Router, Request, Response, NextFunction } from 'express';
import * as jsonServer from '../databases/jsonServer';

const router = Router();

// Middlewares
function validateBody(keys: string[]) {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property "${key}"`);
        return;
      }
    }

    next();
  };
}

// GET: all users
router.get('/users', jsonServer.getAllUsers);

// GET: single user
router.get('/users/:id', jsonServer.getUser);

// POST: add user
router.post('/users', validateBody(['name', 'email']), jsonServer.addUser);

// PUT: update user
router.put(
  '/users/:id',
  validateBody(['name', 'email']),
  jsonServer.updateUser
);

// DELETE: remove user
router.delete('/users/:id', jsonServer.deleteUser);

export default router;
