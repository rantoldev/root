// --- ROOT TERMINAL CONFIGURATION ---
const GLOBAL_PUMP_CA = 'Click TO COPY TERM CA*****'; // Update with real CA
const HELIUS_API_KEY = '76718fca-cbed-4965-b8de-4c7169529f6e';

// DOM Elements
const terminalOutput = document.getElementById('terminal-output');
const nodeCountDisplay = document.getElementById('nodeCount');
const caDisplay = document.getElementById('ca-display-truncated');

// Buttons
const btnRoot = document.getElementById('btn-root-access');
const btnLiquidity = document.getElementById('btn-inject-liquidity');
const btnMempool = document.getElementById('btn-scan-mempool');
const btnSnipe = document.getElementById('btn-execute-snipe');
const btnCopy = document.getElementById('btn-copy-ca');
const btnClear = document.getElementById('btn-clear');

// State
let isTyping = false;

// --- UTILITIES ---

function showToast(msg) {
    const toast = document.getElementById('notification-toast');
    if (toast) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

function addToTerminal(text, type = 'info') {
    const line = document.createElement('div');
    line.className = 'font-mono text-sm md:text-base py-1 border-l-2 pl-3 animate-fade-in';

    // Timestamp
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const timestamp = `<span class="text-gray-600 text-[10px] mr-2">[${time}]</span>`;

    if (type === 'error') {
        line.style.borderColor = '#ff3333';
        line.innerHTML = `${timestamp}<span class="text-red-500">${text}</span>`;
    } else if (type === 'success') {
        line.style.borderColor = '#00ff41';
        line.innerHTML = `${timestamp}<span class="text-green-400">${text}</span>`;
    } else if (type === 'warn') {
        line.style.borderColor = '#ffff00';
        line.innerHTML = `${timestamp}<span class="text-yellow-400">${text}</span>`;
    } else {
        line.style.borderColor = 'rgba(255,255,255,0.2)';
        line.innerHTML = `${timestamp}<span class="text-gray-300">${text}</span>`;
    }

    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function typeText(text, callback) {
    if (isTyping) return;
    isTyping = true;

    const line = document.createElement('div');
    line.className = 'font-mono text-sm md:text-base py-1 border-l-2 border-green-500/50 pl-3 text-green-400';
    terminalOutput.appendChild(line);

    let i = 0;
    const speed = 20; // ms

    function step() {
        if (i < text.length) {
            line.innerHTML += text.charAt(i);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            i++;
            setTimeout(step, speed);
        } else {
            isTyping = false;
            if (callback) callback();
        }
    }
    step();
}

// --- CORE LOGIC ---

// Custom Cursor Logic
const customCursor = document.getElementById('customCursor');
if (customCursor) {
    document.addEventListener('mousemove', (e) => {
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        });
    });

    // Add hover effect for clickable elements
    const interactables = document.querySelectorAll('a, button, input, [role="button"]');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            customCursor.style.width = '24px'; // Expand on hover
            customCursor.style.height = '24px';
            customCursor.style.mixBlendMode = 'exclusion'; // Cool inversion effect
        });
        el.addEventListener('mouseleave', () => {
            customCursor.style.width = '8px'; // Back to dot
            customCursor.style.height = '8px';
            customCursor.style.mixBlendMode = 'difference';
        });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        customCursor.style.backgroundColor = 'var(--term-green)';
    });

    document.addEventListener('mouseup', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
        customCursor.style.backgroundColor = '#ffffff';
    });
}

// 1. 3D Tilt Effect
const glassPanel = document.getElementById('data-glass-panel');
if (glassPanel) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return; // Disable on mobile

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Calculate percentage from center (-1 to 1)
        const xPct = (clientX / innerWidth - 0.5) * 2;
        const yPct = (clientY / innerHeight - 0.5) * 2;

        // Max rotation degrees
        const maxRot = 5;

        // RotateY depends on X position, RotateX depends on Y position (inverted)
        const rotY = xPct * maxRot;
        const rotX = -yPct * maxRot;

        glassPanel.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
}

// 2. Button Handlers
if (btnRoot) {
    btnRoot.addEventListener('click', () => {
        addToTerminal("> ./sudo_root", "info");
        setTimeout(() => {
            addToTerminal("ELEVATING PRIVILEGES...", "warn");
            setTimeout(() => {
                addToTerminal("ACCESS GRANTED. YOU ARE NOW SUPERUSER.", "success");
            }, 1000);
        }, 500);
    });
}

if (btnLiquidity) {
    btnLiquidity.addEventListener('click', () => {
        addToTerminal("> ./inject_liquidity -f --max", "info");
        setTimeout(() => {
            addToTerminal("CONNECTING TO LIQUIDITY POOLS...", "info");
            setTimeout(() => {
                addToTerminal("INJECTING 0.6 SOL...", "success");
            }, 1200);
        }, 400);
    });
}

if (btnMempool) {
    btnMempool.addEventListener('click', () => {
        addToTerminal("> ./scan_mempool", "info");
        setTimeout(() => {
            addToTerminal("SCANNING PENDING BLOCKS...", "warn");
            // Simulate finding something
            setTimeout(() => {
                addToTerminal("WHALE TRANSACTION DETECTED: 1 SOL -> BUY", "success");
            }, 1500);
        }, 300);
    });
}

if (btnSnipe) {
    btnSnipe.addEventListener('click', () => {
        addToTerminal("> ./execute_snipe", "error"); // Red for aggressive action
        setTimeout(() => {
            addToTerminal("TARGET LOCKED. CALCULATING GAS...", "warn");
            setTimeout(() => {
                addToTerminal("TX SENT. WAITING CONFIRMATION...", "info");
                setTimeout(() => {
                    addToTerminal("SNIPED SUCCESSFULLY. ENTRY: BLOCK 0", "success");
                }, 2000);
            }, 800);
        }, 300);
    });
}

if (btnCopy) {
    btnCopy.addEventListener('click', () => {
        if (GLOBAL_PUMP_CA) {
            navigator.clipboard.writeText(GLOBAL_PUMP_CA).then(() => {
                showToast("ADDRESS COPIED");
                addToTerminal(`COPIED ADDRESS: ${GLOBAL_PUMP_CA}`, "success");
            }).catch(console.error);
        }
    });
}

if (btnClear) {
    btnClear.addEventListener('click', () => {
        terminalOutput.innerHTML = '';
        addToTerminal("LOGS CLEARED.", "info");
    });
}


// 3. Init Narrative
function initSystem() {
    typeText("INITIALIZING ROOT PROTOCOL v9.0...", () => {
        setTimeout(() => {
            addToTerminal("CONNECTION SECURE.", "success");
            addToTerminal("CONNECTED TO MAINNET.", "success");
            addToTerminal("READY FOR COMMAND.", "info");
        }, 500);
    });
}

// 4. Fake Metrics
setInterval(() => {
    if (nodeCountDisplay) {
        const base = 1337;
        const flux = Math.floor(Math.random() * 50);
        nodeCountDisplay.textContent = (base + flux).toLocaleString();
    }
}, 3000);

// Start
// 5. Scroll Interaction & Observer
function initScrollObserver() {
    console.log("Initializing Scroll Observer...");
    const sections = document.querySelectorAll('main, section');
    const indicator = document.getElementById('page-indicator');

    if (!sections.length || !indicator) {
        console.error("Scroll Observer Error: Sections or Indicator not found", { sections, indicator });
        return;
    }

    // Scramble Text Effect
    let scrambleInterval;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

    function setScrambleText(el, finalCheck) {
        if (!el) return;
        let iterations = 0;

        clearInterval(scrambleInterval);

        scrambleInterval = setInterval(() => {
            el.innerText = finalCheck
                .split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return finalCheck[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iterations >= finalCheck.length) {
                clearInterval(scrambleInterval);
            }

            iterations += 1 / 3; // Speed of resolve
        }, 30);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Activate Section
                entry.target.classList.add('active-section');

                // Update Header
                const title = entry.target.getAttribute('data-title');
                if (title) {
                    setScrambleText(indicator, title);
                }
            } else {
                // Optional: Re-trigger animation when scrolling back
                entry.target.classList.remove('active-section');
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% visible
    });

    sections.forEach(sec => observer.observe(sec));
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    initSystem();
    initScrollObserver();

    // Explicitly check for the first section to avoid "empty" load states
    const firstSection = document.querySelector('main');
    if (firstSection && window.scrollY < 100) {
        firstSection.classList.add('active-section');
    }

    // Force notification to confirm update
    setTimeout(() => {
        showToast("SYSTEM UPDATED v2.3: LOGIC RE-CALIBRATED");
    }, 2000);
});
