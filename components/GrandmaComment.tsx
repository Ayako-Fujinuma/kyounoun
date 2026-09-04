import Image from "next/image";
import { GRANDMA_NAME } from "@/lib/fortune";

interface GrandmaCommentProps {
  image: string;
  line: string;
}

export default function GrandmaComment({ image, line }: GrandmaCommentProps) {
  return (
    <div className="mt-4 flex flex-col items-center rounded-2xl border border-accent/40 bg-card-bg px-5 py-6 text-center">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-accent shadow-[0_0_30px_rgba(244,201,93,0.4)] sm:h-32 sm:w-32">
        <Image src={image} alt={GRANDMA_NAME} fill sizes="128px" className="object-cover" />
      </div>
      <p className="mt-3 text-xs font-bold text-accent">{GRANDMA_NAME}</p>
      <p className="mt-2 text-lg font-bold leading-snug text-foreground sm:text-xl">
        「{line}」
      </p>
    </div>
  );
}
