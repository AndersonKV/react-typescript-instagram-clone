import { Request, Response } from "express";
import { currentDate, hoursFormated } from "../utils/util";
import User, { UserInterface } from "../models/User";
import Post from "../models/Post";
import Follower from "../models/Follower";
import Following, { FollowingInterface } from "../models/Following";

//following seguindo
//followers seguidores
type Props = {
  deleteOne?: void;
};

interface ReqDelete extends FollowingInterface {
  deleteOne: (fn?: (err: any, product: this) => void) => Promise<this>;
}

export default {
  async following(req: Request, res: Response): Promise<Response> {
    const { id_user, id_user_following } = req.body;

    const data = new Array();

    data.push({
      id_user: id_user,
      id_user_following: id_user_following,
      created_at: currentDate() + ", " + hoursFormated(),
      updated_at: currentDate() + ", " + hoursFormated(),
    });

    try {
      //verica se existe
      const following = await Following.find({
        id_user: id_user,
        id_user_following: id_user_following,
      });

      //se existir deixa de seguir
      if (following.length !== 0) {
        await Following.deleteOne({
          id_user: id_user,
          id_user_following: id_user_following,
        });
        return res.status(200).json({ success: "deixou de seguir" });
      }
      //se id_user for igual ao id_following bloqueia criação
      if (id_user === id_user_following) {
        return res.status(400).json({ err: "impossivel criação" });
      }

      //req feita com sucesso
      await Following.create(data);
      return res.status(200).json({ success: "começou a seguir" });
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  async unfollow(req: Request, res: Response): Promise<Response> {
    const { id_user, id_user_following } = req.params;

    const data = {
      id_user: id_user_following,
      id_user_following: id_user,
    };

    try {
      const unfollow: any = await Following.find(data);

      await unfollow[0].deleteOne();

      return res.status(200).json("deixou de seguir");

      //const following = await Following.find();
      return res.status(200).json("following");
    } catch (err) {
      return res.status(209).json({ error: "Error ao encontrar perfil" });
    }
  },
  async get_follower(req: Request, res: Response): Promise<Response> {
    //const { id_user, id_user_following } = req.query;
    const id_user = req.query.id_user as string;

    try {
      const following: any = await Following.find({ id_user: id_user });
      const data: any = [];

      for (var i = 0; i < following.length; i++) {
        const users = await User.find({
          _id: following[i].id_user_following,
        });
        data.push({
          name_complete: users[0].name_complete,
          profile_picture: users[0].profile_picture,
          user: users[0].user,
          _id: users[0]._id,
        });
      }

      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json({
        error: "ocorreu algum problema verifique se digitou tudo corretamente",
      });
    }
  },
  async get_following(req: Request, res: Response): Promise<Response> {
    //const { id_user_following } = req.query;
    const id_user_following = req.query.id_user_following as string;

    try {
      var data: any = [];

      const following = await Following.find({
        id_user_following: id_user_following,
      });

      for (var i = 0, len = following.length; i < len; i++) {
        await User.find({ _id: following[i].id_user }).then((user) => {
          data.push({
            name_complete: user[0].name_complete,
            profile_picture: user[0].profile_picture,
            user: user[0].user,
            _id: user[0]._id,
          });
        });
      }

      // console.log(coisa);
      return res.status(200).json(data);
    } catch (err) {
      return res.status(400).json({
        error: "ocorreu algum problema verifique se digitou tudo corretamente",
      });
    }
  },
  async get_list_following(req: Request, res: Response): Promise<Response> {
    const { _id } = req.body;

    try {
      const following = await Following.find({ _id });

      return res.status(200).json(following);
    } catch (err) {
      return res.status(400).json({ error: "Error ao encontrar perfil" });
    }
  },
  async get_all_list(req: Request, res: Response): Promise<Response> {
    const { id_user } = req.body;

    try {
      const following = await Following.find();
      return res.status(200).json(following);
    } catch (err) {
      return res.status(400).json({ error: "Error ao encontrar perfil" });
    }
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
      const following = await Following.find().remove();
      return res.json(following);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  },
};
