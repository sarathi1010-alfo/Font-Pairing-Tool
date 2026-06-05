export function AdPlaceholder({ size = "728x90" }: { size?: "728x90" | "300x250" | "responsive" }) {
  const heightClass = size === "728x90" ? "h-[90px]" : size === "300x250" ? "h-[250px]" : "h-[100px] md:h-[90px]";
  const widthClass = size === "728x90" ? "w-full max-w-[728px]" : size === "300x250" ? "w-[300px]" : "w-full";

  return (
    <div className={`mx-auto ${widthClass} ${heightClass} bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 border-dashed rounded-md flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 text-sm`}>
      <span>Ad Slot</span>
      <span className="text-xs font-mono">{size}</span>
    </div>
  );
}
