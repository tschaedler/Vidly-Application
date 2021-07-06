export function paginate(items, pageNumber, pageSize) {
	const startIndex = (pageNumber - 1) * pageSize;
	let arraySubset = items.slice(startIndex, items.length);
	arraySubset = arraySubset.slice(0, 4);
	return arraySubset;
}
