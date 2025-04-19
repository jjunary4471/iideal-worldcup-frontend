import React, { useEffect, useRef } from 'react';

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    const particles: Particle[] = [];
    
    // Confetti colors
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', 
      '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
      '#009688', '#4caf50', '#8bc34a', '#cddc39', 
      '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
    ];
    
    class Particle {
      x: number;
      y: number;
      color: string;
      size: number;
      speed: number;
      angle: number;
      rotation: number;
      rotationSpeed: number;
      
      constructor() {
        this.x = Math.random() * width;
        this.y = -20 - Math.random() * 100;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = 5 + Math.random() * 15;
        this.speed = 1 + Math.random() * 3;
        this.angle = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.2 - 0.1;
      }
      
      update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle) * 0.5;
        this.rotation += this.rotationSpeed;
        
        if (this.y > height) {
          this.y = -20;
          this.x = Math.random() * width;
        }
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        
        // Draw a rectangle for confetti piece
        ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
        
        ctx.restore();
      }
    }
    
    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Confetti;