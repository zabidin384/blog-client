import Search from "./Search";
import Categories from "./Categories";
import { useSearchParams } from "react-router-dom";

const SideMenu = () => {
	const [searchParams, setsearchParams] = useSearchParams();

	const handleFilterChange = (e) => {
		if (searchParams.get("sort") !== e.target.value) {
			setsearchParams({
				...Object.fromEntries(searchParams.entries()),
				sort: e.target.value,
			});
		}
	};

	const handleCategoryChange = (category) => {
		if (searchParams.get("cat") !== category) {
			setsearchParams({
				...Object.fromEntries(searchParams.entries()),
				cat: category,
			});
		}
	};

	return (
		<div className="pl-4 h-max w-max sticky top-8">
			<h1 className="mb-2 text-sm font-semibold">Search</h1>
			<Search />
			<h1 className="mt-4 mb-2 text-sm font-semibold">Filters</h1>
			<div className="flex flex-col gap-2 text-sm">
				<label htmlFor="" className="hover:underline flex items-center gap-2 cursor-pointer">
					<input
						type="radio"
						name="sort"
						onChange={handleFilterChange}
						value="newest"
						className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
					/>
					Newest
				</label>
				<label htmlFor="" className="hover:underline flex items-center gap-2 cursor-pointer">
					<input
						type="radio"
						name="sort"
						onChange={handleFilterChange}
						value="popular"
						className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
					/>
					Most Popular
				</label>
				<label htmlFor="" className="hover:underline flex items-center gap-2 cursor-pointer">
					<input
						type="radio"
						name="sort"
						onChange={handleFilterChange}
						value="trending"
						className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
					/>
					Trending
				</label>
				<label htmlFor="" className="hover:underline flex items-center gap-2 cursor-pointer">
					<input
						type="radio"
						name="sort"
						onChange={handleFilterChange}
						value="oldest"
						className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
					/>
					Oldest
				</label>
			</div>
			<Categories handleCategoryChange={handleCategoryChange} />
		</div>
	);
};

export default SideMenu;
