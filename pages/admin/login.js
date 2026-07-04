import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { isAdmin } from '../../lib/auth';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.push('/admin');
        return;
      }
      setError(data.error || 'Login failed.');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Admin Login - Berry Boss</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="stylesheet" href="/style/admin.css" />
        <link rel="shortcut icon" href="/assets/berry.png" type="image/x-icon" />
      </Head>
      <div className="adm-body">
        <div className="adm-login-wrap">
          <form className="adm-login-card" onSubmit={handleSubmit}>
            <img src="/assets/berry-boss-logo.svg" alt="Berry Boss" className="adm-logo" />
            <h1>Admin Login</h1>
            {error && <div className="adm-error">{error}</div>}
            <div className="adm-field">
              <label htmlFor="adm-email">Email</label>
              <input id="adm-email" type="email" name="email" placeholder="admin@berryboss.com" required />
            </div>
            <div className="adm-field">
              <label htmlFor="adm-password">Password</label>
              <input id="adm-password" type="password" name="password" placeholder="Password" required />
            </div>
            <button type="submit" className="adm-btn adm-btn-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  if (await isAdmin(req)) {
    return { redirect: { destination: '/admin', permanent: false } };
  }
  return { props: {} };
}
