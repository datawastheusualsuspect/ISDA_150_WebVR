# Benevolence VR Experience

A calming, interactive Virtual Reality experience about kindness and restoration built with A-Frame. Guide the world through seven transformative scenes as you perform acts of benevolence.

## 🌍 Live Demo

Visit the live demo: **[Benevolence VR Experience](https://yourusername.github.io/WebVR-AFrame/)**

*(Replace `yourusername` with your GitHub username after deploying)*

## 🎮 Features

- **7 Interactive Scenes**: Each scene presents a unique act of kindness
- **Progressive Color Transformation**: World transitions from monochrome to vibrant as you help
- **3D Interactive Elements**: Click-based interactions with depth and animations
- **User Testing Integration**: Built-in questionnaire system for gathering feedback
- **VR & Desktop Support**: Works in VR headsets and on desktop browsers
- **Responsive Design**: Optimized for both seated and standing play

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation & Running

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/WebVR-AFrame.git
cd WebVR-AFrame

# 2. Install dependencies
npm install

# 3. Start the development server
npm run serve

# 4. Open in browser
npm run open
```

The application will be available at `http://localhost:8080`

## 🌐 Deploying to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to your repository settings on GitHub
3. Navigate to **Settings → Pages**
4. Under "Source", select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**

Your site will be live at: `https://yourusername.github.io/WebVR-AFrame/`

### Option 2: Manual Deployment

1. Build and test locally
2. Push to GitHub
3. Enable GitHub Pages in repository settings

## 📋 Project Structure

```
WebVR-AFrame/
├── index.html              # Main VR experience
├── scenes.js               # Scene manager and questionnaire system
├── Images/                 # Scene concept art
│   ├── Scene_1.png
│   ├── Scene_2.png
│   └── ...
├── package.json            # Project dependencies
└── README.md               # This file
```

## 🎯 How to Play

1. **Scene 1 - The First Spark**: Click the sapling to awaken it with light
2. **Scene 2 - Windowbox Flower**: Throw the glowing seed to the planter
3. **Scene 3 - A Gentle Offering**: Give water to the thirsty dog
4. **Scene 4 - Clearing the Waters**: Click the sludge 5 times to purify it
5. **Scene 5 - The Harmony Bell**: Ring the bell to unite the figures
6. **Scene 6 - The Shared Lantern**: Share your light with the traveler
7. **Scene 7 - The World Reborn**: Witness the transformed world

## 🎧 Browser Support

- **Desktop**: Chrome, Edge, Firefox, Safari
- **VR**: Chrome/Edge with WebXR support + VR headset (Meta Quest, HTC Vive, etc.)
- **Mobile**: Limited support (best on desktop)

## 📊 User Testing

The application includes an integrated questionnaire system that appears alongside each scene. Responses are collected in the browser console and can be exported for analysis.

## 🛠️ Technologies Used

- **A-Frame**: WebXR framework built on Three.js
- **JavaScript**: Vanilla JS for scene management and interactions
- **HTML5**: Semantic markup
- **CSS**: Inline styling for UI elements

## 📝 Notes

- This project uses A-Frame via CDN, so there's no build step required
- All assets are loaded from the `Images/` directory
- The experience is fully self-contained in static files (no backend needed)
- For best VR experience, use a WebXR-compatible browser with a VR headset

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest improvements
- Submit pull requests

## 📄 License

This project is open source. See LICENSE file for details.

## 👨‍💻 Author

Created as an ISDA150 project exploring kindness and restoration in immersive experiences.
