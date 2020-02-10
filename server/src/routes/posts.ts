import { Router } from 'express';
import * as postController from '../controllers/postController';
import { PostControllerMethods } from '../enums/PostControllerMethods';

const router = Router();

// GET: all users
router.get('/users', postController.allPosts);

// GET: single user
router.get('/users/:id', postController.getPost);

// POST: add user
router.post(
  '/users',
  postController.validate(PostControllerMethods.addPost),
  postController.addPost
);

// PUT: update user
router.put(
  '/users/:id',
  postController.validate(PostControllerMethods.updatePost),
  postController.updatePost
);

// DELETE: remove user
router.delete('/users/:id', postController.deletePost);

export default router;
