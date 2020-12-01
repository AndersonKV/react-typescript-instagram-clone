import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const PageNotFound = styled.div`
  margin: 0 auto;

  text-align: center;

  a {
    text-decoration: none;
    color: black;
  }
`;

const NotFound: React.FC = () => {
  return (
    <PageNotFound>
      <h1>404 - Not Found!</h1>
      <Link to="/">Go Home</Link>
    </PageNotFound>
  );
};

export default NotFound;
