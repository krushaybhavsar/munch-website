module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    plugins: [
        "@typescript-eslint",
        "jest",
        "import",
        "react",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:jest/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
    ],
    settings: {
        react: {
            version: "^18.2.0",
        },
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
        project: ["./tsconfig.eslint.json", "./packages/**/tsconfig.json"],
        allowAutomaticSingleRunInference: true,
        tsconfigRootDir: __dirname,
    },
    env: {
        "jest/globals": true,
    },
    ignorePatterns: ["*.js", "*.jsx"],
    rules: {
        "rules": { "no-empty-interface": false },
        "linebreak-style": ["warn", "unix"],
        quotes: [
            "warn",
            "double",
            {
                avoidEscape: true,
            },
        ],
        semi: ["warn", "always"],
        indent: "off",
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                ignoreRestSiblings: true,
            },
        ],
        "@typescript-eslint/no-namespace": [
            "warn",
            {
                allowDeclarations: true,
            },
        ],
        // "@typescript-eslint/explicit-module-boundary-types": [
        //     "warn",
        //     {
        //         allowHigherOrderFunctions: false,
        //     },
        // ],
        "@typescript-eslint/no-floating-promises": ["warn"],
        "@typescript-eslint/no-empty-function": [
            "warn",
            {
                allow: ["private-constructors", "protected-constructors", "decoratedFunctions"],
            },
        ],
        "jest/unbound-method": ["warn"],
        "object-shorthand": ["warn"],
        "@typescript-eslint/no-invalid-void-type": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/prefer-optional-chain": "off",
        "@typescript-eslint/no-base-to-string": "warn",
        eqeqeq: [
            "warn",
            "always",
            {
                null: "never",
            },
        ],
        curly: "warn",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "@typescript-eslint/await-thenable": "warn",
    },
};