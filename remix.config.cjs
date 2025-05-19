/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    serverBuildTarget: "cloudflare-workers",
    appDirectory: "src",
    ignoredRouteFiles: ["**/.*"],
    assetsBuildDirectory: "public/build",
    publicPath: "/build/",
  };
  