// client/src/pages/Register.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{ 
        width: '450px', 
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
        }}>Create Account</h2>
        
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
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              placeholder="John Doe"
              required
            />
          </div>
          
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
              name="email"
              value={formData.email}
              onChange={handleChange}
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
          
          <div style={{ marginBottom: '20px' }}>
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              placeholder="Minimum 6 characters"
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
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
              placeholder="Confirm your password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              backgroundColor: loading ? '#6c8fb0' : '#28a745', 
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
              if (!loading) e.target.style.backgroundColor = '#218838';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.backgroundColor = '#28a745';
            }}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        
        <p style={{ 
          textAlign: 'center', 
          fontSize: '14px',
          marginTop: '20px',
          color: '#666'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{ 
            color: '#4f83cc', 
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}