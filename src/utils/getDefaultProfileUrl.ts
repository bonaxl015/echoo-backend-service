export const getDefaultProfileUrl = (name: string, size: number) => {
	return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=${size}`;
};
