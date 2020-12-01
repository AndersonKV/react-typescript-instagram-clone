import styled from "styled-components";

export const Main = styled.main`
  header {
    position: fixed;
    top: 0px;
  }

  .page-not-found {
    margin-top: 100px;
    text-align: center;
  }
`;

export const SectionHeaderExplore = styled.section`
  max-width: 970px;
  margin: 0 auto;
  margin-top: 100px;

  padding: 0 70px;

  p:first-of-type {
    font-size: 25px;
  }
  p {
    padding: 5px;
    margin: 0px;
  }
`;

export const SecitonContainerExplore = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 970px;
  margin: 0 auto;
  margin-top: 50px;

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

    .hover-icons--set {
      visibility: visible !important;
      opacity: 0.9;
    }

    .hover-icons {
      position: relative;
      top: -40%;
      left: 38%;
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
