import { Canvas } from "@react-three/fiber";
import styled from "@emotion/styled";
import { Environment, OrbitControls } from "@react-three/drei";
import { ShaderTest } from "../ShaderTest/ShaderTest";

const Canvas3DContainer = styled.div`
  width: 80vw;
  height: 80vw;
  background-color: white;
`;

export function Canvas3D() {
  return (
    <Canvas3DContainer>
      <Canvas
        camera={{ fov: 45, position: [0, 0, -3] }}
        gl={{ antialias: false }}
      >
        <OrbitControls position={[1, 0, 0]} />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <ShaderTest position={[0, 0, 0]} />
        <Environment preset="city" />
      </Canvas>
    </Canvas3DContainer>
  );
}
