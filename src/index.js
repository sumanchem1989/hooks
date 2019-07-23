import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";

function App() {
  const [id, setId] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fectchData = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          let res = await axios.get(
            `https://jsonplaceholder.typicode.com/todos/1${id}`
          );
          resolve(res);
        } catch (err) {
          reject(err.message || "something went wrong");
        }
      }, 500);
    });
  };

  useEffect(() => {
    setLoading(true);
    fectchData()
      .then(res => {
        setPosts(() => [...posts, res.data]);
        setLoading(false);
      })
      .catch(err => {
        //console.log(err);
        setError(err);
      });
  }, [id]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={() => setId(id + 1)}>click</button>
      {error && <div>{error}</div>}
      {loading && !error && <div>There are new posts.....</div>}
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
