import clsx from "clsx";

export default function Container({
  className,
  children
}: { className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx(className, "mx-auto max-w-7xl sm:px-6 lg:px-8")}>
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      {/* <div className="mx-auto max-w-3xl">{ children }</div> */}
      { children }
    </div>
  )
}