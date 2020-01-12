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
router.get('/users', async (req: Request, res: Response) => {
  const users = await axios.get(dbUrl).then((res: AxiosResponse) => {
    return res.data;
  });

  if (users) {
    res.send(users);
  }
});

// Get single user
router.get('/users/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (userId) {
    const users = await axios
      .get(`${dbUrl}/${userId}`)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch(err => {
        console.error(err);
        res.status(404).send(`User with ID ${userId} not found`);
      });

    if (users) {
      res.send(users);
    }
  }
});

// Create a user
router.post(
  '/users',
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
  '/users',
  validateBody(['id', 'name', 'email']),
  (req: Request, res: Response) => {
    const updatedUser = req.body;

    axios
      .put(`${dbUrl}/${updatedUser.id}`, updatedUser)
      .then(() => {
        res.send(`Updated user with ID ${updatedUser.id}`);
      })
      .catch(err => {
        console.error(err);
        res.send(`Failed to update user with ID ${updatedUser.id}`);
      });
  }
);

// Delete a user
router.delete('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id;

  axios
    .delete(`${dbUrl}/${userId}`)
    .then(() => {
      res.send(`Deleted user ${userId}`);
    })
    .catch(err => {
      console.error(err);
      res.send(`Could not delete user with ID ${userId}`);
    });
});

export default router;
