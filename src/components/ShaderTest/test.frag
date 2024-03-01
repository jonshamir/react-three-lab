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

float circle(in vec2 p, in float mouseDist)
{
    float circleRadius = 0.005 + 0.06 * mouseDist;
    float pixelRadius = 0.01;// fwidth(length(p));
    float radius = max(circleRadius, pixelRadius * 2.);
    float d = sdCircle(p - vec2(0.5, 0.5), radius);
	return (1.0 - smoothstep(0.0, 0.1, d)) * (circleRadius / radius);
}

vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, s, -s, c);
	return m * v;
}

void main() {
    float n = 10.0;
    vec2 uv = vUv;
    vec2 mousePos = vec2(0.0, 0.0);
    float mouseDist = 1.0 - smoothstep(0.0, 1.0, distance(mousePos, uv) * 1.5);

    uv = vec2(fract(uv.x * n), fract(uv.y * n));
    
	  float c = circle(uv, mouseDist);
    vec3 color = vec3(c) * 0.7 + 0.1;    

    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(uv, 0.0, 1.0);
}