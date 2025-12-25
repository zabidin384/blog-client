import { Image } from "@imagekit/react";

const IKImage = ({ src, className, alt, w, h }) => {
	return (
		<Image
			urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
			src={src}
			className={className}
			alt={alt}
			width={w}
			height={h}
			transformation={[
				{
					width: w,
					height: h,
				},
			]}
		/>
	);
};

export default IKImage;
