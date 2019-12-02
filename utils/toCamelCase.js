// from-case to camelCase
module.exports = s =>
  s.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });
