import { existsSync, readFileSync } from "fs";
import { dirname, join, parse, resolve } from "path";
import { fileURLToPath } from "url";
import eslint from "@eslint/js";
import { importX } from "eslint-plugin-import-x";
import playwright from "eslint-plugin-playwright";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";
import vitestPlugin from "@vitest/eslint-plugin";
import vuePlugin from "eslint-plugin-vue";

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
//#region src/configs/base.ts
const baseConfig = [{
	name: "thunderid/copyright-header",
	rules: { "@thunderid/copyright-header": "error" }
}];
var base_default = baseConfig;

//#endregion
//#region src/configs/javascript.ts
const javascriptConfig = [
	eslint.configs.recommended,
	importX.flatConfigs.recommended,
	{
		name: "thunderid/javascript-overrides",
		rules: {
			"no-console": "error",
			"no-new": "error",
			"object-curly-spacing": ["error", "never"],
			"import-x/order": ["warn", {
				alphabetize: {
					caseInsensitive: true,
					order: "asc"
				},
				groups: [
					"builtin",
					"external",
					"index",
					"sibling",
					"parent",
					"internal"
				]
			}],
			"import-x/extensions": [
				"error",
				"ignorePackages",
				{
					js: "never",
					jsx: "never"
				}
			],
			"import-x/no-cycle": "error"
		}
	}
];
var javascript_default = javascriptConfig;

//#endregion
//#region src/configs/playwright.ts
const playwrightConfig = [{
	...playwright.configs["flat/recommended"],
	files: [
		"**/tests/**/*.ts",
		"**/*.spec.ts",
		"**/*.spec.js"
	]
}];
var playwright_default = playwrightConfig;

//#endregion
//#region ../../../node_modules/.pnpm/eslint-config-prettier@10.1.8_eslint@9.39.4_jiti@2.7.0_/node_modules/eslint-config-prettier/index.js
var require_eslint_config_prettier = /* @__PURE__ */ __commonJS({ "../../../node_modules/.pnpm/eslint-config-prettier@10.1.8_eslint@9.39.4_jiti@2.7.0_/node_modules/eslint-config-prettier/index.js": ((exports) => {
	const includeDeprecated = !process.env.ESLINT_CONFIG_PRETTIER_NO_DEPRECATED;
	const specialRule = 0;
	exports.rules = {
		"curly": specialRule,
		"no-unexpected-multiline": specialRule,
		"@stylistic/lines-around-comment": specialRule,
		"@stylistic/max-len": specialRule,
		"@stylistic/no-confusing-arrow": specialRule,
		"@stylistic/no-mixed-operators": specialRule,
		"@stylistic/no-tabs": specialRule,
		"@stylistic/quotes": specialRule,
		"@stylistic/js/lines-around-comment": specialRule,
		"@stylistic/js/max-len": specialRule,
		"@stylistic/js/no-confusing-arrow": specialRule,
		"@stylistic/js/no-mixed-operators": specialRule,
		"@stylistic/js/no-tabs": specialRule,
		"@stylistic/js/quotes": specialRule,
		"@stylistic/ts/lines-around-comment": specialRule,
		"@stylistic/ts/quotes": specialRule,
		"@typescript-eslint/lines-around-comment": specialRule,
		"@typescript-eslint/quotes": specialRule,
		"babel/quotes": specialRule,
		"unicorn/template-indent": specialRule,
		"vue/html-self-closing": specialRule,
		"vue/max-len": specialRule,
		"@babel/object-curly-spacing": "off",
		"@babel/semi": "off",
		"@stylistic/array-bracket-newline": "off",
		"@stylistic/array-bracket-spacing": "off",
		"@stylistic/array-element-newline": "off",
		"@stylistic/arrow-parens": "off",
		"@stylistic/arrow-spacing": "off",
		"@stylistic/block-spacing": "off",
		"@stylistic/brace-style": "off",
		"@stylistic/comma-dangle": "off",
		"@stylistic/comma-spacing": "off",
		"@stylistic/comma-style": "off",
		"@stylistic/computed-property-spacing": "off",
		"@stylistic/dot-location": "off",
		"@stylistic/eol-last": "off",
		"@stylistic/func-call-spacing": "off",
		"@stylistic/function-call-argument-newline": "off",
		"@stylistic/function-call-spacing": "off",
		"@stylistic/function-paren-newline": "off",
		"@stylistic/generator-star-spacing": "off",
		"@stylistic/implicit-arrow-linebreak": "off",
		"@stylistic/indent": "off",
		"@stylistic/jsx-quotes": "off",
		"@stylistic/key-spacing": "off",
		"@stylistic/keyword-spacing": "off",
		"@stylistic/linebreak-style": "off",
		"@stylistic/max-statements-per-line": "off",
		"@stylistic/multiline-ternary": "off",
		"@stylistic/new-parens": "off",
		"@stylistic/newline-per-chained-call": "off",
		"@stylistic/no-extra-parens": "off",
		"@stylistic/no-extra-semi": "off",
		"@stylistic/no-floating-decimal": "off",
		"@stylistic/no-mixed-spaces-and-tabs": "off",
		"@stylistic/no-multi-spaces": "off",
		"@stylistic/no-multiple-empty-lines": "off",
		"@stylistic/no-trailing-spaces": "off",
		"@stylistic/no-whitespace-before-property": "off",
		"@stylistic/nonblock-statement-body-position": "off",
		"@stylistic/object-curly-newline": "off",
		"@stylistic/object-curly-spacing": "off",
		"@stylistic/object-property-newline": "off",
		"@stylistic/one-var-declaration-per-line": "off",
		"@stylistic/operator-linebreak": "off",
		"@stylistic/padded-blocks": "off",
		"@stylistic/quote-props": "off",
		"@stylistic/rest-spread-spacing": "off",
		"@stylistic/semi": "off",
		"@stylistic/semi-spacing": "off",
		"@stylistic/semi-style": "off",
		"@stylistic/space-before-blocks": "off",
		"@stylistic/space-before-function-paren": "off",
		"@stylistic/space-in-parens": "off",
		"@stylistic/space-infix-ops": "off",
		"@stylistic/space-unary-ops": "off",
		"@stylistic/switch-colon-spacing": "off",
		"@stylistic/template-curly-spacing": "off",
		"@stylistic/template-tag-spacing": "off",
		"@stylistic/wrap-iife": "off",
		"@stylistic/wrap-regex": "off",
		"@stylistic/yield-star-spacing": "off",
		"@stylistic/member-delimiter-style": "off",
		"@stylistic/type-annotation-spacing": "off",
		"@stylistic/jsx-child-element-spacing": "off",
		"@stylistic/jsx-closing-bracket-location": "off",
		"@stylistic/jsx-closing-tag-location": "off",
		"@stylistic/jsx-curly-newline": "off",
		"@stylistic/jsx-curly-spacing": "off",
		"@stylistic/jsx-equals-spacing": "off",
		"@stylistic/jsx-first-prop-new-line": "off",
		"@stylistic/jsx-indent": "off",
		"@stylistic/jsx-indent-props": "off",
		"@stylistic/jsx-max-props-per-line": "off",
		"@stylistic/jsx-newline": "off",
		"@stylistic/jsx-one-expression-per-line": "off",
		"@stylistic/jsx-props-no-multi-spaces": "off",
		"@stylistic/jsx-tag-spacing": "off",
		"@stylistic/jsx-wrap-multilines": "off",
		"@stylistic/indent-binary-ops": "off",
		"@stylistic/type-generic-spacing": "off",
		"@stylistic/type-named-tuple-spacing": "off",
		"@stylistic/js/array-bracket-newline": "off",
		"@stylistic/js/array-bracket-spacing": "off",
		"@stylistic/js/array-element-newline": "off",
		"@stylistic/js/arrow-parens": "off",
		"@stylistic/js/arrow-spacing": "off",
		"@stylistic/js/block-spacing": "off",
		"@stylistic/js/brace-style": "off",
		"@stylistic/js/comma-dangle": "off",
		"@stylistic/js/comma-spacing": "off",
		"@stylistic/js/comma-style": "off",
		"@stylistic/js/computed-property-spacing": "off",
		"@stylistic/js/dot-location": "off",
		"@stylistic/js/eol-last": "off",
		"@stylistic/js/func-call-spacing": "off",
		"@stylistic/js/function-call-argument-newline": "off",
		"@stylistic/js/function-call-spacing": "off",
		"@stylistic/js/function-paren-newline": "off",
		"@stylistic/js/generator-star-spacing": "off",
		"@stylistic/js/implicit-arrow-linebreak": "off",
		"@stylistic/js/indent": "off",
		"@stylistic/js/jsx-quotes": "off",
		"@stylistic/js/key-spacing": "off",
		"@stylistic/js/keyword-spacing": "off",
		"@stylistic/js/linebreak-style": "off",
		"@stylistic/js/max-statements-per-line": "off",
		"@stylistic/js/multiline-ternary": "off",
		"@stylistic/js/new-parens": "off",
		"@stylistic/js/newline-per-chained-call": "off",
		"@stylistic/js/no-extra-parens": "off",
		"@stylistic/js/no-extra-semi": "off",
		"@stylistic/js/no-floating-decimal": "off",
		"@stylistic/js/no-mixed-spaces-and-tabs": "off",
		"@stylistic/js/no-multi-spaces": "off",
		"@stylistic/js/no-multiple-empty-lines": "off",
		"@stylistic/js/no-trailing-spaces": "off",
		"@stylistic/js/no-whitespace-before-property": "off",
		"@stylistic/js/nonblock-statement-body-position": "off",
		"@stylistic/js/object-curly-newline": "off",
		"@stylistic/js/object-curly-spacing": "off",
		"@stylistic/js/object-property-newline": "off",
		"@stylistic/js/one-var-declaration-per-line": "off",
		"@stylistic/js/operator-linebreak": "off",
		"@stylistic/js/padded-blocks": "off",
		"@stylistic/js/quote-props": "off",
		"@stylistic/js/rest-spread-spacing": "off",
		"@stylistic/js/semi": "off",
		"@stylistic/js/semi-spacing": "off",
		"@stylistic/js/semi-style": "off",
		"@stylistic/js/space-before-blocks": "off",
		"@stylistic/js/space-before-function-paren": "off",
		"@stylistic/js/space-in-parens": "off",
		"@stylistic/js/space-infix-ops": "off",
		"@stylistic/js/space-unary-ops": "off",
		"@stylistic/js/switch-colon-spacing": "off",
		"@stylistic/js/template-curly-spacing": "off",
		"@stylistic/js/template-tag-spacing": "off",
		"@stylistic/js/wrap-iife": "off",
		"@stylistic/js/wrap-regex": "off",
		"@stylistic/js/yield-star-spacing": "off",
		"@stylistic/ts/block-spacing": "off",
		"@stylistic/ts/brace-style": "off",
		"@stylistic/ts/comma-dangle": "off",
		"@stylistic/ts/comma-spacing": "off",
		"@stylistic/ts/func-call-spacing": "off",
		"@stylistic/ts/function-call-spacing": "off",
		"@stylistic/ts/indent": "off",
		"@stylistic/ts/key-spacing": "off",
		"@stylistic/ts/keyword-spacing": "off",
		"@stylistic/ts/member-delimiter-style": "off",
		"@stylistic/ts/no-extra-parens": "off",
		"@stylistic/ts/no-extra-semi": "off",
		"@stylistic/ts/object-curly-spacing": "off",
		"@stylistic/ts/semi": "off",
		"@stylistic/ts/space-before-blocks": "off",
		"@stylistic/ts/space-before-function-paren": "off",
		"@stylistic/ts/space-infix-ops": "off",
		"@stylistic/ts/type-annotation-spacing": "off",
		"@stylistic/jsx/jsx-child-element-spacing": "off",
		"@stylistic/jsx/jsx-closing-bracket-location": "off",
		"@stylistic/jsx/jsx-closing-tag-location": "off",
		"@stylistic/jsx/jsx-curly-newline": "off",
		"@stylistic/jsx/jsx-curly-spacing": "off",
		"@stylistic/jsx/jsx-equals-spacing": "off",
		"@stylistic/jsx/jsx-first-prop-new-line": "off",
		"@stylistic/jsx/jsx-indent": "off",
		"@stylistic/jsx/jsx-indent-props": "off",
		"@stylistic/jsx/jsx-max-props-per-line": "off",
		"@typescript-eslint/block-spacing": "off",
		"@typescript-eslint/brace-style": "off",
		"@typescript-eslint/comma-dangle": "off",
		"@typescript-eslint/comma-spacing": "off",
		"@typescript-eslint/func-call-spacing": "off",
		"@typescript-eslint/indent": "off",
		"@typescript-eslint/key-spacing": "off",
		"@typescript-eslint/keyword-spacing": "off",
		"@typescript-eslint/member-delimiter-style": "off",
		"@typescript-eslint/no-extra-parens": "off",
		"@typescript-eslint/no-extra-semi": "off",
		"@typescript-eslint/object-curly-spacing": "off",
		"@typescript-eslint/semi": "off",
		"@typescript-eslint/space-before-blocks": "off",
		"@typescript-eslint/space-before-function-paren": "off",
		"@typescript-eslint/space-infix-ops": "off",
		"@typescript-eslint/type-annotation-spacing": "off",
		"babel/object-curly-spacing": "off",
		"babel/semi": "off",
		"flowtype/boolean-style": "off",
		"flowtype/delimiter-dangle": "off",
		"flowtype/generic-spacing": "off",
		"flowtype/object-type-curly-spacing": "off",
		"flowtype/object-type-delimiter": "off",
		"flowtype/quotes": "off",
		"flowtype/semi": "off",
		"flowtype/space-after-type-colon": "off",
		"flowtype/space-before-generic-bracket": "off",
		"flowtype/space-before-type-colon": "off",
		"flowtype/union-intersection-spacing": "off",
		"react/jsx-child-element-spacing": "off",
		"react/jsx-closing-bracket-location": "off",
		"react/jsx-closing-tag-location": "off",
		"react/jsx-curly-newline": "off",
		"react/jsx-curly-spacing": "off",
		"react/jsx-equals-spacing": "off",
		"react/jsx-first-prop-new-line": "off",
		"react/jsx-indent": "off",
		"react/jsx-indent-props": "off",
		"react/jsx-max-props-per-line": "off",
		"react/jsx-newline": "off",
		"react/jsx-one-expression-per-line": "off",
		"react/jsx-props-no-multi-spaces": "off",
		"react/jsx-tag-spacing": "off",
		"react/jsx-wrap-multilines": "off",
		"standard/array-bracket-even-spacing": "off",
		"standard/computed-property-even-spacing": "off",
		"standard/object-curly-even-spacing": "off",
		"unicorn/empty-brace-spaces": "off",
		"unicorn/no-nested-ternary": "off",
		"unicorn/number-literal-case": "off",
		"vue/array-bracket-newline": "off",
		"vue/array-bracket-spacing": "off",
		"vue/array-element-newline": "off",
		"vue/arrow-spacing": "off",
		"vue/block-spacing": "off",
		"vue/block-tag-newline": "off",
		"vue/brace-style": "off",
		"vue/comma-dangle": "off",
		"vue/comma-spacing": "off",
		"vue/comma-style": "off",
		"vue/dot-location": "off",
		"vue/func-call-spacing": "off",
		"vue/html-closing-bracket-newline": "off",
		"vue/html-closing-bracket-spacing": "off",
		"vue/html-end-tags": "off",
		"vue/html-indent": "off",
		"vue/html-quotes": "off",
		"vue/key-spacing": "off",
		"vue/keyword-spacing": "off",
		"vue/max-attributes-per-line": "off",
		"vue/multiline-html-element-content-newline": "off",
		"vue/multiline-ternary": "off",
		"vue/mustache-interpolation-spacing": "off",
		"vue/no-extra-parens": "off",
		"vue/no-multi-spaces": "off",
		"vue/no-spaces-around-equal-signs-in-attribute": "off",
		"vue/object-curly-newline": "off",
		"vue/object-curly-spacing": "off",
		"vue/object-property-newline": "off",
		"vue/operator-linebreak": "off",
		"vue/quote-props": "off",
		"vue/script-indent": "off",
		"vue/singleline-html-element-content-newline": "off",
		"vue/space-in-parens": "off",
		"vue/space-infix-ops": "off",
		"vue/space-unary-ops": "off",
		"vue/template-curly-spacing": "off",
		...includeDeprecated && {
			"space-unary-word-ops": "off",
			"generator-star": "off",
			"no-comma-dangle": "off",
			"no-reserved-keys": "off",
			"no-space-before-semi": "off",
			"no-wrap-func": "off",
			"space-after-function-name": "off",
			"space-before-function-parentheses": "off",
			"space-in-brackets": "off",
			"no-arrow-condition": "off",
			"space-after-keywords": "off",
			"space-before-keywords": "off",
			"space-return-throw-case": "off",
			"no-spaced-func": "off",
			"indent-legacy": "off",
			"array-bracket-newline": "off",
			"array-bracket-spacing": "off",
			"array-element-newline": "off",
			"arrow-parens": "off",
			"arrow-spacing": "off",
			"block-spacing": "off",
			"brace-style": "off",
			"comma-dangle": "off",
			"comma-spacing": "off",
			"comma-style": "off",
			"computed-property-spacing": "off",
			"dot-location": "off",
			"eol-last": "off",
			"func-call-spacing": "off",
			"function-call-argument-newline": "off",
			"function-paren-newline": "off",
			"generator-star-spacing": "off",
			"implicit-arrow-linebreak": "off",
			"indent": "off",
			"jsx-quotes": "off",
			"key-spacing": "off",
			"keyword-spacing": "off",
			"linebreak-style": "off",
			"lines-around-comment": specialRule,
			"max-len": specialRule,
			"max-statements-per-line": "off",
			"multiline-ternary": "off",
			"new-parens": "off",
			"newline-per-chained-call": "off",
			"no-confusing-arrow": specialRule,
			"no-extra-parens": "off",
			"no-extra-semi": "off",
			"no-floating-decimal": "off",
			"no-mixed-operators": specialRule,
			"no-mixed-spaces-and-tabs": "off",
			"no-multi-spaces": "off",
			"no-multiple-empty-lines": "off",
			"no-tabs": specialRule,
			"no-trailing-spaces": "off",
			"no-whitespace-before-property": "off",
			"nonblock-statement-body-position": "off",
			"object-curly-newline": "off",
			"object-curly-spacing": "off",
			"object-property-newline": "off",
			"one-var-declaration-per-line": "off",
			"operator-linebreak": "off",
			"padded-blocks": "off",
			"quote-props": "off",
			"quotes": specialRule,
			"rest-spread-spacing": "off",
			"semi": "off",
			"semi-spacing": "off",
			"semi-style": "off",
			"space-before-blocks": "off",
			"space-before-function-paren": "off",
			"space-in-parens": "off",
			"space-infix-ops": "off",
			"space-unary-ops": "off",
			"switch-colon-spacing": "off",
			"template-curly-spacing": "off",
			"template-tag-spacing": "off",
			"wrap-iife": "off",
			"wrap-regex": "off",
			"yield-star-spacing": "off",
			"react/jsx-space-before-closing": "off"
		}
	};
}) });

//#endregion
//#region ../../../node_modules/.pnpm/eslint-config-prettier@10.1.8_eslint@9.39.4_jiti@2.7.0_/node_modules/eslint-config-prettier/flat.js
var require_flat = /* @__PURE__ */ __commonJS({ "../../../node_modules/.pnpm/eslint-config-prettier@10.1.8_eslint@9.39.4_jiti@2.7.0_/node_modules/eslint-config-prettier/flat.js": ((exports) => {
	const { rules } = require_eslint_config_prettier();
	exports.name = "config-prettier";
	exports.rules = rules;
}) });

//#endregion
//#region src/configs/prettier.ts
var import_flat = /* @__PURE__ */ __toESM(require_flat(), 1);
const prettierConfig = [import_flat.default];
var prettier_default = prettierConfig;

//#endregion
//#region src/utils/tsconfig-resolver.ts
/**
* Checks if any of the specified tsconfig files exist in the given directory.
*
* @param directory - The directory to check
* @param configFiles - Array of config filenames to check for
* @returns True if any config file exists, false otherwise
*/
function hasTsconfigFile(directory, configFiles) {
	return configFiles.some((configFile) => {
		return existsSync(join(directory, configFile));
	});
}
/**
* Resolves the TypeScript configuration root directory by finding the nearest tsconfig file
* starting from the current working directory and walking up the directory tree.
* Prioritizes tsconfig.eslint.json over tsconfig.json for ESLint-specific configurations.
*
* @param startDir - The directory to start searching from (defaults to process.cwd())
* @returns The directory containing a tsconfig file, or undefined if not found
*/
function resolveTsconfigRootDir(startDir = process.cwd()) {
	let currentDir = resolve(startDir);
	const rootDir = parse(currentDir).root;
	const tsconfigFiles = ["tsconfig.eslint.json", "tsconfig.json"];
	while (currentDir !== rootDir) {
		if (hasTsconfigFile(currentDir, tsconfigFiles)) return currentDir;
		currentDir = dirname(currentDir);
	}
	if (hasTsconfigFile(rootDir, tsconfigFiles)) return rootDir;
}
/**
* Creates parser options with dynamic tsconfig resolution and appropriate allowDefaultProject patterns.
*
* @param options - Configuration options
* @param options.additionalPatterns - Additional patterns to include in allowDefaultProject
* @param options.tsconfigRootDir - Manually specify the tsconfig root directory (overrides auto-detection)
* @param options.project - Path to tsconfig file to use (e.g., './tsconfig.eslint.json')
* @returns Parser options object for ESLint TypeScript configuration
*/
function createParserOptions(options = []) {
	const { additionalPatterns = [], tsconfigRootDir: manualTsconfigRootDir, project } = Array.isArray(options) ? { additionalPatterns: options } : options;
	const defaultPatterns = [
		"public/*.js",
		"scripts/*.js",
		"scripts/*.mjs",
		".*.js",
		".*.cjs",
		"*.js",
		"*.*.js",
		"*.cjs",
		"esbuild.config.js",
		"eslint.config.js",
		"prettier.config.js",
		"webpack.config.js",
		"rollup.config.js",
		"rolldown.config.js"
	];
	const tsconfigRootDir = manualTsconfigRootDir ? resolve(manualTsconfigRootDir) : resolveTsconfigRootDir();
	const projectService = { allowDefaultProject: [...defaultPatterns, ...additionalPatterns] };
	if (project) projectService.defaultProject = project;
	return {
		projectService,
		...tsconfigRootDir && { tsconfigRootDir }
	};
}

//#endregion
//#region src/configs/react.ts
const reactConfig = [
	reactPlugin.configs.flat["recommended"],
	reactPlugin.configs.flat["jsx-runtime"],
	reactHooks.configs.flat.recommended,
	jsxA11y.flatConfigs.recommended,
	reactRefresh.configs.recommended,
	{ languageOptions: {
		ecmaVersion: 2020,
		globals: globals.browser,
		parserOptions: createParserOptions()
	} },
	{
		name: "thunderid/react-settings",
		settings: {
			react: { version: "detect" },
			"import-x/resolver-next": [createTypeScriptImportResolver({ alwaysTryTypes: true })]
		}
	},
	{
		name: "thunderid/react-overrides",
		rules: {
			"react/no-danger": ["error", { customComponentNames: ["*"] }],
			"react/no-unused-prop-types": "error",
			"react/jsx-no-useless-fragment": "error",
			"react/no-array-index-key": "error",
			"react/jsx-use-react": "off",
			"react/react-in-jsx-scope": "off",
			"react/require-default-props": ["error", {
				forbidDefaultForRequired: true,
				classes: "ignore",
				functions: "defaultArguments"
			}],
			"import-x/extensions": [
				"error",
				"ignorePackages",
				{
					js: "never",
					jsx: "never",
					ts: "never",
					tsx: "never"
				}
			]
		}
	}
];
var react_default = reactConfig;

//#endregion
//#region src/configs/typescript.ts
const typescriptConfig = [
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	{ languageOptions: {
		ecmaVersion: 2020,
		parserOptions: createParserOptions()
	} },
	{
		files: ["**/*.{js,jsx,cjs,mjs}"],
		...tseslint.configs.disableTypeChecked
	},
	{
		name: "thunderid/typescript-resolver",
		settings: { "import-x/resolver-next": [createTypeScriptImportResolver({ alwaysTryTypes: true })] }
	},
	{
		name: "thunderid/typescript-overrides",
		rules: {
			"@typescript-eslint/no-explicit-any": "error",
			"object-curly-spacing": ["error", "never"],
			"import-x/extensions": [
				"error",
				"ignorePackages",
				{
					js: "never",
					jsx: "never",
					ts: "never",
					tsx: "never"
				}
			]
		}
	}
];
var typescript_default = typescriptConfig;

//#endregion
//#region src/configs/vitest.ts
const vitestConfig = [{
	...vitestPlugin.configs.recommended,
	files: [
		"**/*.test.ts",
		"**/*.test.tsx",
		"**/*.spec.ts",
		"**/*.spec.tsx",
		"**/test/**"
	],
	rules: {
		...vitestPlugin.configs.recommended.rules,
		"vitest/expect-expect": ["error", { assertFunctionNames: ["expect", "expectTypeOf"] }]
	}
}];
var vitest_default = vitestConfig;

//#endregion
//#region src/configs/vue.ts
const vueConfig = [
	...vuePlugin.configs["flat/recommended"],
	{ languageOptions: {
		ecmaVersion: 2020,
		globals: globals.browser,
		parserOptions: {
			...createParserOptions(),
			parser: "@typescript-eslint/parser"
		}
	} },
	{
		name: "thunderid/vue-overrides",
		rules: { "vue/multi-word-component-names": "off" }
	}
];
var vue_default = vueConfig;

//#endregion
//#region src/rules/copyright-header.ts
const REQUIRED_COPYRIGHT_HEADER = `/**
 * Copyright (c) ${(/* @__PURE__ */ new Date()).getFullYear()}, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */`;
const copyrightHeaderRule = {
	meta: {
		type: "layout",
		docs: { description: "Enforce WSO2 Apache 2.0 copyright header in all source files" },
		fixable: "code",
		schema: [{
			type: "object",
			properties: {
				excludePatterns: {
					type: "array",
					items: { type: "string" }
				},
				template: { type: "string" },
				allowShebang: { type: "boolean" }
			},
			additionalProperties: false
		}],
		messages: {
			missingHeader: "Missing WSO2 Apache 2.0 copyright header",
			incorrectHeader: "Incorrect copyright header format"
		}
	},
	create(context) {
		const options = context.options?.[0] ?? {};
		const excludePatterns = options.excludePatterns ?? [];
		const template = options.template ?? REQUIRED_COPYRIGHT_HEADER;
		const allowShebang = options.allowShebang ?? false;
		const filename = context.filename;
		if (excludePatterns.some((pattern) => new RegExp(pattern).test(filename))) return {};
		if (/\.(json|md|yml|yaml|xml|txt)$/.exec(filename)) return {};
		return { Program(node) {
			const allComments = context.sourceCode.getAllComments();
			const hasShebang = allowShebang && allComments[0]?.type === "Shebang";
			const shebangComment = hasShebang ? allComments[0] : void 0;
			const firstComment = (hasShebang ? allComments.slice(1) : allComments)[0];
			if (firstComment?.type !== "Block") {
				context.report({
					node,
					messageId: "missingHeader",
					fix(fixer) {
						if (shebangComment) return fixer.insertTextAfter(shebangComment, `\n\n${template}`);
						return fixer.insertTextBefore(node, `${template}\n\n`);
					}
				});
				return;
			}
			const normalizedComment = `/*${firstComment.value}*/`.replace(/\s+/g, " ").trim();
			if (!normalizedComment.includes("WSO2 LLC") || !normalizedComment.includes("Apache License")) context.report({
				node: firstComment,
				messageId: "incorrectHeader",
				fix(fixer) {
					return fixer.replaceText(firstComment, template);
				}
			});
		} };
	}
};
var copyright_header_default = copyrightHeaderRule;

//#endregion
//#region src/index.ts
const pkgPath = join(dirname(fileURLToPath(import.meta.url)), "../package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const namespace = "thunderid";
const DEV_DEPENDENCIES_ALLOWED_FILES = [
	"*.config.js",
	"*.config.mjs",
	"*.config.ts",
	"**/eslint.config.js",
	"**/eslint.config.mjs",
	"**/eslint.config.ts",
	"**/rolldown.config.js",
	"**/rolldown.config.ts",
	"vite.config.ts",
	"vitest.config.ts",
	"**/prettier.config.js",
	"**/prettier.config.mjs",
	"**/prettier.config.ts",
	"**/test/**"
];
const plugin = {
	meta: {
		name: pkg.name,
		version: pkg.version,
		namespace
	},
	configs: {},
	rules: { "copyright-header": copyright_header_default },
	processors: {}
};
Object.assign(plugin.configs, {
	javascript: [
		{
			name: "thunderid/plugin-setup",
			plugins: { "@thunderid": plugin }
		},
		...base_default,
		...javascript_default,
		...prettier_default,
		{
			files: DEV_DEPENDENCIES_ALLOWED_FILES,
			rules: { "import-x/no-extraneous-dependencies": ["error", { devDependencies: true }] }
		}
	],
	typescript: [
		{
			name: "thunderid/plugin-setup",
			plugins: { "@thunderid": plugin }
		},
		...base_default,
		...javascript_default,
		...typescript_default,
		...prettier_default,
		{
			files: DEV_DEPENDENCIES_ALLOWED_FILES,
			rules: { "import-x/no-extraneous-dependencies": ["error", { devDependencies: true }] }
		}
	],
	react: [
		{
			name: "thunderid/plugin-setup",
			plugins: { "@thunderid": plugin }
		},
		...base_default,
		...javascript_default,
		...typescript_default,
		...react_default,
		...prettier_default,
		{
			files: DEV_DEPENDENCIES_ALLOWED_FILES,
			rules: { "import-x/no-extraneous-dependencies": ["error", { devDependencies: true }] }
		}
	],
	playwright: [{
		name: "thunderid/plugin-setup",
		plugins: { "@thunderid": plugin }
	}, ...playwright_default],
	vitest: [{
		name: "thunderid/plugin-setup",
		plugins: { "@thunderid": plugin }
	}, ...vitest_default],
	vue: [
		{
			name: "thunderid/plugin-setup",
			plugins: { "@thunderid": plugin }
		},
		...base_default,
		...javascript_default,
		...typescript_default,
		...vue_default,
		...prettier_default,
		{
			files: DEV_DEPENDENCIES_ALLOWED_FILES,
			rules: { "import-x/no-extraneous-dependencies": ["error", { devDependencies: true }] }
		}
	]
});
var src_default = plugin;

//#endregion
export { createParserOptions, src_default as default };