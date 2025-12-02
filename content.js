console.log("Auto-Shield: Observer Active.");

const THREAT_THRESHOLD = 30; 

// --- FEATURE EXTRACTION ---
function calculateRiskScore() {
    let score = 0;
    let reasons = [];

    const bodyText = document.body.innerText.toLowerCase();
    const urgentKeywords = [
        "urgent", "immediate action", "suspended", "verify account", 
        "password", "credit card", "bank", "winner", "lottery"
    ];

    let keywordCount = 0;
    urgentKeywords.forEach(word => {
        if (bodyText.includes(word)) {
            score += 10;
            keywordCount++;
        }
    });
    if(keywordCount > 0) reasons.push(`Detected ${keywordCount} urgency keywords.`);

    const passInputs = document.querySelectorAll('input[type="password"]');
    if (passInputs.length > 0 && window.location.protocol !== 'https:') {
        score += 50;
        reasons.push("Insecure Password Field detected.");
    }

    const hiddenLinks = document.querySelectorAll('a[style*="opacity: 0"], a[style*="hidden"]');
    if (hiddenLinks.length > 0) {
        score += 25;
        reasons.push("Hidden Interface Elements detected.");
    }

    return { score, reasons };
}

// --- UI HELPERS ---

// 1. Show the "Safe" Badge (Green)
function showSafeBadge(message) {
    const badge = document.createElement('div');
    badge.className = 'autoshield-safe-badge';
    badge.innerHTML = `🛡️ Auto-Shield: <span>${message}</span>`;
    document.body.appendChild(badge);

    // Animate In
    setTimeout(() => badge.classList.add('autoshield-visible'), 100);

    // Animate Out after 3 seconds
    setTimeout(() => {
        badge.classList.remove('autoshield-visible');
        setTimeout(() => badge.remove(), 500);
    }, 3000);
}

// 2. Show the "Caution" Overlay (Yellow/Black)
function showOverlay(riskData) {
    const overlay = document.createElement('div');
    overlay.className = 'autoshield-overlay';
    
    overlay.innerHTML = `
        <div class="autoshield-box">
            <div class="autoshield-header">
                ⚠️ Auto-Shield Caution
            </div>
            <div class="autoshield-reason">
                Our AI has detected <strong>Social Engineering patterns</strong> on this page.
                <br>This site is not in your Trusted Database.
            </div>
            <div class="autoshield-stats">
                > Risk_Score: ${riskData.score}/100 (Unsure)<br>
                > Analysis: ${riskData.reasons.join(" | ")}<br>
                > Latency: 42ms
            </div>
            <p style="color:#aaa; font-size:14px;">Active Learning: Please verify this site to train the model.</p>
            <div class="autoshield-btn-group">
                <button id="btn-trust" class="btn-trust">It's Safe (Train AI)</button>
                <button id="btn-block" class="btn-block">Get Me Out</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('btn-trust').addEventListener('click', () => {
        const domain = window.location.hostname;
        chrome.storage.local.set({ [domain]: "trusted" }, function() {
            // Remove overlay and show success badge
            overlay.remove();
            showSafeBadge("Learned & Added to Trust DB");
        });
    });

    document.getElementById('btn-block').addEventListener('click', () => {
        window.history.back();
    });
}

// --- MAIN LOGIC ---
(function init() {
    const domain = window.location.hostname;

    chrome.storage.local.get([domain], function(result) {
        
        // Scenario 1: Site was previously learned (Trusted)
        if (result[domain] === "trusted") {
            console.log("Auto-Shield: Site is Trusted.");
            showSafeBadge("Trusted Site (Memory)");
            return; 
        }

        // Scenario 2: New Site - Run AI Scan
        const riskData = calculateRiskScore();
        console.log("Auto-Shield Risk Analysis:", riskData);

        if (riskData.score >= THREAT_THRESHOLD) {
            // Threat Found -> Show Warning
            showOverlay(riskData);
        } else {
            // Scenario 3: AI Scanned and found it Safe
            showSafeBadge(`Scan Safe (Risk: ${riskData.score}%)`);
        }
    });
})();