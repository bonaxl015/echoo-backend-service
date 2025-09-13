export type IRegisterUserService = {
	name: string;
	email: string;
	password: string;
};

export type ILoginUserService = {
	email: string;
	password: string;
};
