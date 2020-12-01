import React, { memo, useEffect, useState } from "react";

import api from "./services/api";

export const isAuthenticated = async () => {
  const token = localStorage.getItem("TOKEN");
  if (token) {
    console.log("init");

    const response = await api.get("/app/user", {
      headers: { Authorization: token },
    });

    console.log(response.data);

    if (response.data.user) {
      return true;
    }
  } else {
    return false;
  }
  console.log("1");
};
