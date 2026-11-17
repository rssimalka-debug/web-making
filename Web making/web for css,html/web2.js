const verses = [
    "“Love one another.” — John 13:34",
    "“The Lord is my shepherd; I shall not want.” — Psalm 23:1",
    "“Blessed are the peacemakers.” — Matthew 5:9",
    "“We love him, because he first loved us.” — 1 John 4:19"
];

let currentVerse = 0;

const verseText = document.getElementById("bible-verse");
const verseButton = document.getElementById("verse-button");

verseButton.addEventListener("click", function () {
    currentVerse = (currentVerse + 1) % verses.length;
    verseText.textContent = verses[currentVerse];
});