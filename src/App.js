import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.

import object from "./assets/3d/scooter5.glb"

import "./App.css";

const state = proxy({
  current: null,
  items: {
    Claxon: "#ffffff",
    Cylinder019: "#ffffff",
    material: "#ffffff"
  }
});

function Kup() {
  const ref = useRef()
  const snap = useSnapshot(state)
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes, materials } = useGLTF(object)

  // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  // Cursor showing current color
  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])

  // Using the GLTFJSX output here to wire in app-state and hook up events


  return (
    <group ref={ref}
      enableZoom
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))
      }
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        position={[-16.41, -5.52, -1.24]}
        rotation={[0, -0.45, -0.08]}
        scale={[0.43, 0.17, 0.41]}
      />
      <mesh
        geometry={nodes.Cylinder001.geometry}
        material={nodes.Cylinder001.material}
        position={[-17.12, -5.33, -0.18]}
        rotation={[0, -0.45, -0.08]}
        scale={[0.66, 0.05, 0.52]}
      />
      <mesh
        geometry={nodes.Cylinder002.geometry}
        material={nodes.Cylinder002.material}
        position={[-17.31, -5.29, 0.09]}
        rotation={[0, -0.45, -0.08]}
        scale={[0.62, 0.05, 0.51]}
      />
      <mesh
        geometry={nodes.Cylinder003.geometry}
        material={nodes.Cylinder003.material}
        position={[-17.02, -5.29, -0.32]}
        rotation={[0.18, 1.12, -0.16]}
        scale={[0.01, 0.01, 0.02]}
      />
      <mesh
        geometry={nodes.Cylinder004.geometry}
        material={nodes.Cylinder004.material}
        position={[-18.98, -5.49, 2.42]}
        rotation={[-0.19, -0.05, -1.74]}
        scale={[0.59, 0.21, 0.57]}
      />
      <mesh
        geometry={nodes.Torus002.geometry}
        material={nodes.Torus002.material}
        position={[-15.36, -4.82, -2.61]}
        rotation={[0, -0.45, -1.65]}
        scale={[0.84, 1.19, 0.88]}
      />
      <mesh
        geometry={nodes.Cylinder018.geometry}
        material={nodes.Cylinder018.material}
        position={[-15.79, -5.47, -1.15]}
        rotation={[-0.18, -0.44, -0.16]}
        scale={[0.05, 0.05, 0.04]}
      />
      <mesh
        geometry={nodes.Cube006.geometry}
        material={nodes.Cube006.material}
        position={[-15.87, -5.46, -1.18]}
        rotation={[0, -0.45, -0.08]}
        scale={[0.09, 0.08, 0.08]}
      />
      <mesh
        geometry={nodes.Cylinder019.geometry}
        material={nodes.Cylinder019.material}
        position={[-18.27, -4.64, 1.58]}
        rotation={[2.88, 0.42, 0.19]}
        scale={[0.27, 0.1, 0.21]}
      />
      <mesh
        geometry={nodes.Cylinder020.geometry}
        material={nodes.Cylinder020.material}
        position={[-18.58, -3.91, 2.13]}
        rotation={[2.95, 0.05, 0.17]}
        scale={[0.28, 0.1, 0.2]}
      />
      <mesh
        geometry={nodes.Cylinder021.geometry}
        material={nodes.Cylinder021.material}
        position={[-18.42, -3.34, 1.86]}
        rotation={[-0.19, -0.05, -1.74]}
        scale={[0.05, 0.27, 0.06]}
      />
      <mesh
        geometry={nodes.Cylinder022.geometry}
        material={nodes.Cylinder022.material}
        position={[-18.38, -3.2, 1.8]}
        rotation={[-0.19, -0.05, -1.74]}
        scale={[0.06, 0.09, 0.06]}
      />
      <mesh
        geometry={nodes.Cylinder023.geometry}
        material={nodes.Cylinder023.material}
        position={[-17.56, 1.38, 1.75]}
        rotation={[-0.19, -0.05, -1.74]}
        scale={[0.07, 1.82, 0.06]}
      />
      <mesh
        geometry={nodes.Cylinder024.geometry}
        material={nodes.Cylinder024.material}
        position={[-18.42, 1.45, 1.65]}
        rotation={[-0.19, -0.05, -1.74]}
        scale={[0.14, 0.14, 0.13]}
      />
      <mesh
        geometry={nodes.Cylinder025.geometry}
        material={nodes.Cylinder025.material}
        position={[-18.45, -3.34, 2.14]}
        rotation={[1.39, -0.17, 0.05]}
        scale={[0.03, 0.01, 0.02]}
      />
      <mesh
        geometry={nodes.Cylinder026.geometry}
        material={nodes.Cylinder026.material}
        position={[-16.29, 1.23, 1.83]}
        rotation={[-0.19, -0.05, -1.74]}
        scale={[0.11, 0.54, 0.11]}
      />
      <mesh
        geometry={nodes.Cylinder027.geometry}
        material={nodes.Cylinder027.material}
        position={[-18.41, -3.35, 1.81]}
        rotation={[1.39, -0.17, -1.52]}
        scale={[0.03, 0.02, 0.03]}
      />
      <group position={[-17.93, 0.03, 1.61]} rotation={[-0.19, -0.05, -0.17]} scale={[0.21, 0.15, 0.14]}>
        <mesh geometry={nodes.Cylinder029_1.geometry} material={nodes.Cylinder029_1.material} />
        <mesh geometry={nodes.Cylinder029_2.geometry} material={nodes.Cylinder029_2.material} />
        <mesh geometry={nodes.Cylinder029_3.geometry} material={materials.Far} />
        <mesh geometry={nodes.Cylinder029_4.geometry} material={materials['Sticla far']} />
      </group>
      <mesh
        geometry={nodes.Cylinder029.geometry}
        material={nodes.Cylinder029.material}
        position={[-16.87, 1.25, 1.91]}
        rotation={[0.35, -0.13, -1.69]}
        scale={[0.1, 0.08, 0.1]}
      />
      <mesh
        geometry={nodes.Cylinder030.geometry}
        material={nodes.Cylinder030.material}
        position={[-16.21, 1.05, 2.27]}
        rotation={[1.94, -0.12, -1.44]}
        scale={[0.1, 0.06, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder031.geometry}
        material={nodes.Cylinder031.material}
        position={[-16.82, 1.3, 1.93]}
        rotation={[0.4, -0.14, -0.11]}
        scale={[0.03, 0.01, 0.02]}
      />
      <mesh
        geometry={nodes.Cylinder032.geometry}
        material={nodes.Cylinder032.material}
        position={[-17.84, 0.38, 1.52]}
        rotation={[1.39, -0.17, 0.05]}
        scale={[0.07, 0.01, 0.05]}
      />
      <mesh
        geometry={nodes.Cylinder033.geometry}
        material={nodes.Cylinder033.material}
        position={[-17.81, 0.88, 1.93]}
        rotation={[-0.19, -0.05, -1.74]}
        scale={[0.01, 1.09, 0.01]}
      />
      <mesh
        geometry={nodes.Cylinder035.geometry}
        material={nodes.Cylinder035.material}
        position={[-17.24, 1.2, 2.14]}
        rotation={[-0.19, -0.05, -1.74]}
        scale={[0.02, 0.03, 0.02]}
      />
      <mesh
        geometry={nodes.Cylinder036.geometry}
        material={nodes.Cylinder036.material}
        position={[-18.05, -2.74, 1.93]}
        rotation={[1.39, -0.17, -1.52]}
        scale={[0.05, 0.01, 0.05]}
      />
      <mesh
        geometry={nodes.Cylinder037.geometry}
        material={nodes.Cylinder037.material}
        position={[-18.03, -4.68, 1.62]}
        rotation={[2.18, 0.2, -1.16]}
        scale={[0.05, 0.01, 0.05]}
      />
      <mesh
        geometry={nodes.Cylinder038.geometry}
        material={nodes.Cylinder038.material}
        position={[-18.48, -4.65, 1.47]}
        rotation={[2.15, 0.19, 1.99]}
        scale={[0.05, 0.01, 0.05]}
      />
      <mesh
        geometry={nodes.Cylinder039.geometry}
        material={nodes.Cylinder039.material}
        position={[-16.16, 1.22, 1.83]}
        rotation={[1.49, -0.16, -3.07]}
        scale={[0, 0, 0]}
      />
      <mesh
        geometry={nodes.Cylinder042.geometry}
        material={nodes.Cylinder042.material}
        position={[-19, 1.54, 1.67]}
        rotation={[2.95, 0.05, 1.74]}
        scale={[0.11, 0.54, 0.11]}
      />
      <mesh
        geometry={nodes.Cylinder043.geometry}
        material={nodes.Cylinder043.material}
        position={[-19.12, 1.55, 1.66]}
        rotation={[1.28, -0.18, 0.03]}
        scale={[0, 0, 0]}
      />
      <mesh
        geometry={nodes.Cylinder044.geometry}
        material={nodes.Cylinder044.material}
        position={[-17.16, 1.33, 1.78]}
        rotation={[-0.19, -0.05, -1.74]}
        scale={[0.11, 0.09, 0.11]}
      />
      <mesh
        geometry={nodes.Cylinder045.geometry}
        material={nodes.Cylinder045.material}
        position={[-17.13, 1.53, 1.9]}
        rotation={[0.58, -0.16, -0.09]}
        scale={[0.03, 0.01, 0.02]}
      />
      <mesh
        geometry={nodes.Cylinder047.geometry}
        material={materials['Material.002']}
        position={[-17.57, 1.49, 1.33]}
        rotation={[-0.19, -0.05, -0.17]}
        scale={[0.02, 0.02, 0.02]}
      />
      <mesh
        geometry={nodes.Cylinder048.geometry}
        material={nodes.Cylinder048.material}
        position={[-17.58, 1.51, 1.44]}
        rotation={[-0.19, -0.05, -0.17]}
        scale={[0.02, 0.02, 0.02]}
      />
      <mesh
        geometry={nodes.Cylinder049.geometry}
        material={nodes.Cylinder049.material}
        position={[-17.59, 1.53, 1.54]}
        rotation={[-0.19, -0.05, -0.17]}
        scale={[0.02, 0.02, 0.02]}
      />
      <mesh
        geometry={nodes.Cylinder050.geometry}
        material={nodes.Cylinder050.material}
        position={[-17.59, 1.55, 1.64]}
        rotation={[-0.19, -0.05, -0.17]}
        scale={[0.02, 0.02, 0.02]}
      />
      <group position={[-17.56, 1.45, 1.17]} rotation={[-0.19, -0.05, -0.17]} scale={[0.09, 0, 0.06]}>
        <mesh geometry={nodes.Cylinder034_1.geometry} material={nodes.Cylinder034_1.material} />
        <mesh geometry={nodes.Cylinder034_2.geometry} material={materials.Inscriptie} />
      </group>
      <mesh
        geometry={nodes.Cylinder052.geometry}
        material={nodes.Cylinder052.material}
        position={[-17.94, -3.85, 1.89]}
        rotation={[0.03, -0.09, -1.64]}
        scale={[0.01, 1.71, 0.01]}
      />
      <mesh
        geometry={nodes.Cylinder053.geometry}
        material={nodes.Cylinder053.material}
        position={[-17.92, -3.64, 1.88]}
        rotation={[0, -0.45, -1.65]}
        scale={[0.01, 1.29, 0.01]}
      />
      <mesh
        geometry={nodes.Cylinder054.geometry}
        material={nodes.Cylinder054.material}
        position={[-18.95, -4.71, 1.87]}
        rotation={[0, -0.45, -1.65]}
        scale={[0.01, 0.85, 0.01]}
      />
      <mesh
        geometry={nodes.Cylinder055.geometry}
        material={nodes.Cylinder055.material}
        position={[-17.56, -5.52, 1.11]}
        rotation={[0.7, -0.4, -1.35]}
        scale={[0.07, 0.02, 0.07]}
      />
      <mesh
        geometry={nodes.Plane001.geometry}
        material={nodes.Plane001.material}
        position={[-17.13, 1.4, 1.67]}
        rotation={[1.84, -0.13, -3.02]}
        scale={[0.1, 0.15, 0.15]}
      />
      <mesh
        geometry={nodes.Torus.geometry}
        material={nodes.Torus.material}
        position={[-18.97, -5.49, 2.42]}
        rotation={[-0.19, -0.05, -1.74]}
        scale={[0.71, 1.06, 0.69]}
      />
      <mesh
        geometry={nodes.Torus001.geometry}
        material={nodes.Torus001.material}
        position={[-15.42, -5.49, -2.63]}
        rotation={[0, -0.45, -1.65]}
        scale={[0.71, 1, 0.74]}
      />
      <mesh
        geometry={nodes.Torus003.geometry}
        material={nodes.Torus003.material}
        position={[-18.83, -5.11, 1.93]}
        rotation={[-0.66, 0.03, -1.75]}
        scale={[0.86, 1.26, 0.84]}
      />
      <mesh
        geometry={nodes.Torus004.geometry}
        material={materials.Claxon}
        material-color={snap.items.Claxon}
        position={[-17.13, 1.53, 1.91]}
        rotation={[0.58, -0.16, -0.09]}
        scale={[0.15, 0.14, 0.11]}
      />
      <mesh
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[-15.13, -5.32, -2.35]}
        rotation={[0, -0.45, -0.08]}
        scale={[0.02, 0.06, 0.19]}
      />
      <mesh
        geometry={nodes.Cylinder005.geometry}
        material={nodes.Cylinder005.material}
        position={[-15.03, -5.16, -2.44]}
        rotation={[-0.09, -0.03, -1.23]}
        scale={[0.02, 0.01, 0.02]}
      />
      <mesh
        geometry={nodes.Cylinder006.geometry}
        material={materials['Disc frana']}
        position={[-15.14, -5.51, -2.53]}
        rotation={[0, -0.45, -1.65]}
        scale={[0.36, 0.01, 0.37]}
      />
      <mesh
        geometry={nodes.Cylinder007.geometry}
        material={nodes.Cylinder007.material}
        position={[-15.49, -5.49, -2.65]}
        rotation={[0, -0.45, -1.65]}
        scale={[0.13, 0.2, 0.13]}
      />
      <mesh
        geometry={nodes.Cylinder008.geometry}
        material={materials.Material}
        position={[-15.19, -5.22, -2.41]}
        rotation={[-0.82, -0.26, -1.95]}
        scale={[0.04, 0.05, 0.04]}
      />
      <mesh
        geometry={nodes.Cylinder009.geometry}
        material={materials['Metal 2.001']}
        position={[-15.11, -5.22, -2.38]}
        rotation={[0.46, -0.44, -1.45]}
        scale={[0.07, 0.09, 0.08]}
      />
      <mesh
        geometry={nodes.Cylinder010.geometry}
        material={nodes.Cylinder010.material}
        position={[-15.04, -5.24, -2.37]}
        rotation={[1.57, -0.09, -1.12]}
        scale={[0.03, 0.04, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder011.geometry}
        material={nodes.Cylinder011.material}
        position={[-15.1, -5.13, -2.35]}
        rotation={[1.6, -0.07, 0.45]}
        scale={[0.02, 0.02, 0.01]}
      />
      <mesh
        geometry={nodes.Cylinder012.geometry}
        material={nodes.Cylinder012.material}
        position={[-15.12, -5.51, -2.52]}
        rotation={[1.32, -0.2, -1.16]}
        scale={[0.02, 0.02, 0.02]}
      />
      <mesh
        geometry={nodes.Cylinder013.geometry}
        material={nodes.Cylinder013.material}
        position={[-15.01, -5.19, -2.5]}
        rotation={[1.6, -0.07, 0.45]}
        scale={[0, 0.15, 0]}
      />
      <mesh
        geometry={nodes.Cylinder014.geometry}
        material={nodes.Cylinder014.material}
        position={[-15.36, -5.3, -2.01]}
        rotation={[1.6, -0.07, 0.45]}
        scale={[0.01, 0.47, 0.01]}
      />
      <group position={[-15.12, -5.54, -2.24]} rotation={[0, -0.45, -1.65]} scale={[0.09, 0.05, 0.1]}>
        <mesh geometry={nodes.Cylinder016_1.geometry} material={nodes.Cylinder016_1.material} />
        <mesh geometry={nodes.Cylinder016_2.geometry} material={nodes.Cylinder016_2.material} />
      </group>
      <group position={[-16.06, -5.49, -2.55]} rotation={[0, -0.45, 1.49]} scale={[0.09, 0.05, 0.1]}>
        <mesh geometry={nodes.Cylinder017_1.geometry} material={nodes.Cylinder017_1.material} />
        <mesh geometry={nodes.Cylinder017_2.geometry} material={nodes.Cylinder017_2.material} />
      </group>
      <mesh
        geometry={nodes.Cylinder017.geometry}
        material={materials['Material.003']}
        position={[-14.88, -5.02, -3.32]}
        rotation={[-1.02, -0.18, -0.42]}
        scale={[0.07, 0.01, 0.03]}
      />
      <mesh
        geometry={nodes.Cylinder034.geometry}
        material={nodes.Cylinder034.material}
        position={[-15.79, -5.47, -1.15]}
        rotation={[2.01, 0.13, -1.13]}
        scale={[0.03, 0.04, 0.03]}
      />
      <group position={[-18.53, -5.28, 2.4]} rotation={[1.39, -0.21, -1.52]} scale={[0.09, 0.05, 0.1]}>
        <mesh geometry={nodes.Cylinder094.geometry} material={nodes.Cylinder094.material} />
        <mesh geometry={nodes.Cylinder094_1.geometry} material={nodes.Cylinder094_1.material} />
      </group>
      <group position={[-19.28, -5.19, 2.35]} rotation={[1.38, -0.13, 1.62]} scale={[0.09, 0.05, 0.1]}>
        <mesh geometry={nodes.Cylinder095.geometry} material={nodes.Cylinder095.material} />
        <mesh geometry={nodes.Cylinder095_1.geometry} material={nodes.Cylinder095_1.material} />
      </group>
      <mesh
        geometry={nodes.Cylinder046.geometry}
        material={nodes.Cylinder046.material}
        position={[-17.13, 1.41, 1.69]}
        rotation={[2.37, -0.01, -2.97]}
        scale={[0.02, 0.01, 0.01]}
      />
      <mesh
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
        position={[-15.04, -5.22, -2.39]}
        rotation={[-0.82, -0.26, -1.95]}
        scale={[0.13, 0.06, 0.06]}
      />
      <mesh
        geometry={nodes.Torus006.geometry}
        material={materials['Material.004']}
        position={[-14.88, -5.02, -3.32]}
        rotation={[-1.02, -0.18, -0.43]}
        scale={[0.05, 0.04, 0.05]}
      />
    </group>
  )
}


function Picker() {
  const snap = useSnapshot(state)
  return (
    <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1>{snap.current}</h1>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Suspense fallback={null}>
          <Kup enableZoom />
          <Environment preset="city" />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
      <Picker />
    </>
  )
}
