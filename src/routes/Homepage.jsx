import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";

const Homepage = () => {
	return (
		<div className="mt-4 flex flex-col gap-4">
			{/* BREADCRUMB */}
			<div className="flex gap-2">
				<Link to="/">Home</Link>
				<span>•</span>
				<span>Blogs and Articles</span>
			</div>

			{/* INTRODUCTION */}
			<div className="flex items-center justify-between">
				{/* Titles */}
				<div className="">
					<h1 className="text-gray-800 text-2xl sm:text-3xl lg:text-5xl font-bold">
						Sharing Knowledge, Facts, and Stories in the Digital World
					</h1>
					<p className="mt-2 sm:mt-4 lg:mt-8 text-md md:text-xl italic">
						A space where I share insights on science, history, and health, along with interesting things I read and learn. My goal is to
						turn curiosity into knowledge by exploring the stories and facts that shape our world.
					</p>
				</div>
				{/* Animated Button */}
				<Link to="write" className="hidden md:block relative">
					<svg viewBox="0 0 200 200" width="200" height="200" className="text-lg tracking-widest animate-spin animatedButton">
						<path id="circlePath" fill="none" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
						<text>
							<textPath href="#circlePath" startOffset="0%">
								Write your story •
							</textPath>
							<textPath href="#circlePath" startOffset="50%">
								Share your idea •
							</textPath>
						</text>
					</svg>
					<button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" fill="none" stroke="white" strokeWidth="2">
							<line x1="6" y1="18" x2="18" y2="6" />
							<polyline points="9 6 18 6 18 15" />
						</svg>
					</button>
				</Link>
			</div>

			{/* CATEGORIES */}
			<MainCategories />

			{/* FEATURED POSTS */}
			<FeaturedPosts />

			{/* POST LIST */}
			<div id="recents">
				<h2 className="mt-8 mb-4 text-xl sm:text-2xl lg:text-3xl font-bold">Recent Posts:</h2>
				<PostList />
			</div>
		</div>
	);
};

export default Homepage;
