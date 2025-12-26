import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload } from "@imagekit/react";
import { toast } from "react-toastify";
import { useRef } from "react";

const authenticator = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Request failed with status ${response.status}: ${errorText}`);
		}
		const data = await response.json();
		const { signature, expire, token, publicKey } = data;
		return { signature, expire, token, publicKey };
	} catch (error) {
		console.error("Authentication error:", error);
		throw new Error("Authentication request failed");
	}
};

const Upload = ({ children, type, setProgress, setData }) => {
	const fileInputRef = useRef(null);
	const abortController = new AbortController();

	const handleUpload = async () => {
		const fileInput = fileInputRef.current;
		if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
			alert("Please select a file to upload");
			return;
		}

		const file = fileInput.files[0];
		let authParams;

		try {
			authParams = await authenticator();
		} catch (authError) {
			console.error("Failed to authenticate for upload:", authError);
			return;
		}
		const { signature, expire, token, publicKey } = authParams;

		try {
			const uploadResponse = await upload({
				expire,
				token,
				signature,
				publicKey,
				folder: "/blog",
				file,
				fileName: file.name,
				abortSignal: abortController.signal,
				onProgress: (event) => setProgress((event.loaded / event.total) * 100),
			});
			if (uploadResponse.thumbnailUrl) {
				setData(uploadResponse);
				toast.success("Cover image uploaded successfully!");
			}
		} catch (error) {
			if (error instanceof ImageKitAbortError) {
				console.error("Upload aborted:", error.reason);
			} else if (error instanceof ImageKitInvalidRequestError) {
				console.error("Invalid request:", error.message);
			} else if (error instanceof ImageKitUploadNetworkError) {
				console.error("Network error:", error.message);
			} else if (error instanceof ImageKitServerError) {
				console.error("Server error:", error.message);
			} else {
				console.error("Upload error:", error);
			}
		}
	};

	return (
		<div className="">
			<input type="file" ref={fileInputRef} accept={`${type}/*`} className="hidden" onChange={handleUpload} />
			<div className="cursor-pointer" onClick={() => fileInputRef.current.click()}>
				{children}
			</div>
		</div>
	);
};

export default Upload;
