import { useMemo, useRef } from "react";
import { Mesh } from "three";
import { useControls } from "leva";

import vertexShader from "./basic.vert";
import fragmentShader from "./test.frag";
import { useFrame } from "@react-three/fiber";

interface ShaderTestProps {
  position: [number, number, number];
}

export function ShaderTest(props: ShaderTestProps) {
  const meshRef = useRef<Mesh>(null!);

  const controls = useControls({
    u_radius: { value: 0.5, min: 0, max: 1, step: 0.01 },
  });

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_radius: {
        value: controls.u_radius,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();
    meshRef.current.material.uniforms.u_radius.value = controls.u_radius;
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
