import api from "../../services/api";
import { promises } from "dns";

const arr: any = [];

var INITIAL_STATE = {
  user: getData(),
};

async function getData() {
  if (localStorage.getItem("TOKEN")) {
    await api.post("/get_email", "anderson@gmail.com").then((response) => {
      var INITIAL_STATE = {
        user: response.data,
      };
    });
  }
}

//state anterior, action como segundo param
export default function myPlaylist(state = INITIAL_STATE, action: any) {
  //console.log(action);
  if (action.type === "GET_ALL_POSTS") {
    console.log("INITIAL_STATE");

    // api.post("/get_email", "anderson@gmail.com").then((response) => {
    //   const { data } = response;
    //   return data;
    // });

    // return {
    //   ...state,
    //   playlistClicked: action.clicked,
    // };
  }
  return state;
}
