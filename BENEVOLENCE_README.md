# Benevolence VR Experience

A calming, interactive VR experience built with A-Frame that guides users through 7 scenes of kindness and restoration.

## Overview

This implementation brings the Benevolence design document to life as a fully interactive VR experience. Users progress through a linear narrative where their benevolent actions gradually transform the world from monochrome to vibrant color.

## Architecture

### Files

- **index.html** - Main A-Frame scene setup with camera, lighting, and scene container
- **scenes.js** - Scene manager and all 7 scene implementations

### Key Features

- **Scene Manager** - Dynamically loads and manages transitions between 7 scenes
- **Color Progression** - World gradually transitions from grayscale to vibrant color as user progresses
- **Interactive Elements** - Click-based interactions for all scenes (mouse or VR controllers)
- **Dynamic Lighting** - Lighting intensity increases as color is restored
- **Responsive Sky** - Sky transitions from monochrome to colorful gradient

## The 7 Scenes

### Scene 1: The First Spark
- **Goal**: Learn the benevolent touch mechanic
- **Interaction**: Click the sapling leaf to activate it
- **Outcome**: Single green leaf appears, introducing color to the world

### Scene 2: Windowbox Flower
- **Goal**: Understand distant impact of kindness
- **Interaction**: Click the glowing seed to throw it to the planter box
- **Outcome**: Seed travels to planter, sad figure gains warmth

### Scene 3: A Gentle Offering
- **Goal**: Learn patience and trust-building
- **Interaction**: Click the water bowl to give it to the dog
- **Outcome**: Dog receives water, gains color

### Scene 4: Clearing the Waters
- **Goal**: Experience large-scale environmental impact
- **Interaction**: Click the sludge repeatedly (5 times) to clear it
- **Outcome**: Water gradually transitions from dark to clear blue

### Scene 5: The Harmony Bell
- **Goal**: Solve a puzzle to mend social division
- **Interaction**: Click the bell to ring it
- **Outcome**: Bell rings, gray figures transform into diverse colors

### Scene 6: The Shared Lantern
- **Goal**: Make a conscious choice to share
- **Interaction**: Click your lantern to light the traveler's lantern
- **Outcome**: Light is shared, both lanterns glow

### Scene 7: The World Reborn
- **Goal**: Reflect on cumulative impact
- **Interaction**: Passive observation (no action required)
- **Outcome**: Panoramic view of the healed world with floating colored elements

## Design Principles

### Color Palette
- **Monochrome**: #333333 to #DCDCDC (desaturated grays and blues)
- **Benevolent Light**: #FFD700 (warm gold), #FFF8E7 (soft white)
- **Restored World**: #4A7856 (lush green), #87CEEB (clear blue), #8B4513 (earthy brown)

### Typography
- Headings: Lato Bold
- Body Text: Lato Regular
- UI: Fira Sans

### Interaction Patterns
- Simple click-based interactions
- Gentle animations and transitions
- Clear visual feedback for all actions
- No failure states or time pressure

## Controls

### Desktop
- **Mouse**: Move cursor to look around
- **WASD**: Move forward/backward/left/right
- **Click**: Interact with scene elements
- **Next Scene Button**: Advance to next scene (top-left UI)

### VR Controllers
- **Head Movement**: Look around
- **Trigger/Grip**: Interact with objects
- **Menu Button**: Access scene navigation

## Running the Experience

```bash
npm install
npm start
```

Then open `http://localhost:8080` in your browser.

## Technical Stack

- **A-Frame 1.4.2** - WebXR framework built on Three.js
- **A-Frame Extras** - Additional components and utilities
- **Vanilla JavaScript** - Scene management and interactions
- **SVG Data URIs** - Sky gradients

## Customization

### Modifying Scenes

Edit `scenes.js` to customize:
- Scene positions and layouts
- Colors and materials
- Interaction triggers
- Animation timings

### Adding New Scenes

Add a new function to `window.sceneManager.scenes` array:

```javascript
createSceneX_Name: function() {
  const container = document.getElementById('sceneContainer');
  // Create your scene elements here
  container.appendChild(element);
}
```

## Accessibility Features

- High contrast monochrome sections for color-blind users
- Luminosity changes accompany color transitions
- Gentle, slow interactions (no speed or precision required)
- Clear on-screen text guidance
- Fully playable while seated

## Performance Notes

- Scenes are dynamically created and destroyed for memory efficiency
- Minimal lighting calculations (1 ambient + 1 directional light)
- Simple geometric primitives for fast rendering
- Optimized for both desktop and mobile VR

## Browser Support

- Chrome/Edge (Chromium-based)
- Firefox
- Safari (limited VR support)
- Mobile browsers with WebXR support

## Future Enhancements

- Audio feedback and ambient soundscapes
- Hand gesture recognition for VR controllers
- Particle effects for magical moments
- Haptic feedback integration
- Multiplayer shared experiences
- Save/load scene progress
