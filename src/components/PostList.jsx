import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { MdOutlineEmail } from "react-icons/md";
import { useAuth } from "@clerk/clerk-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, useLocation, useSearchParams } from "react-router-dom";
// Files
import Loading from "./Loading";
import PostListItem from "./PostListItem";

function PostList({ type }) {
	const [searchParams] = useSearchParams();
	const { getToken, isSignedIn, isLoaded } = useAuth();
	const location = useLocation();

	// Get All Posts
	const fetchPosts = async (pageParam, searchParams) => {
		const searchParamsObj = Object.fromEntries([...searchParams]);
		const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
			params: { page: pageParam, limit: 5, ...searchParamsObj },
		});
		return res.data;
	};

	// Get Saved Posts
	const fetchSavedPosts = async (pageParam, searchParams) => {
		const token = await getToken();
		const searchParamsObj = Object.fromEntries([...searchParams]);
		const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
			headers: { Authorization: `Bearer ${token}` },
			params: { page: pageParam, limit: 5, ...searchParamsObj },
		});
		return res.data;
	};

	const { data, error, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ["posts", type, searchParams.toString()],
		queryFn: ({ pageParam = 1 }) => {
			if (type === "saved") return fetchSavedPosts(pageParam, searchParams);
			return fetchPosts(pageParam, searchParams);
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => (lastPage?.hasMore ? pages?.length + 1 : undefined),
		enabled: isLoaded && (type !== "saved" || isSignedIn),
	});

	if (!isLoaded || isLoading)
		return (
			<div className="mt-24">
				<Loading height="h-full" />
			</div>
		);
	if (type === "saved" && isLoaded && !isSignedIn) {
		return (
			<div className="flex justify-center items-center h-[80vh] w-full md:text-lg">
				<p>
					Please{" "}
					<Link to="/login" className="hover:underline font-semibold">
						Login
					</Link>{" "}
					to see your saved posts!
				</p>
			</div>
		);
	}
	if (error)
		return <div className="w-full flex items-center justify-center md:text-lg mb-4 mt-24">Failed get post list: {error?.message}</div>;

	const allPosts = data?.pages?.flatMap((page) => page?.posts) || [];

	if (data?.pages[0]?.posts?.length === 0) {
		return <p className="text-center mt-16 md:text-lg">No post available!</p>;
	}

	return (
		<div>
			{location.pathname !== "/" && (
				<h2 className="my-4 text-xl sm:text-2xl lg:text-3xl font-bold">{type === "saved" ? "Saved Posts:" : "All Posts:"}</h2>
			)}
			<InfiniteScroll
				dataLength={allPosts.length}
				next={fetchNextPage}
				hasMore={!!hasNextPage}
				loader={isFetchingNextPage && <h4>Loading more posts...</h4>}
				endMessage={
					type !== "saved" && (
						<div className="text-center mt-16 py-6 border-t border-gray-600">
							<p className="text-gray-800 sm:text-lg lg:text-xl font-semibold">That&apos;s all for now!</p>
							<p className="text-gray-600 text-sm lg:text-base">Follow me for more updates or contact me for suggestions.</p>
							<p className="text-gray-600 text-sm lg:text-base flex items-center justify-center gap-2">
								<MdOutlineEmail size={16} /> zabidin384@gmail.com
							</p>
						</div>
					)
				}
			>
				{allPosts.map((post) => (
					<PostListItem key={post?._id} post={post} />
				))}
			</InfiniteScroll>
		</div>
	);
}

export default PostList;
