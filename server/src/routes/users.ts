import { Router, Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

const router = Router();
const dbUrl = 'http://localhost:3000/users';

interface User {
  name: string;
  email: string;
}

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

// Get all users
router.get('/', async (req: Request, res: Response) => {
  const users = await axios.get(dbUrl).then((res: AxiosResponse) => {
    return res.data;
  });

  if (users) {
    res.send(users);
  }
});

// Get single user
// TODO:

// Create a user
router.post(
  '/',
  validateBody(['name', 'email']),
  (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.body;

    axios
      .post(dbUrl, user)
      .then(() => {
        res.send('Added user');
      })
      .catch(err => {
        console.error(err);
        res.send(err.message);
      });
  }
);

// Update a user
router.put(
  '/',
  validateBody(['id', 'name', 'email']),
  (req: Request, res: Response) => {
    const updatedUser = req.body;

    axios
      .put(`${dbUrl}/${updatedUser.id}`, updatedUser)
      .then(() => {
        res.send(`Updated user ${updatedUser.id}`);
      })
      .catch(err => {
        console.error(err);
        res.send(err.message);
      });
  }
);

// Delete a user
router.delete('/', validateBody(['id']), (req: Request, res: Response) => {
  const userId = req.body.id;

  axios
    .delete(`${dbUrl}/${userId}`)
    .then(() => {
      res.send(`Deleted user ${userId}`);
    })
    .catch(err => {
      console.error(err);
      res.send(err.message);
    });
});

export default router;
