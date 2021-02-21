const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Nice permalinks for pages.
  // Sets up a custom route, that then uses next.js to render the about page.
  server.get('/archive/:aid', (req, res) => {
    // console.log(req)
    const params = {aid: req.params.aid, id: req.params.id};
    return app.render(req, res,`/archives`, params);
  });

  server.get('/products/:slug', (req, res) => {
    const params = { slug:req.params.slug, id: req.params.id };
    return app.render(req, res, '/shop', params);
  });
  // For all other routes, use next.js.
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log(`${'\u2705'}  Ready on http://localhost:${3000}`);
  });
});