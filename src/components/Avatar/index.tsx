import Image from "next/image";

interface AvatarProps {
  imgUrl: string;
}

const CustomAvatar = ({ imgUrl }: AvatarProps) => {
  return <Image src={imgUrl} alt="me" width="100%" height="100%" />;
};

export default CustomAvatar;
