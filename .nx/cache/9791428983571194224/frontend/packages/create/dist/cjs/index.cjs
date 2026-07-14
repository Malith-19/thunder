const require_cli = require('./cli-B6_-xv1T.js');

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
		require_cli.createFileFromTemplate(template.templatePath, template.outputPath, template.context);
	});
}

//#endregion
exports.cli = require_cli.cli_default;
exports.createFeature = require_cli.createFeature_default;
exports.createFileFromTemplate = require_cli.createFileFromTemplate;
exports.createFilesFromTemplates = createFilesFromTemplates;
exports.createPackage = require_cli.createPackage_default;
exports.ensureDir = require_cli.ensureDir;
exports.getTemplateDir = require_cli.getTemplateDir;
exports.getWorkspaceInfo = require_cli.getWorkspaceInfo;
exports.registerHandlebarsHelpers = require_cli.registerHandlebarsHelpers;
exports.renderTemplate = require_cli.renderTemplate;
exports.renderTemplateFile = require_cli.renderTemplateFile;
exports.validateName = require_cli.validateName;