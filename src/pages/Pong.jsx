import { useState, useEffect, useRef } from 'react'
import { RefreshCw, Play, Pause, Info } from 'lucide-react'

export default function Pong() {
  const canvasRef = useRef(null)
  const [score, setScore] = useState({ p1: 0, p2: 0 })
  const [gameStarted, setGameStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const [difficulty, setDifficulty] = useState('medium')
  const [ball, setBall] = useState({ x: 400, y: 300, dx: 0, dy: 0, radius: 10, speed: 6 })
  const [paddle1, setPaddle1] = useState({ y: 250, h: 100 })
  const [paddle2, setPaddle2] = useState({ y: 250, h: 100 })
  const [screenShake, setScreenShake] = useState(0)

  const difficultySettings = {
    easy: { aiSpeed: 4, ballSpeed: 5, paddleSize: 120 },
    medium: { aiSpeed: 6, ballSpeed: 7, paddleSize: 100 },
    hard: { aiSpeed: 8, ballSpeed: 9, paddleSize: 80 },
    impossible: { aiSpeed: 12, ballSpeed: 11, paddleSize: 60 },
  }

  const resetBall = (towardPlayer1 = true) => {
    const dir = towardPlayer1 ? -1 : 1
    const angle = (Math.random() - 0.5) * Math.PI / 3
    const speed = difficultySettings[difficulty].ballSpeed
    setBall({
      x: 400,
      y: 300,
      dx: Math.cos(angle) * speed * dir,
      dy: Math.sin(angle) * speed,
      radius: 10,
      speed,
    })
  }

  const resetGame = () => {
    const paddleH = difficultySettings[difficulty].paddleSize
    setScore({ p1: 0, p2: 0 })
    setPaddle1({ y: 300 - paddleH / 2, h: paddleH })
    setPaddle2({ y: 300 - paddleH / 2, h: paddleH })
    setScreenShake(0)
    resetBall()
    setGameStarted(false)
    setPaused(false)
  }

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true)
    } else {
      setPaused(!paused)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId

    function draw() {
      if (!ctx || !canvas) return
      
      // Screen shake
      ctx.save()
      if (screenShake > 0) {
        const shakeX = (Math.random() - 0.5) * screenShake
        const shakeY = (Math.random() - 0.5) * screenShake
        ctx.translate(shakeX, shakeY)
        setScreenShake(s => Math.max(0, s - 0.5))
      }

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#020617')
      gradient.addColorStop(0.5, '#0f172a')
      gradient.addColorStop(1, '#020617')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Grid pattern (subtle)
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.02)'
      ctx.lineWidth = 1
      for (let x = 0; x <= canvas.width; x += 50) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y <= canvas.height; y += 50) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Center line - dashed
      ctx.setLineDash([20, 15])
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, 0)
      ctx.lineTo(canvas.width / 2, canvas.height)
      ctx.stroke()
      ctx.setLineDash([])

      // Paddle 1 (Player - Cyan)
      ctx.shadowColor = '#0ea5e9'
      ctx.shadowBlur = 20
      const p1Gradient = ctx.createLinearGradient(20, 0, 35, 0)
      p1Gradient.addColorStop(0, '#0ea5e9')
      p1Gradient.addColorStop(1, '#0284c7')
      ctx.fillStyle = p1Gradient
      ctx.fillRect(20, paddle1.y, 15, paddle1.h)
      
      // Paddle highlight
      ctx.shadowBlur = 0
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.fillRect(20, paddle1.y, 3, paddle1.h)

      // Paddle 2 (AI - Magenta)
      ctx.shadowColor = '#d946ef'
      ctx.shadowBlur = 20
      const p2Gradient = ctx.createLinearGradient(765, 0, 780, 0)
      p2Gradient.addColorStop(0, '#c026d3')
      p2Gradient.addColorStop(1, '#a21caf')
      ctx.fillStyle = p2Gradient
      ctx.fillRect(765, paddle2.y, 15, paddle2.h)
      
      // Paddle highlight
      ctx.shadowBlur = 0
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.fillRect(777, paddle2.y, 3, paddle2.h)

      // Ball
      ctx.shadowColor = '#fff'
      ctx.shadowBlur = 25
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      const ballGradient = ctx.createRadialGradient(
        ball.x - 3, ball.y - 3, 0,
        ball.x, ball.y, ball.radius
      )
      ballGradient.addColorStop(0, '#fff')
      ballGradient.addColorStop(0.5, '#f8fafc')
      ballGradient.addColorStop(1, '#e2e8f0')
      ctx.fillStyle = ballGradient
      ctx.fill()
      ctx.shadowBlur = 0

      // "PAUSED" overlay
      if (paused && gameStarted) {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.85)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        ctx.font = 'bold 48px JetBrains Mono, monospace'
        ctx.textAlign = 'center'
        const pauseGradient = ctx.createLinearGradient(0, 250, 0, 350)
        pauseGradient.addColorStop(0, '#0ea5e9')
        pauseGradient.addColorStop(1, '#d946ef')
        ctx.fillStyle = pauseGradient
        ctx.fillText('⏸ PAUSED', canvas.width / 2, canvas.height / 2)
        
        ctx.font = '16px Inter, sans-serif'
        ctx.fillStyle = 'rgba(226, 232, 240, 0.7)'
        ctx.fillText('Press SPACE or click Resume', canvas.width / 2, canvas.height / 2 + 40)
      }

      ctx.restore()
      
      // Game logic
      if (gameStarted && !paused) {
        updateGame()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    function updateGame() {
      // Ball movement
      setBall(prev => {
        let newBall = { ...prev, x: prev.x + prev.dx, y: prev.y + prev.dy }
        
        // Top/bottom walls
        if (newBall.y - newBall.radius <= 0) {
          newBall.y = newBall.radius
          newBall.dy *= -1
        } else if (newBall.y + newBall.radius >= canvas.height) {
          newBall.y = canvas.height - newBall.radius
          newBall.dy *= -1
        }

        // Paddle 1 collision (Player)
        if (newBall.x - newBall.radius <= 35 &&
            newBall.y >= paddle1.y && newBall.y <= paddle1.y + paddle1.h) {
          newBall.x = 35 + newBall.radius
          newBall.dx *= -1.05
          
          const hitPos = (newBall.y - (paddle1.y + paddle1.h / 2)) / (paddle1.h / 2)
          newBall.dy = hitPos * newBall.speed * 0.8
          
          setScreenShake(3)
        }

        // Paddle 2 collision (AI)
        if (newBall.x + newBall.radius >= 765 &&
            newBall.y >= paddle2.y && newBall.y <= paddle2.y + paddle2.h) {
          newBall.x = 765 - newBall.radius
          newBall.dx *= -1.05
          
          const hitPos = (newBall.y - (paddle2.y + paddle2.h / 2)) / (paddle2.h / 2)
          newBall.dy = hitPos * newBall.speed * 0.8
          
          setScreenShake(3)
        }

        // Scoring
        if (newBall.x < -20) {
          setScore(s => ({ ...s, p2: s.p2 + 1 }))
          setScreenShake(8)
          setTimeout(() => resetBall(true), 500)
          return { ...newBall, dx: 0, dy: 0 }
        } else if (newBall.x > canvas.width + 20) {
          setScore(s => ({ ...s, p1: s.p1 + 1 }))
          setScreenShake(8)
          setTimeout(() => resetBall(false), 500)
          return { ...newBall, dx: 0, dy: 0 }
        }

        return newBall
      })

      // AI Paddle movement
      setPaddle2(prev => {
        const paddleH = difficultySettings[difficulty].paddleSize
        const aiSpeed = difficultySettings[difficulty].aiSpeed
        const paddleCenter = prev.y + paddleH / 2
        const target = ball.y
        const diff = target - paddleCenter
        
        if (Math.abs(diff) > 8) {
          const move = Math.sign(diff) * Math.min(aiSpeed, Math.abs(diff))
          const newY = Math.max(0, Math.min(canvas.height - paddleH, prev.y + move))
          return { ...prev, y: newY }
        }
        return prev
      })
    }

    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault()
        startGame()
      }
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault()
        resetGame()
      }
      if (['ArrowUp', 'w', 'W'].includes(e.key)) {
        e.preventDefault()
        const paddleH = difficultySettings[difficulty].paddleSize
        setPaddle1(prev => ({ ...prev, y: Math.max(0, prev.y - 30) }))
      }
      if (['ArrowDown', 's', 'S'].includes(e.key)) {
        e.preventDefault()
        const paddleH = difficultySettings[difficulty].paddleSize
        setPaddle1(prev => ({ ...prev, y: Math.min(canvas.height - paddleH, prev.y + 30) }))
      }
      if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault()
        const diffs = ['easy', 'medium', 'hard', 'impossible']
        setDifficulty(diffs[parseInt(e.key) - 1])
      }
    }

    const handleMouseMove = (e) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const clientY = e.clientY
      const y = clientY - rect.top - paddle1.h / 2
      const paddleH = difficultySettings[difficulty].paddleSize
      setPaddle1(prev => ({ ...prev, y: Math.max(0, Math.min(canvas.height - paddleH, y)) }))
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      if (!canvas || !e.touches[0]) return
      const rect = canvas.getBoundingClientRect()
      const clientY = e.touches[0].clientY
      const y = clientY - rect.top - paddle1.h / 2
      const paddleH = difficultySettings[difficulty].paddleSize
      setPaddle1(prev => ({ ...prev, y: Math.max(0, Math.min(canvas.height - paddleH, y)) }))
    }

    window.addEventListener('keydown', handleKeyDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })

    // Initialize ball
    resetBall()
    draw()
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [gameStarted, paused, difficulty, ball, paddle1, paddle2, score, screenShake])

  return (
    <div className="container-custom py-16 flex flex-col items-center">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-4xl font-bold gradient-text">NEON PONG</h1>
        <span className="badge-primary">ARCADE MODE</span>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap justify-center">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="bg-slate-900 border border-slate-700 text-slate-100 px-4 py-2 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
        >
          <option value="easy">🟢 EASY</option>
          <option value="medium">🟡 MEDIUM</option>
          <option value="hard">🟠 HARD</option>
          <option value="impossible">🔴 IMPOSSIBLE</option>
        </select>
      </div>

      <div className="card p-4 shadow-2xl mb-8 relative">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={600} 
          className="bg-slate-950 rounded-xl cursor-none w-full max-w-[800px]"
          style={{ 
            filter: 'drop-shadow(0 0 30px rgba(14, 165, 233, 0.3)) drop-shadow(0 0 60px rgba(217, 70, 239, 0.15))',
            cursor: 'none'
          }}
        />
        {screenShake > 0 && <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 pointer-events-none rounded-xl" />}
      </div>

      <div className="flex gap-8 items-center text-3xl font-mono mb-8 font-bold">
        <span className="text-primary-400 drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]">P1: {score.p1.toString().padStart(2, '0')}</span>
        <span className="text-slate-500">⬥</span>
        <span className="text-accent-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]">P2: {score.p2.toString().padStart(2, '0')}</span>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button 
          onClick={startGame}
          className="btn-primary px-12 py-4 text-lg"
        >
          {gameStarted ? (paused ? (
            <> <Play className="mr-2" /> Resume </> 
          ) : (
            <> <Pause className="mr-2" /> Pause </> 
          )) : (
            <> <Play className="mr-2" /> Start Game </> 
          )}
        </button>
        <button 
          onClick={resetGame}
          className="btn-outline px-12 py-4 text-lg"
        >
          <RefreshCw className="mr-2" />
          Reset Match
        </button>
      </div>

      {/* Controls legend - always visible */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <kbd className="bg-white dark:bg-slate-700 px-2 py-1 rounded text-xs font-mono border border-slate-300 dark:border-slate-600">↑ / W</kbd>
          <span>Move Up</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <kbd className="bg-white dark:bg-slate-700 px-2 py-1 rounded text-xs font-mono border border-slate-300 dark:border-slate-600">↓ / S</kbd>
          <span>Move Down</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <kbd className="bg-white dark:bg-slate-700 px-3 py-1 rounded text-xs font-mono border border-slate-300 dark:border-slate-600">SPACE</kbd>
          <span>Start / Pause</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <kbd className="bg-white dark:bg-slate-700 px-2 py-1 rounded text-xs font-mono border border-slate-300 dark:border-slate-600">R</kbd>
          <span>Reset</span>
        </div>
      </div>
    </div>
  )
}