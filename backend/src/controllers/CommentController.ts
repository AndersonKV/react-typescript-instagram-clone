import { Request, Response } from "express";
import { currentDate, hoursFormated } from "../utils/util";
import User, { UserInterface } from "../models/User";
import Post from "../models/Post";
import Following, { FollowingInterface } from "../models/Following";
import { GET_ALL_USER_AND_FOLLOWERS_WITH_POSTS } from "../utils/util";
import Comment, { CommentInterface } from "../models/Comment";

interface PostInterface {
  id_user: string;
  post_image: string;
  post_text: string;
  user: string;
}

interface Imagem {
  imagem: string;
}

interface DataComment {
  id_user: string;
  id_post: string;
  comment: string;
}
export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { _id, id_post } = req.params;
    const { comment } = req.body;

    try {
      if (await User.find({ _id })) {
        if (await Post.find({ _id: id_post })) {
          const data = new Array();

          data.push({
            id_user: _id,
            id_post: id_post,
            comment,
            created_at: currentDate() + ", " + hoursFormated(),
            updated_at: currentDate() + ", " + hoursFormated(),
          });

          await Comment.create(data);
          return res.status(200).json({ sucess: "ok" });
        }
      }
      //const makeComment = Comment.create({ _id, id_post });
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  async getAllComments(req: Request, res: Response): Promise<Response> {
    try {
      const makeComment = await Comment.find();
      return res.status(200).json(makeComment);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  async destroyer(req: Request, res: Response): Promise<Response> {
    try {
      const makeComment = await Comment.find().remove();

      return res.status(200).json({ sucesso: "todos os arquivos deletados" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },
};
