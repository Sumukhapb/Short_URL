const { getUser } = require("../service/auth");

// Authentication
function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  const token = bearerToken || tokenCookie;
  req.user = null;

  if (!token) return next();

  const user = getUser(token);
  req.user = user;

  return next();
}

// Authorization
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
