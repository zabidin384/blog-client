import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import ReactQuill from "react-quill-new";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Upload from "../components/Upload";
import { categories } from "../data";

const WritePage = () => {
	const { getToken } = useAuth();
	const { isLoaded, isSignedIn } = useUser();
	const navigate = useNavigate();

	const [value, setValue] = useState("");
	const [progress, setProgress] = useState(0);
	const [cover, setCover] = useState("");
	const [img, setImg] = useState("");
	const [video, setVideo] = useState("");

	useEffect(() => {
		img && setValue((prev) => prev + `<p><image src="${img.url}" /></p>`);
	}, [img]);

	useEffect(() => {
		video && setValue((prev) => prev + `<p><iframe class="ql-video" src="${video.url}" /></p>`);
	}, [video]);

	const mutation = useMutation({
		mutationFn: async (newPost) => {
			const token = await getToken();
			return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, { headers: { Authorization: `Bearer ${token}` } });
		},
		onSuccess: (res) => {
			toast.success("Post has been created successfully!");
			navigate(`/${res.data.slug}`);
		},
	});

	if (!isLoaded) {
		return <div className="">Loading...</div>;
	}

	if (isLoaded && !isSignedIn) {
		return <div className="">You should login!</div>;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		const data = {
			img: cover.filePath || "",
			title: formData.get("title"),
			category: formData.get("category"),
			desc: formData.get("desc"),
			content: value,
		};

		mutation.mutate(data);
	};

	return (
		<div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
			<h1 className="text-xl font-semibold">Create a New Post</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
				<Upload type="image" setProgress={setProgress} setData={setCover}>
					<button type="button" className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
						Add a cover image
					</button>
				</Upload>
				<input type="text" name="title" placeholder="My Awesome Story" className="text-4xl font-bold bg-transparent outline-none" />
				<div className="flex items-center gap-4">
					<label className="text-sm">Choose a category:</label>
					<select name="category" id="" className="p-2 rounded-xl bg-white shadow-md">
						{categories.map((category, i) => (
							<option key={i} value={category.value}>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<textarea name="desc" id="" placeholder="A Short Description" className="p-4 rounded-xl bg-white shadow-md" />
				<div className="flex-1 flex flex-col gap-2">
					<div className="flex gap-2">
						<Upload type="image" setProgress={setProgress} setData={setImg}>
							<div className="bg-white px-2 py-1 rounded-lg cursor-pointer">📷</div>
						</Upload>
						<Upload type="video" setProgress={setProgress} setData={setVideo}>
							<div className="bg-white px-2 py-1 rounded-lg cursor-pointer">🎥</div>
						</Upload>
					</div>
					<ReactQuill
						theme="snow"
						value={value}
						onChange={setValue}
						readOnly={progress > 0 && progress < 100}
						className="flex-1 rounded-xl bg-white shadow-md"
					/>
				</div>
				<button
					disabled={mutation.isPending || (progress > 0 && progress < 100)}
					className="bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-xl mt-4 p-2 w-36"
				>
					{mutation.isPending ? "Loading..." : "Send"}
				</button>
				{mutation.isError && <span>{mutation.error.message}</span>}
			</form>
		</div>
	);
};

export default WritePage;
