# Kobits browser extension

This private-beta extension lets someone select text on any webpage, give a task, and send it to the same task-only Kobits server endpoint.

## Use it locally

1. First deploy the secure Kobits backend and test it from the website.
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer mode**.
4. Choose **Load unpacked**.
5. Select the `extensions/kobits-browser` folder.
6. Pin **Kobits Agent Helper**, then open it on a webpage.
7. In **Connection settings**, enter the HTTPS address of your deployed Kobits site. Do not enter an API key.

The extension requests access only to the Kobits site you enter. It uses Chrome's active-tab permission to read only text that the user selects when they press **Use selected page text**.

This is for private testing. A public extension needs real sign-in, per-user API permissions, rate limits, a privacy policy, and Chrome Web Store review.
