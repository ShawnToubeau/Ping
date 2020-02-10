import { Router } from 'express';
import * as postController from '../controllers/postController';
import { PostControllerMethods } from '../enums/PostControllerMethods';

const router = Router();

// GET: all users
router.get('/posts', postController.allPosts);

// GET: single user
router.get('/posts/:id', postController.getPost);

// POST: add user
router.post(
  '/posts',
  postController.validate(PostControllerMethods.addPost),
  postController.addPost
);

// PUT: update user
router.put(
  '/posts/:id',
  postController.validate(PostControllerMethods.updatePost),
  postController.updatePost
);

// DELETE: remove user
router.delete('/posts/:id', postController.deletePost);

export default router;
