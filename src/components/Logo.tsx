import Image from "next/image";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      {light ? (
        // On dark backgrounds the artwork shows directly.
        <Image src="/logo.png" alt="CreatVate Solutions logo" width={402} height={399} className="h-9 w-9 object-contain" priority />
      ) : (
        // On the light header, sit the light artwork on a dark chip so it stays visible.
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-950">
          <Image src="/logo.png" alt="CreatVate Solutions logo" width={402} height={399} className="h-7 w-7 object-contain" priority />
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-navy-900"}`}>
          Creat<span className="text-brand-500">Vate</span>
        </span>
        <span className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${light ? "text-stone-400" : "text-stone-500"}`}>
          Solutions
        </span>
      </span>
    </span>
  );
}
