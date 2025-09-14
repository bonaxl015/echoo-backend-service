export type IGetAllPost = {
	pageNumber: number;
	pageSize: number;
};

export type IGetPostById = {
	id: string;
};

export type ICreatePost = {
	authorId: string;
	content: string;
};

export type IUpdatePost = {
	id: string;
	authorId: string;
	content: string;
};

export type IDeletePost = {
	id: string;
	authorId: string;
};
