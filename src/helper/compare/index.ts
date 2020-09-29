export function compareIdString(a: any, b: any) {
	return ((a.id < b.id) ? -1 : ((a.id > b.id) ? 1 :0));
};

export function compareIdInt(a: any, b: any) {
	return a.id - b.id;
};