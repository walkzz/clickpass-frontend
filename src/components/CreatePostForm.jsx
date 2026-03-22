import { useState } from 'react';
import '../styles/Auth.css';

const CreatePostForm = ({ onPostCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'GENERAL',
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setError('');
    
    const postData = new FormData();
    postData.append('title', formData.title);
    postData.append('content', formData.content);
    postData.append('category', formData.category);
    if (image) postData.append('image', image);

    try {
      const response = await fetch('http://localhost:3000/api/blog/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: postData
      });

      if (response.ok) {
        onPostCreated(); 
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create post');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Server error. Please ensure the backend is running.');
    }
  };

  return (
    <div className="auth-card" style={{ maxWidth: '600px', margin: '0 auto 30px' }}>
      <h2 className="auth-title">Create a New Post</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Title</label>
          <input 
            type="text" 
            className="auth-input"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required 
          />
        </div>

        <div className="input-group">
          <label className="input-label">Category</label>
          <select 
            className="auth-input"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="NEWS">Culture & Fun News</option>
            <option value="TRAVEL">Travel Advice</option>
            <option value="INTERVIEW">Interviews</option>
            <option value="EVENTS">Events</option>
            <option value="GENERAL">General Discussion</option>
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Content</label>
          <textarea 
            className="auth-input" 
            rows="5"
            style={{ resize: 'vertical' }}
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            required 
          />
        </div>

        <div className="input-group">
          <label className="input-label">Attach Image (Optional)</label>
          <input 
            type="file" 
            className="auth-input" 
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="auth-btn-primary">Publish Post</button>
          <button type="button" className="auth-btn-primary" style={{ backgroundColor: '#9ca3af' }} onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;