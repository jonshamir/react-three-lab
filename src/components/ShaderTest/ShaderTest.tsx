import { useRef } from "react";
import { Mesh } from "three";

import vertexShader from "./basic.vert";
import fragmentShader from "./test.frag";

interface ShaderTestProps {
  position: [number, number, number];
}

export function ShaderTest(props: ShaderTestProps) {
  const meshRef = useRef<Mesh>(null!);

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}
