import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data) => setComments(data.slice(0, 100)));
  }, []);

  console.log(comments);
  
  const handlePostClick = (postId) => {
    setSelectedPost(postId);
  };

  let filteredComments = comments;

  if (filter.trim() !== '') {
    filteredComments = comments.filter(
      (comment) => comment.postId.toString() === filter
    );
  }

  return (
    <div className="App">
      <div className="left">
        <h1>Posts</h1>
        <input
          className='search-box'
          type="text"
          placeholder="Filter by postId"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {filteredComments.map((comment) => (
          <div
            key={comment.id}
            className={`post ${selectedPost === comment.postId ? 'active' : ''}`}
            onClick={() => handlePostClick(comment.postId)}
          >
            <h3>Post Id: {comment.postId}</h3>
            <p><b>Name:</b> {comment.name}</p>
          </div>
        ))}
      </div>
      {/* Post Details */}
      <div className="right">
        {selectedPost !== null && (
          <div>
            <h1>Comments for Post {selectedPost}</h1>
            {comments
              .filter((comment) => comment.postId === selectedPost)
              .map((comment) => (
                <div key={comment.id} className="comment">
                  <strong>Email: {comment.email}</strong>
                  <p>{comment.body}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
