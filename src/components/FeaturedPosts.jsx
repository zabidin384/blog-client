import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import IKImage from "./IKImage";
import { format } from "timeago.js";

const fetchData = async () => {
	const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=popular`);
	return res.data;
};

const FeaturedPosts = () => {
	const { isPending, error, data } = useQuery({ queryKey: ["featuredPosts"], queryFn: () => fetchData() });

	if (isPending) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	const posts = data.posts;
	if (!posts || posts.length === 0) return;

	return (
		<div id="featured">
			<h1 className="mt-2 sm:mt-4 lg:mt-8 mb-4 text-xl sm:text-2xl lg:text-3xl font-bold">Featured Posts:</h1>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* First */}
				{posts[0]?.createdAt && (
					<div className="w-full lg:w-1/2 flex flex-col gap-1">
						{/* Image */}
						{posts[0]?.img && <IKImage src={posts[0]?.img} className="rounded-2xl object-cover" w={865} />}
						{/* Details */}
						<div className="flex items-center gap-2 text-sm lg:text-base">
							<h1 className="font-semibold lg:text-lg">01.</h1>
							<Link className="text-blue-800 lg:text-lg hover:underline" to={`/posts?cat=${posts[0]?.category}`}>
								{posts[0]?.category}
							</Link>
							<span className="text-gray-500">{format(posts[0]?.createdAt)}</span>
						</div>
						{/* Title */}
						<Link to={posts[0]?.slug} className="text-lg sm:text-xl lg:text-2xl font-semibold lg:font-bold hover:underline">
							{posts[0]?.title}
						</Link>
						<p className="text-sm sm:text-base">{posts[0]?.desc}</p>
					</div>
				)}
				{/* Others */}
				<div className="w-full lg:w-1/2 flex flex-col gap-4">
					{/* Second */}
					{posts[1]?.createdAt && (
						<div className="lg:h-1/3 lg:flex justify-between gap-4">
							<div className="lg:w-1/3 mb-1 aspect-video">
								{posts[1]?.img && <IKImage src={posts[1]?.img} className="rounded-2xl object-cover w-full h-full" w={298} />}
							</div>
							<div className="lg:w-2/3">
								<div className="flex items-center gap-2 text-sm lg:text-base mb-1">
									<h1 className="font-semibold">02.</h1>
									<Link className="text-blue-800 hover:underline" to={`/posts?cat=${posts[1]?.category}`}>
										{posts[1]?.category}
									</Link>
									<span className="text-gray-500 text-sm">{format(posts[1]?.createdAt)}</span>
								</div>
								<Link to={posts[1]?.slug} className="text-lg md:text-xl font-semibold hover:underline">
									{posts[1]?.title}
								</Link>
								<p className="text-sm sm:text-base">{posts[1]?.desc}</p>
							</div>
						</div>
					)}

					{/* Third */}
					{posts[2]?.createdAt && (
						<div className="lg:h-1/3 lg:flex justify-between gap-4">
							<div className="lg:w-1/3 mb-1 aspect-video">
								{posts[2]?.img && <IKImage src={posts[2]?.img} className="rounded-2xl object-cover w-full h-full" w={298} />}
							</div>
							<div className="lg:w-2/3">
								<div className="flex items-center gap-2 text-sm lg:text-base mb-1">
									<h1 className="font-semibold">03.</h1>
									<Link className="text-blue-800 hover:underline" to={`/posts?cat=${posts[0]?.category}`}>
										{posts[2]?.category}
									</Link>
									<span className="text-gray-500 text-sm">{format(posts[2]?.createdAt)}</span>
								</div>
								<Link to={posts[2]?.slug} className="text-base sm:text-lg md:text-xl font-semibold hover:underline">
									{posts[2]?.title}
								</Link>
								<p className="text-sm sm:text-base">{posts[2]?.desc}</p>
							</div>
						</div>
					)}

					{/* Fourth */}
					{posts[3]?.createdAt && (
						<div className="lg:h-1/3 lg:flex justify-between gap-4">
							<div className="lg:w-1/3 mb-1 aspect-video">
								{posts[3]?.img && <IKImage src={posts[3]?.img} className="rounded-2xl object-cover w-full h-full" w={298} />}
							</div>
							<div className="lg:w-2/3">
								<div className="flex items-center gap-2 text-sm lg:text-base mb-1">
									<h1 className="font-semibold">04.</h1>
									<Link className="text-blue-800 hover:underline" to={`/posts?cat=${posts[3]?.category}`}>
										{posts[3]?.category}
									</Link>
									<span className="text-gray-500 text-sm">{format(posts[3]?.createdAt)}</span>
								</div>
								<Link to={posts[3]?.slug} className="text-base sm:text-lg md:text-xl font-semibold hover:underline">
									{posts[3]?.title}
								</Link>
								<p className="text-sm sm:text-base">{posts[3]?.desc}</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FeaturedPosts;
