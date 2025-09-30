export type ILikePost = {
	userId: string;
	postId: string;
};

export type ILikeComment = {
	userId: string;
	commentId: string;
};

export type IUnlikePost = {
	postId: string;
	userId: string;
};

export type IUnlikeComment = {
	commentId: string;
	userId: string;
};

export type IGetPostLikes = {
	postId: string;
	pageNumber: number;
	pageSize: number;
};

export type IGetCommentLikes = {
	commentId: string;
	pageNumber: number;
	pageSize: number;
};
