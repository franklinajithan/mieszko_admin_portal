export const RotatingSquaresLoader = () => (
    <div className="flex items-center justify-center h-screen bg-transparent">
      <div className="absolute inset-0 bg-white bg-opacity-50" /> {/* Optional overlay */}
      <div className="flex space-x-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 bg-cyan-600 animate-[bounce_0.6s_infinite]`}
            style={{ animationDelay: `${index * 0.15}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
  