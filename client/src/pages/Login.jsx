// client/src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5' 
    }}>
      <div style={{ 
        width: '400px', 
        backgroundColor: 'white', 
        borderRadius: '10px', 
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          textAlign: 'center',
          marginBottom: '20px',
          color: '#333'
        }}>Login</h2>
        
        {error && (
          <div style={{ 
            backgroundColor: '#ff4444', 
            color: 'white', 
            padding: '12px', 
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600',
              marginBottom: '8px',
              color: '#555'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ 
                width: '100%', 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '12px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4f83cc'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600',
              marginBottom: '8px',
              color: '#555'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '12px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4f83cc'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              backgroundColor: loading ? '#6c8fb0' : '#4f83cc', 
              color: 'white', 
              padding: '12px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.backgroundColor = '#3a6cb0';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.backgroundColor = '#4f83cc';
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p style={{ 
          textAlign: 'center', 
          fontSize: '14px',
          marginTop: '20px',
          color: '#666'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ 
            color: '#4f83cc', 
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}