module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/base' // or 'plugin:vue/base'
  ],
  rules: {
    // override/add rules' settings here
    'vue/valid-v-if': 'error'
  }
}
