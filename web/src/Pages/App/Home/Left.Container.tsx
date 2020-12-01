import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { handleErrorImage } from "../../../util/Utils.Functions";

type Props = {
  followSuggestion: ReactNode;
  userProps: ReactNode;
};

interface User {
  email: string;
  name_complete: string;
  profile_picture: string;
  user: string;
  my_following: string;
  my_follower: string;
  my_posts: string;
  _id: string;
  map: any;
  length: any;
}

const LeftContainer: React.FC<Props> = ({ followSuggestion, userProps }) => {
  const follow = followSuggestion as User;
  const user = userProps as User;

  return (
    <section className={`right-section`}>
      <div className="user-photo">
        <div>
          <img
            onErrorCapture={handleErrorImage}
            alt="imagem do perfil"
            src={`http://localhost:3333/uploads/${user.profile_picture}`}
          />
        </div>
        <div>
          <Link to={`/${user.user}`}>{user.user}</Link>
        </div>
      </div>
      <div className="middle">
        <div className="suggestion">
          <span>Sugestões para você</span>
          <span>Ver tudo</span>
        </div>

        {follow.length > 0 ? (
          follow?.map((user: User, index: string) => {
            return (
              <div className="container-user-suggestion" key={index}>
                <div>
                  <img
                    onErrorCapture={handleErrorImage}
                    alt="imagem do perfil"
                    src={`http://localhost:3333/uploads/${user?.profile_picture}`}
                  />
                </div>
                <span>{user?.user}</span>
                <span>
                  <Link to={`/profile/${user?.user}`}>Seguir</Link>
                </span>
              </div>
            );
          })
        ) : (
          <span className="not-suggestions">Sem usuarios para seguir</span>
        )}
      </div>
    </section>
  );
};

export default LeftContainer;
