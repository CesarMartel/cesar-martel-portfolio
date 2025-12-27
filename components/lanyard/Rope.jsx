import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export default function Rope() {
  const texture = useLoader(THREE.TextureLoader, "/lanyard/lanyard.png");
  const mesh = useRef();

  useFrame((state) => {
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.15 + 1.1;
    mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.9) * 0.04;
  });

  return (
    <mesh ref={mesh} position={[0, 1.1, 0]}>
      <planeGeometry args={[0.28, 3.6]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  );
}
