const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "tr",
    locales: ["tr", "en"],
    localePath: path.resolve("./src/helpers/translation/locales"),
    // for Development mode
  },
};
