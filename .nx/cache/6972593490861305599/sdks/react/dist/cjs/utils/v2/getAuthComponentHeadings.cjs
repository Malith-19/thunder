
//#region src/utils/v2/getAuthComponentHeadings.ts
/**
* Extracts heading and subheading components from authentication flow components
* and provides resolved title/subtitle text with fallback logic.
*
* This utility helps maintain consistent heading extraction across authentication
* components (SignIn, SignUp, etc.) by identifying heading components within the
* flow structure and providing clean fallback behavior.
*
* @param components - Array of flow components to search
* @param flowTitle - Title from flow context (highest priority)
* @param flowSubtitle - Subtitle from flow context (highest priority)
* @param defaultTitle - Default title fallback (lowest priority)
* @param defaultSubtitle - Default subtitle fallback (lowest priority)
* @returns Object with resolved title and subtitle text, plus filtered components
*
* @example
* ```typescript
* const result = getAuthComponentHeadings(
*   components,
*   flowTitle,
*   flowSubtitle,
*   t('signin.heading'),
*   t('signin.subheading')
* );
*
* // Use resolved titles
* <Card.Title>{result.title}</Card.Title>
* <Typography>{result.subtitle}</Typography>
*
* // Render filtered components (without headings)
* renderComponents(result.componentsWithoutHeadings);
* ```
*/
const getAuthComponentHeadings = (components, flowTitle, flowSubtitle, defaultTitle, defaultSubtitle) => {
	let heading = null;
	let subheading = null;
	/**
	* Recursively search for heading components
	*/
	const findHeadings = (comps) => {
		for (const component of comps) {
			if (component.type === "TEXT" && component.variant?.startsWith("HEADING_")) {
				if (!heading) heading = component;
				else if (!subheading) {
					subheading = component;
					break;
				}
			}
			if (component.components && component.components.length > 0) {
				findHeadings(component.components);
				if (heading && subheading) break;
			}
		}
	};
	/**
	* Filter out heading components from the flow
	*/
	const filterComponents = (comps) => {
		let foundHeadings = 0;
		const maxHeadings = 2;
		const filter = (items) => items.reduce((acc, component) => {
			if (foundHeadings < maxHeadings && component.type === "TEXT" && component.variant?.startsWith("HEADING_")) {
				foundHeadings += 1;
				return acc;
			}
			if (component.components && component.components.length > 0) {
				const filteredNestedComponents = filter(component.components);
				if (filteredNestedComponents.length > 0) acc.push({
					...component,
					components: filteredNestedComponents
				});
			} else acc.push(component);
			return acc;
		}, []);
		return filter(comps);
	};
	/**
	* Extract text content from a component
	*/
	const getComponentText = (component) => {
		if (!component) return "";
		return component.label || "";
	};
	findHeadings(components);
	const headingText = getComponentText(heading);
	const subheadingText = getComponentText(subheading);
	return {
		componentsWithoutHeadings: filterComponents(components),
		headingComponents: {
			heading,
			subheading
		},
		subtitle: flowSubtitle || subheadingText || defaultSubtitle || "",
		title: flowTitle || headingText || defaultTitle || ""
	};
};
var getAuthComponentHeadings_default = getAuthComponentHeadings;

//#endregion
exports.default = getAuthComponentHeadings_default;
//# sourceMappingURL=getAuthComponentHeadings.cjs.map