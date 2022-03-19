class ElementHandler {
  constructor(ogtag) {
    this.ogtag = ogtag
  }
  element(element) {
    element.append(this.ogtag, { html: true })
  }
}

export async function onRequest(context) {
  const { request, next } = context
  const res = await next()
  const { searchParams, pathname } = new URL(request.url)

  if (!(pathname === '/index.html' || pathname === '/')) {
    return res
  }

  let name = searchParams.get('myQuery')
  let ogtag

  // these are the metatags we want to inject into the site
  ogtag = `
    <meta property="og:title" content="my title" />
    <meta property="og:description" content="my awesome project description" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:locale:alternate" content="de_DE" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${request.url}" />
    <meta property="og:image" content="https://example.com/preview.png?${name ? 'myQuery=' + name : 'default'}" />

    <meta property="og:image:height" content="630" />
    <meta property="og:image:width" content="1200" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="my twitter title" />
    <meta name="twitter:description" content="my awesome description for twitter" />

    <meta name="description" content="and even more stuff about my page" />
  `

  return new HTMLRewriter().on('head', new ElementHandler(ogtag)).transform(res)
}
