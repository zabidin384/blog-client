import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

const PostListPage = () => {
	const [open, setOpen] = useState(false);
	const [searchParams] = useSearchParams();
	const category = searchParams.get("cat");
	const author = searchParams.get("author");

	return (
		<div className="">
			{category && (
				<h1 className="mb-8 text-xl md:text-2xl">
					<span className="font-semibold">Category: </span>
					{category}
				</h1>
			)}
			{author && (
				<h1 className="mb-8 text-xl md:text-2xl">
					<span className="font-semibold">Author: </span>
					{author}
				</h1>
			)}
			<button onClick={() => setOpen((prev) => !prev)} className="bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden">
				{open ? "Close" : "Filter or Search"}
			</button>
			<div className="flex flex-col-reverse gap-8 md:flex-row">
				<div className="flex-1">
					<PostList />
				</div>
				<div className={`${open ? "block" : "hidden"} md:block`}>
					<SideMenu />
				</div>
			</div>
		</div>
	);
};

export default PostListPage;
