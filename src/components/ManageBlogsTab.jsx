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
                <button onClick={() => deletePost(post._id)} className="action-icon" style={{color: 'red'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBlogsTab;