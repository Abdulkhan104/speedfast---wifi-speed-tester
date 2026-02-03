const startBtn = document.getElementById('start-btn');
const speedVal = document.getElementById('speed-value');
const gaugeFill = document.getElementById('gauge-fill');
const dlVal = document.getElementById('download-val');
const ulVal = document.getElementById('upload-val');
const pingVal = document.getElementById('ping-val');
const jitterVal = document.getElementById('jitter-val');

let running = false;

async function fetchIp() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    document.getElementById('ip-address').innerText = data.ip;
  } catch (e) { document.getElementById('ip-address').innerText = 'Local Network'; }
}

function simulateTest() {
  if(running) return;
  running = true;
  startBtn.innerText = 'TESTING...';
  startBtn.disabled = true;

  let phase = 'ping';
  let progress = 0;

  const interval = setInterval(() => {
    progress += 2;
    
    if (progress < 30) {
      // Ping Phase
      const p = Math.floor(Math.random() * 10) + 12;
      const j = Math.floor(Math.random() * 4) + 1;
      pingVal.innerText = p;
      jitterVal.innerText = j;
    } else if (progress < 65) {
      // Download Phase
      const speed = (Math.random() * 50 + 150).toFixed(1);
      speedVal.innerText = speed;
      dlVal.innerText = speed;
      const rotate = (speed / 300) * 180 - 45;
      gaugeFill.style.transform = `rotate(${rotate}deg)`;
    } else if (progress < 95) {
      // Upload Phase
      const speed = (Math.random() * 20 + 40).toFixed(1);
      speedVal.innerText = speed;
      ulVal.innerText = speed;
      const rotate = (speed / 300) * 180 - 45;
      gaugeFill.style.transform = `rotate(${rotate}deg)`;
    } else {
      // Finish
      clearInterval(interval);
      speedVal.innerText = dlVal.innerText;
      const finalRotate = (parseFloat(dlVal.innerText) / 300) * 180 - 45;
      gaugeFill.style.transform = `rotate(${finalRotate}deg)`;
      startBtn.innerText = 'TEST AGAIN';
      startBtn.disabled = false;
      running = false;
    }
  }, 100);
}

fetchIp();
startBtn.addEventListener('click', simulateTest);