import { Image } from "@imagekit/react";

const IKImage = ({ src, className, alt, w, h, priority = false }) => {
	return (
		<Image
			urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
			src={src}
			className={`${className} max-w-full h-auto`}
			alt={alt}
			width={w}
			height={h}
			transformation={[
				{
					width: w,
					height: h,
					quality: "80",
					format: "auto",
				},
			]}
			loading={priority ? "eager" : "lazy"}
			lqip={{ active: true, quality: 20 }}
		/>
	);
};

export default IKImage;
