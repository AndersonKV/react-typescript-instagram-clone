import React, {
  useEffect,
  useState,
  ReactNode,
  FormEvent,
  useRef,
  useCallback,
} from "react";
import { RouteComponentProps } from "react-router-dom";
import { UserNotFoundPage } from "../../../util/Util.Component";
import GifLoading from "../../../assets/load.gif";

import { Link } from "react-router-dom";
import api from "../../../services/api";

import {
  changeHandleIconLike,
  createCommentary,
  handleErrorImage,
} from "../../../util/Utils.Functions";

import Header from "../../../components/Header";
import LeftContainer from "./Left.Container";

import {
  Column,
  Posts,
  StyledHeader,
  StyledContainerPhoto,
  StyledGroupIcons,
  StyledSectionLikes,
  StyledAuthPost,
  StyledCommentaryFromPosts,
  StyledFormulary,
  StyledGifLoading,
} from "./styles";

interface ChildComponentProps extends RouteComponentProps<any> {
  /* other props for ChildComponent */
}

interface ChildComponentProps {
  history: any;
  profilePicture: ReactNode;
  profileUser: ReactNode;
  followSuggestion: ReactNode;
  userProps: ReactNode;
}

export interface User {
  email: string;
  name_complete: string;
  profile_picture: string;
  user: string;
  my_following: string;
  my_follower: string;
  my_posts: string;
  _id: string;
}

interface Imagem {
  path: string;
  map: any;
  length: any;
}

interface Post {
  id_user: string;
  post_image: Imagem;
  post_text: string;
  map: any;
  length: any;
  profile_picture: string;
  _id: string;
  user: string;
  id_post: string;
  hasLiked: boolean;
  comments: Comment;
  countLiked: number;
}

interface Comment {
  map: any;
  comment: string;
  id_comment: string;
  id_post: string;
  id_user: string;
  profile_picture: string;
  user: string;
  length: string;
  lastIndexOf: any;
  indexOf: any;
}

interface IntrinsicElements {
  post: Post;
  index?: number;
}

interface ArrCommentary {
  commentary: string;
  forEach?: any;
}

const Home: React.FC<ChildComponentProps> = ({ history }) => {
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post>();
  const [followingSuggestion, setFollowingSuggestion] = useState<User[]>();
  const [loading, setLoading] = useState(false);
  const refComment = useRef({ commentary: "" });
  const [isAuth, setIsAuth] = useState("");
  const [gifLoading, setGifLoading] = useState(false);

  useEffect(() => {
    async function getPosts() {
      const token = localStorage.getItem("TOKEN");

      try {
        if (token) {
          const response = await api.get("/app/get_all_posts", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { user, posts, userFollowSuggestion } = response.data;

          console.log(response.data);
          setUser(user[0]);
          setPosts(posts);
          setFollowingSuggestion(userFollowSuggestion);
          setGifLoading(true);
          setLoading(true);
          setIsAuth("IS_VALIDATE");
        } else {
          console.log("else");
          history.push("/");
        }
      } catch (err) {
        history.push("/");

        console.log(err);
      }
    }
    getPosts();
  }, []);

  async function handlerModalHeader(closed: boolean, post: Post) {
    const { id_user, id_post } = post;

    const div = document.createElement("div");
    div.classList.add("modal-header");

    const modalUser = `<div>
                      <button>  
                      <a href="${post.user}/p/${post.id_post}">Ir para publicação</a></button>
                      <button class="delete text-red">Excluir publicação</button>
                      <button class="closer">Cancelar</button>
                      </div>
                  
                  `;

    const modalNotUser = `<div>
                          <button class="text-red">Denunciar</button>
                          <button class="text-red">Deixar de seguir</button>
                          <button><a href="${post.user}/${post.id_post}">Ir para publicação</a></button>
                          <button class="closer">Cancelar</button>
                          </div>`;

    if (id_user === user?._id) {
      div.innerHTML = modalUser;
    } else {
      div.innerHTML = modalNotUser;
      div
        .querySelector(".text-red:nth-child(2)")
        ?.addEventListener("click", async (event: any) => {
          const response = await api.post(
            `/unfollow/${user?._id}/${post.id_user}`
          );

          if (response.data === "deixou de seguir") {
            alert("deixou de seguir");
          }
        });
    }

    div.querySelector(".closer")?.addEventListener("click", () => {
      document.querySelector(".modal-header")?.remove();
    });

    div.querySelector(".delete")?.addEventListener("click", async (e: any) => {
      const token = localStorage.getItem("TOKEN");

      const response = await api.delete(`/delete/${id_post}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.sucesso === "post deletado com sucesso") {
        e.path[4].remove();
      }
    });

    const authPost = document.querySelector(`.post-${id_post}`);

    authPost?.appendChild(div);

    // city.addEventListener("keydown", async function(e) {
  }
  function showText(event: any) {
    const target = event.currentTarget;
    const span = target.parentElement.querySelector(".hide-text");
    const btn = target.parentElement.querySelector("button");

    span?.classList.remove("hide-text");
    btn?.remove();
  }

  async function handleDoubleLike(
    event: React.MouseEvent<HTMLElement>,
    id_post: string,
    index: number
  ) {
    const target = event.target as any;
    const dadElement =
      target.parentElement.parentElement.parentElement.parentElement;
    const groupIcons = dadElement.querySelector(".group-icon");
    const heartIcon = groupIcons.parentElement.querySelector(".heart-icon");
    const infoAboutLike = dadElement.querySelector(".info-about-likes span b");

    const oldPosts = [...Array(posts)];

    try {
      if (heartIcon.classList[1] === "liked") {
        const removeClassHeartIcon = ["liked", "not-liked"];
        const classAdd = ["far", "fa-heart"];
        changeHandleIconLike(heartIcon, removeClassHeartIcon, classAdd);

        const newPosts = oldPosts[0] as any;
        newPosts[index].countLiked = newPosts[index].countLiked - 1;
        setPosts(newPosts);

        const oneLiked =
          newPosts[index].countLiked === 1 ? "uma pessoa curtiu" : null;

        const resp =
          oneLiked === null
            ? newPosts[index].countLiked + " pessoas curtiram"
            : oneLiked;

        infoAboutLike.innerHTML = resp;
      } else if (heartIcon.classList[1] === "not-liked") {
        const removeClassHeartIcon = ["not-liked", "liked"];
        const classAdd = ["fas", "fa-heart"];
        changeHandleIconLike(heartIcon, removeClassHeartIcon, classAdd);

        const newPosts = oldPosts[0] as any;
        newPosts[index].countLiked = newPosts[index].countLiked + 1;
        setPosts(newPosts);

        const oneLiked =
          newPosts[index].countLiked === 1 ? "você curtiu" : null;

        const resp =
          oneLiked === null
            ? "você e outras " +
              newPosts[index].countLiked +
              " pessoas curtiram"
            : oneLiked;

        infoAboutLike.innerHTML = resp;
      }

      const response = await api.post(`http://localhost:3333/add/like`, {
        id_post: id_post,
        id_user: user?._id,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLike(
    event: React.MouseEvent<HTMLElement>,
    id_post: string,
    index: number
  ) {
    const target = event.target as any;
    const dadElement =
      target.parentElement.parentElement.parentElement.parentElement;
    const groupIcons = dadElement.querySelector(".group-icon");
    const heartIcon = groupIcons.parentElement.querySelector(".heart-icon");
    const infoAboutLike = dadElement.querySelector(".info-about-likes span b");

    const oldPosts = [...Array(posts)];

    try {
      if (heartIcon.classList[1] === "liked") {
        const removeClassHeartIcon = ["liked", "not-liked"];
        const classAdd = ["far", "fa-heart"];
        changeHandleIconLike(heartIcon, removeClassHeartIcon, classAdd);

        const newPosts = oldPosts[0] as any;
        newPosts[index].countLiked = newPosts[index].countLiked - 1;
        setPosts(newPosts);

        const oneLiked =
          newPosts[index].countLiked === 1 ? "uma pessoa curtiu" : null;

        const resp =
          oneLiked === null
            ? newPosts[index].countLiked + " pessoas curtiram"
            : oneLiked;

        infoAboutLike.innerHTML = resp;
      } else if (heartIcon.classList[1] === "not-liked") {
        const removeClassHeartIcon = ["not-liked", "liked"];
        const classAdd = ["fas", "fa-heart"];
        changeHandleIconLike(heartIcon, removeClassHeartIcon, classAdd);

        const newPosts = oldPosts[0] as any;
        newPosts[index].countLiked = newPosts[index].countLiked + 1;
        setPosts(newPosts);

        const oneLiked =
          newPosts[index].countLiked === 1 ? "você curtiu" : null;

        const resp =
          oneLiked === null
            ? "você e outras " +
              newPosts[index].countLiked +
              " pessoas curtiram"
            : oneLiked;

        infoAboutLike.innerHTML = resp;
      }

      const response = await api.post(`http://localhost:3333/add/like`, {
        id_post: id_post,
        id_user: user?._id,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleComment(event: FormEvent, id_post: string) {
    event.preventDefault();
    const element = event.target as any;
    const text = refComment.current.commentary as string;

    console.log(text);

    if (text.trim().length !== 0) {
      try {
        const response = await api.post(
          `http://localhost:3333/add/${user?._id}/comment/${id_post}`,
          { comment: refComment?.current.commentary }
        );

        console.log(response.data);
        createCommentary(element, refComment.current.commentary, user);
        refComment.current.commentary = "";
      } catch (err) {
        console.log(err);
      }
    }
  }

  const OnchangeCommentary = useCallback((event: any) => {
    const target = event.target as any;

    if (parseFloat(target.value.length) > 0) {
      target.parentElement.querySelector("button").type = "submit";
      const btn = target.parentElement.querySelector("button");
      btn.classList.remove("opacity");
    } else {
      target.parentElement.querySelector("button").type = "button";
      const btn = target.parentElement.querySelector("button");
      btn.classList.add("opacity");
    }

    const data = {
      commentary: event.target.value,
    };

    refComment.current = data;
  }, []);

  function currentSlide(event: FormEvent) {
    const target = event.target as any;
    const selected = target.parentElement.parentElement.querySelector(
      ".selected"
    );

    if (selected.previousSibling.classList[1] === "fade") {
      selected.classList.remove("selected");
      selected.previousSibling.classList.add("selected");
    }
  }

  function plusSlides(event: FormEvent) {
    const target = event.target as any;
    const selected = target.parentElement.parentElement.querySelector(
      ".selected"
    );

    if (selected.nextSibling.classList[1] === "fade") {
      selected.classList.remove("selected");
      selected.nextSibling.classList.add("selected");
      // selected.nextSibling.querySelector("");
    }
  }

  function showMoreComments(event: React.MouseEvent) {
    const target = event.target as any;
    const comments = target.parentElement.querySelector(".commentary-post");
    const button = comments.parentElement.querySelector(
      ".show-comment"
    ) as HTMLElement;
    const spans = comments.querySelectorAll(".hide-comment");

    if (spans) {
      for (let i = 0; i < 10; i++) {
        if (spans[i] != null) {
          spans[i].classList.remove("hide-comment");
        }

        if (spans[i] == null) {
          button.remove();
        }
      }

      button.innerHTML = `ver todos os ${spans.length - 10} comentarios`;

      // if (spans.length <= 10) {
      //   button.remove();
      // } else {
      //   button.innerText = `ver todos os ${spans.length} comentarios`;
      // }
    }
  }

  const HeaderComponent = ({ post }: IntrinsicElements) => {
    return (
      <StyledHeader className={`post-top post-${post.id_post}`}>
        <div>
          <Link to={post.user}>
            <img
              alt="imagem do perfil"
              src={`http://localhost:3333/uploads/${post.profile_picture}`}
            />
          </Link>
        </div>
        <div>
          <span>
            <Link to={post.user}>{post.user}</Link>
          </span>
          <span onClick={() => handlerModalHeader(true, post)}>
            <i className="fas fa-ellipsis-h"></i>
          </span>
          {/* {modalHeader != false ? (
           
           ) : null} */}
        </div>
      </StyledHeader>
    );
  };

  const ContainerPhotoComponent = ({ post, index }: IntrinsicElements) => {
    const i = index as number;
    const len = post.post_image.length as any;
    return (
      <StyledContainerPhoto>
        <section className={`${len > 1 ? "slide" : ""}`}>
          {len > 1 ? (
            <button onClick={currentSlide}>
              <i className="fas fa-angle-left"></i>
            </button>
          ) : null}
          {post.post_image?.map((image: any, key: number) => (
            <div
              key={key}
              className={`mySlides fade ${key === 0 ? "selected" : ""}`}
            >
              <img
                onDoubleClick={(event) =>
                  handleDoubleLike(event, post.id_post, i)
                }
                key={key}
                alt="imagem do post"
                onErrorCapture={handleErrorImage}
                src={`http://localhost:3333/uploads/${image.path}`}
              />
            </div>
          ))}

          {len > 1 ? (
            <button onClick={plusSlides}>
              <i className="fas fa-angle-right"></i>
            </button>
          ) : null}
        </section>
      </StyledContainerPhoto>
    );
  };

  const SectionGroupIconsComponent = ({ post, index }: IntrinsicElements) => {
    const i = index as number;
    const len = post.post_image.length as any;
    return (
      <StyledGroupIcons>
        <div className="group-icon">
          <span
            onClick={(event) => handleLike(event, post.id_post, i)}
            className={`heart-icon ${
              post.hasLiked === true ? "liked" : "not-liked"
            }`}
          >
            {post.hasLiked === true ? (
              <i className="fas fa-heart"></i>
            ) : (
              <i className="far fa-heart" aria-hidden="true"></i>
            )}
          </span>
          <span>
            <Link to={`/${post.user}/${post.id_post}`}>
              <i className="far fa-comment"></i>
            </Link>
          </span>
          <span>
            <i className="far fa-paper-plane"></i>
          </span>
        </div>
        <div>
          <span>
            <i className="far fa-bookmark"></i>
          </span>
        </div>
      </StyledGroupIcons>
    );
  };

  const SectionLikesComponent = ({ post }: IntrinsicElements) => {
    let response;

    if (Boolean(post?.hasLiked) === true && Number(post?.countLiked) === 1) {
      response = `você curtiu isso`;
    }

    if (Boolean(post?.hasLiked) === true && Number(post?.countLiked) >= 2) {
      response = `você e outras ${post?.countLiked} pessoas curtiram isso`;
    }

    if (Boolean(post?.hasLiked) === false && Number(post?.countLiked) === 1) {
      response = `uma pessoas curtiu isso`;
      console.log("aqui");
    }

    if (Boolean(post?.hasLiked) === false && Number(post?.countLiked) >= 2) {
      response = `${post?.countLiked} pessoas curtiram isso`;
    }

    return (
      <StyledSectionLikes>
        <div className="info-about-likes">
          <span>
            <b>{response}</b>
          </span>
        </div>
      </StyledSectionLikes>
    );
  };

  const AuthPostComponent = ({ post }: IntrinsicElements) => {
    return (
      <StyledAuthPost>
        <div className="post-autor">
          {Boolean(post.post_text) !== false ? (
            <>
              <span>
                <Link to={post.user}>{post.user}</Link>
              </span>
              <ComponentCommentary myText={post.post_text} />
            </>
          ) : null}
          {post.post_text?.length > 60 ? (
            <button onClick={showText} className={`${post.id_post}`}>
              mais
            </button>
          ) : null}
        </div>
      </StyledAuthPost>
    );
  };

  function ComponentCommentary({ myText }: any) {
    const text = document.createElement("p");
    text.innerHTML = myText;

    return text != null ? (
      <span
        className="hide-text"
        dangerouslySetInnerHTML={{
          __html: `${text.innerHTML}`,
        }}
      ></span>
    ) : null;
  }

  const CommentaryFromPostsComponent = ({ post }: IntrinsicElements) => {
    let arr;

    if (post.comments != null) {
      arr = post.comments;
    }

    return (
      <StyledCommentaryFromPosts>
        <div className="commentary-post">
          {arr != null
            ? post.comments.map((comment: Comment, index: number) => {
                return (
                  <div
                    className={`posts-from-user ${
                      index > 4 ? "hide-comment" : ""
                    }`}
                    key={index}
                  >
                    <span>
                      <Link to={comment.user}>{comment.user}</Link>
                    </span>
                    <ComponentCommentary myText={comment.comment} />
                    {comment.comment?.length > 120 ? (
                      <button
                        onClick={showText}
                        className={`${comment.id_user}${index}`}
                      >
                        mais
                      </button>
                    ) : null}
                  </div>
                );
              })
            : null}
        </div>
        {arr != null ? (
          parseFloat(post.comments.length) >= 4 ? (
            <span onClick={showMoreComments} className={"show-comment"}>
              ver todos os {parseFloat(post.comments.length) - 5} comentarios
            </span>
          ) : null
        ) : null}
      </StyledCommentaryFromPosts>
    );
  };

  return (
    <main>
      {loading === true ? <Header /> : null}

      {gifLoading === false ? (
        <StyledGifLoading>
          <img src={GifLoading} />
        </StyledGifLoading>
      ) : null}

      <Column>
        {loading !== false ? (
          <>
            <Posts>
              {posts?.map((post: Post, index: number) => (
                <section key={index} id={post._id} className="section-post">
                  <HeaderComponent post={post} />
                  <ContainerPhotoComponent post={post} index={index} />
                  <SectionGroupIconsComponent post={post} index={index} />
                  <SectionLikesComponent post={post} />
                  <AuthPostComponent post={post} />
                  <CommentaryFromPostsComponent post={post} />
                  <StyledFormulary
                    method="post"
                    action={`http://localhost:3333/add/${user?._id}/comment/${post.id_user}`}
                    onSubmit={(event) => handleComment(event, post.id_post)}
                    id={post.id_post}
                  >
                    <textarea
                      aria-label="Adicione um comentário..."
                      placeholder="Adicione um comentário..."
                      autoComplete="off"
                      autoCorrect="off"
                      name={`${index}-message`}
                      // id={index}
                      onChange={OnchangeCommentary}
                    ></textarea>
                    <button type="button" className="opacity">
                      Publicar
                    </button>
                  </StyledFormulary>
                </section>
              ))}
            </Posts>

            <LeftContainer
              userProps={user}
              followSuggestion={followingSuggestion}
            />
          </>
        ) : gifLoading === true ? (
          <>
            <UserNotFoundPage />
          </>
        ) : null}
      </Column>
    </main>
  );
};

export default Home;
