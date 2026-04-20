const AnnouncementBar = () => {
  return (
    <div className="bg-neutral-950 text-white text-sm border-b border-neutral-800">
      <div className="relative max-w-7xl mx-auto py-2.5 flex justify-center items-center px-6">

        {/* Center text */}
        <p className="text-neutral-300 text-[13px] tracking-wide text-center">
          Summer Sale For All Swim Suits And Free Express Delivery –{" "}
          <strong className="text-white font-semibold">OFF 50%!</strong>{" "}
          <a
            href="#"
            className="text-white font-semibold underline underline-offset-2 decoration-red-600/70 hover:text-red-400 hover:decoration-red-400 transition-colors duration-200 ml-1 inline-flex items-center gap-1 group"
          >
            Shop Now
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </p>

        {/* Right language selector */}
        <div className="absolute right-6 hidden sm:flex items-center gap-1.5 text-[12px] text-neutral-400 hover:text-white cursor-pointer transition-colors duration-200 tracking-wider">
          <span>English</span>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      </div>
    </div>
  );
};

export default AnnouncementBar;