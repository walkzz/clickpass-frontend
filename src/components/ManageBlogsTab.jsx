import { useState, useEffect } from 'react';

const ManageBlogsTab = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:3000/api/blog/posts');
    if (res.ok) setPosts(await res.json());
  };

  const deletePost = async (id) => {
    if(!window.confirm("Are you sure you want to delete this post?")) return;
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/api/blog/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchPosts();
  };
  
  useEffect(() => { fetchPosts(); }, []);


  return (
    <div className="management-card">
      <h2 className="management-title">Blog Management</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Date</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post._id}>
              <td style={{ fontWeight: '500' }}>{post.title}</td>
              <td>{post.author?.fullName}</td>
              <td><span className="category-badge">{post.category}</span></td>
              <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              <td style={{ textAlign: 'right' }}>
                <button onClick={() => deletePost(post._id)} className="action-icon" style={{color: 'red'}}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBlogsTab;