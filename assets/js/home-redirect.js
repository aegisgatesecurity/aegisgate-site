// AegisGate Homepage Auth Redirect
// ============================================
// Purpose: When a user clicks an invite link from Netlify Identity
// (e.g., https://aegisgatesecurity.io/#invite_token=XXX), the invite
// token is consumed and the user is redirected to the homepage. This
// script detects that the user is now authenticated and offers to
// send them to the admin panel.
//
// This is a friendly UX enhancement: the user clicks one link, and
// is offered a one-click path to start writing.
//
// How authentication is detected (in order of preference):
//   1. URL hash contains invite_token, recovery_token, or confirmation_token
//      (Netlify's invite/confirmation flow always includes one of these
//      in the URL fragment, even after the token is consumed)
//   2. nf_jwt cookie exists and is decodable (legacy approach)
//   3. Sveltia/Netlify Identity JS is loaded (future-proof)
//
// Usage: This script is loaded ONLY on the homepage.

(function() {
    'use strict';

    // Only run on the homepage
    if (window.location.pathname !== '/') return;

    // ============================================
    // Method 1: Check URL hash for invite/recovery/confirmation tokens
    // ============================================
    // Netlify Identity redirects users to the homepage with a hash like
    //   #invite_token=XXX    (admin invites a user)
    //   #recovery_token=XXX  (user clicks "forgot password")
    //   #confirmation_token=XXX  (user signs up and confirms email)
    //   #access_token=XXX    (after successful sign-in)
    // We use this as a STRONG signal that the user just came from auth.
    function checkUrlHash() {
        var hash = window.location.hash || '';
        if (!hash) return null;
        var params = {};
        // Strip leading # and split on &
        hash.substring(1).split('&').forEach(function(part) {
            var kv = part.split('=');
            if (kv.length === 2) {
                params[kv[0]] = decodeURIComponent(kv[1]);
            }
        });
        if (params.invite_token) {
            return { method: 'invite_token', token: params.invite_token };
        }
        if (params.recovery_token) {
            return { method: 'recovery_token', token: params.recovery_token };
        }
        if (params.confirmation_token) {
            return { method: 'confirmation_token', token: params.confirmation_token };
        }
        if (params.access_token) {
            return { method: 'access_token', token: params.access_token };
        }
        if (params.error) {
            return { method: 'error', error: params.error, error_description: params.error_description };
        }
        return null;
    }

    // ============================================
    // Method 2: Check for Netlify Identity session cookie
    // ============================================
    // The cookie name can be 'nf_jwt' (production) or 'nf_dnt' (do-not-track)
    function getNetlifyIdentityUser() {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Try multiple cookie names
            for (var name of ['nf_jwt', 'nf_dnt', 'netlify-auth']) {
                if (cookie.indexOf(name + '=') === 0) {
                    var token = cookie.substring(name.length + 1);
                    if (name === 'nf_jwt') {
                        // Try to decode JWT payload
                        try {
                            var parts = token.split('.');
                            if (parts.length === 3) {
                                var payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
                                while (payload.length % 4) payload += '=';
                                var decoded = JSON.parse(atob(payload));
                                return decoded;
                            }
                        } catch (e) {
                            // Fall through
                        }
                    } else if (name === 'nf_dnt') {
                        // nf_dnt is just a boolean (do-not-track flag), not a JWT
                        return { dnt: true };
                    }
                }
            }
        }
        return null;
    }

    // ============================================
    // Detect if auth happened
    // ============================================
    var hashInfo = checkUrlHash();
    var user = getNetlifyIdentityUser();

    // Show banner if EITHER:
    //   - URL hash has invite/recovery/confirmation/access token (strong signal)
    //   - nf_jwt cookie is present (less strong but still good)
    var shouldShowBanner = false;
    var reason = '';

    if (hashInfo) {
        if (hashInfo.method === 'error') {
            // Auth error — show banner with the error
            shouldShowBanner = true;
            reason = 'auth_error: ' + (hashInfo.error_description || hashInfo.error);
        } else {
            // Successful auth flow — show banner offering to go to admin
            shouldShowBanner = true;
            reason = hashInfo.method;
        }
    } else if (user) {
        shouldShowBanner = true;
        reason = 'session_cookie';
    }

    if (!shouldShowBanner) return;

    // Wait for the page to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showAdminBanner);
    } else {
        showAdminBanner();
    }

    function showAdminBanner() {
        // Don't show if the banner already exists
        if (document.getElementById('admin-redirect-banner')) return;

        var banner = document.createElement('div');
        banner.id = 'admin-redirect-banner';
        banner.setAttribute('role', 'status');
        banner.setAttribute('aria-live', 'polite');

        // Style the banner
        if (hashInfo && hashInfo.method === 'error') {
            // Error banner — red theme
            banner.style.cssText = [
                'position: fixed',
                'top: 24px',
                'left: 50%',
                'transform: translateX(-50%)',
                'background: linear-gradient(135deg, #c00 0%, #f44 100%)',
                'color: #fff',
                'padding: 16px 20px',
                'border-radius: 8px',
                'box-shadow: 0 4px 12px rgba(0,0,0,0.3)',
                'z-index: 9999',
                'max-width: 480px',
                'font-size: 14px',
                'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                'display: flex',
                'align-items: center',
                'gap: 12px'
            ].join(';');
            banner.innerHTML = [
                '<div style="flex: 1;">',
                    '<div style="font-weight: 600; margin-bottom: 4px;">⚠️ Authentication error</div>',
                    '<div style="opacity: 0.95; font-size: 13px;">' + escapeHtml(reason.replace('auth_error: ', '')) + '</div>',
                '</div>',
                '<button id="admin-banner-dismiss" style="background: transparent; border: none; color: #fff; cursor: pointer; font-size: 18px; line-height: 1; padding: 0; opacity: 0.8;">×</button>'
            ].join('');
        } else {
            // Success banner — teal theme
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
            var email = (user && user.email) ? user.email : 'admin';
            banner.innerHTML = [
                '<div style="flex: 1; min-width: 0;">',
                    '<div style="font-weight: 600; margin-bottom: 4px;">Welcome back, ' + escapeHtml(email) + '!</div>',
                    '<div style="opacity: 0.9; font-size: 13px;">Ready to write a new blog post?</div>',
                '</div>',
                '<a href="/admin/" role="button" style="background: #FFD700; color: #003399; text-decoration: none; padding: 8px 14px; border-radius: 4px; font-weight: 700; font-size: 13px; white-space: nowrap; flex-shrink: 0;">Open Admin →</a>',
                '<button id="admin-banner-dismiss" aria-label="Dismiss" style="background: transparent; border: none; color: #fff; cursor: pointer; font-size: 18px; line-height: 1; padding: 0; margin-left: 4px; opacity: 0.7;">×</button>'
            ].join('');
        }

        document.body.appendChild(banner);

        // Wire up dismiss button
        var dismiss = document.getElementById('admin-banner-dismiss');
        if (dismiss) {
            dismiss.onclick = function() {
                banner.remove();
            };
        }

        // If the auth flow left a token in the URL hash, clean it up
        // (so refreshes don't re-trigger the banner)
        if (hashInfo && hashInfo.token) {
            // Replace URL without the hash to prevent re-triggering
            try {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            } catch (e) {
                // Some browsers block this; fall back to setting a flag
                sessionStorage.setItem('admin-banner-shown', '1');
            }
        }
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
})();
