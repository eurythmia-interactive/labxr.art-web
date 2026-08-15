uniform float uTime;
uniform vec2 uMouse;
uniform float uPixelRatio;

attribute float aScale;

varying float vAlpha;

void main() {
  vec3 pos = position;
  
  // Wave motion based on time
  pos.y += sin(pos.x * 2.0 + uTime * 0.5) * 0.1;
  pos.x += cos(pos.y * 2.0 + uTime * 0.3) * 0.1;
  
  // Mouse repulsion
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vec2 screenPos = mvPosition.xy / mvPosition.z;
  vec2 mouseDir = screenPos - uMouse;
  float mouseDist = length(mouseDir);
  float mouseInfluence = smoothstep(0.5, 0.0, mouseDist);
  
  pos.xy += normalize(mouseDir) * mouseInfluence * 0.3;
  
  // Calculate final position
  vec4 finalPosition = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_Position = finalPosition;
  
  // Point size with pixel ratio
  gl_PointSize = aScale * 8.0 * uPixelRatio;
  gl_PointSize *= (1.0 / -mvPosition.z);
  
  // Alpha based on distance from center
  float distFromCenter = length(pos.xy);
  vAlpha = smoothstep(3.0, 0.0, distFromCenter) * 0.8;
}
