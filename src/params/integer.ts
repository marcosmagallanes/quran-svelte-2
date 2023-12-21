/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
	const pattern =
		/^(1[0-1][0-4]|[1-9][0-9]|[1-9])(:[12][0-8][0-6]|:[1-9][0-9]?|:)?(-[12][0-8][0-6]|-[1-9][0-9]?|-)?$/;
	return pattern.test(param);
}
