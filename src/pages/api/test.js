import fetch from "node-fetch";

export default (req, res) => {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      res.statusCode = 200;
      res.end();
    });
};
