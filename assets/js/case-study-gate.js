// Email gate for case studies
// Simple cookie-based gate — stores email in cookie for 30 days
// No backend required (static site)

(function() {
    'use strict';

    var COOKIE_NAME = 'aegisgate_case_study_access';
    var COOKIE_DAYS = 30;

    function setCookie(name, value, days) {
        var d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + d.toUTCString() + ';path=/;SameSite=Strict';
    }

    function getCookie(name) {
        var cname = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(cname) === 0) {
                return decodeURIComponent(c.substring(cname.length, c.length));
            }
        }
        return '';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showGate() {
        var content = document.getElementById('case-study-content');
        var gate = document.getElementById('case-study-gate');
        if (content) content.style.display = 'none';
        if (gate) gate.style.display = 'block';
    }

    function showContent() {
        var content = document.getElementById('case-study-content');
        var gate = document.getElementById('case-study-gate');
        if (content) content.style.display = 'block';
        if (gate) gate.style.display = 'none';
    }

    function handleSubmit(e) {
        e.preventDefault();
        var emailInput = document.getElementById('case-study-email');
        var email = emailInput.value.trim();
        var errorEl = document.getElementById('case-study-error');

        if (!isValidEmail(email)) {
            if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
            return;
        }

        setCookie(COOKIE_NAME, email, COOKIE_DAYS);
        showContent();
    }

    function init() {
        var gate = document.getElementById('case-study-gate');
        if (!gate) return; // no gate on this page

        var existingEmail = getCookie(COOKIE_NAME);
        if (existingEmail && isValidEmail(existingEmail)) {
            showContent();
        } else {
            showGate();
        }

        var form = document.getElementById('case-study-form');
        if (form) {
            form.addEventListener('submit', handleSubmit);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();