import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Categories from "../components/Categories";
import Comments from "../components/Comments";
import IKImage from "../components/IKImage";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import { format } from "timeago.js";

const fetchData = async (slug) => {
	const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
	return res.data;
};

const SinglePostPage = () => {
	const { slug } = useParams();
	const { isPending, error, data } = useQuery({ queryKey: ["post", slug], queryFn: () => fetchData(slug) });
	const { user } = useUser();

	if (isPending) return "Loading...";
	if (error) return "An error has occurred: " + error.message;
	if (!data) return "Data is not found!";

	return (
		<div className="flex flex-col gap-8">
			{/* Detail */}
			<div className="flex gap-8">
				<div className="lg:w-3/5 flex flex-col gap-8">
					<div>
						<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">{data.title}</h1>
						<div className="flex items-center gap-2 text-gray-600 text-sm md:text-base">
							<span>Written by</span>
							<Link className="text-blue-800 hover:underline" to={`/posts?author=${data.user?.username}`}>
								{data.user?.username}
							</Link>
							<span>on</span>
							<Link className="text-blue-800 hover:underline" to={`/posts?cat=${data.category}`}>
								{data.category}
							</Link>
							<span>{format(data.createdAt)}</span>
						</div>
					</div>
					<p className="text-gray-600 font-medium">{data.desc}</p>
				</div>
				{data.img && (
					<div className="hidden lg:block w-2/5">
						<IKImage src={data.img ?? null} w={600} className="rounded-2xl" />
					</div>
				)}
			</div>
			{/* Content */}
			<div className="flex flex-col md:flex-row gap-8">
				<div className="lg:text-lg flex-1 flex flex-col text-justify" dangerouslySetInnerHTML={{ __html: data.content }} />
				<div className="px-4 h-max sticky top-8">
					<h1 className="mt-4 mb-2 text-sm font-semibold">Search</h1>
					<Search />

					<h1 className="mt-6 mb-2 text-sm font-semibold">Author</h1>
					<div className="flex flex-col gap-4 mb-6">
						<Link className="flex items-center gap-2 hover:underline" to={`/posts?author=${data.user?.username}`}>
							{data.user?.img && <IKImage src={data.user?.img ?? null} className="w-8 h-8 rounded-full object-cover" w={48} h={48} />}
							<span>{data.user?.username}</span>
						</Link>
					</div>

					{user && <PostMenuActions post={data} />}

					<Categories />
				</div>
			</div>
			<Comments postId={data._id} />
		</div>
	);
};

export default SinglePostPage;
