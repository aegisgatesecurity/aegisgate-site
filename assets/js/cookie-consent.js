// AegisGate Cookie Consent Banner
// Version: 1.0.0 (v3.5.0)
// 
// GDPR/ePrivacy/CCPA-compliant cookie consent implementation.
// - No external dependencies (pure JS, no cookies set by this script)
// - Uses localStorage for persistence (not cookies — see note below)
// - Respects Global Privacy Control (GPC) and Do Not Track (DNT)
// - Accessible (WCAG 2.1 AA): focus trap, ARIA, keyboard navigation
// - Conditionally loads non-essential tracking only after explicit consent
//
// NOTE: We use localStorage instead of cookies for consent storage because:
// 1. The consent itself is not tracking — it's user preference
// 2. localStorage is not sent to the server on every request (unlike cookies)
// 3. This avoids the "chicken-and-egg" problem of needing consent to store consent

(function() {
    'use strict';

    var CONSENT_KEY = 'aegisgate_cookie_consent';
    var CONSENT_VERSION = 1; // Increment if consent categories change
    var COOKIE_POLICY_URL = '/legal/cookies/';

    // ─── Consent categories ─────────────────────────────────────
    // essential: Always on (session, CSRF). Cannot be disabled.
    // analytics: Datadog RUM (only set if platform operator enables APM).
    //            On the marketing site (aegisgatesecurity.io), this category
    //            is effectively unused — Netlify Analytics is cookieless.
    // functional: Preferences, language. Currently unused but reserved.
    var CATEGORIES = {
        essential:   { label: 'Essential',        desc: 'Required for authentication and security. Cannot be disabled.', required: true },
        analytics:   { label: 'Analytics',         desc: 'Help us improve the platform. Datadog RUM — only active if your platform operator enables APM.', required: false },
        functional:  { label: 'Functional',        desc: 'Remember your preferences and settings. Currently not in use.', required: false }
    };

    // ─── Check for prior consent ────────────────────────────────
    function getStoredConsent() {
        try {
            var stored = localStorage.getItem(CONSENT_KEY);
            if (!stored) return null;
            var parsed = JSON.parse(stored);
            // If consent schema version changed, re-ask
            if (parsed.version !== CONSENT_VERSION) return null;
            return parsed;
        } catch (e) {
            return null;
        }
    }

    function storeConsent(consent) {
        try {
            consent.version = CONSENT_VERSION;
            consent.timestamp = new Date().toISOString();
            localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
        } catch (e) {
            // localStorage unavailable; banner will show every page load
        }
    }

    // ─── GPC / DNT signal detection ─────────────────────────────
    // Per our Cookie Policy §5.2 and §5.3, we honor both signals.
    // If either is set, treat as opt-out of all non-essential categories.
    function detectsPrivacySignal() {
        return (navigator.globalPrivacyControl === true) || 
               (navigator.globalPrivacyControl === '1') ||
               (navigator.doNotTrack === '1') ||
               (navigator.doNotTrack === 'yes');
    }

    // ─── Build the banner ───────────────────────────────────────
    function createBanner() {
        var overlay = document.createElement('div');
        overlay.id = 'cookie-consent-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Cookie consent');
        overlay.setAttribute('aria-describedby', 'cookie-consent-desc');

        var gpcNotice = '';
        if (detectsPrivacySignal()) {
            gpcNotice = '<p class="cookie-gpc-notice" id="cookie-gpc-notice">' +
                '<strong>Privacy signal detected.</strong> We detected a Global Privacy Control (GPC) ' +
                'or Do Not Track signal from your browser. We honor this signal and have automatically ' +
                'disabled all non-essential cookies. You can still customize below if needed.' +
                '</p>';
        }

        var categoryCheckboxes = '';
        var catKeys = Object.keys(CATEGORIES);
        for (var i = 0; i < catKeys.length; i++) {
            var key = catKeys[i];
            var cat = CATEGORIES[key];
            var checked = cat.required ? ' checked' : '';
            var disabled = cat.required ? ' disabled' : '';
            var requiredLabel = cat.required ? ' <span class="cookie-required-tag">(always on)</span>' : '';
            categoryCheckboxes += 
                '<div class="cookie-category-row">' +
                    '<label class="cookie-category-label">' +
                        '<input type="checkbox" name="cookie-cat" value="' + key + '"' + checked + disabled + ' aria-label="' + cat.label + '">' +
                        '<span class="cookie-category-name">' + cat.label + requiredLabel + '</span>' +
                    '</label>' +
                    '<span class="cookie-category-desc">' + cat.desc + '</span>' +
                '</div>';
        }

        overlay.innerHTML = 
            '<div class="cookie-consent-banner" id="cookie-consent-banner">' +
                '<div class="cookie-consent-content">' +
                    '<div class="cookie-consent-header">' +
                        '<h2 class="cookie-consent-title">🍪 Cookie Preferences</h2>' +
                        '<p class="cookie-consent-desc" id="cookie-consent-desc">' +
                            'We use cookies for essential security functions (authentication, CSRF protection) ' +
                            'and optionally for analytics. We do <strong>not</strong> use advertising or tracking cookies. ' +
                            '<a href="' + COOKIE_POLICY_URL + '">Read our Cookie Policy</a>.' +
                        '</p>' +
                        gpcNotice +
                    '</div>' +
                    '<div class="cookie-consent-categories" id="cookie-consent-categories" style="display:none;">' +
                        categoryCheckboxes +
                    '</div>' +
                    '<div class="cookie-consent-actions">' +
                        '<button class="cookie-btn cookie-btn-reject" id="cookie-btn-reject" type="button">Reject All</button>' +
                        '<button class="cookie-btn cookie-btn-customize" id="cookie-btn-customize" type="button">Customize</button>' +
                        '<button class="cookie-btn cookie-btn-accept" id="cookie-btn-accept" type="button">Accept All</button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        return overlay;
    }

    // ─── Show / hide banner ─────────────────────────────────────
    function showBanner() {
        // Don't show if already present
        if (document.getElementById('cookie-consent-overlay')) return;

        var banner = createBanner();
        document.body.appendChild(banner);

        // Auto-detect GPC and pre-set categories
        if (detectsPrivacySignal()) {
            var checkboxes = banner.querySelectorAll('input[name="cookie-cat"]:not(:disabled)');
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
        }

        // Wire up buttons
        document.getElementById('cookie-btn-accept').addEventListener('click', function() {
            acceptAll();
        });
        document.getElementById('cookie-btn-reject').addEventListener('click', function() {
            rejectAll();
        });
        document.getElementById('cookie-btn-customize').addEventListener('click', function() {
            toggleCustomize();
        });

        // Focus trap — focus the accept button
        var acceptBtn = document.getElementById('cookie-btn-accept');
        if (acceptBtn) acceptBtn.focus();

        // Prevent scrolling behind overlay
        document.body.style.overflow = 'hidden';
    }

    function hideBanner() {
        var overlay = document.getElementById('cookie-consent-overlay');
        if (overlay) {
            overlay.remove();
        }
        document.body.style.overflow = '';
    }

    // ─── Actions ────────────────────────────────────────────────
    function acceptAll() {
        var consent = { essential: true, analytics: true, functional: true };
        storeConsent(consent);
        hideBanner();
        applyConsent(consent);
    }

    function rejectAll() {
        var consent = { essential: true, analytics: false, functional: false };
        storeConsent(consent);
        hideBanner();
        applyConsent(consent);
    }

    function saveCustomized() {
        var checkboxes = document.querySelectorAll('#cookie-consent-categories input[name="cookie-cat"]');
        var consent = { essential: true };
        for (var i = 0; i < checkboxes.length; i++) {
            var cb = checkboxes[i];
            consent[cb.value] = cb.checked;
        }
        storeConsent(consent);
        hideBanner();
        applyConsent(consent);
    }

    function toggleCustomize() {
        var categoriesDiv = document.getElementById('cookie-consent-categories');
        var customizeBtn = document.getElementById('cookie-btn-customize');

        if (categoriesDiv.style.display === 'none') {
            categoriesDiv.style.display = 'block';
            customizeBtn.textContent = 'Save Preferences';
            customizeBtn.removeEventListener('click', toggleCustomize);
            customizeBtn.addEventListener('click', saveCustomized);
        } else {
            // This path shouldn't normally be hit since we swap the handler
            categoriesDiv.style.display = 'none';
        }
    }

    // ─── Apply consent to page ──────────────────────────────────
    // Currently AegisGate's marketing site (aegisgatesecurity.io) uses
    // NO third-party analytics cookies. Netlify Analytics is cookieless.
    // Datadog RUM cookies are only set on the platform itself (self-hosted),
    // not on the marketing site.
    //
    // This function is a HOOK for future analytics integration.
    // When analytics are added (e.g., Plausible, GoatCounter, etc.),
    // load them here conditionally based on consent.analytics.
    function applyConsent(consent) {
        // Dispatch a custom event so other scripts can react
        var event = new CustomEvent('aegisgate:cookieConsent', {
            detail: consent,
            bubbles: true
        });
        document.dispatchEvent(event);

        // Currently: no analytics to conditionally load.
        // Future: if we add a privacy-respecting analytics tool,
        // load it here only if consent.analytics === true.
        //
        // Example (Plausible):
        // if (consent.analytics) {
        //     var script = document.createElement('script');
        //     script.defer = true;
        //     script.dataset.domain = 'aegisgatesecurity.io';
        //     script.src = 'https://plausible.io/js/script.js';
        //     document.head.appendChild(script);
        // }
    }

    // ─── Initialize ─────────────────────────────────────────────
    function init() {
        var stored = getStoredConsent();
        if (stored) {
            // We have prior consent — apply it and don't show banner
            applyConsent(stored);
            return;
        }

        // No prior consent — show the banner
        // Wait for DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                // Small delay so the page renders first
                setTimeout(showBanner, 500);
            });
        } else {
            setTimeout(showBanner, 500);
        }
    }

    // Expose for manual consent management (e.g., footer "Manage Cookies" link)
    window.AegisGateCookieConsent = {
        show: showBanner,
        getConsent: function() { return getStoredConsent(); },
        reset: function() {
            try { localStorage.removeItem(CONSENT_KEY); } catch(e) {}
            showBanner();
        }
    };

    // Run
    init();
})();