const phrases = [
    "sos hermosa",
    "te adoro",
    "iluminas mi día",
    "no hay nadie como vos",
    "sos mi lugar favorito",
    "cada día te quiero más",
    "sos un sueño hecho realidad",
    "me encanta tu sonrisa",
    "sos mi persona favorita",
    "gracias por existir",
    "sos pura magia",
    "conmigo siempre, para siempre"
  ];

  const bouquet = document.getElementById('bouquet');
  const subtitle = document.getElementById('subtitle');
  const addBtn = document.getElementById('add-btn');
  const counter = document.getElementById('counter');
  const emptyHint = document.getElementById('empty-hint');
  const heartsContainer = document.getElementById('hearts-container');

  const MAX_FLOWERS = 12;
  let flowerCount = 0;
  let usedPhrases = [];

  const positions = [
    {left: 50, bottom: 0, rot: 0, scale: 1, stem: 70},
    {left: 40, bottom: 1, rot: -10, scale: 0.9, stem: 68},
    {left: 60, bottom: 1, rot: 10, scale: 0.9, stem: 68},
    {left: 32, bottom: 4, rot: -18, scale: 0.82, stem: 62},
    {left: 68, bottom: 4, rot: 18, scale: 0.82, stem: 62},
    {left: 44, bottom: 20, rot: -6, scale: 0.9, stem: 76},
    {left: 56, bottom: 20, rot: 6, scale: 0.9, stem: 76},
    {left: 35, bottom: 22, rot: -14, scale: 0.78, stem: 68},
    {left: 65, bottom: 22, rot: 14, scale: 0.78, stem: 68},
    {left: 50, bottom: 0, rot: 0, scale: 0.85, stem: 80},
    {left: 42, bottom: 0, rot: -9, scale: 0.72, stem: 72},
    {left: 58, bottom: 0, rot: 9, scale: 0.72, stem: 72}
  ];

  function makeFlower(pos, delay) {
    const wrap = document.createElement('div');
    wrap.className = 'flower';
    wrap.style.left = pos.left + '%';
    wrap.style.bottom = pos.bottom + 'px';
    wrap.style.transform = `translateX(-50%) rotate(${pos.rot}deg) scale(${pos.scale})`;
    wrap.style.animationDelay = (delay * 0.05) + 's, ' + (Math.random()*2) + 's';

    const stemHeight = pos.stem || 70;
    const stem = document.createElement('div');
    stem.className = 'stem';
    stem.style.height = stemHeight + 'px';
    wrap.appendChild(stem);

    const petalGroup = document.createElement('div');
    petalGroup.className = 'petal-group';
    petalGroup.style.bottom = stemHeight + 'px';
    petalGroup.style.width = '40px';
    petalGroup.style.height = '40px';

    const petalAngles = [0, 60, 120, 180, 240, 300];
    petalAngles.forEach(angle => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = '50%';
      petal.style.top = '50%';
      petal.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-11px)`;
      petalGroup.appendChild(petal);
    });

    const center = document.createElement('div');
    center.className = 'flower-center';
    petalGroup.appendChild(center);

    wrap.appendChild(petalGroup);
    return wrap;
  }

  function spawnHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '♥';
    const left = Math.random() * 100;
    const duration = 6 + Math.random() * 5;
    const size = 14 + Math.random() * 16;
    const drift = (Math.random() * 60 - 30) + 'px';
    heart.style.left = left + '%';
    heart.style.fontSize = size + 'px';
    heart.style.animationDuration = duration + 's';
    heart.style.setProperty('--drift', drift);
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 200);
  }

  setInterval(spawnHeart, 550);
  for (let i = 0; i < 5; i++) setTimeout(spawnHeart, i * 300);

  function pickPhrase() {
    if (usedPhrases.length >= phrases.length) usedPhrases = [];
    let available = phrases.filter(p => !usedPhrases.includes(p));
    const phrase = available[Math.floor(Math.random() * available.length)];
    usedPhrases.push(phrase);
    return phrase;
  }

  function showSubtitle(text) {
    subtitle.classList.remove('show');
    setTimeout(() => {
      subtitle.textContent = text;
      subtitle.classList.add('show');
    }, 200);
  }

  addBtn.addEventListener('click', () => {
    if (flowerCount >= MAX_FLOWERS) return;

    if (flowerCount === 0) {
      emptyHint.style.opacity = '0';
    }

    const pos = positions[flowerCount];
    const flower = makeFlower(pos, flowerCount);
    bouquet.appendChild(flower);

    flowerCount++;
    counter.textContent = flowerCount + (flowerCount === 1 ? ' flor' : ' flores');

    showSubtitle(pickPhrase());

    if (flowerCount >= MAX_FLOWERS) {
      addBtn.disabled = true;
      addBtn.textContent = 'Tu ramo está completo';
      setTimeout(() => showSubtitle('sos mi ramo favorito de todos'), 900);
    }
  });