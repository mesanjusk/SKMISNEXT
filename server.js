// Single-process server for Render: one HTTP listener serves the Next.js
// app (UI) and the Express API + Socket.IO (backend) together, so there is
// no separate frontend/backend deploy.
const http = require("http");
const next = require("next");
const { app: apiApp, startBackend, notFound, errorHandler } = require("./src/server/app");
const { initSocket } = require("./src/server/socket");

const dev = process.env.NODE_ENV !== "production";
const port = Number(process.env.PORT) || 3000;

const nextApp = next({ dev });
const handleNextRequest = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  // Requests to /api/*, /webhook*, and /analytics are handled by the Express
  // app above; everything else (pages, static assets) falls through to
  // Next.js. notFound/errorHandler are attached last so they only ever
  // catch genuinely unmatched /api/webhook/analytics requests.
  apiApp.all(/^(?!\/api|\/webhook|\/analytics).*/, (req, res) => handleNextRequest(req, res));
  apiApp.use(notFound);
  apiApp.use(errorHandler);

  const server = http.createServer(apiApp);
  initSocket(server);

  // Bind the port first so Render's health check and the UI are reachable
  // immediately; DB connection + schedulers finish shortly after. (Mongo
  // connection failure still exits the process by design — see
  // src/server/config/mongo.js — Render will then restart the container.)
  server.listen(port, () => {
    console.log(`> Server ready on port ${port}`);
  });

  await startBackend();
});
