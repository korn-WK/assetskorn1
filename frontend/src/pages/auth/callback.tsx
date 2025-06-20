// pages/auth/callback.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

const AuthCallbackPage = () => {
  const router = useRouter();
  // Error might still come via query param if authentication fails at Google itself or backend
  const { error } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    // Backend will now set HttpOnly cookie and redirect directly to /dashboard
    // So, we primarily handle potential errors from the redirect
    if (error) {
      console.error('Authentication error from callback:', error);
      router.push(`/login?error=${error}`);
    } else {
      // If no error, assume success and backend has set the cookie.
      // Redirect to dashboard (backend should have already redirected to /dashboard anyway)
      // This ensures if somehow user lands here without error, they still go to dashboard.
      router.push('/dashboard');
    }
  }, [router, error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <Head>
        <title>กำลังเข้าสู่ระบบ...</title>
      </Head>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h2 style={{ marginBottom: '15px', color: '#333' }}>กำลังเข้าสู่ระบบ...</h2>
        <p style={{ color: '#555', marginBottom: '25px' }}>กรุณารอสักครู่</p>
        {error && <p style={{ color: '#dc3545', fontWeight: 'bold' }}>Error: {error}</p>}
      </div>
    </div>
  );
};

export default AuthCallbackPage;