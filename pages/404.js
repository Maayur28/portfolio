import Image from "next/image";
import Link from "next/link";
export default function Custom404() {
  return (
    <>
      <Link href="/">
        <a>
          <Image
            src="https://res.cloudinary.com/mayur28/image/upload/v1626360535/404img_yh2kzp.gif"
            alt="Not found image"
            layout="fill"
            objectFit="contain"
          />
        </a>
      </Link>
    </>
  );
}
