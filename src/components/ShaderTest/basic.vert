// attribute vec3 position;
// attribute vec3 normal;

// uniform vec2 uv;
// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
