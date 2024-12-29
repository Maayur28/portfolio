import Image from "next/image";
import Link from "next/link";
export default function Custom404() {
  return (
    <>
      <Link href="/">
        <Image
          src="https://res.cloudinary.com/mayur28/image/upload/v1626360535/404img_yh2kzp.gif"
          alt="No Image found"
          layout="fill"
          objectFit="contain"
        />
      </Link>
    </>
  );
}
