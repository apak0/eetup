'use client'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const audioContext = new window.AudioContext()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    gainNode.gain.value = 0.3 // Almost silent
    oscillator.start()
    setTimeout(() => {
      oscillator.stop()
    }, 1000) // Play for 1 second
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button>login</button>
    </div>
  )
}
