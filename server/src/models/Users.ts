import { Schema, model, Document } from 'mongoose';

export interface Post {
  body: string;
  likes: number;
  date?: Date;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  date?: Date;
  posts: Post[];
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  posts: {
    type: Array
  }
});

const User = model<IUser>('User', userSchema);

export default User;
