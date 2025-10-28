// Seeded random function to ensure consistency between server and client
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function Background() {
  // Generate stars array with seeded random for consistent SSR/CSR
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    left: Number((seededRandom(i * 4 + 1) * 100).toFixed(5)),
    top: Number((seededRandom(i * 4 + 2) * 100).toFixed(5)),
    size: Number((seededRandom(i * 4 + 3) * 2 + 1).toFixed(5)),
    delay: Number((seededRandom(i * 4 + 4) * 3).toFixed(5)),
  }));

  return (
    <>
      {/* Galaxy Background */}
      <div className="galaxy-bg"></div>
      
      {/* Animated Purple Glow */}
      <div className="purple-glow"></div>
      
      {/* Stars */}
      <div className="stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}

