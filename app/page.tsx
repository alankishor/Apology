'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Float, Environment } from '@react-three/drei'
import { useState, useRef, useEffect, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Flower } from 'lucide-react'
import * as THREE from 'three'

function Heart3D({ position, onClick }: { position: [number, number, number], onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={hovered ? "#ff1493" : "#ff69b4"} />
      </mesh>
      <mesh position={[position[0] - 0.3, position[1] + 0.3, position[2]]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={hovered ? "#ff1493" : "#ff69b4"} />
      </mesh>
      <mesh position={[position[0] + 0.3, position[1] + 0.3, position[2]]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={hovered ? "#ff1493" : "#ff69b4"} />
      </mesh>
    </Float>
  )
}

function Tulip3D({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={position}>
        {/* Stem */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
        {/* Flower */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshStandardMaterial color="#FF6347" />
        </mesh>
        {/* Petals */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI * 2) / 5) * 0.3,
              0.5,
              Math.sin((i * Math.PI * 2) / 5) * 0.3
            ]}
            rotation={[0, (i * Math.PI * 2) / 5, Math.PI / 6]}
          >
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color="#FF1493" />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function Butterfly3D({ position, onClick }: { position: [number, number, number], onClick: () => void }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (clicked) {
      setTimeout(() => setClicked(false), 1000)
    }
  }, [clicked])

  const handleClick = () => {
    setClicked(true)
    onClick()
  }

  return (
    <Float speed={4} rotationIntensity={0.8} floatIntensity={1.5}>
      <group 
        ref={groupRef} 
        position={position}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={clicked ? 1.5 : hovered ? 1.2 : 1}
      >
        {/* Butterfly Body */}
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 0.8]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
        
        {/* Left Wing */}
        <mesh position={[-0.3, 0.1, 0]} rotation={[0, 0, Math.PI / 6]}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial 
            color={clicked ? "#FFD700" : hovered ? "#FF69B4" : "#9370DB"} 
            transparent 
            opacity={0.8}
          />
        </mesh>
        <mesh position={[-0.25, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial 
            color={clicked ? "#FFD700" : hovered ? "#FF69B4" : "#9370DB"} 
            transparent 
            opacity={0.8}
          />
        </mesh>
        
        {/* Right Wing */}
        <mesh position={[0.3, 0.1, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial 
            color={clicked ? "#FFD700" : hovered ? "#FF69B4" : "#9370DB"} 
            transparent 
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0.25, -0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial 
            color={clicked ? "#FFD700" : hovered ? "#FF69B4" : "#9370DB"} 
            transparent 
            opacity={0.8}
          />
        </mesh>

        {/* Antennae */}
        <mesh position={[-0.05, 0.4, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.2]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
        <mesh position={[0.05, 0.4, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.2]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
      </group>
    </Float>
  )
}

function SorryText({ position, text }: { position: [number, number, number], text: string }) {
  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <Text
        position={position}
        fontSize={0.3}
        color="#FF69B4"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      >
        {text}
      </Text>
    </Float>
  )
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-pink-600 mb-2">Loading your apology...</h2>
        <p className="text-gray-600">Preparing something special for Pri 💕</p>
      </div>
    </div>
  )
}

function Scene({ sorryCount, onHeartClick, onButterflyClick }: { 
  sorryCount: number, 
  onHeartClick: () => void,
  onButterflyClick: () => void 
}) {
  const sorryTexts = [
    "I'M SORRY", "FORGIVE ME", "I LOVE YOU", "PLEASE COME BACK", 
    "MY HEART ACHES", "I MISS YOU", "YOU'RE MY WORLD", "I'M SORRY BABY",
    "BE MINE AGAIN", "YOU'RE PERFECT", "I NEED YOU", "COME HOME TO ME"
  ]

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FFB6C1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF69B4" />

      {/* Main Title */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 3, 0]}
          fontSize={0.8}
          color="#FF1493"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
          I'M SORRY PRI
        </Text>
      </Float>

      {/* Interactive Hearts */}
      <Heart3D position={[-3, 1, 0]} onClick={onHeartClick} />
      <Heart3D position={[3, 1, 0]} onClick={onHeartClick} />
      <Heart3D position={[0, -1, 2]} onClick={onHeartClick} />
      <Heart3D position={[-2, -2, -1]} onClick={onHeartClick} />
      <Heart3D position={[2, -2, -1]} onClick={onHeartClick} />

      {/* Tulips */}
      <Tulip3D position={[-4, -1, -2]} />
      <Tulip3D position={[4, -1, -2]} />
      <Tulip3D position={[-1, -2, 3]} />
      <Tulip3D position={[1, -2, 3]} />

      {/* Magical Butterflies */}
      <Butterfly3D position={[-2, 2, 1]} onClick={onButterflyClick} />
      <Butterfly3D position={[2, 2, 1]} onClick={onButterflyClick} />
      <Butterfly3D position={[0, 1, -2]} onClick={onButterflyClick} />
      <Butterfly3D position={[-3, 0, 2]} onClick={onButterflyClick} />
      <Butterfly3D position={[3, 0, 2]} onClick={onButterflyClick} />

      {/* Dynamic Sorry Messages */}
      {Array.from({ length: Math.min(sorryCount, 50) }).map((_, i) => (
        <SorryText
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
          ]}
          text={sorryTexts[i % sorryTexts.length]}
        />
      ))}

      <OrbitControls enablePan={false} enableZoom={false} />
    </>
  )
}

export default function ApologyPage() {
  const [sorryCount, setSorryCount] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleHeartClick = () => {
    setSorryCount(prev => prev + 8)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
  }

  const handleBigSorryButton = () => {
    setSorryCount(prev => prev + 25)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 5000)
  }

  const handleButterflyClick = () => {
    setSorryCount(prev => prev + 15)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 4000)
  }

  if (!isClient) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 flex items-center justify-center">
        <LoadingFallback />
      </div>
    )
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 relative overflow-hidden">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Scene sorryCount={sorryCount} onHeartClick={handleHeartClick} onButterflyClick={handleButterflyClick} />
        </Canvas>
      </Suspense>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="pointer-events-auto mb-8">
            <Button
              onClick={handleBigSorryButton}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 min-w-max"
            >
              <Heart className="mr-2 h-6 w-6" />
              ACCEPT THIS DARLIN - LAN
              <Heart className="ml-2 h-6 w-6" />
            </Button>
          </div>

          {showMessage && (
            <div className="pointer-events-none animate-pulse fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl border-2 border-pink-300">
                <h2 className="text-2xl font-bold text-pink-600 text-center mb-2">
                  Pri, I Love You So Much! 💕
                </h2>
                <p className="text-gray-700 text-center">
                  Please forgive me, you mean everything to me! 🌹
                </p>
                <p className="text-sm text-gray-500 text-center mt-2">
                  - Your Lan
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <p className="text-sm text-gray-700 flex items-center">
            <Heart className="mr-2 h-4 w-4 text-pink-500" />
            Click the 3D hearts to add more sorries!
          </p>
          <p className="text-sm text-gray-700 flex items-center mt-1">
            <Flower className="mr-2 h-4 w-4 text-red-500" />
            Drag to rotate the scene
          </p>
          <p className="text-sm text-gray-700 flex items-center mt-1">
            🦋 Click the magical butterflies for sorry explosions!
          </p>
        </div>

        {/* Love Counter */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <p className="text-lg font-bold text-pink-600">
            Sorries Sent: {sorryCount} 💕
          </p>
        </div>

        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce text-pink-400 opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              💖
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
