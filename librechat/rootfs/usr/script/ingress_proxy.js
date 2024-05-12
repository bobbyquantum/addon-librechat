const express = require("express");
const httpProxy = require("http-proxy");

// Create a proxy server with custom application logic
const proxy = httpProxy.createProxyServer({});

// Set up express
const app = express();

app.use("/api/hassio_ingress/:token", (req, res) => {
  // Modify the incoming request URL by stripping off unwanted parts
  let forwardedUrl = req.url.split("/").slice(4).join("/");

  // Your target where you want to send the cleaned URL
  const targetUrl = `http://localhost:3080/${forwardedUrl}`;

  // Perform the proxying
  proxy.web(req, res, { target: targetUrl });
});

// Specify the port to run on
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
