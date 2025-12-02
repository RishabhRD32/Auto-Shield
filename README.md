# 🛡️ Auto-Shield: Self-Learning Web Defense

 **A privacy-first, client-side browser extension that detects Zero-Day Phishing and Social Engineering attacks using Active Learning.**

---

## 📖 About The Project

**Auto-Shield** is an experimental cybersecurity tool designed to address the limitations of traditional, signature-based antivirus systems. While standard security tools rely on "blacklists" (which are often too slow to catch new threats), Auto-Shield employs a **proactive, behavioral approach**.

It operates entirely within the browser (Client-Side), analyzing the visual structure (DOM) and semantic content of a webpage in real-time. If a site exhibits suspicious patterns—such as "Dark Patterns," fake urgency, or hidden overlays—Auto-Shield triggers a warning.

Its core innovation is **Active Learning**: When the system is "Unsure" (Risk Score 30-80%), it asks the user for verification. If the user trusts the site, the system updates its local weights instantly, learning to recognize that site in the future without needing a server update.

### 🚀 Key Features
* **Privacy-First Architecture:** No browsing history or data is ever sent to a cloud server. All processing happens locally on the device.
* **Hybrid Detection Logic:** scans for both **Visual Anomalies** (e.g., hidden buttons, insecure password fields) and **Semantic Urgency** (e.g., keywords like "Immediate Action," "Verify Account").
* **Active Learning Loop:** A "Human-in-the-Loop" mechanism that allows the model to self-train and reduce false positives based on user feedback.
* **Zero-Latency Protection:** Decision making happens in < 50ms.

---

## 🛠️ Tech Stack

* **Platform:** Google Chrome Extension API (**Manifest V3**)
* **Languages:** JavaScript (ES6+), HTML5, CSS3
* **Logic:** Heuristic Scoring & DOM Analysis
* **Storage:** Chrome Local Storage API (for persisting learned weights)

---

## 📂 Directory Structure

Ensure your project folder looks like this before installing:

```text
AutoShield_Prototype/
├── manifest.json      # Configuration and Permissions
├── content.js         # The Logic Core (Detection & Learning)
├── styles.css         # UI Styling (Overlay & Badges)
├── icon.png           # Extension Icon (128x128px)
└── trap.html          # (Optional) Test file to simulate a phishing attack
