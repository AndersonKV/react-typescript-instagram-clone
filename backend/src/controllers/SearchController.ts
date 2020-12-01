import { Request, Response } from "express";
import { currentDate, hoursFormated } from "../utils/util";
import User, { UserInterface } from "../models/User";
import Post from "../models/Post";
import Following, { FollowingInterface } from "../models/Following";
import Like from "../models/Like";
import {
  GET_ALL_USER_AND_FOLLOWERS_WITH_POSTS,
  formatedStringWithHashtag,
} from "../utils/util";
import Comment, { CommentInterface } from "../models/Comment";

export default {
  async searchWord(req: Request, res: Response): Promise<Response> {
    const { word } = req.body.params;

    if (word[0] === "#") {
      const posts = await Post.find({ post_text: new RegExp(word, "g") });

      const initArr: any = [];

      for (let i = 0; i < posts.length; i++) {
        const hash = posts[i].post_text.split(" ");

        for (let t = 0; t < hash.length; t++) {
          if (hash[t][0] === "#") {
            const str = hash[t].substring(1);

            const obj = str;
            initArr.push(obj);
          }
        }
      }
      const counts: any = {};

      initArr.forEach(function (x: any) {
        counts[x] = (counts[x] || 0) + 1;
      });

      const entries = Object.entries(counts);
      const arrFinal: any = [];

      entries.forEach((element: any) => {
        arrFinal.push({ name: element[0], quantity: element[1] });
      });

      return res.status(200).json({ posts: arrFinal });
    } else {
      const users = await User.find({ user: new RegExp(word, "i") });

      return res.status(200).json({ users: users });
    }

    // } else {
    //   const users = await User.find({ user: new RegExp(word, "i") });

    //   console.log("users");
    //   console.log(users);

    //   return res.status(200).json({ users: users });
    // }
  },
  async searchPosts(req: Request, res: Response): Promise<Response> {
    const { hashWord } = req.body.params;

    if (Boolean(hashWord) === true) {
      const posts = await Post.find({ post_text: new RegExp(hashWord, "i") });

      const sortedPost = posts.sort(function (p1, p2) {
        if (p1.created_at < p2.created_at) {
          return 1;
        } else {
          return -1;
        }
      });

      const arr = [];

      for (let i = 0; i < sortedPost.length; i++) {
        const likes = await Like.find({ id_post: sortedPost[i]._id });
        const comments = await Comment.find({ id_post: sortedPost[i]._id });
        const users = await User.find({ _id: sortedPost[i].id_user });

        let path = sortedPost[i].post_image as any;

        arr.push({
          post_image: path[0],
          likes: likes.length,
          comments: comments.length,
          user: users[0].user,
          _id: sortedPost[i]._id,
        });
      }
      return res.status(200).json({ posts: arr });
    }
    // } else {
    //   const users = await User.find({ user: new RegExp(word, "i") });

    //   console.log("users");
    //   console.log(users);

    //   return res.status(200).json({ users: users });
    // }
  },
  async AllPosts(req: Request, res: Response): Promise<Response> {
    const posts = await Post.find();

    const sortedPost = posts.sort(function (p1, p2) {
      if (p1.created_at < p2.created_at) {
        return 1;
      } else {
        return -1;
      }
    });

    const arr = [];

    for (let i = 0; i < sortedPost.length; i++) {
      const likes = await Like.find({ id_post: sortedPost[i]._id });
      const comments = await Comment.find({ id_post: sortedPost[i]._id });
      const users = await User.find({ _id: sortedPost[i].id_user });

      let path = sortedPost[i].post_image as any;

      arr.push({
        post_image: path[0],
        likes: likes.length,
        comments: comments.length,
        user: users[0].user,
        _id: sortedPost[i]._id,
      });
    }
    return res.status(200).json({ posts: arr });
  },
};
