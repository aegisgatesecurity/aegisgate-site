// AegisGate Homepage — Admin Link
// ============================================
// Purpose: Show a small, dismissible "Admin / Blog" link in the
// bottom-right of the homepage so the site owner (or anyone) can
// easily access the Sveltia CMS at /admin/.
//
// This used to check for Netlify Identity cookies to detect auth state,
// but as of 2026-06-09 we use the GitHub backend with a Personal Access
// Token, so there's no cookie-based auth to detect. The link is shown
// to ALL visitors (it's a small, unobtrusive link that says "Content
// Manager" or "Edit this site" — common pattern for static sites).
//
// You could hide this from non-admins with IP-based access control in
// netlify.toml, but for now we keep it simple and visible.

(function() {
    'use strict';

    // Only run on the homepage
    if (window.location.pathname !== '/') return;

    // Wait for the page to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showAdminLink);
    } else {
        showAdminLink();
    }

    function showAdminLink() {
        // Don't show if the link already exists
        if (document.getElementById('admin-link')) return;

        // Create the small link element
        var link = document.createElement('a');
        link.id = 'admin-link';
        link.href = '/admin/';
        link.title = 'AegisGate Content Manager (Sveltia CMS)';
        link.setAttribute('aria-label', 'Content Manager');
        link.style.cssText = [
            'position: fixed',
            'bottom: 16px',
            'left: 16px',  // Bottom-LEFT to avoid the EU AI Act button
            'background: rgba(0, 51, 153, 0.7)',  // Subtle EU blue
            'color: #fff',
            'text-decoration: none',
            'padding: 8px 12px',
            'border-radius: 6px',
            'font-size: 12px',
            'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            'z-index: 9998',
            'opacity: 0.6',
            'transition: opacity 0.2s',
            'backdrop-filter: blur(4px)',
            'border: 1px solid rgba(255, 215, 0, 0.3)'  // Subtle gold border
        ].join(';');
        link.textContent = '✏️ Content Manager';

        // Fade in on hover
        link.onmouseenter = function() {
            link.style.opacity = '1';
        };
        link.onmouseleave = function() {
            link.style.opacity = '0.6';
        };

        document.body.appendChild(link);
    }
})();
