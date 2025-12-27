"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Card(props) {
  const ref = useRef();

  // Ajusta el path si tu modelo está en otro lugar
  // Si no usas GLTF, dime y lo simplifico
  const { scene } = useGLTF("/lanyard/card.glb");

  useFrame(() => {
    // Si necesitas animación aquí, va bien.
    // Lo dejo neutro para que NO rompa nada.
    if (!ref.current) return;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      {...props}
    />
  );
}

useGLTF.preload("/lanyard/card.glb");
