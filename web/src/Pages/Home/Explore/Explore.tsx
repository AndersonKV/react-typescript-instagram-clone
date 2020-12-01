import React, { useState } from "react";
import GifLoading from "../../../assets/load.gif";
import { RouteComponentProps } from "react-router-dom";

import styled from "styled-components";
import { Link } from "react-router-dom";
import api from "../../../services/api";

import { UserNotFoundPage } from "../../../util/Util.Component";
import { handleErrorImage } from "../../../util/Utils.Functions";

import {
  SecitonContainerExplore,
  SectionHeaderExplore,
  Main,
  StyledGifLoading,
} from "./styles";
import Header from "../../../components/Header";
import { Hash } from "crypto";

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
  likes: number;
}

interface Imagem {
  path: string;
  map: any;
  length: any;
}
interface ChildComponentProps extends RouteComponentProps<any> {
  /* other props for ChildComponent */
}

interface ChildComponentProps {
  history: any;
}

const Explore: React.FC<ChildComponentProps> = ({ history }) => {
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post>();
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState("");
  const [word, setWord] = useState("");
  const [gifLoading, setGifLoading] = useState(false);
  const [pageNotFound, setPageNotFound] = useState(false);

  React.useEffect(() => {
    async function init() {
      const token = localStorage.getItem("TOKEN");
      const exploreUrl = window.location.pathname;
      const userUrl = exploreUrl.split("/");
      const allSearch = userUrl[1];
      const tags = userUrl[2];
      const hashWord = userUrl[3];

      console.log(tags + " tags");
      console.log(hashWord + " hashWord");
      console.log(hashWord);
      //faz varias verificações
      try {
        //se não tive token
        if (!token) {
          history.push("/");
        }

        if (token && hashWord) {
          const response = await api.get("/app/user", {
            headers: { Authorization: `Bearer ${token}` },
            params: { USER_ONLY: true },
          });

          const { user } = response.data;

          setUser(user[0]);

          const responsePosts = await api.post(`/api/search/posts`, {
            params: { hashWord },
          });

          const { posts } = responsePosts.data;

          setPosts(posts);
          setIsAuth("IS_VALIDATE");
          setWord(hashWord);
          setGifLoading(true);
          setLoading(true);
          console.log(1);
        }

        //verifica se possui token e apenas o explore na url
        if (
          Boolean(token) === true &&
          Boolean(tags) === false &&
          Boolean(hashWord) === false
        ) {
          const response = await api.get("/app/user", {
            headers: { Authorization: `Bearer ${token}` },
            params: { USER_ONLY: true },
          });

          const responsePost = await api.post(`/api/search/all`);

          const { posts } = responsePost.data;
          const { user } = response.data;

          console.log(posts);
          setPosts(posts);
          setUser(user[0]);
          setGifLoading(true);
          setLoading(true);
          setIsAuth("IS_VALIDATE");
          console.log(3);
        } else if (hashWord === undefined) {
          const response = await api.get("/app/user", {
            headers: { Authorization: `Bearer ${token}` },
            params: { USER_ONLY: true },
          });

          const { user } = response.data;

          setUser(user[0]);
          setIsAuth("IS_VALIDATE");
          setGifLoading(true);
          setLoading(true);
          setPageNotFound(true);
          console.log(2);
        }
      } catch (err) {
        history.push("/");
        localStorage.clear();
        console.log(err);
      }
    }
    init();
  }, []);

  function handleMouseLeave(event: React.MouseEvent) {
    const target = event.target as HTMLElement;
    const element = target.parentElement?.querySelector(".hover-icons--set");
    const getClass = element?.classList[1];

    if (getClass === "hover-icons--set") {
      element?.classList.remove("hover-icons--set");
    }
  }

  function handleMouseHover(event: React.MouseEvent) {
    const target = event.target as HTMLElement;
    const element = target.parentElement?.querySelector(".hover-icons");
    element?.classList.add("hover-icons--set");
  }

  return (
    <Main>
      {loading === true ? (
        <Header
          userHeader={user?.user}
          picturesHeader={user?.profile_picture}
        />
      ) : null}

      {gifLoading === false ? (
        <StyledGifLoading>
          <img src={GifLoading} />
        </StyledGifLoading>
      ) : null}

      {loading === true ? (
        <>
          <SectionHeaderExplore>
            {Number(word.length) !== 0 ? (
              <>
                <p>#{word && word}</p>
                <p>
                  <b>{posts?.length && posts?.length}</b> publicações
                </p>
              </>
            ) : null}
          </SectionHeaderExplore>

          <SecitonContainerExplore>
            {posts?.map((post: Post, key: string) => (
              <div key={key}>
                <Link to={`/${post.user}/p/${post._id}`}>
                  <img
                    onMouseEnter={handleMouseHover}
                    onMouseLeave={handleMouseLeave}
                    onErrorCapture={handleErrorImage}
                    alt="container de fotos"
                    src={`http://localhost:3333/uploads/${post.post_image.path}`}
                  />
                  <div className={`hover-icons `}>
                    <span>
                      <i className="fas fa-comment"></i>
                      {post?.likes}
                    </span>
                    <span>
                      <i className="fas fa-heart"></i>
                      {post?.comments}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </SecitonContainerExplore>
        </>
      ) : null}
      {/* {loading === true ? <Header /> : null} */}
      {pageNotFound === true ? <UserNotFoundPage /> : null}
    </Main>
  );
};

export default Explore;
