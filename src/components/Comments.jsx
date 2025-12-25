import axios from "axios";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const fetchData = async (postId) => {
	const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
	return res.data;
};

const Comments = ({ postId }) => {
	const { getToken } = useAuth();
	const { user } = useUser();
	const { isPending, error, data } = useQuery({ queryKey: ["comments", postId], queryFn: () => fetchData(postId) });

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (newComment) => {
			const token = await getToken();
			return axios.post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, newComment, {
				headers: { Authorization: `Bearer ${token}` },
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", postId] });
		},
		onError: (error) => toast.error(error.response.data),
	});

	if (isPending) return "Loading...";
	if (error) return "An error has occurred: " + error.message;

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const data = { desc: formData.get("desc") };

		mutation.mutate(data);
	};

	return (
		<div className="flex flex-col gap-4 lg:w-2/3 mb-8">
			<h1 className="text-xl text-gray-600 font-semibold">Comments:</h1>
			<form onSubmit={handleSubmit} className="flex items-center justify-between gap-8 w-full">
				<textarea name="desc" placeholder="Write a comment..." className="w-full p-4 rounded-xl" />
				<button className="bg-blue-800 text-white px-4 py-3 font-medium rounded-xl">Send</button>
			</form>

			{isPending ? (
				"Loading..."
			) : error ? (
				"Error loading comments!"
			) : (
				<>
					{mutation.isPending && (
						<Comment
							comment={{
								desc: `${mutation.variables.desc} (Sending...)`,
								createdAt: new Date(),
								user: {
									img: user.imageUrl,
									username: user.username,
								},
							}}
						/>
					)}
					{data.map((comment) => (
						<Comment key={comment._id} comment={comment} postId={postId} />
					))}
				</>
			)}
		</div>
	);
};

export default Comments;
