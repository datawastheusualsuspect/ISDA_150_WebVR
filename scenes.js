// Scene Manager - handles transitions between 7 scenes
window.sceneManager = {
  currentScene: 0,
  scenes: [],
  colorProgress: 0,
  questionnaires: {},
  
  init: function() {
    this.scenes = [
      this.createScene1_FirstSpark,
      this.createScene2_WindowboxFlower,
      this.createScene3_GentleOffering,
      this.createScene4_ClearingWaters,
      this.createScene5_HarmonyBell,
      this.createScene6_SharedLantern,
      this.createScene7_WorldReborn,
      this.createScene8_LibertyBell
    ];
    this.initializeQuestionnaires();
    this.loadScene(0);
  },
  
  initializeQuestionnaires: function() {
    this.questionnaires = {
      0: [
        { id: 'q1_vr_experience', type: 'multiple', text: 'How would you describe your overall experience level with Virtual Reality?', options: ['Never used VR before', 'Novice (Used VR 1-5 times)', 'Intermediate (Regularly use VR)', 'Expert (Own and use VR frequently)'] },
        { id: 'q2_motion_sickness', type: 'scale', text: 'Did you experience any motion sickness or discomfort during the experience?', min: 1, max: 5, minLabel: 'Not at all uncomfortable', maxLabel: 'Extremely uncomfortable' }
      ],
      1: [
        { id: 'q3_seated_comfort', type: 'scale', text: 'How comfortable was the application to play while seated?', min: 1, max: 5, minLabel: 'Very uncomfortable/difficult', maxLabel: 'Very comfortable/easy' }
      ],
      2: [
        { id: 'q4_design_elements', type: 'scale', text: 'Did the design elements help you understand the experience?', min: 1, max: 5, minLabel: 'Not helpful', maxLabel: 'Very helpful' }
      ],
      3: [
        { id: 'q5_mechanic_clarity', type: 'scale', text: 'How clear was it to understand how to activate your actions?', min: 1, max: 5, minLabel: 'Very unclear', maxLabel: 'Perfectly clear' }
      ],
      4: [
        { id: 'q6_action_ease', type: 'scale', text: 'How easy was it to perform the required actions?', min: 1, max: 5, minLabel: 'Very difficult/Frustrating', maxLabel: 'Effortless and satisfying' }
      ],
      5: [
        { id: 'q7_guidance', type: 'scale', text: 'The in-game guidance (text prompts, sound cues) was clear and helpful.', min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' }
      ],
      6: [
        { id: 'q9_relaxation', type: 'scale', text: 'After completing the experience, I felt relaxed and de-stressed.', min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
        { id: 'q10_agency', type: 'scale', text: 'I felt a strong sense of positive agency over the world\'s transformation.', min: 1, max: 5, minLabel: 'Strongly Disagree', maxLabel: 'Strongly Agree' },
        { id: 'q11_reward', type: 'scale', text: 'The visual transition from gray to vibrant world felt adequately rewarding.', min: 1, max: 5, minLabel: 'Not rewarding', maxLabel: 'Incredibly rewarding' },
        { id: 'q16_emotions', type: 'multiple', text: 'Which emotions best summarize your overall experience? (Select all that apply.)', options: ['Contentment', 'Calmness', 'Hope', 'Awe', 'Curiosity', 'Joy', 'Frustration', 'Sadness', 'Other'] }
      ]
    };
  },

  loadScene: function(index) {
    if (index < 0 || index >= this.scenes.length) return;
    this.currentScene = index;
    const container = document.getElementById('sceneContainer');
    container.innerHTML = '';
    this.scenes[index].call(this);
    this.updateSkyAndLighting();
    this.displayQuestionnaire(index);
  },

  displayQuestionnaire: function(sceneIndex) {
    // Remove any existing questionnaire panel first
    const existingPanel = document.getElementById('questionnairePanel');
    if (existingPanel) {
      existingPanel.remove();
    }
    
    // Add click event delegation
    document.body.addEventListener('click', this.handleQuestionnaireClick);
    const questions = this.questionnaires[sceneIndex];
    if (!questions) return;
    
    const questionnairePanel = document.createElement('div');
    questionnairePanel.id = 'questionnairePanel';
    questionnairePanel.style.cssText = `
      position: fixed;
      right: 10px;
      top: 80px;
      width: 300px;
      max-height: 500px;
      background: rgba(0, 0, 0, 0.85);
      border: 2px solid #FFD700;
      border-radius: 8px;
      padding: 15px;
      color: white;
      font-size: 12px;
      z-index: 100;
      overflow-y: auto;
      font-family: 'Lato', system-ui;
    `;
    
    let html = `<div style="font-weight: bold; margin-bottom: 10px; color: #FFD700;">Scene ${sceneIndex + 1} Feedback</div>`;
    
    questions.forEach((q, idx) => {
      html += `<div style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #444;">`;
      html += `<div style="font-size: 11px; margin-bottom: 6px;">${q.text}</div>`;
      
      if (q.type === 'scale') {
        html += `<div class="scale-options" data-question-id="${q.id}" style="display: flex; justify-content: space-between; gap: 2px;">`;
        for (let i = q.min; i <= q.max; i++) {
          html += `<button data-value="${i}" style="
            flex: 1;
            padding: 4px;
            background: #333;
            color: #FFD700;
            border: 1px solid #FFD700;
            border-radius: 3px;
            cursor: pointer;
            font-size: 10px;
            transition: all 0.2s;
          " onmouseover="this.style.background='#555'" 
             onmouseout="this.style.background='#333'">${i}</button>`;
        }
        html += `</div>`;
        html += `<div style="display: flex; justify-content: space-between; font-size: 9px; color: #999; margin-top: 4px;">`;
        html += `<span>${q.minLabel}</span><span>${q.maxLabel}</span></div>`;
      } else if (q.type === 'multiple') {
        q.options.forEach((opt, optIdx) => {
          html += `<label style="display: block; margin: 4px 0; cursor: pointer;">
            <input type="checkbox" onchange="window.sceneManager.recordResponse('${q.id}', '${opt}')" style="margin-right: 6px;">
            <span style="font-size: 11px;">${opt}</span>
          </label>`;
        });
      }
      html += `</div>`;
    });
    
    questionnairePanel.innerHTML = html;
    document.body.appendChild(questionnairePanel);
  },

  recordResponse: function(questionId, value) {
    if (!window.surveyResponses) window.surveyResponses = {};
    if (typeof value === 'string' && value !== 'Other') {
      if (!window.surveyResponses[questionId]) window.surveyResponses[questionId] = [];
      const arr = window.surveyResponses[questionId];
      const idx = arr.indexOf(value);
      if (idx > -1) arr.splice(idx, 1);
      else arr.push(value);
    } else {
      window.surveyResponses[questionId] = value;
    }
    console.log('Survey Response:', window.surveyResponses);
  },

  nextScene: function() {
    const panel = document.getElementById('questionnairePanel');
    if (panel) {
      document.body.removeEventListener('click', this.handleQuestionnaireClick);
      panel.remove();
    }
    
    if (this.currentScene < this.scenes.length - 1) {
      this.colorProgress = Math.min(1, this.colorProgress + 1 / this.scenes.length);
      this.loadScene(this.currentScene + 1);
      this.updateNavButtons();
    }
  },

  handleQuestionnaireClick: function(event) {
    // Handle scale option clicks
    if (event.target.matches('.scale-options button')) {
      const questionId = event.target.closest('.scale-options').dataset.questionId;
      const value = parseInt(event.target.dataset.value, 10);
      window.sceneManager.recordResponse(questionId, value);
      
      // Visual feedback
      const buttons = event.target.parentElement.querySelectorAll('button');
      buttons.forEach(btn => {
        btn.style.background = '#333';
        btn.style.color = '#FFD700';
      });
      event.target.style.background = '#FFD700';
      event.target.style.color = '#000';
    }
    
    // Handle multiple choice checkboxes
    if (event.target.matches('input[type="checkbox"]')) {
      const questionId = event.target.getAttribute('onchange').match(/'(.*?)'/)[1];
      const value = event.target.nextElementSibling.textContent.trim();
      window.sceneManager.recordResponse(questionId, value);
    }
  },
  
  updateSkyAndLighting: function() {
    const sky = document.getElementById('sky');
    const light = document.getElementById('directionalLight');
    
    if (this.colorProgress < 0.5) {
      sky.setAttribute('src', '#skyMonochrome');
    } else {
      sky.setAttribute('src', '#skyColor');
    }
    
    const intensity = 0.5 + this.colorProgress * 0.5;
    light.setAttribute('light', 'intensity', intensity);
  },

  createScene1_FirstSpark: function() {
    const container = document.getElementById('sceneContainer');
    document.getElementById('ground').setAttribute('material', 'color', '#4a4a4a');
    
    // Background image plane
    const bgPlane = document.createElement('a-plane');
    bgPlane.setAttribute('position', '0 1 -5');
    bgPlane.setAttribute('rotation', '0 0 0');
    bgPlane.setAttribute('width', '10');
    bgPlane.setAttribute('height', '7.5');
    bgPlane.setAttribute('material', 'src: url(images/Scene_1.png); shader: flat');
    container.appendChild(bgPlane);
    
    // Add soil mound for depth
    const soil = document.createElement('a-cylinder');
    soil.setAttribute('position', '0 0.05 -3');
    soil.setAttribute('radius', '0.4');
    soil.setAttribute('height', '0.1');
    soil.setAttribute('color', '#3a3a3a');
    container.appendChild(soil);
    
    const sapling = document.createElement('a-entity');
    sapling.setAttribute('position', '0 0.15 -3');
    
    // Multi-segment trunk for more dimension
    const trunk1 = document.createElement('a-cylinder');
    trunk1.setAttribute('radius', '0.08');
    trunk1.setAttribute('height', '0.25');
    trunk1.setAttribute('color', '#4a4a4a');
    trunk1.setAttribute('position', '0 0.125 0');
    sapling.appendChild(trunk1);
    
    const trunk2 = document.createElement('a-cylinder');
    trunk2.setAttribute('radius', '0.06');
    trunk2.setAttribute('height', '0.2');
    trunk2.setAttribute('color', '#555555');
    trunk2.setAttribute('position', '0 0.325 0');
    sapling.appendChild(trunk2);
    
    // Multiple leaves for fuller appearance
    const leaf1 = document.createElement('a-sphere');
    leaf1.setAttribute('radius', '0.12');
    leaf1.setAttribute('color', '#666666');
    leaf1.setAttribute('position', '-0.1 0.5 0.05');
    sapling.appendChild(leaf1);
    
    const leaf2 = document.createElement('a-sphere');
    leaf2.setAttribute('radius', '0.12');
    leaf2.setAttribute('color', '#666666');
    leaf2.setAttribute('position', '0.1 0.5 -0.05');
    sapling.appendChild(leaf2);
    
    const leaf = document.createElement('a-sphere');
    leaf.setAttribute('radius', '0.15');
    leaf.setAttribute('color', '#666666');
    leaf.setAttribute('position', '0 0.55 0');
    leaf.setAttribute('id', 'firstLeaf');
    leaf.setAttribute('class', 'interactive');
    sapling.appendChild(leaf);
    
    container.appendChild(sapling);
    
    // Add ambient particles
    for (let i = 0; i < 3; i++) {
      const particle = document.createElement('a-sphere');
      particle.setAttribute('radius', '0.03');
      particle.setAttribute('color', '#555555');
      particle.setAttribute('position', `${(Math.random() - 0.5) * 0.3} ${0.3 + Math.random() * 0.3} -3`);
      particle.setAttribute('animation', `property: position; to: ${(Math.random() - 0.5) * 0.5} ${0.8 + Math.random() * 0.2} -3; dur: ${2000 + Math.random() * 1000}; loop: true`);
      container.appendChild(particle);
    }
    
    const text = document.createElement('a-entity');
    text.setAttribute('text', 'value: Scene 1: The First Spark\\n\\nClick the sapling to touch it with light; anchor: center; align: center; color: #DCDCDC; wrapCount: 30');
    text.setAttribute('position', '0 2 -3');
    container.appendChild(text);
    
    const leaf_el = document.getElementById('firstLeaf');
    leaf_el.addEventListener('click', () => {
      leaf_el.setAttribute('color', '#4A7856');
      leaf_el.setAttribute('animation', 'property: scale; to: 1.2; dur: 500; dir: alternate; loop: 2');
      this.colorProgress = 0.15;
      this.updateSkyAndLighting();
    });
  },

  createScene2_WindowboxFlower: function() {
    const container = document.getElementById('sceneContainer');
    document.getElementById('ground').setAttribute('material', 'color', '#555555');
    
    // Background image plane
    const bgPlane = document.createElement('a-plane');
    bgPlane.setAttribute('position', '0 1 -5');
    bgPlane.setAttribute('rotation', '0 0 0');
    bgPlane.setAttribute('width', '10');
    bgPlane.setAttribute('height', '7.5');
    bgPlane.setAttribute('material', 'src: url(images/Scene_2.png); shader: flat');
    container.appendChild(bgPlane);
    
    // Window frame with depth
    const windowFrame = document.createElement('a-entity');
    windowFrame.setAttribute('position', '2 1.5 -4');
    
    const frameOuter = document.createElement('a-box');
    frameOuter.setAttribute('width', '1.3');
    frameOuter.setAttribute('height', '1.3');
    frameOuter.setAttribute('depth', '0.15');
    frameOuter.setAttribute('color', '#333333');
    windowFrame.appendChild(frameOuter);
    
    const frameInner = document.createElement('a-box');
    frameInner.setAttribute('position', '0 0 0.08');
    frameInner.setAttribute('width', '1.1');
    frameInner.setAttribute('height', '1.1');
    frameInner.setAttribute('depth', '0.05');
    frameInner.setAttribute('color', '#444444');
    windowFrame.appendChild(frameInner);
    
    const windowGlass = document.createElement('a-plane');
    windowGlass.setAttribute('position', '0 0 0.1');
    windowGlass.setAttribute('width', '1.0');
    windowGlass.setAttribute('height', '1.0');
    windowGlass.setAttribute('material', 'color: #2a2a2a; opacity: 0.8');
    windowFrame.appendChild(windowGlass);
    
    container.appendChild(windowFrame);
    
    // Figure inside window with body parts
    const figure = document.createElement('a-entity');
    figure.setAttribute('position', '2 1.5 -3.8');
    figure.setAttribute('id', 'sadFigure');
    
    const figureBody = document.createElement('a-box');
    figureBody.setAttribute('width', '0.2');
    figureBody.setAttribute('height', '0.25');
    figureBody.setAttribute('depth', '0.15');
    figureBody.setAttribute('color', '#555555');
    figure.appendChild(figureBody);
    
    const figureHead = document.createElement('a-sphere');
    figureHead.setAttribute('radius', '0.12');
    figureHead.setAttribute('color', '#555555');
    figureHead.setAttribute('position', '0 0.2 0');
    figure.appendChild(figureHead);
    
    container.appendChild(figure);
    
    // Seed with glow effect
    const seed = document.createElement('a-entity');
    seed.setAttribute('position', '-1 0.5 -3');
    seed.setAttribute('id', 'glowingSeed');
    seed.setAttribute('class', 'interactive');
    
    const seedCore = document.createElement('a-sphere');
    seedCore.setAttribute('radius', '0.1');
    seedCore.setAttribute('color', '#FFD700');
    seedCore.setAttribute('light', 'type: point; intensity: 1.5; range: 2.5');
    seed.appendChild(seedCore);
    
    const seedGlow = document.createElement('a-sphere');
    seedGlow.setAttribute('radius', '0.12');
    seedGlow.setAttribute('color', '#FFD700');
    seedGlow.setAttribute('material', 'opacity: 0.3');
    seed.appendChild(seedGlow);
    
    container.appendChild(seed);
    
    // Planter with depth
    const planter = document.createElement('a-entity');
    planter.setAttribute('position', '2 0.3 -3');
    
    const planterOuter = document.createElement('a-box');
    planterOuter.setAttribute('width', '0.7');
    planterOuter.setAttribute('height', '0.35');
    planterOuter.setAttribute('depth', '0.7');
    planterOuter.setAttribute('color', '#555555');
    planter.appendChild(planterOuter);
    
    const planterInner = document.createElement('a-box');
    planterInner.setAttribute('position', '0 0.05 0');
    planterInner.setAttribute('width', '0.6');
    planterInner.setAttribute('height', '0.25');
    planterInner.setAttribute('depth', '0.6');
    planterInner.setAttribute('color', '#4a4a4a');
    planter.appendChild(planterInner);
    
    container.appendChild(planter);
    
    const text = document.createElement('a-entity');
    text.setAttribute('text', 'value: Scene 2: Windowbox Flower\\n\\nClick the glowing seed to throw it to the planter; anchor: center; align: center; color: #DCDCDC; wrapCount: 30');
    text.setAttribute('position', '0 2.5 -3');
    container.appendChild(text);
    
    let seedThrown = false;
    const seed_el = document.getElementById('glowingSeed');
    seed_el.addEventListener('click', () => {
      if (!seedThrown) {
        seedThrown = true;
        seed_el.setAttribute('animation', 'property: position; to: 2 0.5 -3; dur: 1000; easing: easeInOutQuad');
        setTimeout(() => {
          seed_el.setAttribute('animation', 'property: rotation; to: 360 360 360; dur: 1000; loop: true');
          document.getElementById('sadFigure').setAttribute('color', '#6B7856');
          this.colorProgress = 0.3;
          this.updateSkyAndLighting();
        }, 1000);
      }
    });
  },

  createScene3_GentleOffering: function() {
    const container = document.getElementById('sceneContainer');
    document.getElementById('ground').setAttribute('material', 'color', '#5a5a5a');
    
    // Background image plane
    const bgPlane = document.createElement('a-plane');
    bgPlane.setAttribute('position', '0 1 -5');
    bgPlane.setAttribute('rotation', '0 0 0');
    bgPlane.setAttribute('width', '10');
    bgPlane.setAttribute('height', '7.5');
    bgPlane.setAttribute('material', 'src: url(images/Scene_3.png); shader: flat');
    container.appendChild(bgPlane);
    
    // Bowl with depth and stand
    const bowl = document.createElement('a-entity');
    bowl.setAttribute('position', '-1 0.5 -3');
    
    const bowlStand = document.createElement('a-cylinder');
    bowlStand.setAttribute('radius', '0.08');
    bowlStand.setAttribute('height', '0.3');
    bowlStand.setAttribute('color', '#555555');
    bowlStand.setAttribute('position', '0 -0.25 0');
    bowl.appendChild(bowlStand);
    
    const bowlOuter = document.createElement('a-cylinder');
    bowlOuter.setAttribute('radius', '0.32');
    bowlOuter.setAttribute('height', '0.22');
    bowlOuter.setAttribute('color', '#666666');
    bowl.appendChild(bowlOuter);
    
    const bowlInner = document.createElement('a-cylinder');
    bowlInner.setAttribute('radius', '0.28');
    bowlInner.setAttribute('height', '0.18');
    bowlInner.setAttribute('position', '0 0.02 0');
    bowlInner.setAttribute('color', '#555555');
    bowl.appendChild(bowlInner);
    
    const water = document.createElement('a-cylinder');
    water.setAttribute('radius', '0.25');
    water.setAttribute('height', '0.08');
    water.setAttribute('color', '#4488CC');
    water.setAttribute('position', '0 0.12 0');
    water.setAttribute('id', 'water');
    water.setAttribute('class', 'interactive');
    water.setAttribute('light', 'type: point; intensity: 0.5; range: 1.5');
    bowl.appendChild(water);
    
    container.appendChild(bowl);
    
    // Dog with more detail
    const dog = document.createElement('a-entity');
    dog.setAttribute('position', '1.5 0.3 -3');
    dog.setAttribute('id', 'dog');
    
    const dogBody = document.createElement('a-box');
    dogBody.setAttribute('width', '0.4');
    dogBody.setAttribute('height', '0.3');
    dogBody.setAttribute('depth', '0.6');
    dogBody.setAttribute('color', '#777777');
    dog.appendChild(dogBody);
    
    const dogHead = document.createElement('a-sphere');
    dogHead.setAttribute('radius', '0.15');
    dogHead.setAttribute('color', '#777777');
    dogHead.setAttribute('position', '0 0.15 0.35');
    dog.appendChild(dogHead);
    
    // Dog ears
    const ear1 = document.createElement('a-cone');
    ear1.setAttribute('radius-bottom', '0.06');
    ear1.setAttribute('height', '0.12');
    ear1.setAttribute('color', '#777777');
    ear1.setAttribute('position', '-0.08 0.25 0.3');
    ear1.setAttribute('rotation', '-20 0 0');
    dog.appendChild(ear1);
    
    const ear2 = document.createElement('a-cone');
    ear2.setAttribute('radius-bottom', '0.06');
    ear2.setAttribute('height', '0.12');
    ear2.setAttribute('color', '#777777');
    ear2.setAttribute('position', '0.08 0.25 0.3');
    ear2.setAttribute('rotation', '-20 0 0');
    dog.appendChild(ear2);
    
    // Dog legs
    for (let i = 0; i < 4; i++) {
      const leg = document.createElement('a-cylinder');
      leg.setAttribute('radius', '0.05');
      leg.setAttribute('height', '0.2');
      leg.setAttribute('color', '#777777');
      const xPos = (i % 2 === 0 ? -0.12 : 0.12);
      const zPos = (i < 2 ? 0.15 : -0.15);
      leg.setAttribute('position', `${xPos} -0.15 ${zPos}`);
      dog.appendChild(leg);
    }
    
    container.appendChild(dog);
    
    const text = document.createElement('a-entity');
    text.setAttribute('text', 'value: Scene 3: A Gentle Offering\\n\\nClick the water bowl to give it to the dog; anchor: center; align: center; color: #DCDCDC; wrapCount: 30');
    text.setAttribute('position', '0 2.5 -3');
    container.appendChild(text);
    
    let offered = false;
    const water_el = document.getElementById('water');
    water_el.addEventListener('click', () => {
      if (!offered) {
        offered = true;
        water_el.setAttribute('animation', 'property: position; to: 1.5 0.2 -3; dur: 800');
        setTimeout(() => {
          document.getElementById('dog').setAttribute('color', '#8B7856');
          this.colorProgress = 0.45;
          this.updateSkyAndLighting();
        }, 800);
      }
    });
  },

  createScene4_ClearingWaters: function() {
    const container = document.getElementById('sceneContainer');
    document.getElementById('ground').setAttribute('material', 'color', '#6a6a6a');
    
    // Background image plane
    const bgPlane = document.createElement('a-plane');
    bgPlane.setAttribute('position', '0 1 -5');
    bgPlane.setAttribute('rotation', '0 0 0');
    bgPlane.setAttribute('width', '10');
    bgPlane.setAttribute('height', '7.5');
    bgPlane.setAttribute('material', 'src: url(images/Scene_4.png); shader: flat');
    container.appendChild(bgPlane);
    
    // River with layered depth
    const riverContainer = document.createElement('a-entity');
    riverContainer.setAttribute('position', '0 0.2 -3');
    riverContainer.setAttribute('id', 'riverContainer');
    
    // Bottom layer
    const riverBottom = document.createElement('a-box');
    riverBottom.setAttribute('position', '0 -0.15 0');
    riverBottom.setAttribute('width', '3.2');
    riverBottom.setAttribute('height', '0.1');
    riverBottom.setAttribute('depth', '2.2');
    riverBottom.setAttribute('color', '#1a1a1a');
    riverContainer.appendChild(riverBottom);
    
    // Main sludge layer
    const sludge = document.createElement('a-box');
    sludge.setAttribute('position', '0 0 0');
    sludge.setAttribute('width', '3');
    sludge.setAttribute('height', '0.3');
    sludge.setAttribute('depth', '2');
    sludge.setAttribute('color', '#333333');
    sludge.setAttribute('id', 'sludge');
    sludge.setAttribute('class', 'interactive');
    riverContainer.appendChild(sludge);
    
    // Surface ripples
    const ripple1 = document.createElement('a-plane');
    ripple1.setAttribute('position', '0 0.16 0');
    ripple1.setAttribute('rotation', '-90 0 0');
    ripple1.setAttribute('width', '3');
    ripple1.setAttribute('height', '2');
    ripple1.setAttribute('material', 'color: #2a2a2a; opacity: 0.4');
    ripple1.setAttribute('animation', 'property: material.opacity; to: 0.2; dur: 1500; dir: alternate; loop: true');
    riverContainer.appendChild(ripple1);
    
    container.appendChild(riverContainer);
    
    // Add floating debris particles
    for (let i = 0; i < 5; i++) {
      const debris = document.createElement('a-box');
      debris.setAttribute('width', '0.1');
      debris.setAttribute('height', '0.05');
      debris.setAttribute('depth', '0.1');
      debris.setAttribute('color', '#2a2a2a');
      const xPos = (Math.random() - 0.5) * 2.5;
      const zPos = (Math.random() - 0.5) * 1.8;
      debris.setAttribute('position', `${xPos} 0.35 ${-3 + zPos}`);
      debris.setAttribute('animation', `property: position; to: ${xPos + (Math.random() - 0.5) * 0.5} 0.35 ${-3 + zPos + (Math.random() - 0.5) * 0.5}; dur: ${3000 + Math.random() * 2000}; loop: true`);
      container.appendChild(debris);
    }
    
    const text = document.createElement('a-entity');
    text.setAttribute('text', 'value: Scene 4: Clearing the Waters\\n\\nClick the sludge repeatedly to clear it; anchor: center; align: center; color: #DCDCDC; wrapCount: 30');
    text.setAttribute('position', '0 2.5 -3');
    container.appendChild(text);
    
    let clicks = 0;
    const sludge_el = document.getElementById('sludge');
    sludge_el.addEventListener('click', () => {
      clicks++;
      const progress = Math.min(1, clicks / 5);
      const r = Math.floor(51 + (135 - 51) * progress);
      const g = Math.floor(136 + (206 - 136) * progress);
      const b = Math.floor(203 - 203 * progress);
      sludge_el.setAttribute('color', `rgb(${r}, ${g}, ${b})`);
      
      // Add clearing effect
      const clearEffect = document.createElement('a-sphere');
      clearEffect.setAttribute('radius', '0.2');
      clearEffect.setAttribute('color', `rgb(${r}, ${g}, ${b})`);
      clearEffect.setAttribute('position', `${(Math.random() - 0.5) * 2} 0.2 ${-3 + (Math.random() - 0.5) * 1.5}`);
      clearEffect.setAttribute('material', 'opacity: 0.6');
      clearEffect.setAttribute('animation', 'property: scale; to: 2; dur: 500; property: material.opacity; to: 0; dur: 500');
      container.appendChild(clearEffect);
      setTimeout(() => clearEffect.remove(), 500);
      
      if (clicks >= 5) {
        sludge_el.setAttribute('color', '#87CEEB');
        this.colorProgress = 0.6;
        this.updateSkyAndLighting();
      }
    });
  },

  createScene5_HarmonyBell: function() {
    const container = document.getElementById('sceneContainer');
    document.getElementById('ground').setAttribute('material', 'color', '#7a7a7a');
    
    // Background image plane
    const bgPlane = document.createElement('a-plane');
    bgPlane.setAttribute('position', '0 1 -5');
    bgPlane.setAttribute('rotation', '0 0 0');
    bgPlane.setAttribute('width', '10');
    bgPlane.setAttribute('height', '7.5');
    bgPlane.setAttribute('material', 'src: url(images/Scene_5.png); shader: flat');
    container.appendChild(bgPlane);
    
    // Bell with stand and decorative elements
    const bell = document.createElement('a-entity');
    bell.setAttribute('position', '0 0.8 -3');
    bell.setAttribute('id', 'bell');
    bell.setAttribute('class', 'interactive');
    
    // Bell stand
    const bellStand = document.createElement('a-cylinder');
    bellStand.setAttribute('radius', '0.15');
    bellStand.setAttribute('height', '0.3');
    bellStand.setAttribute('color', '#666666');
    bellStand.setAttribute('position', '0 -0.35 0');
    bell.appendChild(bellStand);
    
    // Bell shape with rim
    const bellShape = document.createElement('a-cone');
    bellShape.setAttribute('radius-bottom', '0.3');
    bellShape.setAttribute('height', '0.4');
    bellShape.setAttribute('color', '#888888');
    bell.appendChild(bellShape);
    
    // Bell rim
    const bellRim = document.createElement('a-torus');
    bellRim.setAttribute('radius', '0.32');
    bellRim.setAttribute('radius-tubular', '0.02');
    bellRim.setAttribute('color', '#999999');
    bellRim.setAttribute('position', '0 -0.2 0');
    bell.appendChild(bellRim);
    
    // Clapper
    const clapper = document.createElement('a-sphere');
    clapper.setAttribute('radius', '0.08');
    clapper.setAttribute('color', '#FFD700');
    clapper.setAttribute('position', '0 -0.1 0');
    clapper.setAttribute('light', 'type: point; intensity: 1; range: 1.5');
    bell.appendChild(clapper);
    
    container.appendChild(bell);
    
    // Figure 1 with body parts
    const figure1 = document.createElement('a-entity');
    figure1.setAttribute('position', '-1 0.3 -3');
    figure1.setAttribute('id', 'fig1');
    
    const fig1Body = document.createElement('a-box');
    fig1Body.setAttribute('width', '0.15');
    fig1Body.setAttribute('height', '0.25');
    fig1Body.setAttribute('depth', '0.1');
    fig1Body.setAttribute('color', '#666666');
    figure1.appendChild(fig1Body);
    
    const fig1Head = document.createElement('a-sphere');
    fig1Head.setAttribute('radius', '0.1');
    fig1Head.setAttribute('color', '#666666');
    fig1Head.setAttribute('position', '0 0.2 0');
    figure1.appendChild(fig1Head);
    
    container.appendChild(figure1);
    
    // Figure 2 with body parts
    const figure2 = document.createElement('a-entity');
    figure2.setAttribute('position', '1 0.3 -3');
    figure2.setAttribute('id', 'fig2');
    
    const fig2Body = document.createElement('a-box');
    fig2Body.setAttribute('width', '0.15');
    fig2Body.setAttribute('height', '0.25');
    fig2Body.setAttribute('depth', '0.1');
    fig2Body.setAttribute('color', '#666666');
    figure2.appendChild(fig2Body);
    
    const fig2Head = document.createElement('a-sphere');
    fig2Head.setAttribute('radius', '0.1');
    fig2Head.setAttribute('color', '#666666');
    fig2Head.setAttribute('position', '0 0.2 0');
    figure2.appendChild(fig2Head);
    
    container.appendChild(figure2);
    
    // Sound wave effect particles
    for (let i = 0; i < 3; i++) {
      const wave = document.createElement('a-sphere');
      wave.setAttribute('radius', '0.05');
      wave.setAttribute('color', '#888888');
      wave.setAttribute('position', `${(Math.random() - 0.5) * 0.3} ${0.5 + Math.random() * 0.3} -3`);
      wave.setAttribute('animation', `property: position; to: ${(Math.random() - 0.5) * 0.8} ${1.2 + Math.random() * 0.2} -3; dur: ${2000 + Math.random() * 1000}; loop: true`);
      container.appendChild(wave);
    }
    
    const text = document.createElement('a-entity');
    text.setAttribute('text', 'value: Scene 5: The Harmony Bell\\n\\nClick the bell to ring it and unite the figures; anchor: center; align: center; color: #DCDCDC; wrapCount: 30');
    text.setAttribute('position', '0 2.5 -3');
    container.appendChild(text);
    
    let rung = false;
    const bell_el = document.getElementById('bell');
    bell_el.addEventListener('click', () => {
      if (!rung) {
        rung = true;
        bell_el.setAttribute('animation', 'property: rotation; to: 0 0 15; dur: 100; dir: alternate; loop: 3');
        document.getElementById('fig1').setAttribute('color', '#FF69B4');
        document.getElementById('fig2').setAttribute('color', '#4169E1');
        this.colorProgress = 0.75;
        this.updateSkyAndLighting();
      }
    });
  },

  createScene6_SharedLantern: function() {
    const container = document.getElementById('sceneContainer');
    document.getElementById('ground').setAttribute('material', 'color', '#3a3a3a');
    
    // Background image plane
    const bgPlane = document.createElement('a-plane');
    bgPlane.setAttribute('position', '0 1 -5');
    bgPlane.setAttribute('rotation', '0 0 0');
    bgPlane.setAttribute('width', '10');
    bgPlane.setAttribute('height', '7.5');
    bgPlane.setAttribute('material', 'src: url(images/Scene_6.png); shader: flat');
    container.appendChild(bgPlane);
    
    // User lantern with detailed structure
    const userLantern = document.createElement('a-entity');
    userLantern.setAttribute('position', '-1 1 -3');
    userLantern.setAttribute('id', 'userLantern');
    userLantern.setAttribute('class', 'interactive');
    
    // Lantern frame
    const lanternFrame = document.createElement('a-box');
    lanternFrame.setAttribute('width', '0.2');
    lanternFrame.setAttribute('height', '0.35');
    lanternFrame.setAttribute('depth', '0.2');
    lanternFrame.setAttribute('color', '#444444');
    userLantern.appendChild(lanternFrame);
    
    // Lantern light core
    const userLight = document.createElement('a-sphere');
    userLight.setAttribute('radius', '0.12');
    userLight.setAttribute('color', '#FFD700');
    userLight.setAttribute('light', 'type: point; intensity: 2; range: 3');
    userLight.setAttribute('position', '0 0 0');
    userLantern.appendChild(userLight);
    
    // Lantern glow
    const lanternGlow = document.createElement('a-sphere');
    lanternGlow.setAttribute('radius', '0.15');
    lanternGlow.setAttribute('color', '#FFD700');
    lanternGlow.setAttribute('material', 'opacity: 0.3');
    userLantern.appendChild(lanternGlow);
    
    // Lantern handle
    const lanternHandle = document.createElement('a-torus');
    lanternHandle.setAttribute('radius', '0.12');
    lanternHandle.setAttribute('radius-tubular', '0.02');
    lanternHandle.setAttribute('color', '#444444');
    lanternHandle.setAttribute('position', '0 0.25 0');
    lanternHandle.setAttribute('rotation', '90 0 0');
    userLantern.appendChild(lanternHandle);
    
    container.appendChild(userLantern);
    
    // Traveler with more detail
    const traveler = document.createElement('a-entity');
    traveler.setAttribute('position', '1.5 0.5 -3');
    traveler.setAttribute('id', 'traveler');
    
    const travelerBody = document.createElement('a-box');
    travelerBody.setAttribute('width', '0.3');
    travelerBody.setAttribute('height', '0.4');
    travelerBody.setAttribute('depth', '0.3');
    travelerBody.setAttribute('color', '#666666');
    traveler.appendChild(travelerBody);
    
    const travelerHead = document.createElement('a-sphere');
    travelerHead.setAttribute('radius', '0.12');
    travelerHead.setAttribute('color', '#666666');
    travelerHead.setAttribute('position', '0 0.25 0');
    traveler.appendChild(travelerHead);
    
    // Traveler lantern with frame
    const travelerLanternFrame = document.createElement('a-box');
    travelerLanternFrame.setAttribute('width', '0.15');
    travelerLanternFrame.setAttribute('height', '0.25');
    travelerLanternFrame.setAttribute('depth', '0.15');
    travelerLanternFrame.setAttribute('color', '#444444');
    travelerLanternFrame.setAttribute('position', '0.2 0 0');
    traveler.appendChild(travelerLanternFrame);
    
    const travelerLantern = document.createElement('a-sphere');
    travelerLantern.setAttribute('radius', '0.08');
    travelerLantern.setAttribute('color', '#555555');
    travelerLantern.setAttribute('position', '0.2 0 0');
    travelerLantern.setAttribute('id', 'travelerLantern');
    traveler.appendChild(travelerLantern);
    
    container.appendChild(traveler);
    
    // Light beam connecting lanterns
    const lightBeam = document.createElement('a-cylinder');
    lightBeam.setAttribute('radius', '0.05');
    lightBeam.setAttribute('height', '2.5');
    lightBeam.setAttribute('color', '#FFD700');
    lightBeam.setAttribute('material', 'opacity: 0');
    lightBeam.setAttribute('position', '0.25 1 -3');
    lightBeam.setAttribute('rotation', '0 0 90');
    lightBeam.setAttribute('id', 'lightBeam');
    container.appendChild(lightBeam);
    
    const text = document.createElement('a-entity');
    text.setAttribute('text', 'value: Scene 6: The Shared Lantern\\n\\nClick your lantern to share its light; anchor: center; align: center; color: #DCDCDC; wrapCount: 30');
    text.setAttribute('position', '0 2.5 -3');
    container.appendChild(text);
    
    let shared = false;
    const userLantern_el = document.getElementById('userLantern');
    userLantern_el.addEventListener('click', () => {
      if (!shared) {
        shared = true;
        const travelerLantern_el = document.getElementById('travelerLantern');
        travelerLantern_el.setAttribute('color', '#FFD700');
        travelerLantern_el.setAttribute('light', 'type: point; intensity: 1.5; range: 2');
        
        // Animate light beam
        const beam = document.getElementById('lightBeam');
        beam.setAttribute('material', 'opacity: 0.6');
        beam.setAttribute('animation', 'property: material.opacity; to: 0; dur: 1000; delay: 500');
        
        userLight.setAttribute('light', 'intensity', 1);
        this.colorProgress = 0.9;
        this.updateSkyAndLighting();
      }
    });
  },

  createScene7_WorldReborn: function() {
    const container = document.getElementById('sceneContainer');
    document.getElementById('ground').setAttribute('material', 'color', '#4A7856');
    
    // Background image plane
    const bgPlane = document.createElement('a-plane');
    bgPlane.setAttribute('position', '0 1 -5');
    bgPlane.setAttribute('rotation', '0 0 0');
    bgPlane.setAttribute('width', '10');
    bgPlane.setAttribute('height', '7.5');
    bgPlane.setAttribute('material', 'src: url(images/Scene_7.png); shader: flat');
    container.appendChild(bgPlane);
    
    const text = document.createElement('a-entity');
    text.setAttribute('text', 'value: Scene 7: The World Reborn\\n\\nYour kindness has transformed the world.\\n\\nPress Next Scene to restart or explore other scenes.; anchor: center; align: center; color: #FFD700; wrapCount: 30');
    text.setAttribute('position', '0 1.5 -3');
    container.appendChild(text);
    
    // Create colorful 3D elements representing healed world
    const colors = ['#4A7856', '#87CEEB', '#8B4513', '#FF69B4', '#FFD700', '#4169E1'];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * 2;
      const z = -3 + Math.sin(angle) * 2;
      
      // Create composite 3D objects
      const element = document.createElement('a-entity');
      element.setAttribute('position', `${x} ${0.5 + Math.sin(i) * 0.3} ${z}`);
      
      // Main sphere
      const sphere = document.createElement('a-sphere');
      sphere.setAttribute('radius', '0.2');
      sphere.setAttribute('color', colors[i]);
      sphere.setAttribute('light', 'type: point; intensity: 0.8; range: 1.5');
      element.appendChild(sphere);
      
      // Orbiting ring
      const ring = document.createElement('a-torus');
      ring.setAttribute('radius', '0.25');
      ring.setAttribute('radius-tubular', '0.02');
      ring.setAttribute('color', colors[i]);
      ring.setAttribute('material', 'opacity: 0.6');
      ring.setAttribute('rotation', `${Math.random() * 360} ${Math.random() * 360} ${Math.random() * 360}`);
      element.appendChild(ring);
      
      // Floating particles around element
      for (let j = 0; j < 2; j++) {
        const particle = document.createElement('a-sphere');
        particle.setAttribute('radius', '0.03');
        particle.setAttribute('color', colors[i]);
        const pAngle = (j / 2) * Math.PI * 2;
        const pX = Math.cos(pAngle) * 0.35;
        const pZ = Math.sin(pAngle) * 0.35;
        particle.setAttribute('position', `${pX} 0 ${pZ}`);
        particle.setAttribute('animation', `property: position; to: ${Math.cos(pAngle + Math.PI) * 0.35} 0 ${Math.sin(pAngle + Math.PI) * 0.35}; dur: ${3000 + Math.random() * 1000}; dir: alternate; loop: true`);
        element.appendChild(particle);
      }
      
      element.setAttribute('animation', `property: position; to: ${x} ${0.8 + Math.sin(i) * 0.5} ${z}; dur: 2000; dir: alternate; loop: true`);
      container.appendChild(element);
    }
    
    // Add central healing aura
    const aura = document.createElement('a-sphere');
    aura.setAttribute('position', '0 0.5 -3');
    aura.setAttribute('radius', '0.5');
    aura.setAttribute('color', '#FFD700');
    aura.setAttribute('material', 'opacity: 0.2');
    aura.setAttribute('animation', 'property: scale; to: 1.3; dur: 2000; dir: alternate; loop: true');
    container.appendChild(aura);
    
    // Add light rays emanating from center
    for (let i = 0; i < 4; i++) {
      const ray = document.createElement('a-cylinder');
      ray.setAttribute('radius', '0.02');
      ray.setAttribute('height', '1.5');
      ray.setAttribute('color', '#FFD700');
      ray.setAttribute('material', 'opacity: 0.4');
      ray.setAttribute('position', '0 0.5 -3');
      ray.setAttribute('rotation', `${i * 90} 0 0`);
      ray.setAttribute('animation', 'property: material.opacity; to: 0.1; dur: 1500; dir: alternate; loop: true');
      container.appendChild(ray);
    }
    
    this.colorProgress = 1;
    this.updateSkyAndLighting();
  },
  
  previousScene: function() {
    if (this.currentScene > 0) {
      this.colorProgress = Math.max(0, this.colorProgress - 1 / this.scenes.length);
      this.loadScene(this.currentScene - 1);
      this.updateNavButtons();
    }
  },
  
  updateNavButtons: function() {
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (backBtn) {
      backBtn.style.display = this.currentScene === 0 ? 'none' : 'block';
    }
    if (nextBtn) {
      nextBtn.style.display = this.currentScene === this.scenes.length - 1 ? 'none' : 'block';
    }
  },
  
  loadScene: function(index) {
    if (index < 0 || index >= this.scenes.length) return;
    this.currentScene = index;
    const container = document.getElementById('sceneContainer');
    container.innerHTML = '';
    this.scenes[index].call(this);
    this.updateSkyAndLighting();
    this.displayQuestionnaire(index);
    this.updateNavButtons();
  },
  
  createScene8_LibertyBell: function() {
    const container = document.getElementById('sceneContainer');
    
    // Set sky color to a dawn-like color
    document.getElementById('sky').setAttribute('material', 'color', '#4B6E91');
    
    // Add a ground plane
    const ground = document.createElement('a-plane');
    ground.setAttribute('position', '0 0 -4');
    ground.setAttribute('rotation', '-90 0 0');
    ground.setAttribute('width', '20');
    ground.setAttribute('height', '20');
    ground.setAttribute('color', '#2C3E50');
    container.appendChild(ground);
    
    // Add the Liberty Bell image
    const bell = document.createElement('a-image');
    bell.setAttribute('src', '#libertyBell');
    bell.setAttribute('position', '0 1.5 -4');
    bell.setAttribute('width', '3');
    bell.setAttribute('height', '2');
    bell.setAttribute('opacity', '0');
    bell.setAttribute('animation', 'property: opacity; to: 1; dur: 2000; delay: 500');
    container.appendChild(bell);
    
    // Add title text
    const title = document.createElement('a-text');
    title.setAttribute('value', 'The Liberty Bell');
    title.setAttribute('position', '0 2.5 -4');
    title.setAttribute('align', 'center');
    title.setAttribute('color', '#FFD700');
    title.setAttribute('opacity', '0');
    title.setAttribute('animation', 'property: opacity; to: 1; dur: 2000; delay: 1000');
    container.appendChild(title);
    
    // Add description text
    const description = document.createElement('a-text');
    description.setAttribute('value', 'A Symbol of Freedom and Unity\n\nThank you for experiencing this journey.');
    description.setAttribute('position', '0 1.8 -4');
    description.setAttribute('align', 'center');
    description.setAttribute('width', '6');
    description.setAttribute('color', '#FFFFFF');
    description.setAttribute('opacity', '0');
    description.setAttribute('animation', 'property: opacity; to: 1; dur: 2000; delay: 1500');
    container.appendChild(description);
    
    // Add a subtle ambient light
    const ambientLight = document.createElement('a-light');
    ambientLight.setAttribute('type', 'ambient');
    ambientLight.setAttribute('color', '#FFF');
    ambientLight.setAttribute('intensity', '0.6');
    container.appendChild(ambientLight);
    
    // Add directional light for better visibility
    const dirLight = document.createElement('a-light');
    dirLight.setAttribute('type', 'directional');
    dirLight.setAttribute('position', '1 1 1');
    dirLight.setAttribute('intensity', '0.8');
    container.appendChild(dirLight);
    
    // Disable the next button since this is the final scene
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.style.display = 'none';
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  window.sceneManager.init();
});
