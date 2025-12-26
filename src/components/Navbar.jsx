import { useState } from "react";
import IKImage from "./IKImage";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { MdLogin } from "react-icons/md";

const Navbar = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className="w-full h-16 md:h-20 flex items-center justify-between">
			{/* LOGO */}
			<Link to="/" className="group flex items-center gap-4 text-2xl font-bold">
				<IKImage src="/blog/logo.jpg" className="rounded-full" alt="Logo" w={36} h={36} />
				<span className="group-hover:text-blue-600">ZainBlog</span>
			</Link>
			{/* MOBILE MENU */}
			<div className="md:hidden">
				{/* MOBILE BUTTON */}
				<div className="cursor-pointer text-3xl" onClick={() => setOpen((prev) => !prev)}>
					{open ? "X" : "☰"}
				</div>
				{/* MOBILE LINK LIST */}
				<div
					className={`w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out bg-blue-500 ${
						open ? "-right-0" : "-right-[100%]"
					}`}
				>
					<Link to="/">Home</Link>
					<Link to="/posts">All Posts</Link>
					<Link to="/#featured">Featured</Link>
					<Link to="/#recents">Recents</Link>
					<Link to="/login">
						<button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 👋</button>
					</Link>
				</div>
			</div>
			{/* DESKTOP MENU */}
			<div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
				<Link className="hover:underline" to="/">
					Home
				</Link>
				<Link className="hover:underline" to="/posts">
					All Posts
				</Link>
				<a className="hover:underline" href="/#featured">
					Featured
				</a>
				<a className="hover:underline" href="/#recents">
					Recents
				</a>
				<SignedOut>
					<Link to="/login">
						<button className="py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-900 flex items-center gap-2">
							<MdLogin className="w-5 h-5" /> Login
						</button>
					</Link>
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</div>
	);
};

export default Navbar;
