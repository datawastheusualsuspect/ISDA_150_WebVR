# Image Integration Guide

## Overview

The Benevolence VR experience now integrates beautiful concept art images from the `/Images` directory as background planes for each scene. These images provide visual context and atmosphere while users interact with the scene elements.

## Image Files Used

Each scene displays a corresponding concept art image:

- **Scene 1: The First Spark** → `Images/Scene_1.png`
  - Shows glowing hands nurturing a small sapling with green leaves
  - Monochrome background with warm golden light
  
- **Scene 2: Windowbox Flower** → `Images/Scene_2.png`
  - Depicts hands throwing a glowing seed toward a planter
  - Sad figure visible in window with warm light
  
- **Scene 3: A Gentle Offering** → `Images/Scene_3.png`
  - Shows hands offering water to a dog
  - Transition from gray to warmer tones
  
- **Scene 4: Clearing the Waters** → `Images/Scene_4.png`
  - Hands clearing dark sludge from water
  - Clear blue water and green vegetation emerging
  
- **Scene 5: The Harmony Bell** → `Images/Scene_5.png`
  - Bell with golden light and figures
  - Warm tones dominating the scene
  
- **Scene 6: The Shared Lantern** → `Images/Scene_6.png`
  - Hands sharing light between lanterns
  - Dark atmosphere with focal light
  
- **Scene 7: The World Reborn** → `Images/Scene_7.png`
  - Panoramic view of healed, colorful world
  - Vibrant greens, blues, and natural colors

## Technical Implementation

### Background Plane Setup

Each scene creates a background plane positioned at `(0, 1, -5)` with dimensions:
- **Width**: 10 units
- **Height**: 7.5 units (maintains aspect ratio)
- **Material**: Flat shader with image texture

```javascript
const bgPlane = document.createElement('a-plane');
bgPlane.setAttribute('position', '0 1 -5');
bgPlane.setAttribute('rotation', '0 0 0');
bgPlane.setAttribute('width', '10');
bgPlane.setAttribute('height', '7.5');
bgPlane.setAttribute('material', 'src: url(Images/Scene_X.png); shader: flat');
container.appendChild(bgPlane);
```

### Layering

The background planes are added first to the scene container, ensuring interactive elements (buttons, objects) appear in front of the images.

### Performance Considerations

- Images are loaded on-demand as each scene is displayed
- Previous scene images are unloaded when transitioning
- Flat shader minimizes lighting calculations
- Images are positioned far enough back (z: -5) to not interfere with interactions

## Visual Hierarchy

1. **Background Plane** (z: -5) - Concept art image
2. **Interactive Objects** (z: -3 to -1) - Clickable scene elements
3. **UI Text** (z: -3) - Scene instructions and guidance
4. **Camera** (z: 0) - User viewpoint

## Color Progression

The images naturally show the color progression from monochrome to vibrant:

- **Scenes 1-2**: Mostly grayscale with warm golden accents
- **Scenes 3-4**: Gradual introduction of greens and blues
- **Scenes 5-6**: Warm golden and cool blue tones
- **Scene 7**: Full vibrant color palette

This aligns with the `colorProgress` system that also adjusts:
- Sky gradient transitions
- Lighting intensity
- Interactive element colors

## Customization

To use different images:

1. Place new images in the `Images/` directory
2. Update the scene function to reference the new image:
   ```javascript
   bgPlane.setAttribute('material', 'src: url(Images/YourImage.png); shader: flat');
   ```

To adjust image positioning:
- Modify `position` attribute for depth/height
- Adjust `width` and `height` for scale
- Change `rotation` for orientation

## Browser Compatibility

- Works in all modern browsers supporting A-Frame
- Image formats supported: PNG, JPG, WebP
- CORS: Images loaded from local filesystem (no CORS issues)

## Performance Tips

- Keep images under 3MB for optimal loading
- Use PNG for transparency, JPG for photographs
- Consider image resolution (1024x768 minimum recommended)
- Test on target VR devices for performance

## Future Enhancements

- Parallax scrolling effect on background images
- Animated image transitions between scenes
- Image-based lighting (using images as light sources)
- 360° panoramic images for immersive scenes
- Dynamic image blending during color transitions
