"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { cn } from "@/lib/utils"

/**
 * Snake-themed WebGL Shader Background
 * Renders an animated snake-like slithering pattern as a full-screen background
 * 
 * @param {string} className - Additional CSS classes
 * @param {number} opacity - Background opacity (0-1), default 0.6
 * @param {number} speed - Animation speed multiplier, default 1.0
 * @param {string} colorStart - Gradient start color (hex), default brand emerald
 * @param {string} colorEnd - Gradient end color (hex), default brand teal
 */
export function WebGLShader({
    className = "",
    opacity = 0.6,
    speed = 1.0,
    colorStart = "#10B981",
    colorEnd = "#06B6D4"
}) {
    const canvasRef = useRef(null)
    const sceneRef = useRef({
        scene: null,
        camera: null,
        renderer: null,
        mesh: null,
        uniforms: null,
        animationId: null
    })

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const { current: refs } = sceneRef

        // Convert hex colors to RGB for shader
        const hexToRGB = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result ? {
                r: parseInt(result[1], 16) / 255,
                g: parseInt(result[2], 16) / 255,
                b: parseInt(result[3], 16) / 255
            } : { r: 0.06, g: 0.73, b: 0.51 }
        }

        const startColor = hexToRGB(colorStart)
        const endColor = hexToRGB(colorEnd)

        // Vertex shader - creates snake-like wave displacement
        const vertexShader = `
      precision mediump float;
      attribute vec3 position;
      varying vec2 vUv;
      
      void main() {
        vUv = position.xy * 0.5 + 0.5;
        gl_Position = vec4(position, 1.0);
      }
    `

        // Fragment shader - snake scales and slithering pattern
        const fragmentShader = `
      precision mediump float;
      
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;
      uniform vec3 colorStart;
      uniform vec3 colorEnd;
      uniform float opacity;
      
      varying vec2 vUv;
      
      // Simplex noise function for organic patterns
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                         + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                                 dot(x12.zw, x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      void main() {
        vec2 uv = vUv;
        float aspect = resolution.x / resolution.y;
        
        // Snake body wave - primary slithering motion
        float snakeWave = sin(uv.y * 6.0 * yScale + time * 2.0) * 0.08;
        snakeWave += sin(uv.y * 3.0 * yScale - time * 1.5) * 0.04;
        
        // Add horizontal undulation
        float horizontalWave = sin(uv.x * 4.0 * xScale + time * 1.2) * 0.03;
        
        // Apply distortion to UV
        vec2 distortedUV = uv;
        distortedUV.x += snakeWave * distortion * 3.0;
        distortedUV.y += horizontalWave * distortion * 2.0;
        
        // Snake scale pattern using noise
        float scalePattern = snoise(distortedUV * 25.0 + time * 0.3);
        scalePattern = scalePattern * 0.5 + 0.5;
        
        // Create hexagonal scale-like cells
        float scales = sin(distortedUV.x * 50.0) * sin(distortedUV.y * 50.0);
        scales = scales * 0.5 + 0.5;
        scales = pow(scales, 0.5);
        
        // Combine scale patterns
        float pattern = mix(scalePattern, scales, 0.4);
        
        // Moving snake body curves
        float bodyLine = sin(uv.x * 3.14159 * 2.0 + snakeWave * 5.0 + time);
        bodyLine = smoothstep(0.3, 0.7, bodyLine);
        
        // Multiple snake curves across the canvas
        float snakeBodies = 0.0;
        for (float i = 0.0; i < 3.0; i++) {
          float offset = i * 0.33;
          float yPos = mod(uv.y + offset + time * 0.1, 1.0);
          float curve = sin(uv.x * 8.0 + time * (1.5 + i * 0.3) + i * 2.0) * 0.15;
          float body = smoothstep(0.08, 0.0, abs(yPos - 0.5 + curve));
          snakeBodies += body * (0.5 + i * 0.2);
        }
        
        // Color gradient along snake body
        vec3 snakeColor = mix(colorStart, colorEnd, distortedUV.x + sin(time * 0.5) * 0.2);
        
        // Add subtle shimmer
        float shimmer = snoise(distortedUV * 40.0 - time * 2.0) * 0.15;
        snakeColor += shimmer;
        
        // Combine everything
        float intensity = pattern * 0.3 + snakeBodies * 0.7;
        intensity = clamp(intensity, 0.0, 1.0);
        
        // Background gradient
        vec3 bgGradient = mix(colorStart * 0.1, colorEnd * 0.15, uv.y);
        
        // Final color composition
        vec3 finalColor = mix(bgGradient, snakeColor, intensity);
        
        // Add subtle glow around snake bodies
        finalColor += snakeBodies * colorStart * 0.3;
        
        gl_FragColor = vec4(finalColor, opacity * (0.5 + intensity * 0.5));
      }
    `

        const initScene = () => {
            refs.scene = new THREE.Scene()
            refs.renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: true
            })
            refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            refs.renderer.setClearColor(0x000000, 0)
            refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

            refs.uniforms = {
                resolution: { value: [window.innerWidth, window.innerHeight] },
                time: { value: 0.0 },
                xScale: { value: 1.0 },
                yScale: { value: 0.5 },
                distortion: { value: 0.05 },
                colorStart: { value: [startColor.r, startColor.g, startColor.b] },
                colorEnd: { value: [endColor.r, endColor.g, endColor.b] },
                opacity: { value: opacity }
            }

            // Full screen quad
            const positions = new Float32Array([
                -1, -1, 0,
                1, -1, 0,
                1, 1, 0,
                -1, -1, 0,
                1, 1, 0,
                -1, 1, 0
            ])

            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

            const material = new THREE.RawShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: refs.uniforms,
                side: THREE.DoubleSide,
                transparent: true,
                blending: THREE.NormalBlending
            })

            refs.mesh = new THREE.Mesh(geometry, material)
            refs.scene.add(refs.mesh)
            handleResize()
        }

        const animate = () => {
            if (refs.uniforms && !prefersReducedMotion) {
                refs.uniforms.time.value += 0.01 * speed
            }
            if (refs.renderer && refs.scene && refs.camera) {
                refs.renderer.render(refs.scene, refs.camera)
            }
            refs.animationId = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            const width = window.innerWidth
            const height = window.innerHeight

            if (refs.renderer) {
                refs.renderer.setSize(width, height)
            }
            if (refs.uniforms) {
                refs.uniforms.resolution.value = [width, height]
            }
        }

        initScene()
        animate()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            if (refs.animationId) {
                cancelAnimationFrame(refs.animationId)
            }
            if (refs.renderer) {
                refs.renderer.dispose()
            }
            if (refs.mesh) {
                refs.mesh.geometry.dispose()
                refs.mesh.material.dispose()
            }
        }
    }, [opacity, speed, colorStart, colorEnd])

    return (
        <canvas
            ref={canvasRef}
            className={cn(
                "fixed top-0 left-0 w-full h-full block pointer-events-none",
                className
            )}
            style={{ zIndex: 0 }}
            aria-hidden="true"
        />
    )
}

export default WebGLShader
