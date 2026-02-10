// Uppdatera "Tillbaka till appen"-knappen med level och event parametrar
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const level = urlParams.get('level');
    const eventIndex = urlParams.get('event');

    // Hitta "Tillbaka till appen"-knappen
    const backButton = document.querySelector('a[href="../index.html"]');

    if (backButton && level !== null) {
        // Uppdatera länken för att inkludera level och event
        let newHref = `../index.html?level=${level}`;
        if (eventIndex !== null) {
            newHref += `&event=${eventIndex}`;
        }
        backButton.href = newHref;
    }

    // Uppdatera även "Öva på"-knapparna om de finns
    const practiceButtons = document.querySelectorAll('.wiki-cta a[href*="?level="]');
    practiceButtons.forEach(button => {
        if (level !== null && eventIndex !== null) {
            const currentHref = button.getAttribute('href');
            // Ersätt level i href:en men behåll eventIndex
            const newPracticeHref = currentHref.replace(/\?level=\d+/, `?level=${level}&event=${eventIndex}`);
            button.href = newPracticeHref;
        }
    });
});
