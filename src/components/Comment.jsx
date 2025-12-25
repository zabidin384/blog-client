import IKImage from "./IKImage";
import { format } from "timeago.js";
import { MdDelete } from "react-icons/md";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const Comment = ({ comment, postId }) => {
	const { getToken } = useAuth();
	const { user } = useUser();
	const role = user?.publicMetadata?.role;

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async () => {
			const token = await getToken();
			return axios.delete(`${import.meta.env.VITE_API_URL}/comments/${comment._id}`, { headers: { Authorization: `Bearer ${token}` } });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", postId] });
			toast.success("Comment has been deleted successfully!");
		},
		onError: (error) => toast.error(error.response.data),
	});

	return (
		<div className="p-4 bg-slate-50 rounded-xl">
			<div className="flex items-center gap-4">
				{comment.user.img && <IKImage src={comment.user.img} className="w-10 h-10 rounded-full object-cover" w={40} />}
				<span className="font-medium">{comment.user.username}</span>
				<span className="text-sm text-gray-500">{format(comment.createdAt)}</span>
				{user && (comment.user.username === user.username || role === "admin") && (
					<>
						<MdDelete size={24} onClick={() => mutation.mutate()} className="cursor-pointer text-red-500 hover:text-red-300" />
						{mutation.isPending && <span>(Delete in progress...)</span>}
					</>
				)}
			</div>
			<div className="mt-4">{comment.desc}</div>
		</div>
	);
};

export default Comment;
