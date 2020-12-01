import { Request, Response } from "express";
import { currentDate, hoursFormated } from "../utils/util";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import User, { UserInterface } from "../models/User";
import Post from "../models/Post";
import Follower from "../models/Follower";
import Following from "../models/Following";
import Comment from "../models/Comment";
import { makeHash } from "../utils/util";
import Like from "../models/Like";

interface RequestProps extends Request {
  id_user?: string;
}

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, user, password, name_complete } = req.body.data;

    try {
      if (await User.findOne({ email })) {
        return res.status(209).json({ error: "Email já foi registrado" });
      }

      if (await User.findOne({ user })) {
        return res.status(209).json({ error: "Esse usuario já está em uso" });
      }

      const data = new Array();

      data.push({
        email,
        user,
        name_complete,
        password,
        created_at: currentDate() + ", " + hoursFormated(),
        updated_at: currentDate() + ", " + hoursFormated(),
      });

      await User.create(data);
      return res.json({ sucess: "ok" });
    } catch (err) {
      return res.status(209).json({
        error: "ocorreu algum problema verifique se digitou tudo corretamente",
      });
    }
  },
  async update(req: Request, res: Response): Promise<Response> {
    const {
      _id,
      name_complete,
      user,
      email,
      newPassword,
      oldPassword,
    } = req.body;

    const requestImage = req.files as Express.Multer.File[];
    const image = requestImage.map((image) => {
      return image.filename;
    });

    try {
      const checkedUser = await User.find({ _id });
      const id = checkedUser[0]._id;
      const update = new Array();

      if (name_complete != null) {
        update.push({ name_complete });
      }

      if (user != null) {
        const userName = await User.find({ user: user });

        if (userName.length > 0) {
          return res.status(209).json({ error: "usúario já existe" });
        } else {
          update.push({ user });
        }
      }

      if (email != null) {
        const verifyEmail = await User.find({ email });

        if (verifyEmail.length > 0) {
          return res.status(209).json({ error: "email já foi registrado" });
        } else {
          update.push({ email });
        }
      }

      if (image.length > 0) {
        update.push({ profile_picture: image[0] });
      }

      if (oldPassword > 0) {
        const verifyPassword = await User.find({ _id }).select("+password");

        const hashVerify = await bcryptjs.compare(
          oldPassword,
          verifyPassword[0].password
        );

        if (!hashVerify) {
          res.status(201).send({ error: "senha invalida" });
        } else {
          update.push({ password: newPassword });
        }
      }

      if (checkedUser.length > 0) {
        //se o password for atualizado
        if (newPassword) {
          bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(newPassword, salt, async function (err, hash) {
              update[0].password = hash;
              const userUpdate = await User.findByIdAndUpdate(id, update[0], {
                new: true,
              });
            });
          });
        } else {
          const userUpdate = await User.findByIdAndUpdate(id, update[0], {
            new: true,
          });
        }

        return res.status(200).json({ success: "atualizado" });
      }
      return res.status(200).json({ fail: "problema" });
    } catch (err) {
      return res.status(209).json({ err });
    }
  },
  async get_all_user(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;

    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ error: "Error ao encontrar perfil" });
    }
  },
  async login(req: Request, res: Response): Promise<Response> {
    const { user, password } = req.body;

    try {
      const veirfyEmailOrUse = user.search("@");

      /***LOGGIN ATRAVES DO USER */
      if (veirfyEmailOrUse === -1) {
        const userAuth = await User.find({
          user: user.toLowerCase(),
        }).select("+password");

        if (!userAuth[0]) {
          res.status(201).send({ error: "usuario não encontrado" });
        }

        const hashVerify = await bcryptjs.compare(
          password,
          userAuth[0].password
        );

        console.log(hashVerify);
        if (!hashVerify) {
          res.status(201).send({ error: "senha invalida" });
        }

        //password com hash
        const token = jwt.sign({ id: userAuth[0]._id }, authConfig[0].secret, {
          expiresIn: 86400,
        });

        userAuth[0].password = undefined;
        userAuth[0].created_at = undefined;
        userAuth[0].updated_at = undefined;

        res.status(200).send({ user: userAuth[0], token: token });
      } else {
        const userAuth = await User.find({
          email: user.toLowerCase(),
        }).select("+password");

        if (!userAuth[0]) {
          res.status(201).send({ error: "email não encontrado" });
        }

        if (!(await bcryptjs.compare(password, userAuth[0].password))) {
          res.status(201).send({ error: "senha invalida" });
        }

        //password com hash
        const token = jwt.sign({ id: userAuth[0]._id }, authConfig[0].secret, {
          expiresIn: 86400,
        });

        userAuth[0].password = undefined;
        userAuth[0].created_at = undefined;
        userAuth[0].updated_at = undefined;

        res.status(200).send({ user: userAuth[0], token: token });
      }
    } catch (err) {
      return res.status(400).send(res);
    }
  },
  async user(req: RequestProps, res: Response): Promise<Response> {
    const { profile } = req.query;
    const id_user = req.id_user;

    try {
      //pega o usuario
      const user = await User.find({ _id: id_user });
      user[0].password = undefined;

      /*
      A ROTA get.APP/USER, PODE RETORNA UM OU DOIS VALORES
      SE O USER_ONLY ESTIVER SETADO COMO TRUE DEVE RETORNA UM 
      SENÃO RETORNA O USUARIO AUTENTICADO E O PERFIL DE OUTRO
      ESSE METODO É USADO QUANDO FOR NECESSARIO RECUPERAR APENAS O USUARIO
      */

      if (Boolean(req.query.USER_ONLY) === true) {
        return res.status(200).json({ user: user });
      }

      //pega o usuario
      const getProfile = await User.find({
        user: String(profile).toLowerCase(),
      });

      const posts = await Post.find({ id_user: getProfile[0]._id });

      const sortedPost = posts.sort(function (p1, p2) {
        if (p1.created_at < p2.created_at) {
          return 1;
        } else {
          return -1;
        }
      });

      //pega todos os perfis que o usuario segue e é seguido
      const follower = await Following.find({ id_user: getProfile[0]._id });
      const following = await Following.find({
        id_user_following: getProfile[0]._id,
      });

      const isFollowing = await Following.find({
        id_user: getProfile[0]._id,
        id_user_following: user[0]._id,
      });

      const newArrPost = new Array();

      for (let i = 0; i < sortedPost.length; i++) {
        const l = await Like.find({ id_post: posts[i]._id });

        if (l.length !== 0) {
          newArrPost.push({
            id_user: sortedPost[i].id_user,
            _id: sortedPost[i]._id,
            post_image: sortedPost[i].post_image,
            post_text: sortedPost[i].post_text,
            likes: l.length,
          });
        } else {
          newArrPost.push({
            id_user: sortedPost[i].id_user,
            _id: sortedPost[i]._id,
            post_image: sortedPost[i].post_image,
            post_text: sortedPost[i].post_image,
            likes: l.length,
          });
        }
      }

      const dataProfile = {
        email: getProfile[0].email,
        name_complete: getProfile[0].name_complete,
        profile_picture: getProfile[0].profile_picture,
        user: getProfile[0].user,
        _id: getProfile[0]._id,
        my_follower: follower.length,
        my_following: following.length,
        my_posts: posts.length,
      };

      const dataUser = {
        email: user[0].email,
        name_complete: user[0].name_complete,
        profile_picture: user[0].profile_picture,
        user: user[0].user,
        _id: user[0]._id,
        user_following: isFollowing.length === 1 ? true : false,
      };

      return res
        .status(200)
        .json({ user: dataUser, profile: dataProfile, post: newArrPost });
    } catch (err) {
      return res.status(400).json({ error: "Error ao encontrar perfil" });
    }
  },
  async profileAuth(req: RequestProps, res: Response): Promise<Response> {
    const { profile } = req.query;
    const id_user = req.id_user;

    try {
      //pega o usuario
      const getUser = await User.find({
        _id: id_user,
      });

      //pega o profile
      const getProfile = await User.find({
        user: String(profile).toLowerCase(),
      });

      //pega todos os posts do usuario
      const posts = await Post.find({ id_user: getProfile[0]._id });

      const sortedPost = posts.sort(function (p1, p2) {
        if (p1.created_at < p2.created_at) {
          return 1;
        } else {
          return -1;
        }
      });

      //pega todos os perfis que o usuario segue e é seguido
      const follower = await Following.find({ id_user: getProfile[0]._id });
      const following = await Following.find({
        id_user_following: getProfile[0]._id,
      });

      // console.log(getProfile[0]._id, getUser[0]._id);

      const isFollowing = await Following.find({
        id_user: getProfile[0]._id,
        id_user_following: getUser[0]._id,
      });

      const newArrPost = new Array();

      for (let i = 0; i < sortedPost.length; i++) {
        const likes = await Like.find({ id_post: sortedPost[i]._id });
        const comments = await Comment.find({ id_post: sortedPost[i]._id });

        let path = sortedPost[i].post_image as any;

        newArrPost.push({
          id_user: sortedPost[i].id_user,
          _id: sortedPost[i]._id,
          post_image: path[0],
          post_text: sortedPost[i].post_text,
          likes: likes.length,
          comments: comments.length,
        });
      }

      const data = {
        email: getProfile[0].email,
        name_complete: getProfile[0].name_complete,
        profile_picture: getProfile[0].profile_picture,
        user: getProfile[0].user,
        _id: getProfile[0]._id,
        my_follower: follower.length,
        my_following: following.length,
        my_posts: posts.length,
        isFollowing: isFollowing.length === 1 ? true : false,
      };

      return res
        .status(200)
        .json({ user: getUser[0], profile: data, post: newArrPost });
    } catch (err) {
      return res.status(400).json({ error: "Error ao encontrar perfil" });
    }
  },
  async profile(req: RequestProps, res: Response): Promise<Response> {
    const { profile } = req.query;

    try {
      //pega o usuario
      const getProfile = await User.find({
        user: String(profile).toLowerCase(),
      });

      getProfile[0].password = undefined;

      //pega todos os posts do usuario
      const posts = await Post.find({ id_user: getProfile[0]._id });

      const sortedPost = posts.sort(function (p1, p2) {
        if (p1.created_at < p2.created_at) {
          return 1;
        } else {
          return -1;
        }
      });

      //pega todos os perfis que o usuario segue e é seguido
      const follower = await Following.find({ id_user: getProfile[0]._id });
      const following = await Following.find({
        id_user_following: getProfile[0]._id,
      });

      const newArrPost = new Array();

      //recupera todos os likes em cada post
      for (let i = 0; i < sortedPost.length; i++) {
        const likes = await Like.find({ id_post: sortedPost[i]._id });
        const comments = await Comment.find({ id_post: sortedPost[i]._id });

        let path = sortedPost[i].post_image as any;

        newArrPost.push({
          id_user: sortedPost[i].id_user,
          _id: sortedPost[i]._id,
          post_image: path[0],
          post_text: sortedPost[i].post_text,
          likes: likes.length,
          comments: comments.length,
        });
      }

      const data = {
        email: getProfile[0].email,
        name_complete: getProfile[0].name_complete,
        profile_picture: getProfile[0].profile_picture,
        user: getProfile[0].user,
        _id: getProfile[0]._id,
        my_follower: follower.length,
        my_following: following.length,
        my_posts: posts.length,
      };

      return res.status(200).json({ profile: data, post: newArrPost });
    } catch (err) {
      return res.status(400).json({ error: "Error ao encontrar perfil" });
    }
  },
  async getId(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    // console.log(req.body);
    // console.log(req.query);
    // console.log(req.params);

    try {
      let user = await User.findOne(email);
      user.password = null;
      user.__v = null;
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ error: "Error ao encontrar perfil" });
    }
  },
  async show(req: Request, res: Response): Promise<Response> {
    const { user, password } = req.body;

    const users = await User.find({ user }).select("+password");

    try {
      const hashVerify = await bcryptjs.compare(password, users[0].password);

      if (!hashVerify) {
        return res.status(200).json(users);
      }
      // return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json(err);
    }

    const data = new Array();

    // for (let i = 0; i < users.length; i++) {
    //   if (!(await bcryptjs.compare(users[i].password, users[i].password))) {
    //     console.log(users[i]);
    //   }
    // }

    // users.forEach(async (element, i) => {
    //   console.log(makeHash(element.password));
    // });
  },
  async edit(req: RequestProps, res: Response): Promise<Response> {
    const id_user = req.id_user;

    const user = await User.find({ _id: id_user }).select("+password");

    return res.status(200).json({ user });
  },
  async delete(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;

    try {
      const user = await User.findById(_id);
      if (user === null) {
        return res
          .status(400)
          .send({ error: "problema ao encontrar o perfil" });
      }

      user.remove();
      return res.status(200).send({ sucesso: "perfil deletado com sucesso" });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  },
  async destroyer(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.find().remove();
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  },
};
