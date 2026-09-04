import Image from "next/image";
import { GRANDMA_NAME } from "@/lib/fortune";

interface GrandmaCommentProps {
  image: string;
  line: string;
}

export default function GrandmaComment({ image, line }: GrandmaCommentProps) {
  return (
    <div className="mt-6 flex flex-col items-center border-t border-slate-900/10 pt-6">
      <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-2 border-white/70 shadow-xl sm:h-56 sm:w-56">
        <Image
          src={image}
          alt={GRANDMA_NAME}
          fill
          sizes="(min-width: 640px) 224px, 160px"
          className="object-cover"
        />
      </div>
      <p className="mt-4 text-sm font-bold opacity-70">{GRANDMA_NAME}</p>
      <p className="mt-3 text-2xl font-black leading-snug sm:text-4xl">「{line}」</p>
    </div>
  );
}
