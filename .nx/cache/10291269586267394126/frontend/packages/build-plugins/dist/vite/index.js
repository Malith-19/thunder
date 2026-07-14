//#region src/vite/index.ts
function prismjsInjectCore() {
	return {
		name: "prismjs-inject-core",
		transform(code, id) {
			if (/[/\\]prismjs[/\\]components[/\\]prism-(?!core)/.test(id)) return {
				code: `import Prism from 'prismjs';\n${code}`,
				map: null
			};
			return null;
		}
	};
}

//#endregion
export { prismjsInjectCore };