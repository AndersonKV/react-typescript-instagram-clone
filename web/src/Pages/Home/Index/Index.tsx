import React, { useEffect, FormEvent, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import BgHome from "../../../assets/bg-home.jpg";
import InstagramIcon from "../../../assets/title-form.jpg";
import IconAppStore from "../../../assets/icon-app-store.png";
import IconGooglePlay from "../../../assets/icon-google-play.png";

import styled from "styled-components";
import { Link } from "react-router-dom";
import api from "../../../services/api";

//COMPONENT
import Footer from "../../../components/Footer";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
   background: white;
  }
`;

const Article = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 30px;
  text-align: center;
  margin: 0 auto;
  margin-top: 50px;
  max-width: 800px;

  .input-label-red {
    border: 1px solid red !important;
  }
`;

const Column = styled.div`
  width: 350px;
  height: 377px;
  margin-top: 40px;
  a {
    cursor: pointer;
    text-decoration: none;
    color: #0095f6 !important;
    font-weight: bold;
  }
  .container-register {
    background: white;
    padding: 20px;
    margin-top: 20px;
    border: 1px solid #dbdbdb;
  }
  .container-app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    img {
      width: 136px;
      height: 40px;
    }
  }
  .get-app {
    padding: 20px;
  }
  .enter-or-not {
    div:nth-child(1) {
      i {
        font-size: 20px;
        margin-right: 5px;
      }
    }
    div:nth-child(2) {
      span {
        font-size: 13px;
      }
      margin-bottom: 5px;
    }
  }
`;
const Form = styled.form`
  background: white;
  border: 1px solid #dbdbdb;
  &:nth-child(1) {
    img {
      width: 100%;
    }
  }
  div:nth-child(7) {
  }
  div {
    padding: 2.5px;
  }
  .group-input {
    display: grid;
    grid-template-columns: 1fr;
    input {
      width: 258px;
      height: 36px;
      border: 1px solid #dbdbdb;
      background: (var(--b3f, 250, 250, 250), 1);
      text-indent: 7px;
      font-size: 0.8em;
      z-index: 1;
      margin: 0 auto;
      outline: none;
    }
    span {
      color: red;
      font-size: 15px;
    }
    label[for="email"],
    label[for="password"] {
      position: absolute;
      position: absolute;
      margin-top: 10px;
      font-size: 12px;
      font-weight: 300;
      margin-left: 50px;
      color: gray;
      text-align: left;
      z-index: 0;
      transition: 0.2s;
    }
    .active {
      font-size: 10px !important;
      margin-top: 3px !important;
    }
  }
  button {
    background-color: rgba(0, 149, 246, 0.3);
    color: white;
    opacity: 1;
    width: 264px;
    height: 29px;
    border-radius: 3px;
    border: none;
    font-weight: bold;
    margin: 5px;
    cursor: pointer;
  }
  .border-gray {
    padding: 0 30px;
    &:nth-child(1) {
      border: 1px solid red;
      margin: 5px;
    }
  }
`;

interface IntrinsicElements {
  info: string;
}

interface ChildComponentProps extends RouteComponentProps<any> {
  /* other props for ChildComponent */
}

interface User {
  email: string;
  password: string;
}

interface Props {
  info?: string;
}

const Home: React.FC<ChildComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [inputErrorEmail, setInputErrorEmail] = useState("");
  const [inputErrorPassword, setInputErrorPassword] = useState("");

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("TOKEN");
      try {
        if (token) {
          const response = await api.get("/app/user", {
            headers: { Authorization: `Bearer ${token}` },
            params: { USER_ONLY: true },
          });
          console.log(3);

          if (response.data.user) {
            console.log(3);
            history.push("/app");
          }
        } else {
          console.log(4);

          setLoading(true);
        }
      } catch (err) {
        console.log(6);

        setLoading(true);
        console.log(err);
      }
    }
    init();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (email.length !== 0) {
      setInputErrorEmail("");

      if (password.length !== 0) {
        setInputErrorPassword("");

        try {
          const response = await api.post("/login", {
            user: email,
            password: password,
          });

          const { data } = response;
          console.log(data);

          if (data.error === "usuario não encontrado") {
            setEmailError(true);
            return;
          }

          if (data.error === "email não encontrado") {
            setEmailError(true);
            return;
          }

          if (data.error === "senha invalida") {
            setPasswordError(true);
            return;
          }

          if (data.length !== 0) {
            localStorage.setItem("TOKEN", data.token);
            history.push("/app");
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        setInputErrorPassword("input-label-red");
      }
    } else {
      setInputErrorEmail("input-label-red");
    }
  };

  const LabelError = ({ info }: IntrinsicElements) => {
    return <span className="label-error">{info}</span>;
  };

  return (
    <>
      <GlobalStyle />
      {loading !== false ? (
        <main>
          <Article>
            <>
              <aside>
                <img alt="celular com fotos que vão mudando" src={BgHome} />
              </aside>
              <Column>
                <Form onSubmit={handleSubmit}>
                  <div>
                    <img alt="instagram icone" src={InstagramIcon} />
                  </div>
                  <div className="group-input">
                    <input
                      id="email"
                      type="text"
                      value={email}
                      className={inputErrorEmail}
                      onChange={(event) => setEmail(event.target.value)}
                    />

                    <label
                      className={email.length > 0 ? "active" : ""}
                      htmlFor="email"
                    >
                      Telefone, nome de usúario ou email
                    </label>

                    {emailError !== false ? (
                      <LabelError info={"usuario ou email não encontrado"} />
                    ) : null}
                  </div>
                  <div className="group-input">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      className={inputErrorPassword}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <label
                      className={password.length > 0 ? "active" : ""}
                      htmlFor="password"
                    >
                      Senha
                    </label>
                    {passwordError !== false ? (
                      <LabelError info={"senha invalida"} />
                    ) : null}
                  </div>
                  <div>
                    <button type="submit">Entrar</button>
                  </div>
                  <div className="border-gray">
                    <div></div>
                    <div>ou</div>
                    <div></div>
                  </div>
                  <div className="enter-or-not">
                    <div>
                      <i className="fab fa-facebook-square"></i>
                      <span>Entrar com o Facebook</span>
                    </div>
                    <div>
                      <span>Esqueceu sua senha?</span>
                    </div>
                  </div>
                </Form>
                <div className="container-register">
                  <span>Não tem uma conta? </span>
                  <Link to="/accounts/emailsignup/">Cadastre-se</Link>
                </div>
                <div className="get-app">
                  <span>Obtenha o aplicativo.</span>
                </div>
                <div className="container-app">
                  <div>
                    <img alt="icone app store" src={IconAppStore} />
                  </div>
                  <div>
                    <img alt="icone google play" src={IconGooglePlay} />
                  </div>
                </div>
              </Column>
            </>
          </Article>
          <Footer />
        </main>
      ) : null}
    </>
  );
};

export default Home;
