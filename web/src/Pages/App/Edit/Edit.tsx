import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";

import api from "../../../services/api";

import { Section, GroupInput, InputFile, Main } from "./styles";
import { handleErrorImage } from "../../../util/Utils.Functions";

import Header from "../../../components/Header";

interface ChildComponentProps extends RouteComponentProps<any> {
  /* other props for ChildComponent */
}

interface User {
  created_at: string;
  email: string;
  name_complete: string;
  profile_picture: string;
  user: string;
  _id: string;
  password: string;
}
const Edit: React.FC<ChildComponentProps> = ({ history }) => {
  const [user, setUser] = useState<User>();
  const [photo, setPhoto] = useState<any>();
  const [name, setName] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState<File[]>();
  const [loading, setLoading] = useState(false);

  const [labelUser, setLabelUser] = useState(false);
  const [labelEmail, setLabelEmail] = useState(false);
  const [labelOldPassword, setLabelOldPassword] = useState(false);
  const [btnGreen, setBtnGreen] = useState("");
  const [isAuth, setIsAuth] = useState("");

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("TOKEN");

      try {
        if (token) {
          const response = await api.get("/account/edit", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const { user } = response.data;

          const currentSrc = (`http://localhost:3333/uploads/` +
            user[0].profile_picture) as string;

          console.log(currentSrc);
          setUser(user[0]);
          setName(user[0].name_complete);
          setPhoto(currentSrc);
          setNameUser(user[0].user);
          setEmail(user[0].email);
          setIsAuth("IS_VALIDATE");
          setLoading(true);
        } else {
          history.push("/");
        }
      } catch (err) {
        history.push("/");
      }
    }
    init();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const token = localStorage.getItem("TOKEN");

    const data = new FormData();

    data.append("_id", String(user?._id));

    image?.forEach((d) => {
      data.append("profile_image", d);
    });

    if (name !== user?.name_complete) {
      data.append("name_complete", name);
    }

    if (nameUser !== user?.user) {
      data.append("user", nameUser);
    }

    if (email !== user?.email) {
      data.append("email", email);
    }

    if (oldPassword.length > 0) {
      data.append("oldPassword", oldPassword);
    }

    if (newPassword.length > 0) {
      data.append("newPassword", newPassword);
    }

    try {
      if (oldPassword.length > 0 && newPassword.length === 0) {
        alert("precisa da senha nova");
        return;
      }

      if (newPassword.length > 0 && oldPassword.length === 0) {
        alert("precisa da senha antiga");
        return;
      }

      const response = await api.put(
        `/account/edit/update/image/${user?._id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data);

      if (response.data.error === "usúario já existe") {
        setLabelUser(true);
        return;
      }

      if (response.data.error === "email já foi registrado") {
        setLabelEmail(true);
        return;
      }

      if (response.data.error === "senha invalida") {
        setLabelOldPassword(true);
        return;
      }

      if (response.data.success === "atualizado") {
        setBtnGreen("btn-green");
        setInterval(() => {
          setBtnGreen("");
        }, 2000);
      }
      //window.location.reload(false);
    } catch (err) {
      console.log(err);
    }

    // console.log(response);
  }
  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setImage(selectedImages);
    setPhoto(selectedImagesPreview);
  }

  const ComponentSectionPhoto = () => {
    return (
      <div className="section-photo">
        <div>
          <img
            alt="imagem perfil"
            src={`${photo}`}
            onErrorCapture={handleErrorImage}
          />
        </div>
        <div>
          <span>{user?.user}</span>
          <ComponentInputFileField />
        </div>
      </div>
    );
  };
  const ComponentInputFileField = () => {
    return (
      <InputFile>
        <div className="file-field input-field">
          <div className="btn">
            <span className="color-sky">
              Altera foto do perfil
              <input
                type="file"
                multiple
                name="post_image"
                id="post_image"
                accept=".jpeg, .jpg, .png"
                onChange={handleChange}
              />
            </span>
          </div>
        </div>
      </InputFile>
    );
  };
  return (
    <Main>
      {loading !== false ? (
        <>
          <Header />
          <Section>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              method="post"
            >
              <ComponentSectionPhoto />
              <GroupInput>
                <div>
                  <label>Nome</label>
                  <input
                    placeholder="nome"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </GroupInput>
              <GroupInput>
                <div>
                  <label>Nome do usúario</label>
                  <input
                    placeholder="usúario"
                    value={nameUser}
                    onChange={(event) => setNameUser(event.target.value.trim())}
                  />
                  {labelUser === true ? (
                    <span>*esse usúario já está em uso</span>
                  ) : null}
                </div>
              </GroupInput>
              <GroupInput>
                <div>
                  <label>Email</label>
                  <input
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value.trim())}
                  />
                  {labelEmail === true ? (
                    <span>*email já foi registrado</span>
                  ) : null}
                </div>
              </GroupInput>
              <GroupInput>
                <div>
                  <label>senha antiga</label>
                  <input
                    placeholder="senha antiga"
                    value={oldPassword}
                    onChange={(event) =>
                      setOldPassword(event.target.value.trim())
                    }
                  />
                  {labelOldPassword === true ? (
                    <span>senha invalida</span>
                  ) : null}
                </div>
                <div>
                  <label>senha nova</label>
                  <input
                    placeholder="senha nova"
                    value={newPassword}
                    onChange={(event) =>
                      setNewPassword(event.target.value.trim())
                    }
                  />
                </div>
              </GroupInput>
              <button type="submit" className={btnGreen}>
                atualizar (um por vez)
              </button>
            </form>
          </Section>
        </>
      ) : null}
    </Main>
  );
};

export default Edit;
