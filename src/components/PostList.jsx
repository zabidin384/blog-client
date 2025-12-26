import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const fetchPosts = async (pageParam, searchParams) => {
	const searchParamsObj = Object.fromEntries([...searchParams]);
	const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
		params: { page: pageParam, limit: 5, ...searchParamsObj },
	});
	return res.data;
};

const PostList = () => {
	const [searchParams] = useSearchParams();

	const { data, error, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ["posts", searchParams.toString()],
		queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => (lastPage?.hasMore ? pages.length + 1 : undefined),
	});

	if (isLoading) return <p className="text-center mt-16 md:text-lg">Loading...</p>;
	if (error) return "An error has occurred: " + error.message;

	const allPosts = data?.pages?.flatMap((page) => page?.posts) || [];

	if (data.pages[0].posts.length === 0) {
		return <p className="text-center mt-16 md:text-lg">No post available!</p>;
	}

	return (
		<InfiniteScroll
			dataLength={allPosts.length}
			next={fetchNextPage}
			hasMore={!!hasNextPage}
			loader={isFetchingNextPage && <h4>Loading more posts...</h4>}
			endMessage={<p className="my-8 text-center font-semibold">All posts have been loaded!</p>}
		>
			{allPosts.map((post) => (
				<PostListItem key={post?._id} post={post} />
			))}
		</InfiniteScroll>
	);
};

export default PostList;
