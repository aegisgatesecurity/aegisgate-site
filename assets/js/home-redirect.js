// AegisGate Homepage Auth Redirect
// ============================================
// Purpose: When a user clicks an invite link from Netlify Identity
// (e.g., https://aegisgatesecurity.io/#invite_token=XXX), the invite
// token is consumed and the user is redirected to the homepage. This
// script detects that the user is now authenticated and sends them to
// the admin panel.
//
// This is a friendly UX enhancement: the user clicks one link, and
// lands on the right place to start writing.
//
// Usage: This script is loaded ONLY on the homepage. It does nothing
// for unauthenticated visitors. The redirect is opt-in via a brief
// "Continue to Admin" button instead of an automatic redirect, so
// the user always knows what happened.

(function() {
    'use strict';

    // Only run on the homepage
    if (window.location.pathname !== '/') return;

    // Check for a Netlify Identity session cookie
    // The cookie name is "nf_jwt" (set by Netlify Identity when the user
    // has a valid session). The token contains a JSON payload with the
    // user's email and other details.
    function getNetlifyIdentityUser() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.indexOf('nf_jwt=') === 0) {
                var token = cookie.substring('nf_jwt='.length);
                try {
                    // JWT structure: header.payload.signature
                    // Payload is base64url-encoded JSON
                    var parts = token.split('.');
                    if (parts.length !== 3) return null;
                    var payload = parts[1];
                    // Convert base64url to base64
                    payload = payload.replace(/-/g, '+').replace(/_/g, '/');
                    // Pad with = if needed
                    while (payload.length % 4) payload += '=';
                    var decoded = JSON.parse(atob(payload));
                    return decoded;
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
    }

    var user = getNetlifyIdentityUser();

    // If the user has a valid Netlify Identity session, show a banner
    // offering to go to the admin panel
    if (user && user.email) {
        // Wait for the page to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showAdminBanner);
        } else {
            showAdminBanner();
        }
    }

    function showAdminBanner() {
        // Don't show if the banner already exists (e.g., from a re-render)
        if (document.getElementById('admin-redirect-banner')) return;

        var banner = document.createElement('div');
        banner.id = 'admin-redirect-banner';
        banner.setAttribute('role', 'status');
        banner.setAttribute('aria-live', 'polite');
        banner.style.cssText = [
            'position: fixed',
            'bottom: 24px',
            'right: 24px',
            'background: linear-gradient(135deg, #003399 0%, #00ADD8 100%)',
            'color: #fff',
            'padding: 16px 20px',
            'border-radius: 8px',
            'box-shadow: 0 4px 12px rgba(0,0,0,0.3)',
            'z-index: 9999',
            'max-width: 360px',
            'font-size: 14px',
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            'display: flex',
            'align-items: center',
            'gap: 12px'
        ].join(';');

        // Build the banner content
        var content = document.createElement('div');
        content.style.cssText = 'flex: 1; min-width: 0;';
        content.innerHTML = [
            '<div style="font-weight: 600; margin-bottom: 4px;">',
                'Welcome back, ' + escapeHtml(user.email) + '!',
            '</div>',
            '<div style="opacity: 0.9; font-size: 13px;">',
                'Ready to write a new blog post?',
            '</div>'
        ].join('');

        var button = document.createElement('a');
        button.href = '/admin/';
        button.setAttribute('role', 'button');
        button.style.cssText = [
            'background: #FFD700',
            'color: #003399',
            'text-decoration: none',
            'padding: 8px 14px',
            'border-radius: 4px',
            'font-weight: 700',
            'font-size: 13px',
            'white-space: nowrap',
            'flex-shrink: 0'
        ].join(';');
        button.textContent = 'Open Admin →';

        var dismiss = document.createElement('button');
        dismiss.setAttribute('aria-label', 'Dismiss');
        dismiss.style.cssText = [
            'background: transparent',
            'border: none',
            'color: #fff',
            'cursor: pointer',
            'font-size: 18px',
            'line-height: 1',
            'padding: 0',
            'margin-left: 4px',
            'opacity: 0.7'
        ].join(';');
        dismiss.textContent = '×';
        dismiss.onclick = function() {
            banner.remove();
        };

        banner.appendChild(content);
        banner.appendChild(button);
        banner.appendChild(dismiss);
        document.body.appendChild(banner);
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
})();
