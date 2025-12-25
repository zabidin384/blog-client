import { Link } from "react-router-dom";
import Search from "./Search";
import { categories } from "../data";

const MainCategories = () => {
	return (
		<div className="hidden md:block lg:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
			{/* Links */}
			<div className="flex-1 flex items-center justify-between flex-wrap mb-2 lg:mb-0">
				<Link to="/posts" className="bg-blue-800 text-white rounded-full px-4 py-2">
					All Posts
				</Link>
				{categories.map((category, i) => (
					<Link key={i} to={`/posts?cat=${category.value}`} className="hover:bg-blue-100 rounded-full px-4 py-2">
						{category.name}
					</Link>
				))}
			</div>
			{/* Search */}
			<Search />
		</div>
	);
};

export default MainCategories;
