import { Link, NavLink } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useState } from "react";
import IKImage from "./IKImage";

const Navbar = () => {
	const [open, setOpen] = useState(false);

	return (
		<nav className="w-full h-16 md:h-20 flex items-center justify-between">
			{/* LOGO */}
			<Link to="/" className="group flex items-center gap-2 text-2xl font-bold">
				<IKImage src="/blog/logo.jpg" className="rounded-full" alt="logo" w={36} h={36} />
				<div className="group-hover:border-b-4 group-hover:border-blue-600 transition-all">ZainBlog</div>
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
						open ? "-right-0" : "hidden"
					}`}
				>
					<NavLink to="/" onClick={() => setOpen(false)}>
						Home
					</NavLink>
					<NavLink to="/posts" onClick={() => setOpen(false)}>
						All Posts
					</NavLink>
					<NavLink to="/saved-posts" onClick={() => setOpen(false)}>
						Saved Posts
					</NavLink>
					<NavLink to="/login" onClick={() => setOpen(false)}>
						<button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">Login 👋</button>
					</NavLink>
				</div>
			</div>

			{/* DESKTOP MENU */}
			<div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
				<NavLink className="hover:-translate-y-1 transition-all duration-300 hover:border-b hover:border-blue-600" to="/">
					Home
				</NavLink>
				<NavLink className="hover:-translate-y-1 transition-all duration-300 hover:border-b hover:border-blue-600" to="/posts">
					All Posts
				</NavLink>
				<NavLink className="hover:-translate-y-1 transition-all duration-300 hover:border-b hover:border-blue-600" to="/saved-posts">
					Saved Posts
				</NavLink>
				<SignedOut>
					<NavLink to="/login">
						<button className="py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-900 flex items-center gap-2">
							<MdLogin className="w-5 h-5" /> Login
						</button>
					</NavLink>
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</nav>
	);
};

export default Navbar;
