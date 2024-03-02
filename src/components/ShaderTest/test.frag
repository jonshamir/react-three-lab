// #extension GL_OES_standard_derivatives : enable

precision mediump float;

varying vec2 vUv;
uniform float u_scale;
uniform float u_time;
uniform float u_radius;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);

const float PI = 3.14159265358979323846264338327950288;
const float SQRT_2 = 1.4142135623730;

float ddLength(float a)
{
  return length(vec2(dFdx(a), dFdy(a)));
}

vec2 ddLength(vec2 a)
{
  return vec2(
    length(vec2(dFdx(a.x), dFdy(a.x))),
    length(vec2(dFdx(a.y), dFdy(a.y)))
  );
}

float circle(in vec2 uv)
{
    vec2 targetRadius = vec2(u_radius);
    vec2 dist = vec2(length(uv - vec2(0.5, 0.5)));
    vec2 uvDeriv = ddLength(dist);
    // vec2 drawRadius = max(targetRadius, uvDeriv * 2.0);
    vec2 drawRadius = clamp(targetRadius, uvDeriv, vec2(SQRT_2));
    vec2 radiusAA = uvDeriv * 1.5;
    vec2 circle2 = smoothstep(drawRadius - radiusAA, drawRadius + radiusAA, dist);
    float circle = mix(circle2.x, 1.0, circle2.y);
    circle = 1.0 - circle; // Invert the circle
    //circle *= clamp(targetRadius / drawRadius, 0.0, 1.0); // Correct for the difference in area
    return circle;
}


void main() {
    float n = u_scale;
    vec2 uv = vUv;

    uv = vec2(fract(uv.x * n), fract(uv.y * n));
    
	float c = circle(uv);
    vec3 color = vec3(c);
    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(uv, 0.0, 1.0);
}