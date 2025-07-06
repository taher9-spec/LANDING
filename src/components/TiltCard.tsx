import React, { useRef, useEffect, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 12,
  scale = 1.03,
  speed = 400,
  glare = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState({});

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / (rect.height / 2)) * maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
      
      const transformString = `
        perspective(1000px) 
        rotateX(${-rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale3d(${scale}, ${scale}, ${scale})
      `;
      
      setTransform(transformString);

      if (glare) {
        const glareX = (mouseX / rect.width) * 100;
        const glareY = (mouseY / rect.height) * 100;
        
        setGlareStyle({
          background: `radial-gradient(circle at ${50 + glareX / 4}% ${50 + glareY / 4}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          opacity: 0.6
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
      setGlareStyle({});
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, scale, glare]);

  return (
    <div
      ref={cardRef}
      className={`relative transform-gpu ${className}`}
      style={{
        transform,
        transition: isHovered ? 'none' : `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
      
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            ...glareStyle,
            transition: isHovered ? 'none' : `opacity ${speed}ms ease-out`,
            transform: 'translateZ(10px)'
          }}
        />
      )}
      
      {/* Enhanced shadow */}
      <div
        className="absolute inset-0 rounded-2xl bg-black/20 blur-xl -z-10"
        style={{
          transform: `translateZ(-40px) translateY(${isHovered ? '8px' : '4px'})`,
          transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
          opacity: isHovered ? 0.4 : 0.2
        }}
      />
    </div>
  );
};

export default TiltCard;