varying float vAlpha;

void main() {
  // Circular point with soft edges
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);
  float alpha = smoothstep(0.5, 0.2, dist) * vAlpha;
  
  // LabXR primary accent color (#00d4ff)
  vec3 color = vec3(0.0, 0.831, 1.0);
  
  gl_FragColor = vec4(color, alpha);
}
