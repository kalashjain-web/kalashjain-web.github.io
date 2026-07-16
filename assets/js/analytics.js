(function () {
  var GA_ID = "G-81HPN07LN4";
  var KEY = "kj-analytics-consent";

  function loadGA() {
    if (window.__kjGA) return;
    window.__kjGA = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }

  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}
  if (choice === "granted") { loadGA(); return; }
  if (choice === "denied") { return; }

  function showBanner() {
    var css =
      ".kj-consent{position:fixed;left:16px;right:16px;bottom:16px;max-width:620px;margin:0 auto;" +
      "background:#fff;border:1px solid #dcdcd6;border-radius:6px;box-shadow:0 1px 10px rgba(10,58,82,.10);" +
      "padding:14px 18px;display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;z-index:120;" +
      'font-family:"Source Sans 3",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}' +
      ".kj-consent p{margin:0;flex:1 1 280px;font-size:.9rem;line-height:1.5;color:#22262a}" +
      ".kj-consent a{color:#005f86}" +
      ".kj-consent__btns{display:flex;gap:8px;margin-left:auto}" +
      ".kj-consent button{cursor:pointer;font-family:inherit;font-size:.85rem;font-weight:600;" +
      "padding:6px 16px;border-radius:999px;border:1px solid;transition:background .2s ease,color .2s ease,border-color .2s ease}" +
      ".kj-consent .kj-accept{background:#0077a8;color:#fff;border-color:#0077a8}" +
      ".kj-consent .kj-accept:hover{background:#005f86;border-color:#005f86}" +
      ".kj-consent .kj-decline{background:transparent;color:#55606a;border-color:#dcdcd6}" +
      ".kj-consent .kj-decline:hover{color:#22262a;border-color:#b8b8b0}";
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);

    var bar = document.createElement("div");
    bar.className = "kj-consent";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Analytics cookie consent");
    bar.innerHTML =
      "<p>This site uses Google Analytics cookies to understand visitor traffic. " +
      "No personal data is sold or shared. See Google’s " +
      '<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">privacy policy</a>.</p>' +
      '<div class="kj-consent__btns">' +
      '<button type="button" class="kj-accept">Accept</button>' +
      '<button type="button" class="kj-decline">Decline</button>' +
      "</div>";
    document.body.appendChild(bar);

    bar.querySelector(".kj-accept").addEventListener("click", function () {
      save("granted"); bar.remove(); loadGA();
    });
    bar.querySelector(".kj-decline").addEventListener("click", function () {
      save("denied"); bar.remove();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showBanner);
  } else {
    showBanner();
  }
})();
