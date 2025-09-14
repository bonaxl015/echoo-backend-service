import { transporter } from '../config/mailer';

type ISendEmail = {
	from: string;
	to: string;
	subject: string;
	text: string;
};

export const sendEmail = async ({ from, to, subject, text }: ISendEmail) => {
	await transporter.sendMail({ from, to, subject, text });
};
