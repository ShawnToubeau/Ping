import { Router } from 'express';
import * as jsonServer from '../controllers/userJsonServer';
import { Methods } from '../enums/Methods';

const router = Router();

// GET: all users
router.get('/users', jsonServer.getAllUsers);

// GET: single user
router.get('/users/:id', jsonServer.getUser);

// POST: add user
router.post('/users', jsonServer.validate(Methods.addUser), jsonServer.addUser);

// PUT: update user
router.put(
  '/users/:id',
  jsonServer.validate(Methods.updateUser),
  jsonServer.updateUser
);

// DELETE: remove user
router.delete('/users/:id', jsonServer.deleteUser);

export default router;
