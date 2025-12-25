import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const PostMenuActions = ({ post }) => {
	const { user } = useUser();
	const { getToken } = useAuth();
	const navigate = useNavigate();

	// Get
	const {
		isPending,
		error,
		data: savedPosts,
	} = useQuery({
		queryKey: ["savedPosts"],
		queryFn: async () => {
			const token = await getToken();
			return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, { headers: { Authorization: `Bearer ${token}` } });
		},
	});

	const isAdmin = user?.publicMetadata?.role === "admin" || false;
	const isSaved = savedPosts?.data?.some((p) => p === post._id) || false;
	const isFeatured = post?.isFeatured;

	// Delete Post
	const deleteMutation = useMutation({
		mutationFn: async () => {
			const token = await getToken();
			return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, { headers: { Authorization: `Bearer ${token}` } });
		},
		onSuccess: () => {
			navigate("/");
			toast.success("Post has been deleted successfully!");
		},
		onError: (error) => toast.error(error.response.data),
	});

	const queryClient = useQueryClient();

	// Save Post
	const saveMutation = useMutation({
		mutationFn: async () => {
			const token = await getToken();
			return axios.patch(
				`${import.meta.env.VITE_API_URL}/users/save`,
				{ postId: post._id },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["savedPosts"] }),
		onError: (error) => toast.error(error.response.data),
	});

	const handleSave = () => {
		if (!user) return navigate("/login");
		saveMutation.mutate();
	};

	// Feature Post
	const featureMutation = useMutation({
		mutationFn: async () => {
			const token = await getToken();
			return axios.patch(
				`${import.meta.env.VITE_API_URL}/posts/feature`,
				{ postId: post._id },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["post", post.slug] }),
		onError: (error) => toast.error(error.response.data),
	});

	return (
		<div className="w-max pr-4">
			<h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
			{isPending ? (
				"Loading..."
			) : error ? (
				"Saved post fetching failed!"
			) : (
				<div className="flex items-center gap-2 py-2 text-sm cursor-pointer group" onClick={handleSave}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
						<path
							d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
							stroke="black"
							strokeWidth="3"
							fill={saveMutation.isPending ? (isSaved ? "none" : "black") : isSaved ? "black" : "none"}
						/>
					</svg>
					<span className="group-hover:underline">{isSaved ? "Post is saved" : "Save"}</span>
					<PulseLoader loading={saveMutation.isPending} size={5} speedMultiplier={0.75} />
				</div>
			)}
			{isAdmin && (
				<div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={() => featureMutation.mutate()}>
					{isFeatured ? (
						<>
							<IoIosStar size={20} />
							<span>Post is featured</span>
						</>
					) : (
						<div className="hover:underline flex items-center gap-2">
							<IoIosStarOutline size={20} />
							<span>Feature</span>
						</div>
					)}
					<PulseLoader loading={featureMutation.isPending} size={5} speedMultiplier={0.75} />
				</div>
			)}
			{user && (post?.user?.username === user.username || isAdmin) && (
				<div className="group flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={() => deleteMutation.mutate()}>
					<MdDelete className="text-red-700 group-hover:text-red-600" size={20} />
					<span className="group-hover:underline">Delete</span>
					<PulseLoader loading={deleteMutation.isPending} size={5} speedMultiplier={0.75} />
				</div>
			)}
		</div>
	);
};

export default PostMenuActions;
