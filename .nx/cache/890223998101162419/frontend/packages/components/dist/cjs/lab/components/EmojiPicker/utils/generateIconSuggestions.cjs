const require_emojis = require('../emojis.cjs');

//#region src/lab/components/EmojiPicker/utils/generateIconSuggestions.ts
const EMOJI_CATEGORIES = require_emojis.default;
const ALL_EMOJIS = EMOJI_CATEGORIES.flatMap((c) => c.emojis.map((e) => e.char));
/**
* Generates a specified number of random emoji icon suggestions.
*
* @param count - The number of random emoji icons to return.
* @returns An array of emoji character strings.
*
* @example
* ```typescript
* const icons = generateIconSuggestions(8);
* // Returns: ['🐼', '🚀', '💎', ...]
* ```
*/
function generateIconSuggestions(count) {
	return [...ALL_EMOJIS].sort(() => Math.random() - .5).slice(0, count);
}

//#endregion
exports.default = generateIconSuggestions;