import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

type FacelessSceneProps = {
  pointer: { current: { x: number; y: number } }
  reduceMotion: boolean
}

/**
 * A hand-built mannequin: lathed torso, capsule arms, smooth featureless head.
 * The whole body leans toward the cursor; the head travels a little further.
 */
export default function FacelessScene({ pointer, reduceMotion }: FacelessSceneProps) {
  const body = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  const halo = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  const geo = useMemo(() => {
    const curve = (points: [number, number][], tension = 0.4) =>
      new THREE.CatmullRomCurve3(
        points.map(([r, y]) => new THREE.Vector3(r, y, 0)),
        false,
        'catmullrom',
        tension,
      )

    const torsoProfile = curve([
      [0.245, -0.34],
      [0.238, -0.24],
      [0.252, -0.1],
      [0.275, 0.04],
      [0.305, 0.18],
      [0.335, 0.3],
      [0.36, 0.4],
      [0.428, 0.485],
      [0.416, 0.54],
      [0.322, 0.605],
      [0.188, 0.68],
      [0.118, 0.735],
      [0.09, 0.79],
    ])

    // A jawline, a forehead, no face: a head built as a profile of revolution.
    const headProfile = curve([
      [0.055, 0],
      [0.125, 0.025],
      [0.172, 0.075],
      [0.195, 0.14],
      [0.212, 0.22],
      [0.215, 0.3],
      [0.198, 0.365],
      [0.158, 0.415],
      [0.09, 0.445],
      [0.02, 0.46],
    ])

    const lathe = (c: THREE.CatmullRomCurve3, segments: number) =>
      new THREE.LatheGeometry(
        c.getPoints(segments).map((p) => new THREE.Vector2(Math.max(p.x, 0.01), p.y)),
        96,
      )

    return {
      torso: lathe(torsoProfile, 56),
      head: lathe(headProfile, 44),
      neck: new THREE.CylinderGeometry(0.072, 0.09, 0.27, 48, 1, true),
      arm: new THREE.CapsuleGeometry(0.062, 0.52, 12, 24),
      shoulder: new THREE.SphereGeometry(0.107, 32, 24),
      hand: new THREE.SphereGeometry(0.058, 24, 18),
    }
  }, [])

  const clay = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#e3d5bf'),
        roughness: 0.74,
        metalness: 0,
        clearcoat: 0.16,
        clearcoatRoughness: 0.82,
        sheen: 0.45,
        sheenColor: new THREE.Color('#fff3e0'),
        sheenRoughness: 0.85,
        side: THREE.DoubleSide,
      }),
    [],
  )

  const scale = Math.min(1, Math.max(0.72, viewport.width / 1.6))

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    const dt = Math.min(delta, 0.05)
    const p = pointer.current
    const damp = THREE.MathUtils.damp

    if (body.current) {
      body.current.rotation.y = damp(body.current.rotation.y, p.x * 0.42, 3.4, dt)
      body.current.rotation.x = damp(body.current.rotation.x, -p.y * 0.2, 3.4, dt)
      body.current.position.x = damp(body.current.position.x, p.x * 0.08, 3, dt)
      const idleY = reduceMotion ? 0 : Math.sin(time * 0.72) * 0.014
      body.current.position.y = damp(body.current.position.y, idleY + p.y * 0.03, 3, dt)
    }

    if (head.current) {
      head.current.rotation.y = damp(head.current.rotation.y, p.x * 0.18, 4.5, dt)
      head.current.rotation.x = damp(head.current.rotation.x, -p.y * 0.08, 4.5, dt)
      head.current.rotation.z = reduceMotion ? 0 : Math.sin(time * 0.5) * 0.012
    }

    if (halo.current) {
      halo.current.rotation.y = reduceMotion ? 0.04 : 0.04 + Math.sin(time * 0.16) * 0.05
      halo.current.rotation.z = reduceMotion ? -0.12 : -0.12 + Math.sin(time * 0.22) * 0.05
    }
  })

  return (
    <>
      <ambientLight intensity={0.95} color="#fff6e8" />
      <directionalLight position={[3.2, 4.4, 3.6]} intensity={1.9} color="#fff1d9" />
      <directionalLight position={[-3.4, 1.6, 2.4]} intensity={0.85} color="#f0cfae" />
      <directionalLight position={[-1.4, 2.4, -3.4]} intensity={1.1} color="#c96b3f" />
      <directionalLight position={[0.9, 0.5, 4]} intensity={0.55} color="#fff6e6" />
      <directionalLight position={[0.5, -2, 1.5]} intensity={0.25} color="#8b7a63" />

      <group position={[0, -0.53, 0]} rotation={[0, 0.3, 0]} scale={scale}>
        <group ref={body} rotation={[0, 0.06, 0]}>
          <mesh geometry={geo.torso} material={clay} scale={[1, 1, 0.62]} />
          <mesh geometry={geo.neck} material={clay} position={[0, 0.845, 0]} />

          <mesh geometry={geo.shoulder} material={clay} position={[0.352, 0.487, 0]} scale={[1, 0.88, 0.88]} />
          <mesh geometry={geo.shoulder} material={clay} position={[-0.352, 0.487, 0]} scale={[1, 0.88, 0.88]} />

          <mesh geometry={geo.arm} material={clay} position={[0.432, 0.168, 0]} rotation={[0, 0, 0.055]} />
          <mesh geometry={geo.arm} material={clay} position={[-0.432, 0.168, 0]} rotation={[0, 0, -0.055]} />

          <mesh geometry={geo.hand} material={clay} position={[0.446, -0.176, 0]} scale={[0.82, 1.05, 0.72]} />
          <mesh geometry={geo.hand} material={clay} position={[-0.446, -0.176, 0]} scale={[0.82, 1.05, 0.72]} />

          <group ref={head} position={[0, 0.93, 0]}>
            <mesh geometry={geo.head} material={clay} position={[0, 0.03, 0]} scale={[0.88, 0.97, 0.87]} />
          </group>
        </group>

        <group ref={halo} position={[0, 0.28, -0.62]} rotation={[0, 0, -0.12]}>
          <mesh>
            <torusGeometry args={[0.84, 0.0034, 8, 180]} />
            <meshBasicMaterial color="#b0592f" transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[0, 0, 0.46]}>
            <torusGeometry args={[1.04, 0.0022, 8, 180]} />
            <meshBasicMaterial color="#1a1813" transparent opacity={0.14} />
          </mesh>
        </group>
      </group>

      <ContactShadows
        position={[0, -0.92, 0]}
        opacity={0.42}
        scale={3.4}
        blur={2.9}
        far={1.2}
        resolution={512}
        color="#6a563f"
      />
    </>
  )
}
