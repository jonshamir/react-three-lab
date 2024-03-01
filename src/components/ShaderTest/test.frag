// #extension GL_OES_standard_derivatives : enable

precision mediump float;

varying vec2 vUv;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);

// Pi, the ratio of a circle's circumference to its diameter.
const float M_PI = 3.14159265358979323846264338327950288;
// Pi divided by two (pi/3)
const float M_PI_3 = 1.0471975512;


float sdCircle(in vec2 p, in float r) 
{
    return length(p) - r;
}

float circle(in vec2 p)
{
    float d = length(p - vec2(0.5, 0.5));
    float baseRadius = 0.1;
    float pixelRadius = fwidth(d) * 0.5;
    float radius = max(baseRadius, pixelRadius * 2.0);
    return (1.0 - smoothstep(radius - pixelRadius, radius + pixelRadius, d)) * (baseRadius / radius);
}


void main() {
    float n = 30.0;
    vec2 uv = vUv;

    uv = vec2(fract(uv.x * n), fract(uv.y * n));
    
	  float c = circle(uv);
    vec3 color = vec3(c) * 0.7 + 0.1;    

    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(uv, 0.0, 1.0);
}