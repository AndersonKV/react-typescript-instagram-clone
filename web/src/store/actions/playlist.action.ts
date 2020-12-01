import api from "../../services/api";

export function get_posts(_id: any) {
  return {
    type: "GET_ALL_POSTS",
    _id,
  };
}
