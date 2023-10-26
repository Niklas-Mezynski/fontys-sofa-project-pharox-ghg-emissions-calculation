module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/dist",
    "/node_modules",
    ".eslintrc.js",
    "jest.config.ts",
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    quotes: ["error", "double"],
    "import/no-unresolved": 0,
    indent: ["error", 2],
    // -- Strict errors --
    // These lint rules are likely always a good idea.

    // Force function overloads to be declared together. This ensures readers understand APIs.
    "@typescript-eslint/adjacent-overload-signatures": 2,

    // Do not allow the subtle/obscure comma operator.
    "no-sequences": 2,

    // Do not allow internal modules or namespaces . These are deprecated in favor of ES6 modules.
    "@typescript-eslint/no-namespace": 2,

    // Do not allow parameters to be reassigned. To avoid bugs, developers should instead assign new values to new vars.
    "no-param-reassign": 2,

    // Force the use of ES6-style imports instead of /// <reference path=> imports.
    "no-restricted-imports": 2,

    // Do not allow type assertions that do nothing. This is a big warning that the developer may not understand the
    // code currently being edited (they may be incorrectly handling a different type case that does not exist).
    "@typescript-eslint/no-unnecessary-type-assertion": 2,

    // Disallow nonsensical label usage.
    "no-labels": 2,

    // Disallows the (often typo) syntax if (var1 = var2). Replace with if (var2) { var1 = var2 }.
    "no-cond-assign": 2,

    // Disallows constructors for primitive types (e.g. new Number('123'), though Number('123') is still allowed).
    "no-new-wrappers": 2,

    // Do not allow super() to be called twice in a constructor.
    "constructor-super": 2,

    // Do not allow the same case to appear more than once in a switch block.
    "no-duplicate-case": 2,

    // Do not allow a variable to be declared more than once in the same block. Consider function parameters in this
    // rule.
    "no-redeclare": 2,

    // Disallows a variable definition in an inner scope from shadowing a variable in an outer scope. Developers should
    // instead use a separate variable name.
    "no-shadow": 2,

    // Empty blocks are almost never needed. Allow the one general exception: empty catch blocks.
    "no-empty": ["error", { allowEmptyCatch: true }],

    // Functions must either be handled directly (e.g. with a catch() handler) or returned to another function.
    // This is a major source of errors in Cloud Functions and the team strongly recommends leaving this rule on.
    "@typescript-eslint/no-floating-promises": 2,

    // The 'this' keyword can only be used inside of classes.
    "no-invalid-this": 2,

    // Do not allow strings to be thrown because they will not include stack traces. Throw Errors instead.
    "no-throw-literal": 2,

    // Disallow control flow statements, such as return, continue, break, and throw in finally blocks.
    "no-unsafe-finally": 2,

    // Do not allow variables to be used before they are declared.
    // "no-use-before-declare": true,

    // Expressions must always return a value. Avoids common errors like const myValue = functionReturningVoid();
    "consistent-return": 2,

    // Disallow duplicate imports in the same file.
    "no-duplicate-imports": 2,

    // -- Strong Warnings --
    // These rules should almost never be needed, but may be included due to legacy code.
    // They are left as a warning to avoid frustration with blocked deploys when the developer
    // understand the warning and wants to deploy anyway.

    // Warn when an empty interface is defined. These are generally not useful.
    "@typescript-eslint/no-empty-interface": 1,

    // Warn when variables are defined with var. Var has subtle meaning that can lead to bugs. Strongly prefer const for
    // most values and let for values that will change.
    "no-var": 1,

    // Prefer === and !== over == and !=. The latter operators support overloads that are often accidental.
    "eqeqeq": 1,

    // -- Light Warnings --
    // These rules are intended to help developers use better style. Simpler code has fewer bugs. These would be "info"
    // if TSLint supported such a level.

    // prefer for( ... of ... ) to an index loop when the index is only used to fetch an object from an array.
    // (Even better: check out utils like .map if transforming an array!)
    "@typescript-eslint/prefer-for-of": 1,

    // Warns if function overloads could be unified into a single function with optional or rest parameters.
    "@typescript-eslint/unified-signatures": 1,

    // Prefer const for values that will not change. This better documents code.
    "prefer-const": 1,

    // Multi-line object literals and function calls should have a trailing comma. This helps avoid merge conflicts.
    "comma-dangle": 1,

    // Not force to add new line after end of function or class
    "eol-last": 0,

    "max-len": 0,
    "object-curly-spacing": 0,
    "quote-props": 0,
  },
};
