export type IGetUsers = {
	pageNumber: number;
	pageSize: number;
};

export type IGetUserById = {
	id: string;
};

type UpdateUserData = {
	name: string;
	bio: string;
	profilePhoto: string;
};

export type IUpdateUser = {
	id: string;
	data: Partial<UpdateUserData>;
};

export type IDeleteUser = {
	id: string;
	token: string | null;
};
