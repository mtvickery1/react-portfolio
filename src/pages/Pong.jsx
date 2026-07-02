import { useState, useEffect, useRef } from 'react'
import { RefreshCw, Play } from 'lucide-react'

export default function Pong() {
  const canvasRef = useRef(null)
  const [score, setScore] = useState({ p1: 0, p2: 0 })
  const [gameStarted, setGameStarted] = useState(false)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let ball = { x: 400, y: 300, dx: 5, dy: 5, radius: 10 }
    let paddle1 = { y: 250, h: 100 }
    let paddle2 = { y: 250, h: 100 }

    function draw() {
      if (!ctx || !canvas) return
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Paddles
      ctx.fillStyle = '#38bdf8'
      ctx.fillRect(20, paddle1.y, 10, paddle1.h)
      ctx.fillRect(770, paddle2.y, 10, paddle2.h)
      
      // Ball
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      ctx.fillStyle = '#d946ef'
      ctx.fill()
      
      if (gameStarted) {
        ball.x += ball.dx
        ball.y += ball.dy
        
        if (ball.y <= 0 || ball.y >= canvas.height) ball.dy *= -1
        if (ball.x <= 30 || ball.x >= 770) {
            if(ball.x <= 30) setScore(s => ({...s, p2: s.p2 + 1}))
            else setScore(s => ({...s, p1: s.p1 + 1}))
            ball = { x: 400, y: 300, dx: 5 * (Math.random() > 0.5 ? 1 : -1), dy: 5 * (Math.random() > 0.5 ? 1 : -1), radius: 10 }
        }
        if ((ball.x <= 30 && ball.y >= paddle1.y && ball.y <= paddle1.y + paddle1.h) || 
            (ball.x >= 770 && ball.y >= paddle2.y && ball.y <= paddle2.y + paddle2.h)) {
            ball.dx *= -1.05
        }
      }
      
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationFrameId)
  }, [gameStarted])

  return (
    <div className="container-custom py-16 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Retro Pong</h1>
      <div className="card p-4 shadow-2xl mb-8">
        <canvas 
            ref={canvasRef} 
            width={800} 
            height={600} 
            className="bg-slate-900 rounded-xl cursor-none"
            onMouseMove={(e) => {
                const rect = canvasRef.current?.getBoundingClientRect()
                if (rect) {
                    const y = e.clientY - rect.top - 50
                    // In a real app we'd control AI paddle too
                }
            }}
        />
      </div>
      <div className="flex gap-8 items-center text-2xl font-mono mb-8">
        <span className="text-primary-500">P1: {score.p1}</span>
        <span className="text-slate-400">|</span>
        <span className="text-accent-500">P2: {score.p2}</span>
      </div>
      <button 
        onClick={() => setGameStarted(!gameStarted)}
        className="btn-primary px-12 py-4"
      >
        {gameStarted ? <RefreshCw className="mr-2" /> : <Play className="mr-2" />}
        {gameStarted ? 'Reset Game' : 'Start Playing'}
      </button>
    </div>
  )
}