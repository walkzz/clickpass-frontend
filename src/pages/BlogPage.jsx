import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import CreatePostForm from "../components/CreatePostForm";
import EditPostForm from "../components/EditPostForm";
import '../styles/Auth.css';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchPosts = async () => {
    let queryParams = new URLSearchParams();
    if (search) queryParams.append('search', search);
    if (category) queryParams.append('category', category);
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);

    try {
      const res = await fetch(`http://localhost:3000/api/blog/posts?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      console.error("Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search, category, startDate, endDate]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/api/blog/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchPosts();
  };

  return (
    <>
      <Navbar />
      <div className="main-container" style={{ padding: '40px 20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>

        <div style={{ maxWidth: '800px', margin: '0 auto 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '32px', color: '#1f2937' }}>Community Blog</h1>
          {currentUser && !isCreating && !editingPost && (
            <button onClick={() => setIsCreating(true)} className="auth-btn-primary" style={{ width: 'auto', padding: '10px 20px', margin: 0 }}>
              + Create Post
            </button>
          )}
        </div>

        {!isCreating && !editingPost && (
          <div className="auth-card" style={{ maxWidth: '800px', margin: '0 auto 30px', padding: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <input type="text" className="auth-input" placeholder="Search discussions..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div style={{ width: '150px' }}>
              <select className="auth-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="NEWS">News</option>
                <option value="TRAVEL">Travel</option>
                <option value="INTERVIEW">Interviews</option>
                <option value="EVENTS">Events</option>
                <option value="GENERAL">General</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input type="date" className="auth-input" style={{ width: '130px' }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <span style={{ color: '#6b7280' }}>-</span>
              <input type="date" className="auth-input" style={{ width: '130px' }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
        )}

        {isCreating && (
          <CreatePostForm
            onPostCreated={() => { setIsCreating(false); fetchPosts(); }}
            onCancel={() => setIsCreating(false)}
          />
        )}

        {editingPost && (
          <EditPostForm
            post={editingPost}
            onPostUpdated={() => { setEditingPost(null); fetchPosts(); }}
            onCancel={() => setEditingPost(null)}
          />
        )}

        {!isCreating && !editingPost && (
          <div className="posts-feed">
            {posts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '40px' }}>No posts found. Be the first to start a discussion!</p>
            ) : (
              posts.map(post => (
                <PostCard
                  key={post._id}
                  post={post}
                  currentUser={currentUser}
                  onEditRequest={setEditingPost}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        )}

      </div>
    </>
  );
};

export default BlogPage;