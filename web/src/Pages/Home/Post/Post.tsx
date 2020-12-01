import React, {
  useState,
  useEffect,
  FormEvent,
  useCallback,
  ReactNode,
} from "react";

import { Link } from "react-router-dom";
import {
  Article,
  Main,
  SectionRight,
  SectionLeft,
  SectionAuthUser,
  SectionComment,
  Formulary,
  StyledGroupIcons,
  StyledSectionLikes,
} from "./styles";

import api from "../../../services/api";

//IMPORT UTILS
import { UserNotFoundPage } from "../../../util/Util.Component";
import { changeHandleIconLike, addLiked } from "../../../util/Utils.Functions";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

interface Props {
  history?: any;
  myText?: any;
  transformString?: ReactNode;
  post?: Post;
}

interface User {
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
}
interface Post {
  id_post: string;
  id_user: string;
  post_image: Imagem;
  post_text: string;
  profile_picture: string;
  user: string;
  _id: string;
  map: any;
  length: any;
  comments: Comment;
  countLikes: number;
  hasLiked: boolean;
}

interface Comment {
  commentary: string;
  id_comment: string;
  id_user: string;
  id_post: string;
  user: string;
  name_completed: string;
  map: any;
  profile_picture: string;
}

const Post: React.FC<Props> = ({ transformString }) => {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(false);
  const [userAuth, setUserAuth] = useState<User>();
  const [userNotFound, setUserNotFound] = useState(false);
  const [isAuth, setIsAuth] = useState("");

  const refCommentary = React.useRef() as React.MutableRefObject<
    HTMLTextAreaElement
  >;

  useEffect(() => {
    async function getPosts() {
      const token = localStorage.getItem("TOKEN");
      const url = window.location.pathname.replace("/", "");
      const userUrl = url.split("/")[0];
      const p = url.split("/")[1];
      const postUrl = url.split("/")[2];

      try {
        if (token) {
          const response = await api.get(`/app/path/post`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { profile: userUrl, post: postUrl },
          });

          const { post, user } = response.data;

          console.log("token ");

          console.log(user);
          setIsAuth("IS_VALIDATE");
          setPost(post);
          setUserAuth(user[0]);
          setLoading(true);
        } else {
          console.log("not token");

          const response = await api.get(`/path/post`, {
            data: {
              profile: userUrl,
              post: postUrl,
            },
          });

          const { post } = response.data;

          console.log(post);
          setPost(post);
          setLoading(true);
        }
      } catch (err) {
        //SE O TOKEN FOR MAL FORMATADO
        console.log("token mal formatado");

        try {
          const response = await api.get(`/path/post`, {
            params: { profile: userUrl, post: postUrl },
          });
          const { post } = response.data;

          if (post) {
            setIsAuth("NOT_VALIDATE");

            setPost(post);
            setLoading(true);
          }
        } catch (err) {
          setIsAuth("NOT_VALIDATE");

          setLoading(true);
          setUserNotFound(true);
        }
      }
    }
    getPosts();
  }, []);

  async function handleDoubleClickLike(event: React.MouseEvent<HTMLElement>) {
    const heartIcon = document.querySelector(".heart-icon");
    const infoAboutLike = document.querySelector(
      ".info-about-likes span b"
    ) as HTMLElement;

    const oldPost = [...Array(post)];
    const newPosts = oldPost[0] as any;

    try {
      if (isAuth === "IS_VALIDATE") {
        if (heartIcon?.classList[1] === "liked") {
          const removeClassHeartIcon = ["liked", "not-liked"];
          const classAdd = ["far", "fa-heart"];

          changeHandleIconLike(heartIcon, removeClassHeartIcon, classAdd);

          newPosts.countLikes = newPosts.countLikes - 1;

          setPost(newPosts);

          addLiked(newPosts.countLikes, infoAboutLike);
        } else if (heartIcon?.classList[1] === "not-liked") {
          const removeClassHeartIcon = ["not-liked", "liked"];
          const classAdd = ["fas", "fa-heart"];

          changeHandleIconLike(heartIcon, removeClassHeartIcon, classAdd);

          newPosts.countLikes = newPosts.countLikes + 1;

          setPost(newPosts);

          addLiked(newPosts.countLikes, infoAboutLike);
        }

        const response = await api.post(`http://localhost:3333/add/like`, {
          id_post: post?.id_post,
          id_user: userAuth?._id,
        });

        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLike(event: React.MouseEvent<HTMLElement>) {
    const heartIcon = document.querySelector(".heart-icon");
    const infoAboutLike = document.querySelector(
      ".info-about-likes span b"
    ) as HTMLElement;

    const oldPost = [...Array(post)];
    const newPosts = oldPost[0] as any;

    try {
      if (isAuth === "IS_VALIDATE") {
        if (heartIcon?.classList[1] === "liked") {
          const removeClassHeartIcon = ["liked", "not-liked"];
          const classAdd = ["far", "fa-heart"];

          changeHandleIconLike(heartIcon, removeClassHeartIcon, classAdd);

          newPosts.countLikes = newPosts.countLikes - 1;

          setPost(newPosts);

          addLiked(newPosts.countLikes, infoAboutLike);
        } else if (heartIcon?.classList[1] === "not-liked") {
          const removeClassHeartIcon = ["not-liked", "liked"];
          const classAdd = ["fas", "fa-heart"];

          changeHandleIconLike(heartIcon, removeClassHeartIcon, classAdd);

          newPosts.countLikes = newPosts.countLikes + 1;

          setPost(newPosts);

          addLiked(newPosts.countLikes, infoAboutLike);
        }

        const response = await api.post(`http://localhost:3333/add/like`, {
          id_post: post?.id_post,
          id_user: userAuth?._id,
        });

        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleComment(event: FormEvent, id_post: string) {
    event.preventDefault();
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    const section = textarea.parentElement?.parentElement;
    const divComment = section?.querySelectorAll("div")[3];

    try {
      const url = `http://localhost:3333/add/${userAuth?._id}/comment/${id_post}`;

      const response = await api.post(url, {
        comment: refCommentary.current,
      });

      console.log(response.data);

      const main = document.createElement("div");
      main.classList.add("user-comment");

      const div1 = document.createElement("div");
      const div2 = document.createElement("div");

      const span1 = document.createElement("span");
      const span2 = document.createElement("span");
      const img = document.createElement("img");

      img.src = `http://localhost:3333/uploads/${String(
        userAuth?.profile_picture
      )}`;

      div1.appendChild(img);

      span1.innerHTML = `<a href="${userAuth?.user}">${userAuth?.user}</a>`;

      let strinWithHash;
      let word = String(refCommentary.current).split(" ");

      for (let w = 0; w < word.length; w++) {
        if (word[w][0] === "#") {
          word[w] = word[w].replace(
            word[w],
            `<a href="/explore/${word[w]}">${word[w]}</a>`
          );

          const texFormated = word.join(" ");
          strinWithHash = texFormated;
        }
      }

      span2.innerHTML = `${
        strinWithHash === undefined ? refCommentary.current : strinWithHash
      }`;

      div2.append(span1, span2);

      main.append(div1, div2);

      divComment?.appendChild(main);
      textarea.value = "";
    } catch (err) {
      console.log(err);
    }
  }

  const OnchangeCommentary = useCallback((node) => {
    if (node !== null) {
      const target = node.target as HTMLTextAreaElement;
      const button = target.parentElement?.querySelector(
        "button"
      ) as HTMLButtonElement;

      console.log(isAuth);
      if (Number(target.value.length) > 0) {
        button.type = "submit";
        button.classList.remove("opacity");
      } else {
        button.type = "button";
        button.classList.add("opacity");
      }

      refCommentary.current = node.target.value;
    }
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

  const ComponentSectionPhoto = ({ post }: any) => {
    return (
      <>
        <div>
          <img
            alt="perfil"
            src={`http://localhost:3333/uploads/${post?.profile_picture}`}
          />
        </div>
        <div>
          <Link to={`/profile/${post?.user}`}>{post?.user}</Link>
        </div>
      </>
    );
  };

  const SectionGroupIconsComponent = ({ post }: Props): JSX.Element => {
    return (
      <StyledGroupIcons>
        <div className="group-icon">
          <span
            onClick={handleLike}
            className={`heart-icon ${
              post?.hasLiked === true ? "liked" : "not-liked"
            }`}
          >
            {post?.hasLiked === true ? (
              <i className="fas fa-heart"></i>
            ) : (
              <i className="far fa-heart" aria-hidden="true"></i>
            )}
          </span>
          <span>
            <i className="far fa-comment"></i>
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

  const SectionLikesComponent = ({ post }: Props): JSX.Element => {
    let response;

    if (Boolean(post?.hasLiked) === true && Number(post?.countLikes) === 1) {
      response = `você curtiu isso`;
    }

    if (Boolean(post?.hasLiked) === true && Number(post?.countLikes) >= 2) {
      response = `você e outras ${post?.countLikes} pessoas curtiram isso`;
    }

    if (Boolean(post?.hasLiked) === false && Number(post?.countLikes) === 1) {
      response = `uma pessoas curtiu isso`;
      console.log("aqui");
    }

    if (Boolean(post?.hasLiked) === false && Number(post?.countLikes) >= 2) {
      response = `${post?.countLikes} pessoas curtiram isso`;
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

  function ComponentCommentary({ myText }: any) {
    const text = document.createElement("p");
    text.innerHTML = myText;

    return text != null ? (
      <span
        dangerouslySetInnerHTML={{
          __html: `${text.innerHTML}`,
        }}
      ></span>
    ) : null;
  }

  const ContainerPhotoComponent = () => {
    const posts = post?.post_image as any;
    const len = posts?.length as any;

    return (
      <section className={`${len > 1 ? "slide" : ""}`}>
        {len > 1 ? (
          <button onClick={currentSlide}>
            <i className="fas fa-angle-left"></i>
          </button>
        ) : null}

        {post?.post_image?.map((image: Imagem, key: number) => (
          <div className={`mySlides fade ${key === 0 ? "selected" : ""}`}>
            <img
              onDoubleClick={handleDoubleClickLike}
              key={key}
              alt="imagem do post"
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
    );
  };
  return (
    <>
      {loading === true ? (
        <Main>
          {loading === true ? <Header /> : null}

          {userNotFound === false ? (
            <Article>
              <SectionLeft>
                <ContainerPhotoComponent />
              </SectionLeft>
              <SectionRight>
                <SectionAuthUser>
                  <ComponentSectionPhoto post={post} />
                </SectionAuthUser>
                <SectionComment>
                  <div className="user">
                    {Boolean(post?.post_text) !== false ? (
                      <>
                        <div>
                          <img
                            alt="perfil"
                            src={`http://localhost:3333/uploads/${post?.profile_picture}`}
                          />
                        </div>
                        <div>
                          <span>
                            <Link to={`/${post?.user}`}>{post?.user}</Link>
                          </span>
                          <ComponentCommentary myText={post?.post_text} />
                        </div>
                      </>
                    ) : null}
                  </div>

                  {post?.comments.map((comment: Comment, key: string) => {
                    return (
                      <div className="user-comment" key={key}>
                        <div>
                          <img
                            alt="perfil"
                            src={`http://localhost:3333/uploads/${comment.profile_picture}`}
                          />
                        </div>
                        <div>
                          <span>
                            <Link to={`/${comment.user}`}>{comment.user}</Link>
                          </span>
                          <ComponentCommentary myText={comment.commentary} />
                        </div>
                      </div>
                    );
                  })}
                </SectionComment>
                <SectionGroupIconsComponent post={post} />
                <SectionLikesComponent post={post} />
                <Formulary
                  method="post"
                  onSubmit={(event) =>
                    handleComment(event, String(post?.id_post))
                  }
                >
                  {isAuth === "NOT_VALIDATE" ? (
                    <span className="not-validate">
                      <Link to="/">Entrar </Link>
                      para curtir ou comentar
                    </span>
                  ) : (
                    <>
                      <textarea
                        aria-label="Adicione um comentário..."
                        placeholder="Adicione um comentário..."
                        autoComplete="off"
                        autoCorrect="off"
                        // id={index}
                        onChange={OnchangeCommentary}
                      ></textarea>
                      <button type="submit" className="opacity">
                        Publicar
                      </button>
                    </>
                  )}
                </Formulary>
              </SectionRight>
            </Article>
          ) : (
            <UserNotFoundPage />
          )}
          <Footer />
        </Main>
      ) : null}
    </>
  );
};

export default Post;
