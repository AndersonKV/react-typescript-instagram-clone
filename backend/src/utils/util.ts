import User, { UserInterface } from "../models/User";
import Post, { PostInterface } from "../models/Post";
import Following, { FollowingInterface } from "../models/Following";
import Like from "../models/Like";
import Comment from "../models/Comment";
import bcryptjs from "bcryptjs";

// for (var i = 0, len = userFollowing.length; i < len; i++) {

interface PropsFollowing extends FollowingInterface {
  length: number;
}

export function formatedStringWithHashtag(value: string) {
  console.log("value", value);

  if (Boolean(value) !== false) {
    let word = value.split(" ");

    for (let i = 0; i < word.length; i++) {
      if (word[i][0] === "#") {
        const str = word[i].substring(1);

        word[i] = word[i].replace(
          word[i],
          `<a href="/explore/tags/${str}">${word[i]}</a>`
        );
      }

      console.log("word", word);
    }

    return word.join(" ");
  }
}

export function currentDate() {
  const data = new Date(),
    day = data.getDate().toString().padStart(2, "0"),
    month = (data.getMonth() + 1).toString().padStart(2, "0"), //+1 pois no getMonth Janeiro começa com zero.
    year = data.getFullYear();
  return `${day}/${month}/${year}`;
}

export function hoursFormated() {
  const data = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let hourClock = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minuteTernary = minutes < 10 ? "0" + minutes : minutes;
  let time = `${hours}:${minuteTernary} ${hourClock}`;
  return time;
}

export const date = new Date();

export async function GET_ALL_USER_AND_FOLLOWERS_WITH_POSTS(userAuth: any) {
  const data = new Array();
  const dataPosts = new Array();

  //PASSA O USUARIO AUTENTICADO para data
  data.push(userAuth[0]);

  //RECUPERA TODOS AS PESSOAS QUE O USUARIO SEGUE
  const following: any = await Following.find({
    id_user_following: userAuth[0]._id,
  });

  //COM A LISTA DE SEGUIDORES RECUPERA OS DADOS DOS USUARIOS
  for (let f = 0; f < following.length; f++) {
    const user: UserInterface | any = await User.find({
      _id: following[f].id_user,
    });

    data.push(user[0]);
  }

  //PEGA TODOS OS POSTS DOS USUARIOS
  for (var d = 0; d < data.length; d++) {
    const posts = await Post.find({
      id_user: data[d]._id,
    });

    const sortedPost = posts.sort(function (p1, p2) {
      if (p1.created_at < p2.created_at) {
        return 1;
      } else {
        return -1;
      }
    });

    //ADICIONA AS INFORMAÇÕES AO USUARIO QUE FEZ O POST
    for (var p = 0; p < sortedPost.length; p++) {
      dataPosts.push({
        name_complete: data[d].name_complete,
        profile_picture: data[d].profile_picture,
        user: data[d].user,
        id_user: data[d]._id,
        id_post: sortedPost[p]._id,
        post_image: sortedPost[p].post_image,
        post_text: sortedPost[p].post_text,
        hasLiked: false,
        countLiked: null,
        comments: null,
      });
    }
  }

  //PEGA TODOS OS COMENTARIOS DE CADA POST
  for (var dp = 0; dp < dataPosts.length; dp++) {
    const userComment: any = await Comment.find({
      id_post: dataPosts[dp].id_post,
    });

    const dataUserWhoComment = new Array();

    //PEGA TODOS OS USUARIOS QUE COMENTARAM NO POST
    for (var u = 0; u < userComment.length; u++) {
      const user: any = await User.find({
        _id: userComment[u].id_user,
      });

      //ADICIONA AS INFORMAÇÕES AO USUARIO QUE FEZ O COMENTARIO
      for (var c = 0; c < user.length; c++) {
        dataUserWhoComment.push({
          id_user: user[c]._id,
          id_post: userComment[u].id_post,
          comment: userComment[u].comment,
          id_comment: userComment[u]._id,
          user: user[c].user,
          profile_picture: user[c].profile_picture,
        });
      }

      dataPosts[dp].comments = dataUserWhoComment;
    }
  }

  //CONTA A QUANTIDADE DE LIKES
  for (var l = 0; l < dataPosts.length; l++) {
    const likes: any = await Like.find({
      id_post: dataPosts[l].id_post,
    });

    if (likes.length != null) {
      dataPosts[l].countLiked = likes.length;
    }
  }

  //VERIFICA SE USUARIO AUTENTICADO CURTIU ALGUM POST
  for (var index = 0; index < dataPosts.length; index++) {
    const likes: any = await Like.find({
      id_post: dataPosts[index].id_post,
      id_user: userAuth[0]._id,
    });

    if (likes[0] != null) {
      if (likes[0].id_post == dataPosts[index].id_post) {
        dataPosts[index].hasLiked = true;
      }
    }
  }

  return dataPosts;
}

// import User, { UserInterface } from "../models/User";
// import Post, { PostInterface } from "../models/Post";
// import Following, { FollowingInterface } from "../models/Following";
// import Like from "../models/Like";
// import Comment from "../models/Comment";

// // for (var i = 0, len = userFollowing.length; i < len; i++) {

// interface PropsFollowing extends FollowingInterface {
//   length: number;
// }
// export async function GET_ALL_USER_AND_FOLLOWERS_WITH_POSTS(userAuth: any) {
//   const data = new Array();
//   const dataPosts = new Array();
//   const dataComments = new Array();
//   const y = new Array();

//   //PASSA O USUARIO AUTENTICADO para data
//   data.push(userAuth[0]);

//   //RECUPERA TODOS AS PESSOAS QUE O USUARIO SEGUE
//   const following: any = await Following.find({
//     id_user_following: userAuth[0]._id,
//   });

//   //COM A LISTA DE SEGUIDORES RECUPERA OS DADOS DOS USUARIOS
//   for (const [f, followingValue] of following.entries()) {
//     const user: UserInterface | any = await User.find({
//       _id: followingValue.id_user,
//     });

//     data.push(user[0]);
//   }

//   //PEGA TODOS OS POSTS DOS USUARIOS
//   for (const [d, dataValue] of data.entries()) {
//     const posts = await Post.find({
//       id_user: dataValue._id,
//     });

//     //ADICIONA AS INFORMAÇÕES AO USUARIO QUE FEZ O POST
//     for (const [p, postsValue] of posts.entries()) {
//       dataPosts.push({
//         name_complete: data[d].name_complete,
//         profile_picture: data[d].profile_picture,
//         user: data[d].user,
//         id_user: data[d]._id,
//         id_post: postsValue._id,
//         post_image: postsValue.post_image,
//         post_text: postsValue.post_text,
//         hasLiked: false,
//         countLiked: null,
//         comments: null,
//       });
//     }
//   }

//   // //PEGA TODOS OS COMENTARIOS DE CADA POST
//   for (const [dp, dataValue] of dataPosts.entries()) {
//     const userComment: any = await Comment.find({
//       id_post: dataValue.id_post,
//     });

//     const dataUserWhoComment = new Array();

//     //PEGA TODOS OS USUARIOS QUE COMENTARAM NO POST
//     for (const [u, commentValue] of userComment.entries()) {
//       const user: any = await User.find({
//         _id: commentValue.id_user,
//       });

//       //ADICIONA AS INFORMAÇÕES AO USUARIO QUE FEZ O COMENTARIO
//       for (const [c, userValue] of user.entries()) {
//         dataUserWhoComment.push({
//           id_user: userValue._id,
//           id_post: commentValue.id_post,
//           comment: commentValue.comment,
//           id_comment: commentValue._id,
//           user: userValue.user,
//           profile_picture: userValue.profile_picture,
//         });
//       }

//       dataPosts[dp].comment = dataUserWhoComment;
//     }
//   }

//   //CONTA A QUANTIDADE DE LIKES
//   for (const [l, likeValue] of dataPosts.entries()) {
//     const likes: any = await Like.find({
//       id_post: likeValue.id_post,
//     });

//     if (likes.length != null) {
//       likeValue.countLiked = likes.length;
//     }
//   }

//   //VERIFICA SE USUARIO AUTENTICADO CURTIU ALGUM POST
//   for (const [i, valueUserAuth] of dataPosts.entries()) {
//     const likes: any = await Like.find({
//       id_post: valueUserAuth.id_post,
//       id_user: userAuth[0]._id,
//     });

//     if (likes[0] != null) {
//       if (likes[0].id_post == valueUserAuth.id_post) {
//         valueUserAuth.hasLiked = true;
//       }
//     }
//   }

//   return dataPosts;
// }

export async function makeHash(password: any) {
  const hash = await bcryptjs.hash(password, 10);
  password = hash;
  return password;
}
