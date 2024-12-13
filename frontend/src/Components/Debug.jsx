export function Debug() {
  return (
    <div style={{ padding: 20, background: '#f5f5f5', margin: 20 }}>
      <h3>Debug Info</h3>
      <pre>
        {JSON.stringify({
          VITE_STYTCH_PUBLIC_TOKEN: import.meta.env.VITE_STYTCH_PUBLIC_TOKEN,
          VITE_STYTCH_PROJECT_ENV: import.meta.env.VITE_STYTCH_PROJECT_ENV,
        }, null, 2)}
      </pre>
    </div>
  );
}
