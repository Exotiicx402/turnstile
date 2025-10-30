export function TokenTicker() {
  return (
    <div 
      className="text-center opacity-0"
      style={{
        animation: "word-appear 1s ease-out forwards",
        animationDelay: "1.6s"
      }}
    >
      <a 
        href="https://x.com/turnstilefndn?s=11"
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl md:text-3xl font-light text-gray-400 hover:text-gray-300 transition-colors cursor-pointer"
      >
        $TSTL
      </a>
    </div>
  );
}
