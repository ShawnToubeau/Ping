import { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
  body: string;
  authorId: string;
  dateCreated: Date;
}

const postSchema = new Schema({
  body: String,
  authorId: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Post = model<IPost>('Post', postSchema);

export default Post;
