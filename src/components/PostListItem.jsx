import { Link } from "react-router-dom";
import { format } from "timeago.js";
import IKImage from "./IKImage";

const PostListItem = ({ post }) => {
	return (
		<div className="flex flex-col xl:flex-row gap-2 md:gap-4 lg:gap-8 mb-8">
			{post.img && (
				<div className="md:hidden xl:block xl:w-1/3">
					<IKImage src={post.img} className="rounded-2xl object-cover" w={735} />
				</div>
			)}
			<div className="flex flex-col gap-1 lg:gap-4 xl:w-2/3 text-sm md:text-base">
				<Link to={`/${post.slug}`} className="text-xl md:text-2xl font-semibold hover:underline">
					{post.title}
				</Link>
				<div className="flex items-center gap-2 text-gray-400">
					<span>Written by</span>
					<Link className="text-blue-800 hover:underline" to={`/posts?author=${post.user.username}`}>
						{post.user?.username}
					</Link>
					<span>on</span>
					<Link className="text-blue-800 hover:underline" to={`/posts?cat=${post.category}`}>
						{post.category}
					</Link>
					<span>{format(post.createdAt)}</span>
				</div>
				<p>{post.desc}</p>
				<Link to={`/${post.slug}`} className="text-blue-800 hover:underline">
					Read More...
				</Link>
			</div>
		</div>
	);
};

export default PostListItem;
