module.exports = {
    "parser": "babel-eslint",
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6
    },
    "rules": {
        "array-bracket-spacing": ["error", "never"],
        "arrow-parens": ["error", "always"],
        "func-style": ["error", "declaration", {"allowArrowFunctions": true}],
        "brace-style": ["error", "1tbs", {"allowSingleLine": true}],
        "comma-spacing": ["error", {"before": false, "after": true}],
        "computed-property-spacing": ["error", "never"],
        "curly": "error",
        "indent": ["error", 2, {
            "SwitchCase": 1,
            "MemberExpression": 1,
            "CallExpression": {"arguments": 1},
            "FunctionDeclaration": {"body": 1, "parameters": 2}
        }],
        "key-spacing": ["error", {"beforeColon": false, "afterColon": true}],
        "keyword-spacing": ["error", {"before": true, "after": true}],
        "linebreak-style": ["error", "unix"],
        "max-len": ["warn", 300],
        "one-var-declaration-per-line": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "prefer-const": ["error", {"destructuring": "all"}],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "space-before-function-paren": ["error", {"anonymous": "always", "named": "never"}],
        "space-before-blocks": ["error", "always"],
        "space-in-parens": ["error", "never"],
        "space-unary-ops": ["error", {"words": true, "nonwords": false}],
        "eqeqeq": ["error", "smart"],
        "no-console": "off",
        "no-duplicate-imports": ["error"],
        "no-multiple-empty-lines": ["error", {"max": 1}],
        "no-trailing-spaces": ["error"],
        "no-whitespace-before-property": ["error"],
        "no-var": "error",
        "no-undef": ["error", {"typeof": true}],
        "no-unused-vars": ["error", {"vars": "local", "ignoreRestSiblings": true, "args": "none"}]
    }
};
