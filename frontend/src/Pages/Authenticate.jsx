import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useStytch } from '@stytch/react';

function Authenticate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const client = useStytch();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      const authenticateToken = async () => {
        try {
          await client.magicLinks.authenticate({
            token: token,
            session_duration_minutes: 60
          });
          
          // Redirect to dashboard on success
          navigate('/dashboard');
        } catch (err) {
          setError(err.message);
        }
      };

      authenticateToken();
    }
  }, [searchParams, client, navigate]);

  if (error) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Authentication Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Authenticating...</h2>
      <p>Please wait while we log you in.</p>
    </div>
  );
}

export { Authenticate };
