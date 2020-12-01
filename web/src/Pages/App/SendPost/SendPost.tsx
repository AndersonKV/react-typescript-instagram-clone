import React, { useEffect, useState, ReactNode, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";

import styled from "styled-components";
import api from "../../../services/api";

//COMPONENT
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const Main = styled.main`
  header {
    position: fixed;
    top: 0px;
  }
`;

const Section = styled.section`
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #ccc;
  margin-top: 100px;

  display: block;

  .container-photos {
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    border: 1px solid #ccc;
    div {
      flex-direction: row;
      margin: 5px;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }

  .item {
    margin: 5px;
    text-align: center;
    font-size: 1.5em;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid #ccc;

  .btn {
    margin-left: 10px;
  }

  i {
    font-size: 30px;
  }

  input {
    width: 30px !important;
  }
  .file-field {
    position: relative;
  }

  .file-field .file-path-wrapper {
    overflow: hidden;
    padding-left: 160px;
  }

  .file-field input.file-path {
    width: 100%;
  }

  .file-field .btn,
  .file-field .btn-large,
  .file-field .btn-small {
    float: left;
    height: 3rem;
    line-height: 3rem;
  }

  .file-field span {
    cursor: pointer;
  }

  .file-field input[type="file"] {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
  }

  .file-field input[type="file"]::-webkit-file-upload-button {
    display: none;
  }

  textarea {
    resize: none;
    outline: none;
    text-indent: 10px;
    height: 200px;
    width: 90%;
    border: 1px solid #d3d3d3;
  }

  .bottom {
    display: grid;
    grid-template-columns: 1fr;
    background: white;
    margin: 0 auto;
    border: 1px solid #d3d3d3;

    button {
      background: #00b4db; /* fallback for old browsers */

      color: white;
      opacity: 1;
      width: 264px;
      height: 29px;
      border-radius: 3px;
      border: none;
      font-weight: bold;
      margin: 5px;
      cursor: pointer;
      transition: 2s;
    }
  }
`;

interface UserInterface {
  email: string;
  user: string;
  _id: string;
}

export type Props = {
  picturesHeader: ReactNode;
  userHeader: ReactNode;
};

interface PropsUser {
  email: string;
  name_complete: string;
  profile_picture: string;
  user: string;
  my_following: string;
  my_follower: string;
  my_posts: string;
  _id: string;
}

interface PropsFile {
  files: {
    lastModified: string;
    lastModifiedDate: string;
    name: string;
    size: string;
    type: string;
    webkitRelativePath: string;
  };
}

interface PropsUpload {
  imagem: string;
}

interface ChildComponentProps extends RouteComponentProps<any> {
  /* other props for ChildComponent */
}

const SendPost: React.FC<ChildComponentProps> = ({ history }) => {
  const [userAuth, setUserAuth] = useState<PropsUser>();
  const [post_text, setPost_text] = useState("");
  const [images, setImages] = useState<File[]>();
  const [prevImage, setPrevImage] = useState<String[]>();
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState("");

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("TOKEN");

      try {
        if (token) {
          const response = await api.get("/app/user", {
            headers: { Authorization: `Bearer ${token}` },
            params: { USER_ONLY: true },
          });
          const { user } = response.data;
          setIsAuth("IS_VALIDATE");
          setUserAuth(user[0]);
          setLoading(true);
          console.log(response.data);
        } else {
          throw Error("no token"); // lança uma exceção com um valor numérico
        }
      } catch (e) {
        history.push("/");
        console.log(e);
      }
    }
    init();
  }, []);

  async function handleSubmit(event: any) {
    event.preventDefault();

    const data = new FormData();

    data.append("id_user", String(userAuth?._id));
    data.append("post_text", post_text);

    images?.forEach((image) => {
      data.append("post_image", image);
    });

    console.log(post_text);
    try {
      const token = localStorage.getItem("TOKEN");

      const response = await api.post("/post", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success === 200) {
        alert("post enviado com sucesso");
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    if (prevImage?.length === 5) {
      return;
    }

    try {
      const selectedImages = Array.from(event.target.files);

      const selectedImagesPreview = selectedImages.map((image) => {
        return URL.createObjectURL(image);
      });

      setImages(selectedImages);
      const arrImages = new Array(selectedImages[0]);

      //arrImages.push(selectedImages[0]);

      if (!images) {
        setImages(arrImages);
      } else {
        setImages(arrImages);
        images?.map((img) => {
          arrImages.push(img);
        });
      }

      console.log(arrImages);

      const arrPrevImages = new Array(selectedImagesPreview[0]);

      if (!prevImage) {
        setPrevImage(arrPrevImages);
      } else {
        setPrevImage(arrPrevImages);
        prevImage?.map((img: any) => {
          arrPrevImages.push(img);
        });
      }
    } catch (err) {
      console.log(err);
    }
    //setFiles([...files, { file_id: id, uploaded_file: file_reader.result }]);
  }

  return (
    <Main>
      {loading === true ? (
        <>
          <Header />
          <Section>
            <div className="container-photos item">
              {prevImage?.map((file) => {
                return (
                  <div>
                    <img alt="imagem do post" src={`${file}`} />
                  </div>
                );
              })}
            </div>

            <Form
              className="uploader item"
              encType="multipart/form-data"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="file-field input-field">
                <div className="btn">
                  <span>
                    <i className="fas fa-image">
                      <input
                        type="file"
                        multiple
                        name="post_image"
                        id="post_image"
                        accept=".jpeg, .jpg, .png"
                        onChange={handleChange}
                      />
                    </i>
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <textarea
                    aria-label="Adicione um comentário..."
                    placeholder="Adicione um comentário..."
                    autoComplete="off"
                    autoCorrect="off"
                    name="message"
                    onChange={(event) => setPost_text(event.target.value)}
                  ></textarea>
                </div>

                <div className="bottom">
                  <div>
                    <button type="submit">Enviar</button>
                  </div>
                </div>
              </div>
            </Form>
          </Section>
          <Footer />
        </>
      ) : null}
    </Main>
  );
};

export default SendPost;
