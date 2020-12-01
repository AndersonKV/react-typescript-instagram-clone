import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import { currentDate, hoursFormated } from "../utils/util";
import User, { UserInterface } from "../models/User";
import Post from "../models/Post";
import Following, { FollowingInterface } from "../models/Following";
import Like from "../models/Like";
import Comment from "../models/Comment";
import {
  GET_ALL_USER_AND_FOLLOWERS_WITH_POSTS,
  formatedStringWithHashtag,
} from "../utils/util";
import auth from "../config/auth";

interface PostInterface {
  id_user: string;
  post_image: string;
  post_text: string;
  user: string;
}

interface Imagem {
  imagem: string;
}

interface AllPosts {
  comments: {
    comment: string;
    id_comment: string;
    id_post: string;
    id_user: string;
    profile_picture: string;
    user: string;
  };
  countLiked: number;
  hasLiked: boolean;
  id_post: string;
  id_user: string;
  name_complete: string;
  post_image: {
    path: string;
  };
  profile_picture: string;
  user: string;
  length: string;
}

interface RequestProps extends Request {
  id_user?: string;
}

export default {
  async store(req: RequestProps, res: Response): Promise<Response> {
    const { post_text } = req.body;
    const id_user = req.id_user;
    const requestImage = req.files as Express.Multer.File[];

    const images = requestImage.map((image) => {
      return { path: image.filename };
    });

    if (images.length === 0) {
      return res.status(200).json({ failed: "image required" });
    }

    try {
      const user = await User.find({ _id: id_user });

      let string = post_text;

      if (string.length === 0) {
        string = null;
      }

      const data = new Array();

      data.push({
        id_user,
        post_text: string,
        post_image: images,
        created_at: currentDate() + ", " + hoursFormated(),
        updated_at: currentDate() + ", " + hoursFormated(),
      });

      const post = await Post.create(data);

      return res.status(200).json({ success: 200 });
    } catch (err) {
      return res.status(209).json({ err: "error 404" });
    }
  },
  async indexAuth(req: RequestProps, res: Response): Promise<Response> {
    const { profile, post, user } = req.query;
    const id_user = req.id_user;

    try {
      //pega o profile
      const getProfile = await User.find({ user: String(profile) });

      //verifica se existe
      if (getProfile !== null) {
        //pega o post
        const getPost = await Post.find({ _id: post });

        //recupera todos os likes
        const like = await Like.find({ id_post: getPost[0]._id });

        let verifyLike;

        //faz a verificação se o usuario autenticado curtiu
        if (like.length > 0) {
          const veifyIsLike = await Like.find({
            id_post: like[0].id_post,
            id_user: id_user,
          });

          if (veifyIsLike.length > 0) {
            verifyLike = true;
          }
        } else {
          verifyLike = false;
        }

        //console.log(verifyLike);
        //*******ADICIONA O HREF AO COMENTARIO COM HASHTAG */

        const textFromPost = formatedStringWithHashtag(getPost[0].post_text);

        //*************PEGA O USUARIO QUE FEZ O POST */
        const getUser = await User.find({ _id: id_user });
        //pega todos os comentarios feito no post
        const comments = await Comment.find({ id_post: getPost[0]._id });

        const arrComments = new Array();

        for (let i = 0; i < comments.length; i++) {
          //PEGA TODOS OS USUARIOS QUE COMENTARAM
          const userWhoComment = await User.find({ _id: comments[i].id_user });

          for (let e = 0; e < userWhoComment.length; e++) {
            const textFromComments = formatedStringWithHashtag(
              comments[i].comment
            );

            arrComments.push({
              commentary: textFromComments,
              id_comment: comments[i]._id,
              id_user: comments[i].id_user,
              id_post: comments[i].id_post,
              user: userWhoComment[e].user,
              name_completed: userWhoComment[e].name_complete,
              profile_picture: userWhoComment[e].profile_picture,
            });
          }
        }

        if (getPost.length !== 0) {
          const data = {
            profile_picture: getProfile[0].profile_picture,
            user: getProfile[0].user,
            _id: getProfile[0]._id,
            id_user: getPost[0].id_user,
            post_image: getPost[0].post_image,
            post_text: textFromPost !== undefined ? textFromPost : false,
            id_post: getPost[0]._id,
            comments: arrComments,
            countLikes: like.length,
            hasLiked: verifyLike,
          };

          return res.status(200).json({ post: data, user: getUser });
        }
      }
      return res.status(400).json({ error: 404 });
    } catch (err) {
      return res.status(400).json({ error: "Error ao encontrar posts" });
    }
  },
  async index(req: Request, res: Response): Promise<Response> {
    const { profile, post } = req.query;

    try {
      //RECUPERA O PERFIL DO USUARIO
      const getProfile = await User.find({ user: String(profile) });

      if (getProfile !== null) {
        //RECUPERA TODOS OS POSTS QUE O USUARIO FEZ
        const getPost = await Post.find({ _id: post });

        const like = await Like.find({ id_post: getPost[0]._id });

        let verifyLike;

        //*******ADICIONA O HREF AO COMENTARIO COM HASHTAG */

        const textFromPost = formatedStringWithHashtag(getPost[0].post_text);

        //*************PEGA O USUARIO QUE FEZ O POST */
        //pega todos os comentarios feito no post
        const comments = await Comment.find({ id_post: getPost[0]._id });

        const arrComments = new Array();

        for (let i = 0; i < comments.length; i++) {
          //PEGA TODOS OS USUARIOS QUE COMENTARAM
          const userWhoComment = await User.find({ _id: comments[i].id_user });

          for (let e = 0; e < userWhoComment.length; e++) {
            const textFromComments = formatedStringWithHashtag(
              comments[i].comment
            );

            arrComments.push({
              commentary: textFromComments,
              id_comment: comments[i]._id,
              id_user: comments[i].id_user,
              id_post: comments[i].id_post,
              user: userWhoComment[e].user,
              name_completed: userWhoComment[e].name_complete,
              profile_picture: userWhoComment[e].profile_picture,
            });
          }
        }

        if (getPost.length !== 0) {
          const data = {
            profile_picture: getProfile[0].profile_picture,
            user: getProfile[0].user,
            _id: getProfile[0]._id,
            id_user: getPost[0].id_user,
            post_image: getPost[0].post_image,
            post_text: textFromPost !== undefined ? textFromPost : false,
            id_post: getPost[0]._id,
            comments: arrComments,
            countLikes: like.length,
            hasLiked: verifyLike,
          };

          return res.status(200).json({ post: data });
        }
      }
      return res.status(400).json({ error: 404 });
    } catch (err) {
      return res.status(400).json({ error: "Error ao encontrar posts" });
    }
  },
  async getAllPosts(req: RequestProps, res: Response): Promise<Response> {
    const id_user = req.id_user;

    try {
      //BUSCA O ID DO USUARIO LOGADO
      const userAuth = await User.find({ _id: id_user });

      //BUSCA TODOS OS POSTS DOS USUARIOS QUE ELE SEGUE
      const postsFromFollowing = await GET_ALL_USER_AND_FOLLOWERS_WITH_POSTS(
        userAuth
      );

      //*LOOP PARA PASSAR HREF A TODOS OS COMENTARIOS INCLUINDO POST DO AUTOR */
      for (let i = 0; i < postsFromFollowing.length; i++) {
        const formatedTextAuthPost = formatedStringWithHashtag(
          postsFromFollowing[i].post_text
        );
        postsFromFollowing[i].post_text = formatedTextAuthPost;

        if (postsFromFollowing[i].comments !== null) {
          for (let c = 0; c < postsFromFollowing[i].comments.length; c++) {
            const formatedComment = formatedStringWithHashtag(
              postsFromFollowing[i].comments[c].comment
            );
            postsFromFollowing[i].comments[c].comment = formatedComment;
            // console.log("fww", postsFromFollowing[i].comments[c].comment);
          }
        }
      }

      const arrRandom = new Array();

      for (let i = 0; i < 5; i++) {
        const userRandom = await User.find({ _id: { $ne: id_user } });

        if (Boolean(userRandom[i]) === true) {
          arrRandom.push(userRandom[i]);
        }
      }

      return res.status(200).json({
        user: userAuth,
        posts: postsFromFollowing,
        userFollowSuggestion: arrRandom,
      });
    } catch (err) {
      return res.status(209).json({ error: "não conseguiu encontrar" });
    }
  },
  async show(req: Request, res: Response): Promise<Response> {
    const posts = await Post.find();
    return res.status(200).json(posts);
  },
  async delete(req: RequestProps, res: Response): Promise<Response> {
    const { _id } = req.params;
    const id_user = req.id_user;

    try {
      const user: any = await User.findById(id_user);
      const post = await Post.findById(_id);

      if (post === null) {
        return res.status(400).send({ error: "problema ao encontrar o post" });
      }
      console.log(user);

      if (user) {
        console.log(user);
        post.remove();
        return res.status(200).send({ sucesso: "post deletado com sucesso" });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  },
  async destroyer(req: Request, res: Response): Promise<Response> {
    try {
      const post = await Post.find().remove();
      return res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  },
};
