import { a as registerHandlebarsHelpers, c as ensureDir, d as renderTemplate, i as validateName, l as createFileFromTemplate, n as createPackage_default, o as getWorkspaceInfo, r as createFeature_default, s as getTemplateDir, t as cli_default, u as renderTemplateFile } from "./cli-CZ9hT3vj.js";

//#region src/utils/createFilesFromTemplates.ts
/**
* Recursively copies and renders all template files from a source directory to a target directory using the provided context.
*
* @param templateDir - Source directory containing template files
* @param targetDir - Target directory to write rendered files
* @param context - Data context for template rendering
*
* @example
* createFilesFromTemplates('templates', 'output', { name: 'Feature' });
*
* @public
*/
function createFilesFromTemplates(templates) {
	templates.forEach((template) => {
		createFileFromTemplate(template.templatePath, template.outputPath, template.context);
	});
}

//#endregion
export { cli_default as cli, createFeature_default as createFeature, createFileFromTemplate, createFilesFromTemplates, createPackage_default as createPackage, ensureDir, getTemplateDir, getWorkspaceInfo, registerHandlebarsHelpers, renderTemplate, renderTemplateFile, validateName };