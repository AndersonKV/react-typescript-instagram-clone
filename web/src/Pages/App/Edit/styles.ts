import styled from "styled-components";

export const Main = styled.main`
  header {
    position: fixed;
    top: 0px;
  }
`;
export const Section = styled.section`
  border: 1px solid #dbdbdb;
  max-width: 800px;

  margin: 0 auto;
  text-align: right;

  margin-top: 100px;
  padding: 20px;

  .btn-green {
    background: greenyellow;
    outline: none;
    color: whitesmoke;
  }
  .section-photo {
    /* display: grid;
    grid-template-columns: 100px 1fr; */

    display: flex;
    flex-direction: row;
    text-align: left;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
    div {
      margin-left: 15px;

      span {
        width: 100%;
        text-align: left;
      }
    }

    .color-sky {
      color: #0095f6;
      font-weight: bold;
    }
    display: grid;
    grid-template-columns: 1fr 3fr;

    div {
      img {
        width: 50px;
        height: 50px;
        float: right;
      }
    }
  }

  form {
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;

    button {
      margin: 0 auto;
      margin-left: 215px;
      padding: 10px;
      color: white;
      background: #0095f6;
      border-radius: 5px;
      border: none;
      font-weight: bold;
    }
  }
`;

export const InputFile = styled.div`
  .btn {
    margin-left: -30px !important;
  }

  /* input {
    margin-left: 10px;
  } */
  .file-field {
    position: relative;
  }

  .file-field .file-path-wrapper {
    overflow: hidden;
    /* padding-left: 160px; */
  }

  .file-field input.file-path {
    width: 100%;
  }

  .file-field .btn,
  .file-field .btn-large,
  .file-field .btn-small {
    /* float: left; */
    /* height: 3rem; */
    /* line-height: 3rem; */
  }

  .file-field span {
    cursor: pointer;
  }

  .file-field input[type="file"] {
    position: absolute;
    top: 0;
    right: 0;
    left: -30px;
    bottom: 0;
    width: 30%;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
    background: red !important;
  }

  .file-field input[type="file"]::-webkit-file-upload-button {
    display: none;
  }
`;
export const GroupInput = styled.div`
  div {
    display: grid;
    grid-template-columns: 1fr 3fr;

    margin: 10px;

    span:last-child {
      position: absolute !important;
      text-align: center;
      flex: 1;
      margin-left: 520px;
      margin-top: 0px;
      color: red;
      /* align-content: center;
      justify-items: center; */
    }
    input {
      width: 50%;
      margin-left: 10px;
      padding: 5px;
    }
  }
`;
