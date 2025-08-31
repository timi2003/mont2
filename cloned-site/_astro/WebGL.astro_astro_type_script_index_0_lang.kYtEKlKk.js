import {a as t, E as a} from "./GlobalApp.CGTlQdR2.js";
import "./index.Brfk6Bdo.js";
import "./ScrollTrigger.6qCihK2t.js";
import "./router.B-sij-_X.js";
import "./visitedNews.BmN7K1ri.js";

// Import GSAP and ScrollTrigger for scroll animations
import { g as gsap } from "./index.Brfk6Bdo.js";
import { S as ScrollTrigger } from "./ScrollTrigger.6qCihK2t.js";

const o = document.querySelector("#canvas-wrapper");
const r = o.querySelector("canvas");

await t.init(o, r);
t.state.emit(a.ATTACH);
t.state.emit(a.RESIZE, t.tools?.viewport.infos);

// Function to create and append a video element
function createBackgroundVideo(src, opacity = 1, blendMode = 'normal', zIndex = -1) {
  const video = document.createElement('video');
  video.src = src;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.style.position = 'fixed';
  video.style.top = '0';
  video.style.left = '0';
  video.style.width = '100%';
  video.style.height = '100%';
  video.style.objectFit = 'cover';
  video.style.zIndex = zIndex.toString();
  video.style.opacity = opacity.toString();
  video.style.mixBlendMode = blendMode;
  video.style.visibility = 'hidden'; // Hide until loaded
  document.body.appendChild(video);

  // Handle potential autoplay issues
  video.play().catch(error => {
    console.warn('Video autoplay failed:', error);
    // Fallback: Retry play after user interaction
    document.addEventListener('click', () => {
      video.play().catch(err => console.warn('Retry play failed:', err));
    }, { once: true });
  });

  // Optimize for performance and prevent flicker
  video.addEventListener('loadeddata', () => {
    video.style.visibility = 'visible';
  });

  // Optimize video decoding for performance
  video.setAttribute('preload', 'auto');
  video.setAttribute('webkit-playsinline', 'true'); // iOS compatibility

  return video;
}

// Function to handle resize for both videos
function handleResize(smokeVideo, waterVideo) {
  if (smokeVideo && waterVideo) {
    smokeVideo.style.width = '100%';
    smokeVideo.style.height = '100%';
    waterVideo.style.width = '100%';
    waterVideo.style.height = '100%';
  }
}

// Function to setup video animations
function setupVideoAnimations(smokeVideo, waterVideo) {
  gsap.registerPlugin(ScrollTrigger);

  // Animation timeline with smoke dominant at top, both together in middle, water dominant at bottom
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const progress = self.progress;
      // Smoke: starts at full opacity, fades out slightly toward bottom
      // Water: starts at 0, peaks at 0.5 in middle, increases to 0.9 at bottom
      const smokeOpacity = 1 - (progress * 0.4); // Smoke fades from 1 to 0.6
      const waterOpacity = progress < 0.5 ? progress : 0.5 + (progress - 0.5) * 0.8; // Water from 0 to 0.5, then to 0.9
      gsap.set(smokeVideo, { opacity: smokeOpacity });
      gsap.set(waterVideo, { opacity: waterOpacity });
    },
    onRefresh: () => {
      // Ensure videos are resized on ScrollTrigger refresh
      handleResize(smokeVideo, waterVideo);
    }
  });
}

// Initialize videos and animations on page load
function initializeVideos() {
  // Create videos
  const smokeVideo = createBackgroundVideo('/assets/video/smokehill.mp4', 1, 'normal', -2);
  const waterVideo = createBackgroundVideo('/assets/video/water.mp4', 0, 'overlay', -1); // Start with opacity 0

  // Handle resize
  const resizeHandler = () => handleResize(smokeVideo, waterVideo);
  window.addEventListener('resize', resizeHandler);
  handleResize(smokeVideo, waterVideo); // Initial resize

  // Setup animations
  setupVideoAnimations(smokeVideo, waterVideo);

  // Return cleanup function
  return () => {
    smokeVideo.remove();
    waterVideo.remove();
    window.removeEventListener('resize', resizeHandler);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}

// Ensure videos are initialized on every page load
document.addEventListener('astro:page-load', () => {
  // Initialize videos and store cleanup function
  const cleanup = initializeVideos();

  // Store cleanup function in a global variable to ensure it’s accessible during cleanup
  window.__videoCleanup = cleanup;
});

// Cleanup on page transitions to prevent duplication and ensure re-rendering
document.addEventListener('astro:before-preparation', () => {
  // Call the stored cleanup function if it exists
  if (window.__videoCleanup) {
    window.__videoCleanup();
    delete window.__videoCleanup;
  }
  // Clear any remaining ScrollTrigger instances
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});

// Handle iOS WebView and viewport issues
if (window.__vite__mapDeps) {
  const Il = window.__vite__mapDeps(["_astro/GlobalApp.CGTlQdR2.js"]).Nn;
  const appInstance = Il.getInstance();
  if (appInstance.isWebview) {
    // Adjust for iOS WebView dynamic viewport height
    document.documentElement.style.setProperty('--lvh', `${appInstance.lvh * 0.01}px`);
    document.documentElement.style.setProperty('--svh', `${appInstance.svh * 0.01}px`);
  }
}