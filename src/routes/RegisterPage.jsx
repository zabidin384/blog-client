import { SignUp } from "@clerk/clerk-react";

const RegisterPage = () => {
	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-80px)] pb-8">
			<SignUp signInUrl="/login" />
		</div>
	);
};

export default RegisterPage;
