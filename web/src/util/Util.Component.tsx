import React from "react";
import { listFollower } from "../Pages/Home/Profile/Profile";
import { Link } from "react-router-dom";

interface PropsFollowing {
  closerBoxFollowing: () => void;
  listFollowings: any;
}

interface PropsFollower {
  closerBoxFollower: () => void;
  listFollowers: any;
}

interface PropsModal {
  removeModal: () => void;
  InstagramIcon: string;
}

export const ShowModalFollowings = ({
  closerBoxFollowing,
  listFollowings,
}: PropsFollowing) => {
  console.log(listFollowings);
  return (
    <div className="modal-following">
      <div className="box-following">
        <div className="top">
          <span>Seguindo</span>
          <span className="remove-x" onClick={closerBoxFollowing}>
            X
          </span>
        </div>
        <div className="box">
          {listFollowings?.map((following: listFollower, key: string) => {
            return (
              <div className="user" key={key}>
                <div>
                  <img
                    alt="foto do usuario"
                    src={`http://localhost:3333/uploads/${following?.profile_picture}`}
                  />
                </div>
                <div>
                  <span>
                    <a href={`${following.user}`}>
                      <b>{following.user}</b>
                    </a>
                  </span>
                  <span>{following.name_complete}</span>
                </div>
                {/* <div>
                  <button>Seguir</button>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ShowModalFollowers = ({
  listFollowers,
  closerBoxFollower,
}: PropsFollower) => {
  return (
    <div className="modal-followers">
      <div className="box-followers">
        <div className="top">
          <span>Seguidores</span>
          <span className="remove-x" onClick={closerBoxFollower}>
            X
          </span>
        </div>
        <div className="box">
          {listFollowers?.map((following: listFollower) => {
            return (
              <div className="user">
                <div>
                  <img
                    alt="foto usuario"
                    src={`http://localhost:3333/uploads/${following?.profile_picture}`}
                  />
                </div>
                <div>
                  <span>
                    <a href={`${following.user}`}>
                      <b>{following.user}</b>
                    </a>
                  </span>
                  <span>{following.name_complete}</span>
                </div>
                {/* <div>
                  <button>Seguir</button>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ShowModalComponent = ({
  removeModal,
  InstagramIcon,
}: PropsModal) => {
  return (
    <div className="area-gray">
      <div className="modal">
        <form>
          <div className="remove-x" onClick={removeModal}>
            X
          </div>
          <div className="input-group">
            <div>
              <img alt="icone instagram" src={InstagramIcon} />
            </div>
            <div>
              <input type="text" placeholder="Telefone, nome ou email" />
            </div>
            <div>
              <input type="password" placeholder="senha" />
            </div>
            <div>
              <button>Entrar</button>
            </div>
          </div>
        </form>
        <div className="input-group-bottom">
          <div>
            <span>
              <i className="fab fa-facebook-square"></i>
            </span>
            <span> Entrar com facebook</span>
          </div>
          <div className="recover-password">
            <span>Esqueceu sua senha</span>
          </div>
          <div className="border-top">
            <span>
              Não tem uma conta <Link to="/register">Cadastre-se</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserNotFoundPage = () => {
  return (
    <div className="page-not-found">
      <h3>Esta página não está disponível.</h3>
      <p>
        O link em que você clicou pode não estar funcionando, ou a página pode
        ter sido removida. Voltar para o Instagram.
      </p>
    </div>
  );
};
