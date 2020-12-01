import styled from "styled-components";

export const Main = styled.main`
  header {
    position: fixed;
    top: 0px;
  }
`;

export const SectionUser = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  .user-picture {
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
  }
`;

export const UserInfo = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  height: 100px;

  .user-info--top {
    display: flex;

    align-items: center;

    div {
      margin-right: 15px;
      span {
      }
    }

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
      outline: none;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
  }

  .user-info--bottom {
    display: flex;
    align-items: center;

    div:nth-child(1) ~ div {
      cursor: pointer;
    }
    div {
      margin-right: 15px;
    }
  }
`;

export const SectionPhoto = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  padding-top: 25px;

  .section-middler {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-bottom: 1px solid #dbdbdb;
    div {
      padding: 20px;
      color: gray;
      font-weight: lighter !important;
    }
  }

  .container-photos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    div {
      max-width: 293px !important;
      max-height: 293px !important;
    }

    div:nth-child(3) ~ div {
      margin-top: 30px;
    }

    a {
      text-decoration: none;
      margin: 20px;

      img {
        width: 293px !important;
        height: 293px !important;

        object-fit: cover;
        border: 1px solid white;

        &:hover {
          opacity: 0.5;
        }
      }
    }

    .hover-icons--set {
      visibility: visible !important;
      opacity: 0.9;
    }

    .hover-icons {
      position: relative;
      top: -40%;
      left: 7%;
      pointer-events: none;
      visibility: hidden;
      span {
        align-self: center;
        font-size: 20px;
        color: white;

        i {
          margin: 6px;
        }
      }

      i {
        font-size: 1.5em;
      }
      .fa-heart {
      }
      .fa-comment {
        transform: scaleX(-1);
      }
    }

    .first-img ~ a {
      display: none;
      margin-top: 30px;
      display: grid !important;
    }
  }
`;

export const Article = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 30px;
  text-align: center;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 30px;
  max-width: 970px;

  .page-not-found {
    margin-bottom: 150px;
  }
  .remove-x {
    position: absolute;
    right: 20px;
    color: red;
    font-size: 20px;
    top: 5px;
    cursor: pointer;
  }
  @media (min-width: 576px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 992px) {
  }

  @media (min-width: 1200px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 992px) {
  }

  .btn-blue {
    color: #fff;
    background-color: #007bff;
    border: 1px solid #007bff;
  }

  .btn-white {
    background: white;
    color: black;
    border: 1px solid #dbdbdb !important;
    margin: 5px;

    a {
      text-decoration: none;
      color: black;
    }
  }

  .no-posts {
    display: flexbox;
    grid-template-columns: 1fr !important;
    height: 300px;

    div {
      margin: 0 auto;
      margin-top: 50px;

      i {
        border: 1px solid gray;
        border-radius: 50%;
        padding: 30px;
        font-size: 3em;
      }
    }
  }

  .area-gray {
    position: fixed;
    top: 0px;
    z-index: 10 00;
    height: 100vh;
    left: 0px;
    width: 100%;

    background-color: rgba(0, 0, 0, 0.4);

    .modal {
      background: white;
      border: 1px solid #dbdbdb;
      border-radius: 10px;
      position: fixed;
      right: 50%;
      transform: translate(50%, 0);
      width: 400px;
      height: 420px;
      margin: 0 auto;
      margin-top: 80px;

      .input-group {
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }

        input {
          width: 258px;
          height: 36px;
          border: 1px solid #dbdbdb;
          background: (var(--b3f, 250, 250, 250), 1);
          text-indent: 10px;
          font-size: 0.8em;
          outline: none;
          margin: 2px;
        }

        button {
          margin-top: 20px;
          background-color: rgba(0, 149, 246, 0.3);
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
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
          line-height: 1;
          border-radius: 0.25rem;
          color: white;
          border: transparent;
          transition: color 0.15s ease-in-out,
            background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
        }
      }
    }

    .input-group-bottom {
      div {
        margin-top: 10px;
      }
      .recover-password {
        font-size: 10px;
      }
      .border-top {
        border-top: 1px solid #dbdbdb;
        border-bottom: 1px solid #dbdbdb;
        padding: 10px;
        margin-top: 50px;

        a {
          text-decoration: none;
          color: #0095f6;
        }
      }
    }
  }

  .modal-following {
    position: fixed;
    top: 0px;
    z-index: 10 00;
    height: 100vh;
    left: 0px;
    width: 100%;
    border: 1px solid red;
    background-color: rgba(0, 0, 0, 0.4);

    .box-following {
      background: white;
      border: 1px solid #dbdbdb;
      border-radius: 10px;
      position: fixed;
      right: 50%;
      transform: translate(50%, 0);
      width: 400px;
      height: 420px;
      margin: 0 auto;
      margin-top: 80px;
    }

    .top {
      padding: 20px;
      border-bottom: 1px solid #dbdbdb;
      font-weight: bold;

      .remove-x {
        position: absolute;
        color: red;
        font-size: 25px;
        margin-top: 5px;
      }
    }

    div {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }

    .box {
      display: grid;
      grid-template-columns: 1fr;
      padding: 0 20px;
      .user {
        display: grid;
        grid-template-columns: 60px 1fr auto;

        a {
          text-decoration: none;
          color: black;
        }
        div {
          margin: 5px 5px;
        }

        div:nth-child(2) {
          text-align: left;
          display: grid;
          grid-template-columns: 1fr;
        }

        button {
          height: 30px;
          display: inline-block;
          cursor: pointer;
          font-weight: 400;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          user-select: none;
          border: 1px solid transparent;
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
          line-height: 1;
          border-radius: 0.25rem;
          background-color: #007bff;
          color: white;
          margin-top: 5px;
        }
      }
    }
  }

  .modal-followers {
    position: fixed;
    top: 0px;
    z-index: 10 00;
    height: 100vh;
    left: 0px;
    width: 100%;
    border: 1px solid red;
    background-color: rgba(0, 0, 0, 0.4);

    .box-followers {
      background: white;
      border: 1px solid #dbdbdb;
      border-radius: 10px;
      position: fixed;
      right: 50%;
      transform: translate(50%, 0);
      width: 400px;
      height: 420px;
      margin: 0 auto;
      margin-top: 80px;
    }

    .top {
      padding: 20px;
      border-bottom: 1px solid #dbdbdb;
      font-weight: bold;

      .remove-x {
        position: absolute;
        color: red;
        font-size: 25px;
        margin-top: 5px;
      }
    }

    div {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }

    .box {
      display: grid;
      grid-template-columns: 1fr;
      padding: 0 20px;
      .user {
        display: grid;
        grid-template-columns: 60px 1fr auto;

        a {
          text-decoration: none;
          color: black;
        }
        div {
          margin: 5px 5px;
        }

        div:nth-child(2) {
          text-align: left;
          display: grid;
          grid-template-columns: 1fr;
        }

        button {
          height: 30px;
          display: inline-block;
          cursor: pointer;
          font-weight: 400;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          user-select: none;
          border: 1px solid transparent;
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
          line-height: 1;
          border-radius: 0.25rem;
          background-color: #007bff;
          color: white;
          margin-top: 5px;
        }
      }
    }
  }
`;
