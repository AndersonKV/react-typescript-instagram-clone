import styled from "styled-components";

export const Column = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  max-width: 960px;
  margin: 0 auto;
  height: 100%;
  gap: 30px;

  .opacity {
    opacity: 0.5;
  }
  .fa-comment {
    transform: scaleX(-1);
  }
  .right-section {
    position: fixed;
    left: 50%;
    transform: translate(60%, 0);

    right: 50px;
    margin-top: 90px;
    width: 300px;

    .user-photo {
      display: grid;
      grid-template-columns: 70px 1fr;

      div {
        img {
          border-radius: 50%;
          width: 60px;
          height: 60px;
        }

        a {
          color: black;
        }
      }

      div:nth-child(2) {
        margin-top: 20px;

        a {
          text-decoration: none;
          margin-top: 50px;
        }
      }
    }
  }

  .middle {
    .not-suggestions {
      color: black;
      font-weight: 400;
      display: grid;
      grid-template-columns: 3fr 1fr;
      padding: 10px;
    }

    .suggestion {
      display: grid;
      grid-template-columns: 3fr 1fr;
      padding: 10px;

      span {
        color: gray;
        font-weight: 400;
      }

      span:nth-child(2) {
        color: black;
      }
    }

    .container-user-suggestion {
      display: grid;
      grid-template-columns: 50px 1fr 50px;
      padding: 10px;

      a {
        text-decoration: none;
        color: #0095f6;
      }
      div {
        img {
          border-radius: 50%;
          width: 30px;
          height: 30px;
        }
      }

      span:nth-child(3) {
        color: #0095f6;
        font-weight: 400;
      }
    }
  }
`;

export const Posts = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;

  .hide-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .item {
    height: 40px;
    margin-bottom: 10px;
  }

  .section-post {
    width: 100%;
    max-width: 614px;
    margin-bottom: 50px;

    height: auto;

    display: flex;
    flex-direction: column;
    border: 1px solid #dbdbdb;
    background: white;
  }

  /*********MODAL */
  .modal-header {
    position: fixed;
    top: 50px;
    z-index: 1000;
    height: 200vh;
    left: 0px;
    width: 100%;

    background-color: rgba(0, 0, 0, 0.4);

    div {
      display: flex; /* or inline-flex */
      flex-direction: column;

      background: white;
      border-radius: 10px;
      border: none;
      position: fixed;
      right: 50%;
      transform: translate(50%, 0);
      width: 400px;
      margin: 0 auto;
      margin-top: 20px;

      button {
        a {
          text-decoration: none;
          color: black;
        }
        background-color: transparent;
        border-bottom: 0;
        border-left: 0;
        border-right: 0;
        border-top: 1px solid #dbdbdb;
        border-top: 1px solid rgba(var(--b6a, 219, 219, 219), 1);

        cursor: pointer;
        line-height: 1.5;
        margin: 0;
        min-height: 48px;
        padding: 4px 8px;
        text-align: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        vertical-align: middle;
        outline: none;

        &:first-child {
          border: none;
        }

        &:active {
          background: whitesmoke;
          border: none;
          border-radius: 10px;
        }
        /*&:last-child {
        border-top: 1px solid #dbdbdb;
      } */
      }

      .hide {
        display: none;
        visibility: none;
      }
      .text-red {
        color: red;
        font-weight: bold;
      }
    }
  }
`;

export const Article = styled.article`
  width: 100%;
  max-width: 614px;
  margin-bottom: 50px;

  height: auto;

  display: flex;
  flex-direction: column;
  border: 1px solid #dbdbdb;
  background: white;
`;

export const StyledHeader = styled.header`
  display: flex;
  height: 60px;
  margin: 0 10px;

  div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    width: 100%;

    span {
      align-self: center;

      a {
        color: black;
        text-decoration: none;
      }
    }

    span:first-child {
      margin-left: 10px;
    }
  }

  img {
    width: 30px;
    height: 30px;
    margin-top: 10px;
    border-radius: 50%;
    border-bottom: 1px solid #dbdbdb;
    margin-left: 10px;
    cursor: pointer;
  }

  i {
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
`;

export const StyledContainerPhoto = styled.div`
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
      left: 570px;
    }

    div {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        vertical-align: middle;
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
        height: 700px;
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

export const StyledGroupIcons = styled.section`
  display: flex;
  justify-content: space-between;

  div {
    align-self: center;
    margin: 7px;

    span {
      margin: 10px;

      i {
        font-size: 25px;
        cursor: pointer;
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

    b {
    }
  }
`;

export const StyledAuthPost = styled.section`
  a {
    text-decoration: none;
  }

  .post-autor {
    margin: 10px 17px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    span:nth-child(1) {
      align-items: flex-start;
      align-self: flex-start;

      a {
        color: black;
      }
    }
    span:nth-child(2) {
      margin-left: 5px;
      width: 460px;
      word-wrap: break-word;
      font-size: 0.8em;

      a {
        color: #0095f6;
      }
    }

    button {
      background: transparent;
      border: none;
      cursor: pointer;
      font-weight: bold !important;
      color: #8e8e8e;
      outline: none;
    }
  }

  span:hover {
    .click-commentary {
      visibility: visible;
      cursor: pointer;
    }
  }

  .hide-comment {
    display: none;
  }

  .show-comment {
    color: #8e8e8e;
  }
`;

export const StyledCommentaryFromPosts = styled.section`
  a {
    text-decoration: none;
  }

  .show-comment {
    margin: 10px 17px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    font-size: 1em;
    cursor: pointer;
  }
  .posts-from-user {
    margin: 10px 17px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    span:nth-child(1) {
      align-items: flex-start;
      align-self: flex-start;

      a {
        color: black;
      }
    }
    span:nth-child(2) {
      margin-left: 5px;
      width: 460px;
      word-wrap: break-word;
      font-size: 0.8em;

      a {
        color: #0095f6;
      }
    }

    button {
      background: transparent;
      border: none;
      cursor: pointer;
      font-weight: bold !important;
      color: #8e8e8e;
      outline: none;
    }
  }

  span:hover {
    .click-commentary {
      visibility: visible;
      cursor: pointer;
    }
  }

  .hide-comment {
    display: none;
  }

  .show-comment {
    color: #8e8e8e;
  }
`;

export const StyledFormulary = styled.form`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dbdbdb;

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
  }
`;

export const StyledModalHeader = styled.section`
  position: fixed;
  top: 0px;
  z-index: 1000;
  height: 100vh;
  left: 0px;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.4);

  div {
    display: flex; /* or inline-flex */
    flex-direction: column;

    background: white;
    border-radius: 10px;
    border: none;
    position: fixed;
    right: 50%;
    transform: translate(50%, 0);
    width: 400px;
    margin: 0 auto;
    margin-top: 20px;

    button {
      background-color: transparent;
      border-bottom: 0;
      border-left: 0;
      border-right: 0;
      border-top: 1px solid #dbdbdb;
      border-top: 1px solid rgba(var(--b6a, 219, 219, 219), 1);

      cursor: pointer;
      line-height: 1.5;
      margin: 0;
      min-height: 48px;
      padding: 4px 8px;
      text-align: center;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      vertical-align: middle;
      outline: none;

      &:first-child {
        border: none;
      }

      &:active {
        background: whitesmoke;
        border: none;
        border-radius: 10px;
      }
      /*&:last-child {
        border-top: 1px solid #dbdbdb;
      } */
    }

    .hide {
      display: none;
      visibility: none;
    }
    .text-red {
      color: red;
      font-weight: bold;
    }
  }
`;

export const StyledGifLoading = styled.div`
  margin-top: 200px;
  text-align: center;

  img {
    width: 100px;
    height: 100px;
  }
`;
