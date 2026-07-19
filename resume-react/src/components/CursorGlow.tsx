import { useEffect, useRef } from 'react'

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return

    const move = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
}

export default CursorGlow
