import React, { useState, useEffect } from "react";
import InstagramIcon from "../../../assets/title-form.jpg";

import { Link } from "react-router-dom";
import api from "../../../services/api";
import db from "../../../services/db";

//COMPONENTS
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

import { Article, Main, SectionUser, UserInfo, SectionPhoto } from "./styles";

import { isAuthenticated } from "../../../auth";

//IMPORT UTILS
import {
  ShowModalFollowings,
  ShowModalFollowers,
  ShowModalComponent,
  UserNotFoundPage,
} from "../../../util/Util.Component";

import { handleErrorImage } from "../../../util/Utils.Functions";
interface DispatchProps {
  history: any;
}

interface User {
  email: string;
  name_complete: number;
  profile_picture: number;
  user: string;
  my_following: number;
  my_follower: number;
  my_posts: number;
  user_following: boolean;
  _id: string;
}

interface Imagem {
  path: string | Blob;
  map: any;
}

interface Posts {
  id_user: string;
  post_image: Imagem;
  post_text: string;
  map: any;
  length: any;
  _id: string;
  comments: number;
  likes: number;
}

export interface listFollower {
  name_complete: string;
  profile_picture: string;
  user: string;
  _id: string;
  length: any;
  map: any;
}

interface IntrinsicElements {
  picture?: User;
  profile: User;
}

const Profile: React.FC<DispatchProps> = () => {
  const [profile, setProfile] = useState<User>();
  const [posts, setPosts] = useState<Posts>();
  const [userAuth, setUserAuth] = useState<User>();
  const [userIsFollow, setUserIsFollow] = useState("");
  const [btnSituation, setBtnSituation] = useState("Seguir");

  const [loading, setLoading] = useState(false);

  const [listFollowers, setListFollowers] = useState<listFollower>();
  const [listFollowings, setListFollowings] = useState<listFollower>();

  const [showModal, setShowModal] = useState(false);
  const [showModalfollower, setShowModalfollower] = useState(false);
  const [showModalfollowing, setShowModalfollowing] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [isAuth, setIsAuth] = useState("");
  const [classHover, setClassHover] = useState("");

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("TOKEN");
      const userUrl = window.location.pathname.replace("/profile/", "");

      try {
        if (token) {
          console.log("TEM TOKEN");

          const response = await api.get("/app/profile", {
            headers: { Authorization: `Bearer ${token}` },
            params: { profile: userUrl },
          });

          const { user, profile, post } = response.data;

          console.log(post);
          if (profile.isFollowing === true) {
            setBtnSituation("Seguindo");
          }

          setUserAuth(user);
          setPosts(post);
          setProfile(profile);
          setIsAuth("IS_VALIDATE");
          setUserIsFollow(user?._id);
          setLoading(true);
        } else {
          console.log("NAO TOKEN");

          const response = await api.get("/profile", {
            params: { profile: userUrl },
          });

          const { profile, post } = response.data;

          setProfile(profile);
          setPosts(post);
          setIsAuth("NOT_VALIDATE");
          setLoading(true);
        }
      } catch (ex) {
        console.log("token error");

        try {
          const response = await api.get("/profile", {
            params: { profile: userUrl },
          });

          const { profile, post } = response.data;

          console.log(post);
          if (profile) {
            setProfile(profile);
            setPosts(post);
            setIsAuth("NOT_VALIDATE");
            setLoading(true);
          }
        } catch (err) {
          console.log(err, +"error");
          setIsAuth("NOT_VALIDATE");
          setUserNotFound(true);
          setLoading(true);
        }
      }
    }
    init();
  }, []);

  async function handleModalAndFollow() {
    if (isAuth === "NOT_VALIDATE") {
      setShowModal(true);
    } else {
      const response = await api.post("/following", {
        id_user: profile?._id,
        id_user_following: userIsFollow,
      });

      const count = profile?.my_follower as number;
      if (response.data.success === "começou a seguir") {
        setBtnSituation("Seguindo");
        setProfile((prevState: any) => {
          return {
            ...prevState,
            my_follower: count + 1,
          };
        });
      } else {
        setBtnSituation("Seguir");
        setProfile((prevState: any) => {
          return {
            ...prevState,
            my_follower: count - 1,
          };
        });
      }
    }
  }

  function removeModal() {
    setShowModal(false);
  }

  function closerBoxFollower() {
    setShowModalfollower(false);
  }

  function closerBoxFollowing() {
    setShowModalfollowing(false);
  }

  async function getFollowers() {
    if (isAuth === "NOT_VALIDATE") {
      setShowModal(true);
    } else {
      console.log(isAuth);
      try {
        const response = await api.get("/get_follower_user", {
          params: {
            id_user: profile?._id,
          },
        });

        const { data } = response;

        console.log(data);
        setListFollowers(data);
        setShowModalfollower(true);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function getFollowings() {
    if (isAuth === "NOT_VALIDATE") {
      setShowModal(true);
    } else {
      try {
        const response = await api.get("/get_following_user", {
          params: {
            id_user_following: profile?._id,
          },
        });
        const { data } = response;
        setListFollowings(data);
        setShowModalfollowing(true);
      } catch (err) {
        console.log(err);
      }
    }
  }

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

  const ComponentUserPicture = ({ profile }: IntrinsicElements) => {
    return (
      <div className="user-picture">
        <img alt="imagem do perfil" src={`${db}${profile?.profile_picture}`} />
      </div>
    );
  };

  const ComponentUserInfo = ({ profile }: IntrinsicElements) => {
    return (
      <UserInfo className="user-info">
        <div className="user-info--top">
          <div>
            <span>{profile?.user}</span>
          </div>
          {userIsFollow === profile?._id ? (
            <div>
              <button className="btn-white">
                <Link to="/account/edit">Editar perfil</Link>
              </button>
            </div>
          ) : null}

          {userIsFollow !== profile?._id && btnSituation === "Seguir" ? (
            <div>
              <button className="btn-blue" onClick={handleModalAndFollow}>
                Seguir
              </button>
            </div>
          ) : null}

          {userIsFollow !== profile?._id && btnSituation === "Seguindo" ? (
            <div>
              <button className="btn-white">
                <Link to={`/direct/t/${profile?._id}`}>Enviar menssagem</Link>
              </button>
              <button className="btn-white" onClick={handleModalAndFollow}>
                Seguindo
              </button>
            </div>
          ) : null}
          <div>
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>
        <div className="user-info--bottom">
          <div>
            <span>
              <b>{profile?.my_posts}</b> publicações
            </span>
          </div>
          <div onClick={getFollowers}>
            <span>
              <b>{profile?.my_follower}</b> seguidores
            </span>
          </div>
          <div onClick={getFollowings}>
            <span>
              <b>{profile?.my_following}</b> seguindo
            </span>
          </div>
        </div>
      </UserInfo>
    );
  };

  const ComponentSectionPhoto = ({ profile }: IntrinsicElements) => {
    return (
      <SectionPhoto>
        <div className="section-middler">
          <div>
            <span>PUBLICAÇÕES</span>
          </div>
          <div>
            <span>IGTV</span>
          </div>
          {userAuth?.user === profile.user ? (
            <div>
              <span>SALVOS</span>
            </div>
          ) : null}

          <div>
            <span>MARCADO</span>
          </div>
        </div>
        <>
          {posts && posts.length !== 0 ? (
            <div className="container-photos">
              {posts?.map((post: Posts, key: any) => (
                <div key={key}>
                  <Link
                    to={`/${profile?.user}/p/${post._id}`}
                    className={key === 0 ? "first-img" : ""}
                  >
                    <img
                      onMouseEnter={handleMouseHover}
                      onMouseLeave={handleMouseLeave}
                      onErrorCapture={handleErrorImage}
                      alt="container de fotos"
                      src={`http://localhost:3333/uploads/${post.post_image.path}`}
                    />
                    <div className={`hover-icons ${classHover}`}>
                      <span>
                        <i className="fas fa-comment"></i>
                        {post.likes}
                      </span>
                      <span>
                        <i className="fas fa-heart"></i>
                        {post.comments}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <article className="no-posts">
              <div>
                <div>
                  <i className="fas fa-camera"></i>
                </div>
              </div>
            </article>
          )}
        </>
      </SectionPhoto>
    );
  };

  return (
    <Main>
      {loading === true ? <Header /> : null}
      <>
        {loading !== false ? (
          <Article>
            {userNotFound !== true ? (
              <>
                <SectionUser>
                  <ComponentUserPicture profile={profile as User} />
                  {showModal !== false ? (
                    <ShowModalComponent
                      InstagramIcon={InstagramIcon}
                      removeModal={removeModal}
                    />
                  ) : null}

                  {showModalfollower !== false ? (
                    <ShowModalFollowers
                      closerBoxFollower={closerBoxFollower}
                      listFollowers={listFollowers}
                    />
                  ) : null}

                  {showModalfollowing !== false ? (
                    <ShowModalFollowings
                      closerBoxFollowing={closerBoxFollowing}
                      listFollowings={listFollowings}
                    />
                  ) : null}

                  <ComponentUserInfo profile={profile as User} />
                </SectionUser>

                <ComponentSectionPhoto profile={profile as User} />
              </>
            ) : (
              <UserNotFoundPage />
            )}
            <Footer />
          </Article>
        ) : null}
      </>
    </Main>
  );
};

export default Profile;
