module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  extends: [
    "@nuxtjs"
  ],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "semi": ["error", "always"]
  }
}

