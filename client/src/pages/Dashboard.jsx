// client/src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5' 
    }}>
      {/* Navbar */}
      <nav style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AuthMaster
          </h1>
          <button
            onClick={handleLogout}
            style={{ 
              backgroundColor: '#dc3545', 
              color: 'white', 
              padding: '8px 20px', 
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
          >
            Logout
          </button>
        </div>
      </nav>
      
      {/* Main Content */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '32px 24px' 
      }}>
        {/* Welcome Card */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: '32px',
          marginBottom: '24px'
        }}>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#333'
          }}>
            Welcome, {user?.name}! 👋
          </h2>
          <p style={{ 
            color: '#666',
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            You're logged in to your dashboard. Here's your account information.
          </p>
        </div>
        
        {/* User Info Card */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: '32px'
        }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: '600',
            marginBottom: '24px',
            color: '#333',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '12px'
          }}>
            Account Information
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600',
              color: '#666',
              marginBottom: '8px'
            }}>
              Full Name
            </label>
            <p style={{ 
              fontSize: '16px', 
              color: '#333',
              padding: '10px 0'
            }}>
              {user?.name}
            </p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600',
              color: '#666',
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <p style={{ 
              fontSize: '16px', 
              color: '#333',
              padding: '10px 0'
            }}>
              {user?.email}
            </p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600',
              color: '#666',
              marginBottom: '8px'
            }}>
              User ID
            </label>
            <p style={{ 
              fontSize: '16px', 
              color: '#333',
              padding: '10px 0',
              fontFamily: 'monospace',
              backgroundColor: '#f8f9fa',
              padding: '8px 12px',
              borderRadius: '6px',
              display: 'inline-block'
            }}>
              {user?.id}
            </p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '600',
              color: '#666',
              marginBottom: '8px'
            }}>
              Member Since
            </label>
            <p style={{ 
              fontSize: '16px', 
              color: '#333',
              padding: '10px 0'
            }}>
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'N/A'}
            </p>
          </div>
          
          {/* Status Badge */}
          <div style={{ 
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid #f0f0f0'
          }}>
            <span style={{ 
              display: 'inline-block',
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              ✓ Active Account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}