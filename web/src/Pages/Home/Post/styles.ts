import styled from "styled-components";

export const Main = styled.main`
  header {
    position: fixed;
    top: 0px;
  }

  .hide-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  img {
    object-fit: cover;
  }

  a {
    text-decoration: none;
    color: black;
  }
  .page-not-found {
    display: grid;
    grid-template-columns: 1fr;
    padding: 0 30px;
    text-align: center;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 30px;
    max-width: 970px;
  }
`;

export const Article = styled.article`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  max-width: 960px;
  margin: 0 auto;
  height: 600px;
  margin-top: 100px;
  margin-bottom: 100px;
  background: white;
  border: 1px solid #dbdbdb;
`;

export const SectionLeft = styled.section`
  section {
    position: relative;

    .classDot {
      background: red;

      .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
      }
    }
    button {
      border-radius: 50%;
      background: white;
      opacity: 0.5;
      outline: none;
      border: none;
      cursor: pointer;

      position: absolute;
      top: 50%;
      width: auto;
      margin-top: -22px;

      i {
        color: black;
        padding: 5px;
        font-size: 1.5em;
      }
    }

    button:first-child {
      left: 5px;
    }

    button:last-child {
      left: 530px;
    }

    div {
      img {
        width: 100%;
        height: 600px;
        object-fit: cover;
      }

      .selected {
        img {
          opacity: 1;
          min-height: 100px !important;
        }
      }
    }

    @keyframes fade {
      from {
        opacity: 0.4;
      }
      to {
        opacity: 1;
      }
    }
  }

  .slide {
    div {
      display: none;

      img {
        opacity: 0;
        width: 100%;
        /* height: auto; */
        object-fit: cover;
      }
    }

    .selected {
      display: block !important;

      img {
        opacity: 1 !important;
      }
    }
  }
`;

export const SectionRight = styled.section`
  padding: 10px;
  align-self: baseline;
  flex: 1;
  flex-direction: column;
`;

export const SectionAuthUser = styled.div`
  display: flex;
  flex: 1;

  border-bottom: 1px solid #dbdbdb;
  div:first-child {
    img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }
  }

  div:last-child {
    margin-left: 10px;
    align-self: center;
  }
`;

export const SectionComment = styled.div`
  display: block;
  overflow-y: scroll;
  height: 420px;

  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-thumb {
    background: #dbdbdb;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  .user {
    display: flex;
    flex: 1;
    margin-top: 10px;
    display: flex;
    align-items: flex-start;

    a {
      text-decoration: none;
    }

    div {
      align-self: center;
    }
    div:first-child {
      img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
    }

    div:last-child {
      margin-left: 10px;
      padding-right: 10px;

      span:first-child a {
        text-decoration: none;
        margin: 0 auto;
        color: black;
        font-weight: bold;
      }

      span:last-child {
        margin-left: 10px;
        font-size: 0.8em;

        a {
          color: #0077cc;
          font-weight: bold;
        }
      }

      button {
        margin: 0 auto;
        display: flex;
        align-self: flex-start;
      }
    }
  }

  .user-comment {
    display: flex;
    flex: 1;
    margin-top: 10px;
    display: flex;
    align-items: flex-start;

    a {
      text-decoration: none;
    }
    div {
      align-self: center;
    }
    div:first-child {
      img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
    }

    div:last-child {
      margin-left: 10px;
      padding-right: 10px;

      span:first-child a {
        text-decoration: none;
        margin: 0 auto;
        color: black;
        font-weight: bold;
      }

      span:last-child {
        margin-left: 10px;
        font-size: 0.8em;
        a {
          color: #0077cc;
          font-weight: bold;
        }

        width: 90px; /* Tamanho */
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }

      button {
        margin: 0 auto;
        display: flex;
        align-self: flex-start;
      }
    }
  }
`;

export const Formulary = styled.form`
  display: flex;
  justify-content: space-between;

  .not-validate {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    resize: none;
    outline: none;
    text-indent: 10px;
    padding: 10px;
    border: none;
    align-self: stretch;
    font-size: 0.8em;

    a {
      text-decoration: none;
      margin-right: 5px;
      color: #007bff;
    }
  }

  textarea {
    display: flex;
    justify-content: space-between;
    width: 100%;
    resize: none;
    outline: none;
    text-indent: 10px;
    padding: 10px;
    border: none;
    align-self: stretch;

    margin-top: 5px;
  }

  button {
    background: white;
    color: #0095f6;
    outline: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }

  .opacity {
    opacity: 0.5;
    font-weight: 300;
  }
`;

export const StyledGroupIcons = styled.section`
  display: flex;
  justify-content: space-between;

  div {
    align-self: center;
    margin: 7px;

    span {
      margin: 10px;

      i {
        cursor: pointer;
        font-size: 25px;
      }
    }

    .liked {
      color: red;
    }

    .not-liked {
      color: black;
    }
  }
`;

export const StyledSectionLikes = styled.section`
  margin: 0 17px;

  span {
    font-weight: 200px;
    font-size: 16px;
    b {
    }
  }
`;
