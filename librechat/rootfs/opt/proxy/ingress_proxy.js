const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const bodyParser = require("body-parser");
const { createProxy } = require("http-proxy");

const app = express();
const PORT = 5054;

const myProxy = createProxy();

// Middleware to restrict access based on IP address
app.use((req, res, next) => {
  console.log(`Ingress Request: ${req.originalUrl}`);
  const allowedIps = ["127.0.0.1", "172.30.32.2"];
  const clientIp = req.connection.remoteAddress;
  if (allowedIps.includes(clientIp)) {
    next();
  } else {
    res.status(403).send(`Forbidden - client IP ${clientIp} not permitted`);
  }
});

app.use("/", (req, res, next) => {
  const buffer = [];
  const proxyResCallback = (proxyRes, req, res) => {
    proxyRes.on("data", (chunk) => buffer.push(chunk));
    proxyRes.on("end", () => {
      const response = Buffer.concat(buffer).toString("utf8");

      if (
        proxyRes.headers["content-type"] &&
        proxyRes.headers["content-type"].includes("text/html")
      ) {
        const rewrittenResponse = response
          .replace(/href="\//g, `href="${req.baseUrl}/`)
          .replace(/src="\//g, `src="${req.baseUrl}/`);
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        res.end(rewrittenResponse);
      } else {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        res.end(response);
      }
    });
  };

  myProxy.web(req, res, {
    target: "http://localhost:3080",
    changeOrigin: true,
    selfHandleResponse: true, // Handle response modification
    onProxyRes: proxyResCallback,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
