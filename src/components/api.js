import axios from "axios";

function getAllArticles(url) {
  return axios.get(url).then(response => {
    return response;
  });
}

function postAnArticle(url, articleObj) {
  return axios.post(url, articleObj).then(response => {
    return response;
  });
}

function postAComment(url, commentObj) {
  return axios.post(url, commentObj).then(response => {
    return response;
  });
}

function updateVote(upOrDown) {
  return axios.put(upOrDown).then(response => {
    return response;
  });
}

function getAllComments(url) {
  return axios.get(url).then(response => {
    return response;
  });
}

function deleteComment(url) {
  return axios.delete(url).then(response => {
    return response;
  });
}

function getAllUsers(url) {
  return axios.get(url).then(response => {
    return response;
  });
}

function getAllTopics(url) {
  return axios.get(url).then(response => {
    return response;
  });
}
export {
  getAllArticles,
  postAnArticle,
  postAComment,
  updateVote,
  getAllComments,
  deleteComment,
  getAllUsers,
  getAllTopics
};
