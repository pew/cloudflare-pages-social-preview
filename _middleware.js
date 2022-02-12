let name
let ogtag

class ElementHandler {
  element(element) {
    element.append(ogtag, { html: true })
  }
}
const rewriter = new HTMLRewriter().on("head", new ElementHandler())

export async function onRequest(context) {
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context

  let res = await next()

  // get query strings provided with request and path name accessing the page
  const { searchParams, pathname } = new URL(request.url)

  // do not inject metatags if just /index.html or / is accessed, just serve the site immediately
  // if you want to include social previews on every page, remove the next three lines
  if (!(pathname === "/index.html" || pathname === "/")) {
    return res
  }

  // querystring I'm looking for to create dynamic images, this is an optional thing depending on your case
  name = searchParams.get("myQuery")

  // these are the metatags we want to inject into the site
  ogtag = `
    <meta property="og:title" content="my title" />
    <meta property="og:description" content="my awesome project description" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:locale:alternate" content="de_DE" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${request.url}" />
    <meta property="og:image" content="https://example.com/preview.png?${name ? "myQuery=" + name : "default"}" />

    <meta property="og:image:height" content="630" />
    <meta property="og:image:width" content="1200" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="my twitter title" />
    <meta name="twitter:description" content="my awesome description for twitter" />

    <meta name="description" content="and even more stuff about my page" />
  `

  return rewriter.transform(res)
}
