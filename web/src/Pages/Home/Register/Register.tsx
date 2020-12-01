import React, { useState, FormEvent, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import InstagramIcon from "../../../assets/title-form.jpg";
import IconAppStore from "../../../assets/icon-app-store.png";
import IconGooglePlay from "../../../assets/icon-google-play.png";

import styled from "styled-components";
import { Link } from "react-router-dom";

import api from "../../../services/api";
import { isAuthenticated } from "../../../auth";

import Footer from "../../../components/Footer";
const Article = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 30px;
  text-align: center;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 30px;
  max-width: 600px;

  form {
    border: 1px solid red;
    border: 1px solid #dbdbdb;
    padding-bottom: 20px;
    background: white;
    max-width: 350px;
    margin: 0 auto;

    .text {
      color: gray;
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    img {
      width: 100%;
      height: 80px;
    }

    .btn-bluesky {
      background-color: #0095f6;
      color: white;
      opacity: 1;
      width: 264px;
      height: 29px;
      border-radius: 3px;
      border: none;
      font-weight: bold;
      margin: 5px;

      span:nth-child(1) {
        margin-right: 10px;
        margin-top: 10px;
        font-size: 20px;
      }
    }

    .register {
      background-color: rgba(0, 149, 246, 0.3);
      color: white;
      opacity: 1;
      width: 264px;
      height: 29px;
      border-radius: 3px;
      border: none;
      font-weight: bold;
      margin: 5px;
      margin-top: 10px;
      margin-bottom: 10px;
      outline: none;
      cursor: pointer;
    }

    .text-grey {
      display: grid;
      grid-auto-columns: 1fr;

      span:nth-child(1) {
        color: gray;
        font-size: 12px;
      }

      span:nth-child(2) {
        color: #8e8e8e;
        font-size: 13px;
        font-weight: bold;
      }
    }
  }

  .get-app {
    padding: 20px;
  }
  .container-app {
    width: 350px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;

    img {
      width: 136px;
      height: 40px;
    }
  }

  .div-bottom {
    border: 1px solid red;
    border: 1px solid #dbdbdb;
    padding-bottom: 20px;
    background: white;
    width: 350px;
    margin: 0 auto;
    margin-top: 10px;
    padding-top: 10px;

    span {
      margin-top: 100px !important;

      a {
        cursor: pointer;
        text-decoration: none;
        color: #0095f6 !important;
      }
    }
  }
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;

  input {
    width: 258px;
    height: 36px;
    border: 1px solid #dbdbdb;
    background: (var(--b3f, 250, 250, 250), 1);
    text-indent: 10px;
    font-size: 0.8em;
    outline: none;
    margin: 0 auto 3px;
  }

  span {
    color: red;
    font-size: 15px;
  }
`;

interface DispatchProps {
  history: any;
}

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [nameComplete, setNameComplete] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [labelEmail, setLabelEmail] = useState(false);
  //const [labelNameComplete, setLabelNameComplete] = useState(false);
  const [labelUser, setLabelUser] = useState(false);
  //const [labelPassword, setLabelPassword] = useState(false);

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("TOKEN");

      try {
        const response = await api.get("/app/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        setLoading(true);
      }
    }

    init();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      name_complete: nameComplete,
      user: user,
      email: email,
      password: password,
    };

    if (nameComplete.length > 0) {
      setLabelEmail(false);

      if (user.length > 0) {
        setLabelUser(false);

        if (email.length > 0) {
          setLabelEmail(false);

          if (password.length > 3) {
            //setLabelPassword(false);

            const response = await api.post("/user", { data });

            console.log(response);
            if (response.data.error === "Email já foi registrado") {
              setLabelEmail(true);
              return;
            }

            if (response.data.error === "Esse usuario já está em uso") {
              setLabelUser(true);
              return;
            }

            alert("CONTA CRIADA");
          }
        }
      }
    }
  }

  const ComponentFormTop = () => {
    return (
      <>
        <div>
          <img src={InstagramIcon} alt="icon instagram" />
        </div>
        <div className="text">
          Cadastre-se para ver fotos e<br /> vídeos dos seus amigos.
        </div>
        <div>
          <button className="btn-bluesky">
            <span>
              <i className="fab fa-facebook-square"></i>
            </span>
            <span className="btn-bluesky--span">Entrar com o Facebook</span>
          </button>
        </div>
      </>
    );
  };
  const ComponentBottom = () => {
    return (
      <>
        {" "}
        <div className="div-bottom">
          <span>
            Tem uma conta <Link to="/">Conecte-se</Link>
          </span>
        </div>
        <div className="get-app">
          <span>Obtenha o aplicativo.</span>
        </div>
        <div className="container-app">
          <div>
            <img src={IconAppStore} alt="icone app store" />
          </div>
          <div>
            <img src={IconGooglePlay} alt="icone google play" />
          </div>
        </div>
      </>
    );
  };

  const ComponentFormBottom = () => {
    return (
      <>
        <div>
          <button className="register">Cadastrar-se</button>
        </div>
        <div className="text-grey">
          <span>Ao se cadastrar, você concorda com nossos</span>
          <span>Termos, Política de Dados e Política de Cookies.</span>
        </div>
      </>
    );
  };

  return (
    <main>
      {loading === true ? (
        <>
          <Article>
            <form onSubmit={handleSubmit}>
              <ComponentFormTop />
              <div>ou</div>
              <Input>
                <input
                  type="email"
                  id="email"
                  minLength={10}
                  maxLength={40}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                />
                {labelEmail === true ? (
                  <span className="label-error">
                    Esse email já foi registrado
                  </span>
                ) : null}
              </Input>
              <Input>
                <input
                  type="text"
                  id="name-complete"
                  value={nameComplete}
                  minLength={1}
                  maxLength={40}
                  onChange={(event) => setNameComplete(event.target.value)}
                  placeholder="Nome completo"
                />
                {labelUser === true ? (
                  <span className="label-error">
                    Esse usúario já está em uso
                  </span>
                ) : null}
              </Input>
              <Input>
                <input
                  type="text"
                  id="user"
                  value={user}
                  minLength={1}
                  maxLength={40}
                  onChange={(event) => setUser(event.target.value)}
                  placeholder="Nome de usuário"
                />
              </Input>
              <Input>
                <input
                  type="password"
                  id="password"
                  value={password}
                  minLength={8}
                  maxLength={40}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Senha"
                />
              </Input>
              <ComponentFormBottom />
            </form>

            <ComponentBottom />
          </Article>
          <Footer />
        </>
      ) : null}
    </main>
  );
};

export default Home;
