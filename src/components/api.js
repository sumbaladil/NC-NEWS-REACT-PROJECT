import axios from "axios";

function getAllArticles(url) {
  return axios.get(url).then(response => {
    return response.data;
  });
}

export { getAllArticles };
