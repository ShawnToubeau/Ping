import { Router } from 'express';
import * as userController from '../controllers/userMongo';
import { UserControllerMethods } from '../enums/UserControllerMethods';

const router = Router();

// GET: all users
router.get('/users', userController.allUsers);

// GET: single user
router.get('/users/:id', userController.getUser);

// POST: add user
router.post(
  '/users',
  userController.validate(UserControllerMethods.addUser),
  userController.addUser
);

// PUT: update user
router.put(
  '/users/:id',
  userController.validate(UserControllerMethods.updateUser),
  userController.updateUser
);

// DELETE: remove user
router.delete('/users/:id', userController.deleteUser);

// POST Login
router.post(
  '/login',
  userController.validate(UserControllerMethods.loginUser),
  userController.loginUser
);

export default router;
