import Image from "next/image";
import { GRANDMA_NAME } from "@/lib/fortune";

interface GrandmaCommentProps {
  image: string;
}

export default function GrandmaComment({ image }: GrandmaCommentProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-2 border-white/70 shadow-xl sm:h-56 sm:w-56">
        <Image
          src={image}
          alt={GRANDMA_NAME}
          fill
          sizes="(min-width: 640px) 224px, 160px"
          className="object-cover"
        />
      </div>
      <p className="mt-3 text-sm font-bold opacity-70">{GRANDMA_NAME}</p>
    </div>
  );
}
