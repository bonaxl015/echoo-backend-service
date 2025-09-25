export type IGetAllPost = {
	authorId: string;
	pageNumber: number;
	pageSize: number;
};

export type IGetPostById = {
	id: string;
	authorId: string;
};

export type IGetPostByUser = IGetAllPost;

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
