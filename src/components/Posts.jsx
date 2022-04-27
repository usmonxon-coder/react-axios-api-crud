import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Posts(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className="posts pt-4">
      {posts.length ? (
        <div className="container">
          {posts.map((item, index) => (
            <div key={index} className="card my-3">
              <div className="card-header">
                <b>PostId: </b> {item.id}
              </div>
              <div className="card-body bg-danger">
                <h5 className="card-title">
                  <b>Special: </b> {item.title}{" "}
                </h5>
                <p className="card-text">
                  <b>Body: </b>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center d-flex align-items-center justify-content-center" style={{height:"70vh"}}>
          <div className="spinner-border" style={{height:"60px", width:"60px"}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
