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
    u_radius: { value: 0.3, min: 0, max: 1, step: 0.01 },
    u_scale: { value: 20, min: 1, max: 100, step: 1 },
  });

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_radius: {
        value: controls.u_radius,
      },
      u_scale: {
        value: controls.u_scale,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    const t = clock.getElapsedTime();
    meshRef.current.material.uniforms.u_time.value = t;
    meshRef.current.material.uniforms.u_radius.value = controls.u_radius;
    meshRef.current.material.uniforms.u_scale.value = controls.u_scale;
    // meshRef.current.rotateY(0.001);
    // meshRef.current.rotateX(-0.0005);
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
