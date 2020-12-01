import { Request, Response, json } from "express";
import { currentDate, hoursFormated } from "../utils/util";
import User, { UserInterface } from "../models/User";
import Post from "../models/Post";
import Follower from "../models/Follower";
import Like from "../models/Like";
import Following, { FollowingInterface } from "../models/Following";
//following seguindo
//followers seguidores

interface Provider {
  region: string;
  country: string;
  deleteOne: any;
  company: string;
}

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { id_post, id_user } = req.body;

    try {
      const data = new Array();

      data.push({
        id_post: id_post,
        id_user: id_user,
      });

      const wasLiked: any = await Like.find(data[0]);

      if (wasLiked.length !== 0) {
        await Like.deleteOne(data[0]);
        return res.status(200).json("DISLIKE");
      }

      if (await Post.find({ _id: id_post })) {
        if (await User.find({ _id: id_user })) {
          const userWhoLike = new Array();

          userWhoLike.push({
            id_post: id_post,
            id_user: id_user,
          });

          await Like.create(userWhoLike);
          return res.status(200).json("LIKE");
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getOne(req: Request, res: Response): Promise<Response> {
    const { id_post } = req.body;
    try {
      const like = await Like.find({ id_post: id_post });

      // for (let i = 0; i < like.length; i++) {
      //   const user = await User.find({ _id: like[i].id_user });
      //   console.log(user);
      // }
      return res.status(200).json(like);
    } catch (err) {
      console.log(err);
    }
  },
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const like = await Like.find();

      return res.status(200).json(like);
    } catch (err) {
      console.log(err);
    }
  },
  async destroyer(req: Request, res: Response): Promise<Response> {
    try {
      const like = await Like.find().remove();

      return res.status(200).json(like);
    } catch (err) {
      console.log(err);
    }
  },
};
