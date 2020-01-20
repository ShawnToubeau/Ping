import { Router } from 'express';
// import * as jsonServer from '../controllers/userJsonServer';
import * as userController from '../controllers/userMongo';
import { Methods } from '../enums/Methods';

const router = Router();

// GET: all users
router.get('/users', userController.allUsers);

// GET: single user
router.get('/users/:id', userController.getUser);

// POST: add user
router.post(
  '/users',
  userController.validate(Methods.addUser),
  userController.addUser
);

// PUT: update user
router.put(
  '/users/:id',
  userController.validate(Methods.updateUser),
  userController.updateUser
);

// DELETE: remove user
router.delete('/users/:id', userController.deleteUser);

// POST Login
router.post(
  '/login',
  userController.validate(Methods.loginUser),
  userController.loginUser
);

export default router;
