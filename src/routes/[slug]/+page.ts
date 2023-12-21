import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const slugRegex = /^(\d+)(?::(\d+)(?:-(\d+))?)?$/;
	const match = params.slug.match(slugRegex);

	if (!match) {
		throw error(400, 'Invalid format');
	}

	const slugParsed = parseInt(match[1]);
	const startVerse = match[2] ? parseInt(match[2]) : null;
	const endVerse = match[3] ? parseInt(match[3]) : null;

	if (slugParsed >= 1 && slugParsed <= 114) {
		const data = await import('$lib/content/base.json');

		let surah = (data.default as { [key: string]: any })[slugParsed.toString()];

		// If startVerse and endVerse are specified, filter the verses
		let filteredVerses = surah.verses;

		if (startVerse && !endVerse) {
			filteredVerses = { [startVerse]: surah.verses[startVerse] };
		} else if (startVerse && endVerse) {
			if (startVerse > endVerse) {
				error(
					400,
					`Invalid format: Starting verse [${startVerse}] is greater than ending verse [${endVerse}]`
				);
			}
			filteredVerses = Object.keys(surah.verses)
				.filter((key) => Number(key) >= startVerse && Number(key) <= endVerse)
				.reduce((obj: { [key: string]: any }, key) => {
					obj[key] = surah.verses[key];
					return obj;
				}, {});
		}

		return { surah: { ...surah, verses: filteredVerses } };
	} else {
		throw error(404, 'Not found');
	}
}
