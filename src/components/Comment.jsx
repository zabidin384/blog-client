import axios from "axios";
import { format } from "timeago.js";
import { MdDelete } from "react-icons/md";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import IKImage from "./IKImage";

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
				{comment.user.img && <IKImage src={comment.user.img} className="w-10 h-10 rounded-full object-cover" w={40} alt="user" />}
				<span className="font-medium">{comment.user.username}</span>
				<span className="text-sm text-gray-500">{format(comment.createdAt)}</span>
				{user && (comment.user.username === user.username || role === "admin") && (
					<>
						<MdDelete size={24} onClick={() => mutation.mutate()} className="cursor-pointer hover:opacity-80 -mr-4" />
						<PulseLoader loading={mutation.isPending} size={5} speedMultiplier={0.75} />
					</>
				)}
			</div>
			<div className="mt-4">{comment.desc}</div>
		</div>
	);
};

export default Comment;
