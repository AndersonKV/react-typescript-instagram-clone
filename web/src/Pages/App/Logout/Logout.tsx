import React, { useEffect } from "react";
import { isAuthenticated } from "../../../auth";

import { RouteComponentProps } from "react-router-dom";

const Logout: React.FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    async function init() {
      if (Boolean(isAuthenticated()) === false) {
        history.push("/");
        setLoading(true);
      } else {
        localStorage.removeItem("TOKEN");
        history.push("/");
        setLoading(true);
      }
    }
    init();
  }, []);

  return loading === true ? <span>saindo</span> : null;
};

export default Logout;
