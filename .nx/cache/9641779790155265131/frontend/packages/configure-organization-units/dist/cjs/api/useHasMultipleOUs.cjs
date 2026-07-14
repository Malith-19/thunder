const require_useGetChildOrganizationUnits = require('./useGetChildOrganizationUnits.cjs');
const require_useGetOrganizationUnits = require('./useGetOrganizationUnits.cjs');

//#region src/api/useHasMultipleOUs.ts
function useHasMultipleOUs() {
	const { data: ouData, isLoading: isOuLoading } = require_useGetOrganizationUnits.default({
		limit: 2,
		offset: 0
	});
	const ouList = ouData?.organizationUnits ?? [];
	const rootCount = ouData?.totalResults ?? 0;
	const { data: childData, isLoading: isChildLoading } = require_useGetChildOrganizationUnits.default(rootCount === 1 ? ouList[0]?.id : void 0, {
		limit: 1,
		offset: 0
	});
	const hasMultipleRoots = rootCount > 1;
	const singleRootHasChildren = rootCount === 1 && (childData?.totalResults ?? 0) > 0;
	return {
		hasMultipleOUs: hasMultipleRoots || singleRootHasChildren,
		isLoading: isOuLoading || rootCount === 1 && isChildLoading,
		ouList
	};
}

//#endregion
exports.default = useHasMultipleOUs;