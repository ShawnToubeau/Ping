import { Request, Response } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator';
import Post from '../models/Post';
import { PostControllerMethods, PostFields } from '../enums';
require('dotenv').config();

// Validator
export const validate = (method: string): ValidationChain[] => {
  switch (method) {
    case (PostControllerMethods.addPost, PostControllerMethods.updatePost): {
      return [check(PostFields.body, 'Missing post body').exists()];
    }
  }

  return [];
};

// GET all posts
export const allPosts = (req: Request, res: Response) => {
  Post.find((err: any, posts) => {
    if (err) {
      res.send(err);
    } else {
      res.send(posts);
    }
  });
};

// GET single post
export const getPost = (req: Request, res: Response) => {
  Post.findById(req.params.id, (err: any, post) => {
    if (err) {
      res.send(err);
    } else {
      res.send(post);
    }
  });
};

// POST post
export const addPost = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { body } = req.body;

  new Post({
    body
  }).save();
};

// DELETE post
export const deletePost = (req: Request, res: Response) => {
  Post.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully deleted post');
    }
  });
};

// PUT post
export const updatePost = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Post.findByIdAndUpdate(req.params.id, req.body, (err: any, post) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully updated post');
    }
  });
};
