import { Router, Request, Response } from 'express';
import axios from 'axios';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password"/>
        </div>
        <button>Submit</button>
      </form>
    `);
});

router.post('/', (req: Request, res: Response) => {
  // const { email, password } = req.body;
  // console.log(email, password);
  console.log(req.body);
});

export default router;
