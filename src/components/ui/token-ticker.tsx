export function TokenTicker() {
  return (
    <div 
      className="text-center opacity-0"
      style={{
        animation: "word-appear 1s ease-out forwards",
        animationDelay: "1.6s"
      }}
    >
      <p className="text-2xl md:text-3xl font-light text-gray-400">
        $TSTL
      </p>
    </div>
  );
}
