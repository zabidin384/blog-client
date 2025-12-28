import axios from "axios";
import { format } from "timeago.js";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
// Files
import Categories from "../components/Categories";
import Comments from "../components/Comments";
import IKImage from "../components/IKImage";
import Loading from "../components/Loading";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";

const fetchData = async (slug) => {
	const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
	return res.data;
};

const fetchSuggestions = async (category, currentPostId) => {
	const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/suggestions?category=${category}&currentPostId=${currentPostId}`);
	return res.data;
};

function SinglePostPage() {
	const { slug } = useParams();
	const { user } = useUser();
	const { isPending, error, data } = useQuery({ queryKey: ["post", slug], queryFn: () => fetchData(slug) });
	const { data: suggestions, isPending: suggestionsPending } = useQuery({
		queryKey: ["suggestions", data?.category, data?._id],
		queryFn: () => fetchSuggestions(data.category, data._id),
		enabled: !!data,
	});

	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setsearchParams] = useSearchParams();

	useEffect(() => {
		scrollTo(0, 0);
	}, []);

	if (isPending) return <Loading />;
	if (error) return <div className="w-full flex items-center md:text-lg mb-4 mt-24">Failed get this post: {error?.message}</div>;
	if (!data) return <div className="w-full flex justify-center items-center md:text-lg mb-4 min-h-[80vh]">Post is not found!</div>;

	const handleCategoryChange = (category) => {
		const currentParams = Object.fromEntries(searchParams.entries());

		if (location.pathname !== "/posts") {
			navigate(`/posts?cat=${category}`);
		} else {
			if (searchParams.get("cat") !== category) {
				setsearchParams({
					...currentParams,
					cat: category,
				});
			}
		}
	};

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
					<p className="text-gray-600 italic">{data.desc}</p>
				</div>
				{data.img && (
					<div className="hidden lg:block w-2/5">
						<IKImage src={data.img ?? null} w={600} className="rounded-2xl" alt="post" />
					</div>
				)}
			</div>

			{/* Content */}
			<div className="flex flex-col md:flex-row gap-8">
				<div id="content" className="lg:text-lg flex-1 flex flex-col text-justify" dangerouslySetInnerHTML={{ __html: data.content }} />
				<div className="px-4 h-max sticky top-8">
					<h1 className="mt-4 mb-2 text-sm font-semibold">Search</h1>
					<Search />

					<h1 className="mt-6 mb-2 text-sm font-semibold">Author</h1>
					<div className="flex flex-col gap-4 mb-6">
						<Link className="flex items-center gap-2 hover:underline" to={`/posts?author=${data.user?.username}`}>
							{data.user?.img && (
								<IKImage src={data.user?.img ?? null} className="w-8 h-8 rounded-full object-cover" w={48} h={48} alt="user" />
							)}
							<span>{data.user?.username}</span>
						</Link>
					</div>

					{user && <PostMenuActions post={data} />}

					<Categories handleCategoryChange={handleCategoryChange} />
				</div>
			</div>

			{/* Recommended Posts */}
			<div className="mt-8">
				<h2 className="mb-4 text-xl sm:text-2xl lg:text-3xl font-bold">Recommended Posts:</h2>
				{suggestionsPending ? (
					"Loading suggestions..."
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{suggestions?.map((post) => (
							<div key={post._id} to={`/${post.slug}`} className="flex flex-col gap-1">
								<Link to={`/${post.slug}`} className="text-xl md:text-2xl font-semibold hover:underline">
									<div className="relative aspect-video overflow-hidden rounded-xl mb-1">
										{post.img && <IKImage src={post.img} w={300} className="object-cover w-full h-full transition-transform" alt="post" />}
									</div>
									<h2 className="text-sm sm:text-lg lg:text-base font-semibold">{post.title}</h2>
								</Link>
								<div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
									By
									<Link className="text-blue-800 hover:underline" to={`/posts?author=${post.user.username}`}>
										{post.user?.username}
									</Link>
									<span>|</span>
									<Link className="text-blue-800 hover:underline" to={`/posts?cat=${post.category}`}>
										{post.category ?? "-"}
									</Link>
									<span>|</span>
									<span>{format(post.createdAt)}</span>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<Comments postId={data._id} />
		</div>
	);
}

export default SinglePostPage;
