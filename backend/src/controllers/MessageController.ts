// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import authConfig from "../config/auth";
// import { currentDate, hoursFormated } from "../utils/util";
// import User, { UserInterface } from "../models/User";
// import Post from "../models/Post";
// import Following, { FollowingInterface } from "../models/Following";
// import Like from "../models/Like";
// import Comment from "../models/Comment";
// import Message from "../models/Message";
// import {
//   GET_ALL_USER_AND_FOLLOWERS_WITH_POSTS,
//   formatedStringWithHashtag,
// } from "../utils/util";

// import auth from "../config/auth";

// interface PostInterface {
//   id_user: string;
//   post_image: string;
//   post_text: string;
//   user: string;
// }

// interface Imagem {
//   imagem: string;
// }

// interface AllPosts {
//   comments: {
//     comment: string;
//     id_comment: string;
//     id_post: string;
//     id_user: string;
//     profile_picture: string;
//     user: string;
//   };
//   countLiked: number;
//   hasLiked: boolean;
//   id_post: string;
//   id_user: string;
//   name_complete: string;
//   post_image: {
//     path: string;
//   };
//   profile_picture: string;
//   user: string;
//   length: string;
// }

// interface RequestProps extends Request {
//   id_user?: string;
// }

// export default {
//   async create(req: RequestProps, res: Response): Promise<Response> {
//     const { id_auth, id_user, comment } = req.body;
//     //const id_user = req.id_user;

//     try {
//       const userAuth = await User.findById(id_auth);
//       const user = await User.findById(id_user);

//       const data = new Array();

//       var date = new Date();

//       var seconds = date.getSeconds();
//       var minutes = date.getMinutes();
//       var hour = date.getHours();

//       var year = date.getFullYear();
//       var month = date.getMonth(); // beware: January = 0; February = 1, etc.
//       var day = date.getDate();

//       var dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, etc.
//       var milliSeconds = date.getMilliseconds();

//       data.push({
//         id_auth,
//         id_user,
//         comment,
//         created_at: `${hour}:${minutes}:${seconds}`,
//         updated_at: `${hour}:${minutes}:${seconds}`,
//       });

//       const message = await Message.create(data);

//       console.log(message);
//       return res.status(200).json(message);
//     } catch (err) {
//       return res.status(409).json({ error: "error bro" });
//     }
//   },
//   async recover(req: RequestProps, res: Response): Promise<Response> {
//     const { id_auth, id_user, comment } = req.query;

//     //recupera todas as mensagens que o usuario envio
//     const getMessagesAuth = await Message.find({ id_auth: String(id_auth) });

//     // const getMessages = await Message.find({
//     //   id_user: getMessagesAuth[0].id_auth,
//     // });

//     const arr = new Array();

//     for (var i = 0, l = getMessagesAuth.length; i < l; i++) {
//       const user = await User.find({ _id: getMessagesAuth[i].id_user });
//       arr.push(user[0]);
//     }

//     let uniqueChars: any = [];

//     arr.forEach((c) => {
//       if (!uniqueChars.includes(c.user)) {
//         uniqueChars.push(c.user);
//       }
//     });

//     let arrFinal: any = [];

//     let finalArrUsers: any = [];
//     const entries = Object.entries(uniqueChars);

//     entries.forEach((element: any) => {
//       arrFinal.push({ user: element[1], index: element[0] });
//     });

//     for (var i = 0, lenUsers = arrFinal.length; i < lenUsers; i++) {
//       const user = await User.find({ user: arrFinal[i].user });

//       finalArrUsers.push(user[0]);
//     }

//     const arrComments: any = [];

//     for (var i = 0, m = finalArrUsers.length; i < m; i++) {
//       const getMsg = await Message.find({ id_user: finalArrUsers[i]._id });
//       const getMsgAuth = await Message.find({ id_auth: finalArrUsers[i]._id });

//       var alphaNumeric: any = getMsgAuth.concat(getMsg);

//       const sortedPost = alphaNumeric.sort(function (p1, p2) {
//         if (p1.created_at < p2.created_at) {
//           return 1;
//         } else {
//           return -1;
//         }
//       });
//       const f = sortedPost.reverse();

//       arrComments.push({ user: finalArrUsers[i], comments: f });
//     }

//     const arrP: any = [];

//     return res.status(200).json({ arr: arrComments });
//   },
//   async getUser(req: RequestProps, res: Response): Promise<Response> {
//     const { id_user } = req.query;

//     const getUser = await User.find({ _id: id_user });

//     return res.status(200).json({ getUser });
//   },
//   async getAll(req: RequestProps, res: Response): Promise<Response> {
//     const message = await Message.find();

//     return res.status(200).json({ message });
//   },
//   async destroyer(req: RequestProps, res: Response): Promise<Response> {
//     try {
//       const message = await Message.find().remove();
//       return res.json(message);
//     } catch (err) {
//       console.log(err);
//       return res.status(400).send(err);
//     }
//   },
// };
