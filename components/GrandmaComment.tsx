import Image from "next/image";
import { GRANDMA_NAME } from "@/lib/fortune";

interface GrandmaCommentProps {
  image: string;
  line: string;
}

export default function GrandmaComment({ image, line }: GrandmaCommentProps) {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-2xl border border-card-border bg-card-bg p-4">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-accent/40">
        <Image src={image} alt={GRANDMA_NAME} fill sizes="56px" className="object-cover" />
      </div>
      <div>
        <p className="text-xs font-bold text-accent">{GRANDMA_NAME}</p>
        <p className="relative mt-1 rounded-2xl rounded-tl-none bg-black/20 px-3 py-2 text-sm leading-relaxed text-foreground">
          {line}
        </p>
      </div>
    </div>
  );
}
