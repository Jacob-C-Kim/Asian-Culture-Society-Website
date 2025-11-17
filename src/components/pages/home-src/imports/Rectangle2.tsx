export default function Rectangle2() {
  return (
    <div className="relative size-full rounded-[15px] bg-[rgba(255,255,255,0.5)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[15px] border border-solid border-white"
      />
    </div>
  );
}
