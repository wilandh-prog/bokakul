// Kontoplan (förenklad svensk kontoplan)
const accounts = {
    "Tillgångar": [
        { number: "1210", name: "Maskiner" },
        { number: "1219", name: "Ack. avskrivningar maskiner" },
        { number: "1220", name: "Inventarier" },
        { number: "1229", name: "Ack. avskrivningar inventarier" },
        { number: "1240", name: "Bilar" },
        { number: "1249", name: "Ack. avskrivningar på bilar" },
        { number: "1250", name: "Datorer" },
        { number: "1259", name: "Ack. avskrivningar på datorer" },
        { number: "1400", name: "Varulager" },
        { number: "1510", name: "Kundfordringar" },
        { number: "1580", name: "Fordran kontokort" },
        { number: "1630", name: "Skattekonto" },
        { number: "1710", name: "Förutbetald hyra" },
        { number: "1730", name: "Förutbetald försäkring" },
        { number: "1790", name: "Upplupna intäkter och förutbetalda kostnader" },
        { number: "1910", name: "Kassa" },
        { number: "1920", name: "Plusgiro" },
        { number: "1930", name: "Företagskonto" },
        { number: "1940", name: "Bank" }
    ],
    "Skulder och Eget Kapital": [
        { number: "2010", name: "Eget kapital" },
        { number: "2012", name: "Skattekonto" },
        { number: "2013", name: "Eget uttag" },
        { number: "2018", name: "Egen insattning" },
        { number: "2019", name: "Årets resultat" },
        { number: "2081", name: "Aktiekapital" },
        { number: "2091", name: "Balanserad vinst" },
        { number: "2098", name: "Föregående års vinst" },
        { number: "2099", name: "Årets resultat" },
        { number: "2350", name: "Banklån" },
        { number: "2440", name: "Leverantörsskulder" },
        { number: "2490", name: "Övriga skulder" },
        { number: "2610", name: "Utgående moms, 25%" },
        { number: "2620", name: "Utgående moms, 12%" },
        { number: "2630", name: "Utgående moms, 6%" },
        { number: "2615", name: "Beräknad utgående EU-moms" },
        { number: "2640", name: "Ingående moms" },
        { number: "2645", name: "Beräknad ingående EU-moms" },
        { number: "2650", name: "Momsredovisning" },
        { number: "2710", name: "Personalens skatter" },
        { number: "2730", name: "Skuld for sociala avgifter" },
        { number: "2960", name: "Upplupen ränta" },
        { number: "2990", name: "Upplupna kostnader och förutbetalda intakter" }
    ],
    "Intäkter": [
        { number: "3010", name: "Varuförsäljning" },
        { number: "3030", name: "Utförda uppdrag" },
        { number: "3730", name: "Lämnade rabatter" },
        { number: "3960", name: "Kursvinster" }
    ],
    "Kostnader": [
        { number: "4010", name: "Varuinköp" },
        { number: "4730", name: "Erhållna rabatter" },
        { number: "4900", name: "Varulagerforandring" },
        { number: "5010", name: "Lokalhyra" },
        { number: "5060", name: "Städning" },
        { number: "5410", name: "Förbrukningsinventarier" },
        { number: "5460", name: "Forbrukningsmaterial" },
        { number: "5610", name: "Driftkostnader bilar" },
        { number: "5800", name: "Resekostnader" },
        { number: "5900", name: "Reklam" },
        { number: "6040", name: "Kontokortsavgifter" },
        { number: "6100", name: "Kontorsmaterial" },
        { number: "6200", name: "Tele och post" },
        { number: "6310", name: "Försäkringar" },
        { number: "6990", name: "Övriga kostnader" },
        { number: "7010", name: "Löner" },
        { number: "7510", name: "Arbetsgivaravgifter" },
        { number: "7832", name: "Avskrivning mask/inve" },
        { number: "7834", name: "Avskrivning bilar" },
        { number: "7960", name: "Kursförlust" }
    ],
    "Finansiella poster": [
        { number: "8310", name: "Ränteintäkter" },
        { number: "8320", name: "Erhållen dröjsmålsränta" },
        { number: "8410", name: "Räntekostnader" },
        { number: "8420", name: "Erlagd dröjmålsränta" },
        { number: "8999", name: "Årets resultat" }
    ]
};

// Affärshändelser med rätta svar
const defaultEvents = [
    {
        description: "Du säljer varor för 10 000 kr på kredit exklusive moms. Kontera denna händelse.",
        hint: "Tänk på att en försäljning på kredit innebär att kunden betalar senare (kundfordran). Glöm inte momsen som är 25%!",
        correctAnswer: [
            { account: "1510", side: "debet", amount: 12500 },
            { account: "3010", side: "kredit", amount: 10000 },
            { account: "2610", side: "kredit", amount: 2500 }
        ],
        level: 1
    },
    {
        description: "Du betalar lokalhyra med 5 000 kr från banken. Kontera denna händelse.",
        hint: "Hyra är en kostnad och betalning sker från banken.",
        correctAnswer: [
            { account: "5010", side: "debet", amount: 5000 },
            { account: "1930", side: "kredit", amount: 5000 }
        ],
        level: 1
    },
    {
        description: "Du köper in varor för 8 000 kr exklusive moms på kredit. Kontera denna händelse.",
        hint: "Inköp på kredit innebär leverantörsskuld. Momsen är avdragsgill (ingående moms).",
        correctAnswer: [
            { account: "4010", side: "debet", amount: 8000 },
            { account: "2640", side: "debet", amount: 2000 },
            { account: "2440", side: "kredit", amount: 10000 }
        ],
        level: 1
    },
    {
        description: "En kund betalar 15 000 kr till ditt bankkonto. Kontera denna händelse.",
        hint: "Betalning från kund innebär att kundfordran minskar och banken ökar.",
        correctAnswer: [
            { account: "1930", side: "debet", amount: 15000 },
            { account: "1510", side: "kredit", amount: 15000 }
        ],
        level: 1
    },
    {
        description: "Du betalar leverantörsskuld på 7 500 kr från banken. Kontera denna händelse.",
        hint: "Betalning av skuld minskar både skulden och bankkontot.",
        correctAnswer: [
            { account: "2440", side: "debet", amount: 7500 },
            { account: "1930", side: "kredit", amount: 7500 }
        ],
        level: 1
    },
    {
        description: "Du säljer varor för 20 000 kr kontant (kassan) exklusive moms. Kontera denna händelse.",
        hint: "Kontant försäljning går till kassan. Glöm inte 25% moms!",
        correctAnswer: [
            { account: "1910", side: "debet", amount: 25000 },
            { account: "3010", side: "kredit", amount: 20000 },
            { account: "2610", side: "kredit", amount: 5000 }
        ],
        level: 2
    },
    {
        description: "Du betalar ut lön 30 000 kr från banken. Kontera denna händelse.",
        hint: "Lön är en kostnad som betalas från banken.",
        correctAnswer: [
            { account: "7010", side: "debet", amount: 30000 },
            { account: "1930", side: "kredit", amount: 30000 }
        ],
        level: 2
    },
    {
        description: "Du tar ut 3 000 kr från banken till kassan. Kontera denna händelse.",
        hint: "Pengarna flyttas från bank till kassa - båda är tillgångskonton.",
        correctAnswer: [
            { account: "1910", side: "debet", amount: 3000 },
            { account: "1930", side: "kredit", amount: 3000 }
        ],
        level: 2
    },
    {
        description: "Du har representationskostnader på 2 000 kr exklusive moms och betalar kontant. Kontera denna händelse.",
        hint: "Representation är en kostnad. Moms på representation är avdragsgill (ingående moms).",
        correctAnswer: [
            { account: "6990", side: "debet", amount: 2000 },
            { account: "2640", side: "debet", amount: 500 },
            { account: "1910", side: "kredit", amount: 2500 }
        ],
        level: 2
    },
    {
        description: "Du betalar arbetsgivaravgifter 9 450 kr från banken. Kontera denna händelse.",
        hint: "Arbetsgivaravgifter är en personalkostnad som betalas från banken.",
        correctAnswer: [
            { account: "7510", side: "debet", amount: 9450 },
            { account: "1930", side: "kredit", amount: 9450 }
        ],
        level: 2
    }
];

// Aktuella händelser (kan bytas ut med inladdade)
let events = [...defaultEvents];

// Spelvariabler
let currentEventIndex = 0;
let score = 0;
let level = 1;
let correctCount = 0;
let incorrectCount = 0;
let bookingRows = [];
let streak = 0;
let bestStreak = 0;
let highScore = 0;
let totalCorrect = 0;
let totalIncorrect = 0;
let levelStartTime = null;

// Sessionsstatistik (nollställs vid sidomladdning)
let sessionCorrect = 0;
let sessionIncorrect = 0;
const sessionStartTime = Date.now();

// Achievements
const achievements = {
    firstCorrect: { id: 'firstCorrect', name: 'Första steget', description: 'Svara rätt på din första fråga', icon: '🌟', unlocked: false },
    streak3: { id: 'streak3', name: 'Trepoängare', description: '3 rätt i rad', icon: '🔥', unlocked: false },
    streak5: { id: 'streak5', name: 'Het svit', description: '5 rätt i rad', icon: '💥', unlocked: false },
    streak10: { id: 'streak10', name: 'Ostoppbar', description: '10 rätt i rad', icon: '⚡', unlocked: false },
    score1000: { id: 'score1000', name: 'Tusingen', description: 'Nå 1000 poäng', icon: '💰', unlocked: false },
    score5000: { id: 'score5000', name: 'Poängproffs', description: 'Nå 5000 poäng', icon: '💎', unlocked: false },
    score10000: { id: 'score10000', name: 'Bokföringslegend', description: 'Nå 10000 poäng', icon: '👑', unlocked: false },
    level2: { id: 'level2', name: 'Nivå 2 mästare', description: 'Klara alla övningar på nivå 2', icon: '📈', unlocked: false },
    level3: { id: 'level3', name: 'Momsmästare', description: 'Klara alla övningar på nivå 3 (med 25% moms)', icon: '🏆', unlocked: false },
    perfect10: { id: 'perfect10', name: 'Perfektionist', description: '10 rätt utan fel', icon: '✨', unlocked: false },
    total50: { id: 'total50', name: 'Flitig student', description: '50 rätta svar totalt', icon: '📚', unlocked: false },
    total100: { id: 'total100', name: 'Expert', description: '100 rätta svar totalt', icon: '🎓', unlocked: false }
};

// Spara till localStorage
function saveProgress() {
    const data = {
        highScore,
        bestStreak,
        totalCorrect,
        totalIncorrect,
        achievements: Object.fromEntries(
            Object.entries(achievements).map(([key, val]) => [key, val.unlocked])
        )
    };
    localStorage.setItem('bokforingsakuten_progress', JSON.stringify(data));
}

// Ladda från localStorage
function loadProgress() {
    const saved = localStorage.getItem('bokforingsakuten_progress');
    if (saved) {
        const data = JSON.parse(saved);
        highScore = data.highScore || 0;
        bestStreak = data.bestStreak || 0;
        totalCorrect = data.totalCorrect || 0;
        totalIncorrect = data.totalIncorrect || 0;

        // Återställ achievements
        if (data.achievements) {
            Object.keys(data.achievements).forEach(key => {
                if (achievements[key]) {
                    achievements[key].unlocked = data.achievements[key];
                }
            });
        }
    }
}

// Kontrollera och lås upp achievements
function checkAchievements() {
    const newAchievements = [];

    // Första rätt
    if (!achievements.firstCorrect.unlocked && totalCorrect >= 1) {
        achievements.firstCorrect.unlocked = true;
        newAchievements.push(achievements.firstCorrect);
    }

    // Streak achievements
    if (!achievements.streak3.unlocked && streak >= 3) {
        achievements.streak3.unlocked = true;
        newAchievements.push(achievements.streak3);
    }
    if (!achievements.streak5.unlocked && streak >= 5) {
        achievements.streak5.unlocked = true;
        newAchievements.push(achievements.streak5);
    }
    if (!achievements.streak10.unlocked && streak >= 10) {
        achievements.streak10.unlocked = true;
        newAchievements.push(achievements.streak10);
    }

    // Poäng achievements
    if (!achievements.score1000.unlocked && score >= 1000) {
        achievements.score1000.unlocked = true;
        newAchievements.push(achievements.score1000);
    }
    if (!achievements.score5000.unlocked && score >= 5000) {
        achievements.score5000.unlocked = true;
        newAchievements.push(achievements.score5000);
    }
    if (!achievements.score10000.unlocked && score >= 10000) {
        achievements.score10000.unlocked = true;
        newAchievements.push(achievements.score10000);
    }

    // Totalt rätt
    if (!achievements.total50.unlocked && totalCorrect >= 50) {
        achievements.total50.unlocked = true;
        newAchievements.push(achievements.total50);
    }
    if (!achievements.total100.unlocked && totalCorrect >= 100) {
        achievements.total100.unlocked = true;
        newAchievements.push(achievements.total100);
    }

    // Perfektionist (10 rätt utan fel i en session)
    if (!achievements.perfect10.unlocked && correctCount >= 10 && incorrectCount === 0) {
        achievements.perfect10.unlocked = true;
        newAchievements.push(achievements.perfect10);
    }

    // Visa nya achievements
    newAchievements.forEach(achievement => {
        showAchievementPopup(achievement);
    });

    if (newAchievements.length > 0) {
        saveProgress();
        renderAchievements();
    }
}

// Visa achievement popup
function showAchievementPopup(achievement) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-info">
            <div class="achievement-title">Utmärkelse upplåst!</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.description}</div>
        </div>
    `;
    document.body.appendChild(popup);

    // Ta bort efter animation
    setTimeout(() => {
        popup.classList.add('fade-out');
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

// Rendera achievements i sidofältet
function renderAchievements() {
    const container = document.getElementById('achievements-list');
    if (!container) return;

    const unlockedCount = Object.values(achievements).filter(a => a.unlocked).length;
    const totalCount = Object.keys(achievements).length;

    container.innerHTML = `
        <div class="achievements-progress">
            ${unlockedCount} / ${totalCount} upplåsta
        </div>
        ${Object.values(achievements).map(a => `
            <div class="achievement-item ${a.unlocked ? 'unlocked' : 'locked'}">
                <span class="achievement-badge">${a.unlocked ? a.icon : '🔒'}</span>
                <div class="achievement-text">
                    <div class="achievement-item-name">${a.name}</div>
                    <div class="achievement-item-desc">${a.description}</div>
                </div>
            </div>
        `).join('')}
    `;
}

// Initialisera spelet
async function init() {
    loadProgress();
    renderAccountPlan();
    renderAchievements();
    setupEventListeners();
    updateStats();
    // Ladda nivå 1 som standard
    await loadLevel(1);
}

// Rendera kontoplanen
function renderAccountPlan() {
    const accountList = document.getElementById('account-list');
    let html = '';

    for (const [category, accountArray] of Object.entries(accounts)) {
        html += `
            <div class="account-group">
                <div class="account-group-title">${category}</div>
                ${accountArray.map(acc => `
                    <div class="account-item">
                        <span class="account-number">${acc.number}</span>
                        <span>${acc.name}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    accountList.innerHTML = html;
}

// Ladda en händelse
function loadEvent() {
    const event = events[currentEventIndex];
    document.getElementById('event-description').textContent = event.description;
    document.getElementById('event-counter').textContent = `Händelse ${currentEventIndex + 1} av ${events.length}`;
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('hint').style.display = 'none';
    document.getElementById('next-event').style.display = 'none';
    document.getElementById('check-answer').style.display = 'block';

    // Rensa bokföringsrader
    bookingRows = [];
    renderBookingRows();
    addBookingRow();

    // Scrolla till uppgiften
    const eventCard = document.querySelector('.event-card');
    if (eventCard) {
        eventCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Lägg till bokföringsrad
function addBookingRow() {
    bookingRows.push({
        account: '',
        debetAmount: '',
        kreditAmount: ''
    });
    renderBookingRows();
}

// Ta bort bokföringsrad
function removeBookingRow(index) {
    bookingRows.splice(index, 1);
    renderBookingRows();
}

// Rendera bokföringsrader
function renderBookingRows() {
    const container = document.getElementById('booking-entries');
    const event = events[currentEventIndex];

    // Hämta konton som används i uppgiften
    const usedAccountNumbers = event.correctAnswer.map(entry => entry.account);

    // Filtrera till bara relevanta konton
    const relevantAccounts = [];
    for (const accountArray of Object.values(accounts)) {
        for (const acc of accountArray) {
            if (usedAccountNumbers.includes(acc.number)) {
                relevantAccounts.push(acc);
            }
        }
    }
    relevantAccounts.sort((a, b) => a.number.localeCompare(b.number));

    container.innerHTML = bookingRows.map((row, index) => {
        return `
        <tr>
            <td colspan="2">
                <select class="account-select" data-index="${index}" data-field="account">
                    <option value="">Välj konto...</option>
                    ${relevantAccounts.map(acc => `
                        <option value="${acc.number}" ${row.account === acc.number ? 'selected' : ''}>
                            ${acc.number} - ${acc.name}
                        </option>
                    `).join('')}
                </select>
            </td>
            <td>
                <input type="number"
                       data-index="${index}"
                       data-field="debetAmount"
                       value="${row.debetAmount}"
                       placeholder="0"
                       min="0"
                       step="0.01">
            </td>
            <td>
                <input type="number"
                       data-index="${index}"
                       data-field="kreditAmount"
                       value="${row.kreditAmount}"
                       placeholder="0"
                       min="0"
                       step="0.01">
            </td>
            <td>
                <button class="btn-remove" data-index="${index}">X</button>
            </td>
        </tr>
    `}).join('');

    // Event listeners för inputs
    container.querySelectorAll('select, input').forEach(el => {
        el.addEventListener('change', handleInputChange);
        el.addEventListener('input', handleInputChange);
    });

    container.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            removeBookingRow(index);
        });
    });

    updateTotals();
}

// Uppdatera summering
function updateTotals() {
    const debetSum = bookingRows.reduce((sum, row) => sum + (parseFloat(row.debetAmount) || 0), 0);
    const kreditSum = bookingRows.reduce((sum, row) => sum + (parseFloat(row.kreditAmount) || 0), 0);

    const debetEl = document.getElementById('total-debet');
    const kreditEl = document.getElementById('total-kredit');

    debetEl.textContent = debetSum.toLocaleString('sv-SE');
    kreditEl.textContent = kreditSum.toLocaleString('sv-SE');

    // Visa om det balanserar
    const isBalanced = Math.abs(debetSum - kreditSum) < 0.01 && debetSum > 0;

    debetEl.className = 'total-cell' + (isBalanced ? ' balance-ok' : (debetSum > 0 ? ' balance-error' : ''));
    kreditEl.className = 'total-cell' + (isBalanced ? ' balance-ok' : (kreditSum > 0 ? ' balance-error' : ''));
}

// Hantera input-ändringar
function handleInputChange(e) {
    const index = parseInt(e.target.dataset.index);
    const field = e.target.dataset.field;
    let value = e.target.value;

    if (field === 'debetAmount' || field === 'kreditAmount') {
        value = parseFloat(value) || '';
    }

    bookingRows[index][field] = value;

    // Uppdatera kontonamn om konto ändrades
    if (field === 'account') {
        renderBookingRows();
    } else {
        updateTotals();
    }
}

// Kontrollera svar
function checkAnswer() {
    const event = events[currentEventIndex];

    // Konvertera nya formatet till gammalt format för jämförelse
    const userAnswer = [];
    bookingRows.forEach(row => {
        if (row.account) {
            if (row.debetAmount && parseFloat(row.debetAmount) > 0) {
                userAnswer.push({
                    account: row.account,
                    side: 'debet',
                    amount: parseFloat(row.debetAmount)
                });
            }
            if (row.kreditAmount && parseFloat(row.kreditAmount) > 0) {
                userAnswer.push({
                    account: row.account,
                    side: 'kredit',
                    amount: parseFloat(row.kreditAmount)
                });
            }
        }
    });

    // Kolla om det finns rader med belopp men inget konto valt
    const rowsWithoutAccount = bookingRows.filter(row =>
        !row.account && (row.debetAmount || row.kreditAmount)
    );
    if (rowsWithoutAccount.length > 0) {
        showFeedback(false, "Du har fyllt i belopp utan att välja konto. Välj konto i dropdown-menyn!");
        return;
    }

    // Validera att det finns svar
    if (userAnswer.length === 0) {
        showFeedback(false, "Du måste fylla i minst en bokföringsrad!");
        return;
    }

    // Kontrollera att debet = kredit
    const debetSum = userAnswer
        .filter(row => row.side === 'debet')
        .reduce((sum, row) => sum + row.amount, 0);

    const kreditSum = userAnswer
        .filter(row => row.side === 'kredit')
        .reduce((sum, row) => sum + row.amount, 0);

    if (Math.abs(debetSum - kreditSum) > 0.01) {
        showFeedback(false, `Debet (${debetSum} kr) måste vara lika med kredit (${kreditSum} kr)!`);
        return;
    }

    // Kontrollera om svaret är korrekt
    const isCorrect = compareAnswers(userAnswer, event.correctAnswer);

    if (isCorrect) {
        correctCount++;
        totalCorrect++;
        sessionCorrect++;
        streak++;

        // Uppdatera bästa streak
        if (streak > bestStreak) {
            bestStreak = streak;
        }

        // Beräkna poäng med streak-bonus
        let basePoints = event.level * 100;
        let streakBonus = Math.min(streak - 1, 5) * 10; // Max 50 bonus
        const points = basePoints + streakBonus;
        score += points;

        // Uppdatera highscore
        if (score > highScore) {
            highScore = score;
        }

        // Kolla om användaren ska uppgradera nivå
        if (correctCount % 3 === 0) {
            level++;
        }

        // Kolla achievements
        checkAchievements();

        // Spara progress
        saveProgress();

        updateStats();

        let message = `Rätt! Du fick ${points} poäng!`;
        if (streakBonus > 0) {
            message += ` (inkl. ${streakBonus} streak-bonus)`;
        }
        if (streak >= 3) {
            message += `\n🔥 ${streak} rätt i rad!`;
        }
        showFeedback(true, message);
    } else {
        incorrectCount++;
        totalIncorrect++;
        sessionIncorrect++;
        streak = 0; // Återställ streak

        saveProgress();
        updateStats();

        let explanation = "Fel svar. Rätt kontering är:\n\n";
        event.correctAnswer.forEach(entry => {
            const accountInfo = findAccountByNumber(entry.account);
            const accountName = accountInfo ? accountInfo.name : 'Okänt konto';
            explanation += `${entry.account} ${accountName} - ${entry.side}: ${entry.amount} kr\n`;
        });

        showFeedback(false, explanation);
    }

    document.getElementById('check-answer').style.display = 'none';
    document.getElementById('next-event').style.display = 'block';
}

// Jämför användarens svar med rätt svar
function compareAnswers(userAnswer, correctAnswer) {
    // Netta poster på samma konto (debet - kredit) och returnera nettoresultat
    const netEntries = (entries) => {
        const accountMap = {};

        // Summera debet och kredit per konto
        entries.forEach(entry => {
            const account = entry.account;
            if (!accountMap[account]) {
                accountMap[account] = { debet: 0, kredit: 0 };
            }
            if (entry.side === 'debet') {
                accountMap[account].debet += parseFloat(entry.amount);
            } else {
                accountMap[account].kredit += parseFloat(entry.amount);
            }
        });

        // Beräkna netto per konto
        const result = [];
        for (const account of Object.keys(accountMap)) {
            const debet = accountMap[account].debet;
            const kredit = accountMap[account].kredit;
            const net = debet - kredit;

            if (Math.abs(net) > 0.01) {
                result.push({
                    account: account,
                    side: net > 0 ? 'debet' : 'kredit',
                    amount: Math.abs(net)
                });
            }
        }

        return result;
    };

    const nettedUser = netEntries(userAnswer);
    const nettedCorrect = netEntries(correctAnswer);

    if (nettedUser.length !== nettedCorrect.length) {
        return false;
    }

    // Sortera båda arrays för jämförelse
    const sortAnswer = (arr) => arr.sort((a, b) => {
        if (a.account !== b.account) return a.account.localeCompare(b.account);
        if (a.side !== b.side) return a.side.localeCompare(b.side);
        return a.amount - b.amount;
    });

    const sortedUser = sortAnswer(nettedUser);
    const sortedCorrect = sortAnswer(nettedCorrect);

    for (let i = 0; i < sortedUser.length; i++) {
        if (sortedUser[i].account !== sortedCorrect[i].account ||
            sortedUser[i].side !== sortedCorrect[i].side ||
            Math.abs(sortedUser[i].amount - sortedCorrect[i].amount) > 0.01) {
            return false;
        }
    }

    return true;
}

// Hitta konto baserat på nummer
function findAccountByNumber(number) {
    for (const accountArray of Object.values(accounts)) {
        const account = accountArray.find(acc => acc.number === number);
        if (account) return account;
    }
    return null;
}

// Visa feedback
function showFeedback(isCorrect, message) {
    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');
    feedback.innerHTML = `
        <h3>${isCorrect ? '✅ Rätt!' : '❌ Fel'}</h3>
        <p style="white-space: pre-line;">${message}</p>
    `;
    feedback.style.display = 'block';

    // Scrolla till feedbacken på mobil
    feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Visa ledtråd
function showHint() {
    const event = events[currentEventIndex];
    const hint = document.getElementById('hint');
    hint.innerHTML = `<strong>💡 Ledtråd:</strong> ${event.hint}`;
    hint.style.display = 'block';
}

// Uppdatera statistik
function updateStats() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    document.getElementById('correct').textContent = correctCount;
    document.getElementById('incorrect').textContent = incorrectCount;

    // Uppdatera utökad statistik
    const highScoreEl = document.getElementById('high-score');
    const streakEl = document.getElementById('streak');
    const bestStreakEl = document.getElementById('best-streak');
    const totalCorrectEl = document.getElementById('total-correct');

    if (highScoreEl) highScoreEl.textContent = highScore;
    if (streakEl) {
        streakEl.textContent = streak;
        // Lägg till visuell effekt vid hög streak
        if (streak >= 5) {
            streakEl.classList.add('hot-streak');
        } else if (streak >= 3) {
            streakEl.classList.add('on-fire');
        } else {
            streakEl.classList.remove('hot-streak', 'on-fire');
        }
    }
    if (bestStreakEl) bestStreakEl.textContent = bestStreak;
    if (totalCorrectEl) totalCorrectEl.textContent = totalCorrect;

    // Uppdatera sessionsstatistik
    const sessionStatsEl = document.getElementById('session-stats');
    if (sessionStatsEl) {
        sessionStatsEl.textContent = `${sessionCorrect}/${sessionCorrect + sessionIncorrect}`;
    }
}

// Uppdatera sessionstid
function updateSessionTime() {
    const sessionTimeEl = document.getElementById('session-time');
    if (sessionTimeEl) {
        const elapsedMs = Date.now() - sessionStartTime;
        const minutes = Math.floor(elapsedMs / 60000);
        const seconds = Math.floor((elapsedMs % 60000) / 1000);
        sessionTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Nästa händelse
function nextEvent() {
    currentEventIndex++;

    if (currentEventIndex >= events.length) {
        // Kolla nivå-achievements
        if (selectedLevel === 2 && !achievements.level2.unlocked) {
            achievements.level2.unlocked = true;
            showAchievementPopup(achievements.level2);
            saveProgress();
            renderAchievements();
        }
        if (selectedLevel === 3 && !achievements.level3.unlocked) {
            achievements.level3.unlocked = true;
            showAchievementPopup(achievements.level3);
            saveProgress();
            renderAchievements();
        }

        // Spelet är slut
        const elapsedMs = Date.now() - levelStartTime;
        const elapsedMinutes = Math.floor(elapsedMs / 60000);
        const elapsedSeconds = Math.floor((elapsedMs % 60000) / 1000);
        const timeString = elapsedMinutes > 0
            ? `${elapsedMinutes} min ${elapsedSeconds} sek`
            : `${elapsedSeconds} sek`;

        let endMessage = `🎊 Grattis! Du har klarat alla övningar!\n\n`;
        endMessage += `📊 Resultat:\n`;
        endMessage += `Poäng: ${score}\n`;
        endMessage += `Rätt: ${correctCount} | Fel: ${incorrectCount}\n`;
        endMessage += `Bästa streak: ${bestStreak}\n`;
        endMessage += `⏱️ Tid: ${timeString}\n`;
        if (score >= highScore && score > 0) {
            endMessage += `\n🏆 NYTT HIGHSCORE!`;
        }

        showFeedback(true, endMessage);
        document.getElementById('next-event').style.display = 'none';
        document.getElementById('check-answer').style.display = 'none';
        document.getElementById('show-hint').style.display = 'none';
        document.getElementById('add-row').style.display = 'none';
        document.getElementById('event-description').textContent = 'Nivån är klar! Välj en annan nivå eller ladda om sidan.';
    } else {
        loadEvent();
    }
}

// Nivåfiler
const levelFiles = {
    1: 'grundlaggande-kontering.json',
    2: 'forsaljning-inkop-utan-moms.json',
    3: 'transaktioner.json',
    4: 'momsredovisning.json',
    5: 'resultatrakning.json',
    6: 'kreditfakturor-ranta-kontokort.json'
};

// Aktuell vald nivå
let selectedLevel = 1;

// Ladda händelser från nivå
async function loadLevel(levelNumber) {
    selectedLevel = levelNumber;

    // Uppdatera dropdown
    const dropdown = document.getElementById('level-select');
    if (dropdown) {
        dropdown.value = levelNumber;
    }

    const fileName = levelFiles[levelNumber];

    try {
        const response = await fetch(fileName);
        if (!response.ok) {
            throw new Error(`Kunde inte ladda fil: ${fileName}`);
        }

        const loadedEvents = await response.json();

        // Validera att det är en array
        if (!Array.isArray(loadedEvents)) {
            alert('Filen måste innehålla en array av händelser!');
            return;
        }

        // Validera att händelserna har rätt format
        const isValid = loadedEvents.every(event =>
            event.description &&
            event.hint &&
            Array.isArray(event.correctAnswer) &&
            event.level
        );

        if (!isValid) {
            alert('Händelserna har fel format!');
            return;
        }

        // Ladda händelserna
        events = loadedEvents;

        // Återställ spelet
        resetGame();

    } catch (error) {
        alert('Fel vid laddning av nivå: ' + error.message);
        console.error(error);
    }
}

// Återställ spelet
function resetGame() {
    currentEventIndex = 0;
    // score behålls mellan nivåer
    level = 1;
    correctCount = 0;
    incorrectCount = 0;
    streak = 0;
    levelStartTime = Date.now();
    updateStats();
    loadEvent();
}

// Event listeners
function setupEventListeners() {
    document.getElementById('add-row').addEventListener('click', addBookingRow);
    document.getElementById('check-answer').addEventListener('click', checkAnswer);
    document.getElementById('next-event').addEventListener('click', nextEvent);
    document.getElementById('show-hint').addEventListener('click', showHint);

    // Nivåval via dropdown
    const levelSelect = document.getElementById('level-select');
    if (levelSelect) {
        levelSelect.addEventListener('change', (e) => {
            const level = parseInt(e.target.value);
            loadLevel(level);
        });
    }
}

// Starta spelet när sidan laddas
window.addEventListener('DOMContentLoaded', init);
