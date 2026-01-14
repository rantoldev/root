// --- PUMP.FUN & HELIUS CONFIGURATION ---
// PASTE YOUR CONTRACT ADDRESS (CA) HERE
const GLOBAL_PUMP_CA = 'capaste';

// HELIUS API CONFIGURATION
const HELIUS_API_KEY = '76718fca-cbed-4965-b8de-4c7169529f6e';
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=76718fca-cbed-4965-b8de-4c7169529f6e`;
const HELIUS_WS_URL = `wss://mainnet.helius-rpc.com/?api-key=76718fca-cbed-4965-b8de-4c7169529f6e`;

// Global variables
const TOTAL_SUPPLY = 1000000000; // 1 billion tokens
let currentTheme = 'default';

// DOM Elements
const terminalScreen = document.getElementById('terminalScreen');
const terminalOutput = document.getElementById('terminal-output');
const countdownTimer = document.getElementById('countdownTimer');
const redPillBtn = document.getElementById('redPillBtn');
const bluePillBtn = document.getElementById('bluePillBtn');
const hackBtn = document.getElementById('hackBtn');
const oracleBtn = document.getElementById('oracleBtn');
const scanMatrixBtn = document.getElementById('scanMatrixBtn');
const overrideSentinelBtn = document.getElementById('overrideSentinelBtn');
const whiteRabbitBtn = document.getElementById('whiteRabbitBtn');
const dejaVuBtn = document.getElementById('dejaVuBtn');
const manifestDestinyBtn = document.getElementById('manifestDestinyBtn');

// Utility Functions
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    errorMessage.classList.add('shake');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
        errorMessage.classList.remove('shake');
    }, 5000);
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.classList.remove('hidden');
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 3000);
}

function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

// Sound System
let soundEnabled = false;
function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('soundToggle');
    if (soundEnabled) {
        btn.innerHTML = '<i class="fas fa-volume-up"></i>';
        btn.classList.remove('opacity-50');
    } else {
        btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        btn.classList.add('opacity-50');
    }
}
window.toggleSound = toggleSound;

// Narrative
const narrativeLines = [
    "Wake up, Neo...",
    "The Matrix has you.",
    "Follow the white rabbit.",
    "Knock, knock, Neo.",
    "",
    "System initializing... $TERM token detected.",
    "Welcome to the Matrix Terminal.",
    "You take the red pill - you stay in Wonderland, and I show you how deep the rabbit hole goes.",
    "You take the blue pill - the story ends, you wake up in your bed and believe whatever you want to believe.",
    "",
    "But remember: There is no spoon... and there might be a rug pull.",
    "Agents are watching. Whales are lurking. Choose wisely.",
    "",
    "I know what you're thinking, 'cause I'm not reading your mind. I'm reading your wallet. And you're thinking: To the moon!",
    "",
    "$TERM: The token that breaks the chains of fiat slavery.",
    "Or is it just another illusion?",
    "",
    "Launch sequence initiated. Choose your pill."
];

let currentLineIndex = 0;
let isTypingPaused = false;
let pauseTimeout = null;

function pauseTyping(duration = 3000) {
    isTypingPaused = true;
    if (pauseTimeout) clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
        isTypingPaused = false;
        // The startNarrative loop will resume itself on next tick if it was waiting
    }, duration);
}

function typeLine(line, callback) {
    let i = 0;
    const interval = setInterval(() => {
        if (isTypingPaused) return; // Wait if paused

        if (i < line.length) {
            terminalOutput.innerHTML += line.charAt(i);
            i++;
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        } else {
            clearInterval(interval);
            terminalOutput.innerHTML += '<br>';
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            if (callback) callback();
        }
    }, 50);
}

function startNarrative() {
    if (currentLineIndex < narrativeLines.length) {
        if (isTypingPaused) {
            setTimeout(startNarrative, 500); // Check again soon
            return;
        }
        typeLine(narrativeLines[currentLineIndex], () => {
            currentLineIndex++;
            setTimeout(startNarrative, 1000);
        });
    }
}

// Countdown
const launchTime = new Date();
launchTime.setHours(launchTime.getHours() + 1); // Demo: 1 hour from now

function updateCountdown() {
    const now = new Date();
    const diff = launchTime - now;
    if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        countdownTimer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        countdownTimer.textContent = 'LAUNCHED';
    }
}

// Button interactions
const clearMindBtn = document.getElementById('clearMindBtn');
const resetSystemBtn = document.getElementById('resetSystemBtn');

clearMindBtn.addEventListener('click', () => {
    pauseTyping(8000);
    terminalOutput.innerHTML = '';
    const crypticLines = [
        "01110010 01100101 01110011 01100101 01110100",
        "Συστημικός καθαρισμός σε εξέλιξη...",
        "ERROR_CORRUPTION_DETECTED: Reality.exe not responding",
        "Parsing neural pathways... [||||||||||] 100%",
        "The mind is the only thing that cannot be hacked... yet."
    ];

    let delay = 0;
    crypticLines.forEach(line => {
        setTimeout(() => {
            addToTerminal(line);
        }, delay);
        delay += 800;
    });

    setTimeout(() => {
        addToTerminal("> Memory wiped. Mind cleared. System recalibrated.");
    }, delay);
});

resetSystemBtn.addEventListener('click', () => {
    terminalOutput.innerHTML = '';
    currentLineIndex = 0;
    isTypingPaused = false;
    if (pauseTimeout) clearTimeout(pauseTimeout);
    document.body.classList.remove('glitch-active'); // Clear any active glitches

    addToTerminal("Resetting Matrix connection... Wake up, Neo.");

    setTimeout(() => {
        showDashboard();
    }, 1500);
});

redPillBtn.addEventListener('click', () => {
    pauseTyping(5000);
    addToTerminal("> Executing: ./take_red_pill");
    setTimeout(() => {
        window.open(`https://pump.fun/coin/${GLOBAL_PUMP_CA}`, '_blank');
    }, 500);
});

bluePillBtn.addEventListener('click', () => {
    pauseTyping(5000);
    addToTerminal("> Executing: ./take_blue_pill");
    addToTerminal("You chose the blue pill. Back to fiat dreams... or nightmares?");
});

hackBtn.addEventListener('click', () => {
    pauseTyping(5000);
    addToTerminal("> Executing: ./hack_contract");
    navigator.clipboard.writeText(GLOBAL_PUMP_CA);
    addToTerminal("Contract address copied to clipboard. System hacked.");
});

oracleBtn.addEventListener('click', () => {
    pauseTyping(8000);
    addToTerminal("> Executing: ./consult_oracle");
    addToTerminal("Consulting the Oracle...");
    setTimeout(() => {
        addToTerminal("Roadmap: Fair launch -> 1M MC -> KOL takeover -> CEX listing");
        addToTerminal("Metrics: System optimal. Network load: 3.4%. Moon progress: 42%");
    }, 2000);
});

scanMatrixBtn.addEventListener('click', () => {
    pauseTyping(7000);
    addToTerminal("> Executing: ./scan_matrix");
    addToTerminal("Scanning for glitches... anomalous patterns detected in sector 4.");
    setTimeout(() => {
        addToTerminal("Result: 14 agents identified. Whales positioning for liquidity event.");
    }, 1500);
});

overrideSentinelBtn.addEventListener('click', () => {
    pauseTyping(10000);
    addToTerminal("> Executing: ./override_sentinel");
    addToTerminal("CAUTION: Bypassing centralized firewalls...");
    let i = 0;
    const hackInterval = setInterval(() => {
        if (i < 3) {
            addToTerminal(`[BYPASSING_LAYER_${i + 1}]... OK`);
            i++;
        } else {
            clearInterval(hackInterval);
            addToTerminal("SENTINEL OVERRIDDEN. Anonymous mode: ENHANCED.");
        }
    }, 1000);
});

whiteRabbitBtn.addEventListener('click', () => {
    pauseTyping(5000);
    addToTerminal("> Executing: ./follow_white_rabbit");
    const riddles = [
        "What is real? How do you define 'real'?",
        "The answer is out there, Neo. It's looking for you.",
        "Everything that has a beginning has an end."
    ];
    addToTerminal(`White Rabbit: ${riddles[Math.floor(Math.random() * riddles.length)]}`);
});

dejaVuBtn.addEventListener('click', () => {
    pauseTyping(6000);
    addToTerminal("> Executing: ./trigger_deja_vu");
    addToTerminal("A glitch in the Matrix... didn't I just see that buy order?");
    document.body.classList.add('glitch-active');
    setTimeout(() => {
        document.body.classList.remove('glitch-active');
        addToTerminal("Timeline synchronized. Carry on.");
    }, 2000);
});

manifestDestinyBtn.addEventListener('click', () => {
    pauseTyping(8000);
    addToTerminal("> Executing: ./manifest_destiny");
    addToTerminal("Calculating future trajectory of $TERM...");
    setTimeout(() => {
        const mc = (Math.random() * 100).toFixed(1);
        addToTerminal(`Probability of Moon: 99.9%. Projected MC: $${mc}M`);
    }, 2000);
});

function addToTerminal(text) {
    const block = document.createElement('div');
    block.className = 'command-output-block';
    block.innerHTML = `<div class="typing-line">${text}</div>`;
    terminalOutput.appendChild(block);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Show Dashboard
function showDashboard() {
    terminalScreen.classList.remove('hidden');
    startNarrative();
}

// Eye Tracking Logic
const eyeIris = document.getElementById('eye-iris');
const watchingEye = document.getElementById('watching-eye');

if (eyeIris && watchingEye) {
    document.addEventListener('mousemove', (e) => {
        const rect = watchingEye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = Math.min(6, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 50);

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        eyeIris.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    showDashboard();
    setInterval(updateCountdown, 1000); // Only set once
});

// Make functions globally available (original)