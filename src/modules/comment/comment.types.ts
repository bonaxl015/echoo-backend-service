export type ICreateComment = {
	authorId: string;
	postId: string;
	content: string;
};

export type IGetCommentByPost = {
	authorId: string;
	postId: string;
	pageNumber: number;
	pageSize: number;
};

export type IUpdateComment = {
	authorId: string;
	id: string;
	content: string;
};

export type IDeleteComment = {
	authorId: string;
	id: string;
};
