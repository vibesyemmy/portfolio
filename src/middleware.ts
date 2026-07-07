import { defineMiddleware } from 'astro:middleware';

const PASSWORD = import.meta.env.SITE_PASSWORD || process.env.SITE_PASSWORD;

const gateHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Staging — Opeyemi Ajagbe</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter Variable', system-ui, -apple-system, sans-serif;
      background: #0a0a0a;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1.5rem;
    }
    .gate {
      text-align: center;
      max-width: 400px;
      width: 100%;
    }
    .gate-name {
      font-size: 0.75rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #999999;
      margin-bottom: 0.5rem;
    }
    .gate-title {
      font-size: clamp(1.5rem, 4vw, 2rem);
      font-weight: 600;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
    }
    .gate-sub {
      font-size: 0.875rem;
      color: #999999;
      margin-bottom: 2rem;
      line-height: 1.5;
    }
    .gate-form {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
    }
    .gate-input {
      flex: 1;
      max-width: 260px;
      padding: 0.75rem 1rem;
      background: #161616;
      border: 1px solid #1c1c1c;
      border-radius: 12px;
      color: #ffffff;
      font-size: 0.875rem;
      font-family: inherit;
      outline: none;
      transition: border-color 150ms ease;
    }
    .gate-input:focus {
      border-color: #fb9826;
    }
    .gate-input::placeholder {
      color: #666666;
    }
    .gate-btn {
      padding: 0.75rem 1.5rem;
      background: #fb9826;
      color: #0a0a0a;
      border: none;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: background 150ms ease;
    }
    .gate-btn:hover {
      background: #e0881f;
    }
    .gate-error {
      color: #ff4444;
      font-size: 0.75rem;
      margin-top: 0.75rem;
      display: none;
    }
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..600&display=swap" rel="stylesheet" />
</head>
<body>
  <div class="gate">
    <div class="gate-name">Opeyemi Ajagbe</div>
    <h1 class="gate-title">Staging</h1>
    <p class="gate-sub">This site is password-protected while work is in progress. Enter the password to preview.</p>
    <form class="gate-form" method="get" action="/" onsubmit="return handleSubmit(event)">
      <input
        class="gate-input"
        type="password"
        name="pw"
        placeholder="Password"
        autocomplete="off"
        autofocus
      />
      <button class="gate-btn" type="submit">Enter</button>
      <div class="gate-error" id="error">Incorrect password</div>
    </form>
  </div>
  <script>
    function handleSubmit(e) {
      var val = document.querySelector('.gate-input').value.trim();
      if (!val) {
        e.preventDefault();
        return false;
      }
      return true;
    }
    // Show error if ?error param present
    if (window.location.search.includes('error=1')) {
      document.getElementById('error').style.display = 'block';
    }
  </script>
</body>
</html>`;

export const onRequest = defineMiddleware((context, next) => {
  // Pass through if no password set (local dev safety)
  if (!PASSWORD) return next();

  const url = new URL(context.request.url);

  // Already authenticated via cookie
  const authCookie = context.cookies.get('staging_auth');
  if (authCookie?.value === PASSWORD) return next();

  // Check password param (from gate form)
  const pwParam = url.searchParams.get('pw');
  if (pwParam === PASSWORD) {
    context.cookies.set('staging_auth', PASSWORD, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    // Redirect to clean URL
    url.searchParams.delete('pw');
    url.searchParams.delete('error');
    return context.redirect(url.pathname + (url.search || ''));
  }

  // Wrong password submitted — show error
  if (pwParam && pwParam !== PASSWORD) {
    url.searchParams.set('error', '1');
    url.searchParams.delete('pw');
    return context.redirect(url.pathname + url.search);
  }

  // Not authenticated — serve gate
  return new Response(gateHtml, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
});
