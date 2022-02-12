# Dynamic Social Previews Meta Tags with Cloudflare Pages

With Cloudflare Pages *functions* you can make your Single Page Application include social previews dynamically.

This is done by rewriting the requested page with the `HTMLRewriter` on demand. You can read more about this on the [Open Graph Protocol Page](https://ogp.me). This enables you to have nice previews of your page if they're shared on Twitter, Facebook, iMessage and most other social media platforms.

## Deploy this

If you have your page hosted on Cloudflare Pages, you can just create a `functions` folder in the root of your project and put the `_middleware.js` file in there. It'll be executed for every request.

The folder structure could look like this for your project:

```
functions/_middleware.js
src/index.js
README.md
```

You most likely want to update the `_middleware.js` file for your own needs, I've commented it a bit to make it easier to understand.
