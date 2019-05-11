export const escape = function(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};
