module.exports = {
  extends: [
    'stylelint-config-standard-scss', // scss standard rule 적용
    'stylelint-config-prettier-scss', // prettier와 충돌하는 부분을 해결
    'stylelint-config-property-sort-order-smacss', // SMACSS 기반으로 속성 정렬
  ],
  plugins: ['stylelint-scss'], // scss 문법을 위한 플러그인
  ignoreFiles: ['node_modules/**/*', 'styles/markdown.scss'],
  rules: {
    'at-rule-no-unknown': null,
    'at-rule-no-vendor-prefix': null,
    'selector-class-pattern': null,
    'keyframes-name-pattern': /^[a-z][a-zA-Z0-9]+$/,
    indentation: 2,
    'max-nesting-depth': 3,
    'string-quotes': 'single',
    'no-duplicate-selectors': true,
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-named': 'never',
    'selector-no-qualifying-type': true,
    'declaration-no-important': true,
    'number-leading-zero': 'always',
    'function-url-quotes': 'always',
    'font-weight-notation': 'numeric',
    'comment-empty-line-before': 'always',
    'no-invalid-double-slash-comments': null,
    'function-name-case': null,
    'rule-empty-line-before': [
      'always',
      { ignore: ['after-comment', 'first-nested', 'inside-block'] },
    ],
    'selector-pseudo-element-colon-notation': 'double',
    'scss/at-rule-no-unknown': null, // tailwindcss를 위한 설정
    'scss/at-mixin-pattern': '^[a-z][a-zA-Z0-9]+$',
    'scss/at-function-pattern': '^[a-z][a-zA-Z0-9]+$',
    'scss/dollar-variable-pattern': '^[a-z][a-zA-Z0-9]+$',
    'scss/double-slash-comment-inline': 'always',
    'property-no-vendor-prefix': null,
  },
};
