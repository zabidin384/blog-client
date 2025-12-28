import { PulseLoader } from "react-spinners";

function Loading({ text, height, width, textSize }) {
	return (
		<div className={`${height ? height : "min-h-[80vh]"} ${width ? width : "w-full"}  flex justify-center items-center md:text-lg mb-4`}>
			<div className="flex items-center gap-1">
				<span className={textSize}>{text ? text : "Loading"}</span>
				<PulseLoader size={5} speedMultiplier={0.75} />
			</div>
		</div>
	);
}

export default Loading;
