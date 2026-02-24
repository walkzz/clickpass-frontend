import { useState, useEffect } from 'react';
import '../styles/Auth.css';

const PostCard = ({ post, currentUser, onEditRequest, onDelete }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');

  const isAuthor = currentUser && post.author._id === currentUser.id;
  const isAdmin = currentUser && currentUser.role === 'admin';

  const fetchReplies = async () => {
    const res = await fetch(`http://localhost:3000/api/blog/posts/${post._id}/replies`);
    const data = await res.json();
    setReplies(data);
  };

  useEffect(() => {
    if (showReplies) fetchReplies();
  }, [showReplies]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3000/api/blog/posts/${post._id}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content: newReply })
    });

    if (res.ok) {
      setNewReply('');
      fetchReplies();
    }
  };

  return (
    <div className="auth-card" style={{ maxWidth: '800px', margin: '0 auto 20px', padding: '25px', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#4f46e5', textTransform: 'uppercase' }}>{post.category}</span>
          <h2 style={{ marginTop: '5px', marginBottom: '10px' }}>{post.title}</h2>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Posted by <strong>{post.author.fullName}</strong> on {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          {isAuthor && <button onClick={() => onEditRequest(post)} className="secondary-link">Edit</button>}
          {(isAuthor || isAdmin) && <button onClick={() => onDelete(post._id)} className="secondary-link" style={{color: 'red'}}>Delete</button>}
        </div>
      </div>

      <div style={{ marginTop: '15px', marginBottom: '20px', lineHeight: '1.6' }}>
        {post.image && (
        <div style={{ margin: '15px 0' }}>
          <img 
            src={`http://localhost:3000${post.image}`} 
            alt={post.title} 
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>
      )}
        {post.content}
      </div>

      <div className="divider-line" style={{ marginBottom: '15px' }}></div>

      <button onClick={() => setShowReplies(!showReplies)} className="secondary-link" style={{ fontWeight: 'bold' }}>
        {showReplies ? 'Hide Replies' : `View Replies (${post.comments?.length || 0})`}
      </button>

      {showReplies && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
          {replies.map(reply => (
            <div key={reply._id} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '5px' }}><strong>{reply.author.fullName}</strong> replied:</p>
              <p style={{ fontSize: '14px' }}>{reply.content}</p>
            </div>
          ))}

          {currentUser ? (
            <form onSubmit={handleReplySubmit} style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                className="auth-input" 
                placeholder="Write a reply..." 
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                maxLength="500"
              />
              <button type="submit" className="auth-btn-primary" style={{ width: 'auto', padding: '0 20px', margin: '0' }}>Reply</button>
            </form>
          ) : (
            <p style={{ fontSize: '12px', color: '#6b7280' }}>Log in to reply.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;