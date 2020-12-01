import React, { ReactNode, createElement, FormEvent } from "react";
import InstagramIcon from "../assets/title-form.jpg";

import styled from "styled-components";
import { Link } from "react-router-dom";
import api from "../services/api";

import { isAuthenticated } from "../auth";

import {
  handleErrorImage,
  listSearch,
  nothingWasFound,
} from "../util/Utils.Functions";
import { SecitonContainerExplore } from "../Pages/Home/Explore/styles";

const BoxSearch = styled.div`
  .box-search {
    background: red;
    width: 250px;
    position: fixed;

    z-index: 5;
  }
  .user,
  .hash {
    div {
      height: 30px !important;
    }
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
  .user {
    align-items: center;
    background: white;
    overflow-y: scroll;
    height: 320px;

    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);
    /* wi
    /* width */

    div {
      border: 1px solid #dbdbdb;
      display: flex;

      padding: 5px;
      height: 30px !important;

      &:hover {
        background: whitesmoke;
      }
      a {
        display: flex;
        align-self: center;
        align-items: center;
        width: 100%;
        text-decoration: none;

        img {
          border-radius: 50%;
          width: 40px !important;
          height: 40px !important;
        }

        span {
          margin-left: 5px;
        }
      }
    }
  }

  .hash {
    align-items: center;
    background: white;

    overflow-y: scroll;
    height: 320px;

    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);

    div {
      z-index: 1;
      border: 1px solid #dbdbdb;
      display: flex;

      padding: 5px;
      height: 30px !important;

      &:hover {
        background: whitesmoke;
      }
      a {
        text-decoration: none;
        width: 100%;
        h3,
        h5 {
          padding: 0px;
          margin: 0px;
        }

        h3 {
          font-size: 0.9em;

          color: black;
        }
        h5 {
          font-size: 0.6em;
          color: gray;
        }
      }
    }
  }
`;

const StyledHeader = styled.header`
  background: white; /* fallback for old browsers */
  border-bottom: 1px solid #dbdbdb;
  position: fixed;
  width: 100%;
  z-index: 100;

  .logout {
    a {
      color: black;
    }
  }

  .nav-box {
    z-index: 99995;
    position: absolute;
    left: -10px;
    margin-top: 50px;

    .nothing {
      background: white;
      width: 250px;
      margin: 0 auto;
      border: 1px solid gray;
      z-index: 99995;
      position: absolute;
      div {
        h3 {
          text-align: center;
          font-size: 0.8em;
          color: gray;
        }
      }
    }
  }

  nav {
    display: flex;
    max-width: 960px;
    margin: 0 auto;
    position: relative;
    z-index: -0;

    div:not(.box-search) {
      height: 54px;
    }

    display: flex;
    justify-content: flex-end;

    .align-btn {
      .btn-group {
        div {
          margin-top: 10px;
          button {
            height: 30px;
            display: inline-block;
            cursor: pointer;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1;
            border-radius: 0.25rem;
            transition: color 0.15s ease-in-out,
              background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out;
          }

          button:nth-child(1) {
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
            a {
              color: white;
            }
          }
          button:nth-child(2) {
            color: #007bff;
            font-weight: 400;
            color: #007bff;
            background-color: transparent;

            a {
              color: #007bff;
            }
          }
        }
      }
    }

    .logo-insta {
      width: 200px;
      height: 100%;
      text-align: left;
      margin-left: -40px;
    }

    .input-search {
      display: grid;
      grid-template-columns: 1fr;
      margin: 0 auto;
      z-index: 0;
      position: relative;

      i {
        font-size: 10px;
        color: silver;
        border: 1px solid #dbdbdb;
        padding: 8px;
        position: absolute;
        margin-top: 15px;
      }
      input {
        padding: 5px;
        margin-top: 15px;
        width: 210px;
        border: 1px solid #dbdbdb;
        text-indent: 30px;
        outline: none;

        &::placeholder {
          color: silver;
        }
        color: gray;
      }

      .user,
      .hash {
        div:first-of-type {
          width: 250px;
          height: 30px !important;
        }
        ::-webkit-scrollbar {
          width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #888;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      }
      .user {
        align-items: center;
        background: white;
        overflow-y: scroll;
        height: 320px;

        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);
        /* wi
    /* width */

        div {
          border: 1px solid #dbdbdb;
          display: flex;

          padding: 10px;
          height: 30px !important;

          &:hover {
            background: whitesmoke;
          }
          a {
            display: flex;
            align-self: center;
            align-items: center;
            width: 100%;
            text-decoration: none;

            img {
              border-radius: 50%;
              width: 40px !important;
              height: 40px !important;
            }

            span {
              margin-left: 5px;
              color: black;
            }
          }
        }
      }

      .hash {
        align-items: center;
        background: white;

        overflow-y: scroll;
        height: 320px;

        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);

        div {
          z-index: 1;
          border: 1px solid #dbdbdb;
          display: flex;

          padding: 10px;
          height: 30px !important;

          &:hover {
            background: whitesmoke;
          }
          a {
            text-decoration: none;
            width: 100%;
            h3,
            h5 {
              padding: 0px;
              margin: 0px;
            }

            h3 {
              font-size: 0.9em;

              color: black;
            }
            h5 {
              font-size: 0.6em;
              color: gray;
            }
          }
        }
      }
    }
  }
`;

const IconGroup = styled.div`
  /* display: grid;
      grid-template-columns: repeat(5, 1fr); */

  display: flex;

  a {
    text-decoration: none;
  }

  .header-profile {
    .user-auth {
      width: 23px !important;
      height: 23px !important;
      border-radius: 50% !important;
      margin-top: 4px !important;
      border-bottom: 1px solid #dbdbdb;
    }
  }

  div {
    text-align: center;
    margin: 0 5px;

    & {
      display: flex;

      a {
        align-self: center;
      }
    }
    .out {
      font-size: 15px;
      border-radius: 50%;
    }

    i {
      font-size: 1.5em;
      color: black;
    }
  }
`;
interface UserInterface {
  email: string;
  user: string;
  _id: string;
}

interface ChildComponentProps {
  history?: any;
  picturesHeader?: ReactNode;
  userHeader?: ReactNode;
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

const ComponentBoxSearch = ({
  userHeader,
  picturesHeader,
}: ChildComponentProps) => {
  return (
    <BoxSearch>
      <section className="box-search"></section>
    </BoxSearch>
  );
};

window.addEventListener("click", function (e: any) {
  const input = document.querySelector(
    ".input-search .nav-box"
  ) as HTMLInputElement;
  const inputName = input?.lastChild as Element;

  if (input?.contains(e.target)) {
  } else {
    if (inputName) {
      inputName?.remove();
    }
  }
});

const Header: React.FC<ChildComponentProps> = () => {
  const [nothingFoundState, setNothingFoundState] = React.useState(false);
  const [validate, setValidate] = React.useState(false);
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    async function init() {
      const token = localStorage.getItem("TOKEN");

      try {
        if (token) {
          const response = await api.get("/account/edit", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const { user } = response.data;

          setUser(user[0]);

          if (user.length > 0) {
            setValidate(true);
          } else {
            setValidate(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    init();
  }, []);

  async function handleOnchange(event: React.ChangeEvent<HTMLInputElement>) {
    const word = event.target.value;
    const url = `http://localhost:3333/uploads`;
    //const input = document.querySelector(".box-search");
    const input = document.querySelector(".nav-box");

    if (word.length >= 3) {
      try {
        if (word[0] === "#") {
          const response = await api.post(`/api/search/word`, {
            params: { word },
          });

          const creationElement = "section";
          const setClass = "hash";
          const objectPass = "posts";

          if (input?.lastChild !== null) {
            input?.lastChild.remove();
          }

          const { posts } = response.data;

          if (posts.length > 0) {
            const list = listSearch(
              creationElement,
              setClass,
              objectPass,
              posts
            );

            input?.appendChild(list);
          } else {
            const navBox = document.querySelector(".nav-box");

            if (navBox?.querySelector(".nothing") !== null) {
              navBox?.querySelector(".nothing")?.remove();
            }

            const nothing = nothingWasFound();
            navBox?.appendChild(nothing);
          }
        } else {
          const response = await api.post(`/api/search/word`, {
            params: { word },
          });

          const creationElement = "section";
          const setClass = "user";
          const objectPass = "users";

          if (input?.lastChild !== null) {
            input?.lastChild.remove();
          }

          const { users } = response.data;

          if (users.length > 0) {
            const list = listSearch(
              creationElement,
              setClass,
              objectPass,
              users
            );

            input?.appendChild(list);
          } else {
            const navBox = document.querySelector(".nav-box");

            if (navBox?.querySelector(".nothing") !== null) {
              navBox?.querySelector(".nothing")?.remove();
            }

            const nothing = nothingWasFound();
            navBox?.appendChild(nothing);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  const ComponentHeaderValidate = () => {
    return (
      <>
        <StyledHeader>
          <nav className="nav">
            <div>
              <Link to="/">
                <img
                  className="logo-insta"
                  src={InstagramIcon}
                  alt="instagram icone"
                />
              </Link>
            </div>
            <div className="input-search">
              <div>
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Pesquisar"
                  onChange={handleOnchange}
                />
              </div>
              <div className="nav-box"></div>
            </div>
            <IconGroup>
              <div className="header-profile">
                <a href={`/profile/${user?.user}`}>
                  <img
                    className="user-auth"
                    onErrorCapture={handleErrorImage}
                    alt="imagem do usuario logado"
                    src={`http://localhost:3333/uploads/${user?.profile_picture}`}
                  />
                </a>
              </div>
              <div>
                <Link to="/send/post">
                  <i className="fas fa-camera-retro"></i>
                </Link>
              </div>
              <div>
                <Link to="/direct/inbox">
                  <i className="far fa-paper-plane"></i>
                </Link>
              </div>
              <div>
                <Link to="/explore">
                  <i className="fab fa-bandcamp"></i>
                </Link>
              </div>
              <div className="logout">
                <Link to="/accounts/logout" className="out">
                  Sair
                </Link>
              </div>
            </IconGroup>
          </nav>
        </StyledHeader>
      </>
    );
  };

  const ComponentHeaderNotValidate = () => {
    return (
      <StyledHeader>
        <nav className="nav">
          <div>
            <Link to="/">
              <img
                className="logo-insta"
                src={InstagramIcon}
                alt="instagram icone"
              />
            </Link>
          </div>
          <div className="input-search">
            <div>
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Pesquisar"
                onChange={handleOnchange}
              />
            </div>
            <ComponentBoxSearch />
          </div>
          <div className="align-btn">
            <div className="btn-group">
              <div>
                <button>
                  <a href="/">Entrar</a>
                </button>
                <button>
                  <a href="/accounts/emailsignup">Cadastrar</a>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </StyledHeader>
    );
  };

  return validate === true ? (
    <ComponentHeaderValidate />
  ) : (
    <ComponentHeaderNotValidate />
  );
};

export default Header;
