const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_applyAttributes = require('./utils/applyAttributes.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/Helmet/Helmet.tsx
/**
* A lightweight, provider-free document head manager inspired by react-helmet.
*
* Declaratively manage `<title>`, `<meta>`, `<link>`, `<script>`, `<style>`,
* `<base>`, and `<noscript>` tags by passing them as JSX children. Tags are
* appended to `document.head` on mount and removed on unmount, keeping the
* document head in sync with the React tree.
*
* Multiple `<Helmet>` instances can coexist — each manages only the nodes it
* created. The last mounted instance wins for `document.title`.
*
* @example
* <Helmet>
*   <title>My Page</title>
*   <meta name="description" content="Page description" />
*   <link rel="icon" href="/favicon.ico" />
* </Helmet>
*/
function Helmet({ children }) {
	(0, react.useEffect)(() => {
		const nodes = [];
		react.Children.forEach(children, (child) => {
			if (!(0, react.isValidElement)(child)) return;
			const { type, props } = child;
			if (type === "title") {
				const text = props.children;
				if (typeof text === "string" || typeof text === "number" || typeof text === "bigint") document.title = String(text);
				else if (Array.isArray(text)) document.title = text.filter((t) => typeof t === "string" || typeof t === "number" || typeof t === "bigint").join("");
				return;
			}
			const el = document.createElement(type);
			el.setAttribute("data-helmet", "true");
			require_applyAttributes.default(el, props);
			if (type === "style" || type === "script" || type === "noscript") {
				const content = props.children;
				if (typeof content === "string" || typeof content === "number" || typeof content === "bigint") el.textContent = String(content);
			}
			document.head.appendChild(el);
			nodes.push(el);
		});
		return () => {
			nodes.forEach((node) => node.parentNode?.removeChild(node));
		};
	}, [(0, react.useMemo)(() => {
		const parts = [];
		react.Children.forEach(children, (child) => {
			if (!(0, react.isValidElement)(child)) return;
			const { type, props } = child;
			try {
				parts.push(JSON.stringify({
					props,
					type: String(type)
				}));
			} catch {
				parts.push(String(type));
			}
		});
		return parts.join("\0");
	}, [children])]);
	return null;
}

//#endregion
exports.default = Helmet;