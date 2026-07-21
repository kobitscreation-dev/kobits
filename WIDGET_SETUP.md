# Kobits website widget

After the Kobits backend is deployed, copy `widget/kobits-widget.js` to a static location you control, then add this before `</body>` on a private test website:

```html
<script src="https://YOUR-STATIC-FILE-HOST/kobits-widget.js"
        data-kobits-endpoint="https://YOUR-KOBITS-SITE.netlify.app"></script>
```

The widget has Support, Research, and Content agents. It sends only the task a visitor enters to the Kobits endpoint. It never contains an AI key.

In Netlify, add `KOBITS_ALLOWED_ORIGINS` with the exact website origin that will host the widget, for example `https://example.com`. Multiple origins can be separated with commas. The function rejects widget requests from any other website.

For a public launch, do not use the private-demo setting. Add signed-in user verification, domain allow-listing, rate limits, consent text, privacy policy, and billing before offering the widget on customer websites.
