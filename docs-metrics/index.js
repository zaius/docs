// init keen
window.client = new window.Keen({
  projectId: '54d09b5359949a5f26b75fa4',
  writeKey: '25ca6a1eefdd4b3541ab7a6600153dc901a1eb0b6f2eba36a15a69acb2e12fad948e78312de7555a7f6a9ff718a0d129d2c3dd5223d09710f4fde015951a5e58e4f9c55e4d49d1bedfc973d4a2f4c82682a9c0ecf884bb841e400c47f58bb0f0677293f38d1192ff1852b37db9f1e052',
  readKey: 'anything' // not used; not needed for data collection
});

// init Google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-28568056-1']);
_gaq.push(['_setDomainName', 'devcenter.wercker.com']);
_gaq.push(['_trackPageview']);

var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = (document.location.protocol === 'https:' ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);

/**
 * Setup buttons and links
 */
var signupNavSub = document.querySelector('#signup-nav-sub');
var signupFooterSub = document.querySelector('#signup-footer-sub');
var newsletterJoin = document.querySelector('#newsletter-join');

/**
 * Setup event listeners
 */
signupNavSub.onclick = trackSignupClick;
signupFooterSub.onclick = trackSignupClick;
newsletterJoin.onclick = trackCorporateClick;

/**
 * Sign up clicks on sub pages
 */
function trackSignupClick (e) {
  var buttonId = e.target.getAttribute('id');
  var pageId = document.querySelector('body').getAttribute('id');
  return window.client.trackExternalLink(e, 'signup_click', {id: buttonId, page: pageId});
}

/**
 * External link clicks
 */
function trackCorporateClick (e) {
  var buttonId = e.target.getAttribute('id');
  var pageId = document.querySelector('body').getAttribute('id');
  return window.client.trackExternalLink(e, 'corporate_click', {id: buttonId, page: pageId});
}
