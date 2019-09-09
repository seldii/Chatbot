const { override } = require("customize-cra");
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
  defaultSrc: ["'self'", "default.com"],
  scriptSrc: ["'self'", "'unsafe-inline'"],
  styleSrc: ["style.com"],
  fontSrc: ["'self'", "fonts.com"],
  imgSrc: ["img.com", "data:"],
  sandbox: ["allow-forms", "allow-scripts"],
  reportUri: "/report-violation",
  objectSrc: ["'none'"],
  upgradeInsecureRequests: true,
  workerSrc: false // This is not set.
};

function addCspHtmlWebpackPlugin(config) {
  if (process.env.NODE_ENV === "production") {
    config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
  }

  return config;
}

module.exports = {
  webpack: override(addCspHtmlWebpackPlugin)
};
