import { categories } from "../data";

const Categories = ({ handleCategoryChange }) => {
	return (
		<>
			<h1 className="mt-4 mb-2 text-sm font-semibold">Categories</h1>
			<div className="flex flex-col gap-2 text-sm">
				<span className="hover:underline cursor-pointer" onClick={() => handleCategoryChange("general")}>
					- All Posts
				</span>
				{categories.map((category, i) => (
					<span key={i} className="hover:underline cursor-pointer" onClick={() => handleCategoryChange(category.value)}>
						- {category.name}
					</span>
				))}
			</div>
		</>
	);
};

export default Categories;
