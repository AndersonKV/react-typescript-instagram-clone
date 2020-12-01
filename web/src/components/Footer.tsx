import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  .footer__wrapper {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    padding: 0 30px;
    padding-top: 20px;
    padding-bottom: 20px;

    max-width: 1140px;
    margin: 0 auto;
    text-align: center;
    font-weight: 400;
    color: #007bff;

    .footer__wrapper--nav__left {
      display: flex;
      flex-direction: row;

      ul {
        display: grid;
        grid-template-columns: repeat(7, 1fr);

        li {
          list-style: none;

          a {
            color: gray;

            text-decoration: none;
          }
        }
      }
    }

    .footer__wrapper--nav__right {
      display: flex;
      flex-direction: row-reverse;
      ul {
        display: grid;
        list-style: none;
        a {
          text-decoration: none;
        }
        .copyright {
          color: gray;
        }
      }
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <>
      <StyledFooter>
        <div className="footer__wrapper">
          <nav className="footer__wrapper--nav__left">
            <ul className="">
              <li>
                <a href="/">Sobre nós</a>
              </li>
              <li>
                <a href="/">Suporte</a>
              </li>
              <li>
                <a href="/">Imprensa</a>
              </li>
              <li>
                <a href="/">API</a>
              </li>
              <li>
                <a href="/">Empregos</a>
              </li>
              <li>
                <a href="/">Privacidade</a>
              </li>
              <li>
                <a href="/">Termos</a>
              </li>
            </ul>
          </nav>

          <nav className="footer__wrapper--nav__right">
            <ul>
              <li className="copyright">© 2020 Instagram</li>
            </ul>
          </nav>
        </div>
      </StyledFooter>
    </>
  );
};

export default Footer;
