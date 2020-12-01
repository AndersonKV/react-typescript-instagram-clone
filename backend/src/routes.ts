import { Router } from "express";
import multer from "multer";

import authMiddleware from "./middleware/auth";
import UserController from "./controllers/UserController";
import PostController from "./controllers/PostController";
import FollowingController from "./controllers/FollowingController";
import LikeController from "./controllers/LikeController";
import CommentController from "./controllers/CommentController";
import SearchController from "./controllers/SearchController";
import MessageController from "./controllers/MessageController";

import uploadConfig from "./config/upload";

const upload = multer(uploadConfig);

const routes = Router();

//UserController
routes.post("/user", UserController.create);
routes.get("/all/users", UserController.get_all_user);
routes.put(
  "/account/edit/update/image/:_id",
  authMiddleware.auth,
  upload.array("profile_image"),
  UserController.update
);
routes.post("/login", UserController.login);
routes.get("/app/user", authMiddleware.auth, UserController.user);
routes.get("/app/profile", authMiddleware.auth, UserController.profileAuth);
routes.get("/profile", UserController.profile);
routes.post("/get_id", UserController.getId);
routes.get("/users", UserController.show);
routes.get("/account/edit", authMiddleware.auth, UserController.edit);
routes.delete("/user/:_id", UserController.delete);
routes.delete("/users", UserController.destroyer);

//PostController
routes.post(
  "/post",
  authMiddleware.auth,
  upload.array("post_image"),
  PostController.store
);
routes.get("/app/path/post", authMiddleware.auth, PostController.indexAuth);
routes.get("/path/post", PostController.index);
routes.get("/posts", PostController.show);
routes.get(
  "/app/get_all_posts",
  authMiddleware.auth,
  PostController.getAllPosts
);
routes.delete("/delete/:_id", authMiddleware.auth, PostController.delete);
routes.delete(
  "/destroyer",
  upload.array("post_image"),
  PostController.destroyer
);

//FollowingController
routes.post("/following", FollowingController.following);
routes.post(
  "/unfollow/:id_user/:id_user_following",
  FollowingController.unfollow
);
routes.post("/user_following", FollowingController.get_list_following);
routes.get("/get_follower_user", FollowingController.get_follower);
routes.get("/get_following_user", FollowingController.get_following);
routes.get("/get_following_list", FollowingController.get_list_following);
routes.get("/get_all_list", FollowingController.get_all_list);
routes.delete("/delete_all_followings", FollowingController.destroyer);

//LikeController
routes.post("/add/like", LikeController.store);
routes.get("/like", LikeController.getOne);
routes.get("/likes", LikeController.getAll);
routes.delete("/likes", LikeController.destroyer);

//CommentController
routes.post("/add/:_id/comment/:id_post", CommentController.store);
routes.get("/all_comments", CommentController.getAllComments);
routes.delete("/comments", CommentController.destroyer);

//SearchController
routes.post("/api/search/word", SearchController.searchWord);
routes.post("/api/search/posts", SearchController.searchPosts);
routes.post("/api/search/all", SearchController.AllPosts);

//MessageController
// routes.post("/api/message/create", MessageController.create);
// routes.get("/api/message/recover", MessageController.recover);
// routes.get("/api/message/get/user", MessageController.getUser);
// routes.get("/api/message/recover/all", MessageController.getAll);
// routes.delete("/api/message/delete/all", MessageController.destroyer);

export default routes;
