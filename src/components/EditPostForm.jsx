import { useState } from 'react';
import '../styles/Auth.css';

const EditPostForm = ({ post, onPostUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    category: post.category,
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3000/api/blog/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onPostUpdated();
      } else {
        const data = await response.json();
        setError(data.message);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Failed to update post');
    }
  };

  return (
    <div className="auth-card" style={{ maxWidth: '600px', margin: '0 auto 30px' }}>
      <h2 className="auth-title">Edit Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Title</label>
          <input type="text" className="auth-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
        </div>

        <div className="input-group">
          <label className="input-label">Content</label>
          <textarea className="auth-input" rows="5" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="auth-btn-primary">Save Changes</button>
          <button type="button" className="auth-btn-primary" style={{ backgroundColor: '#9ca3af' }} onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;