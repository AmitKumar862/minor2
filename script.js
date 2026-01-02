// 1. Select Elements
const passwordDisplay = document.getElementById('passwordDisplay');
const copyBtn = document.getElementById('copyBtn');
const copyAlert = document.getElementById('copyAlert');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const generateBtn = document.getElementById('generateBtn');

// Checkboxes
const checkboxes = {
    upper: document.getElementById('includeUppercase'),
    lower: document.getElementById('includeLowercase'),
    number: document.getElementById('includeNumbers'),
    symbol: document.getElementById('includeSymbols')
};

// 2. Character Sets
const CHAR_SETS = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    number: "0123456789",
    symbol: "!@#$%^&*()_+~`|}{[]:;?><,./-="
};

// 3. Slider Update
lengthSlider.addEventListener('input', (e) => {
    lengthValue.innerText = e.target.value;
});

// 4. Generate Function
function generatePassword() {
    let activeChars = "";
    let password = "";
    const length = +lengthSlider.value;

    if (checkboxes.upper.checked) activeChars += CHAR_SETS.upper;
    if (checkboxes.lower.checked) activeChars += CHAR_SETS.lower;
    if (checkboxes.number.checked) activeChars += CHAR_SETS.number;
    if (checkboxes.symbol.checked) activeChars += CHAR_SETS.symbol;

    if (activeChars === "") {
        passwordDisplay.value = "ERROR: SELECT OPTION";
        passwordDisplay.style.color = "#ff4444"; 
        return;
    } else {
        passwordDisplay.style.color = "#fff"; 
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * activeChars.length);
        password += activeChars[randomIndex];
    }

    passwordDisplay.value = password;
}

// 5. Copy Function with Alert
copyBtn.addEventListener('click', () => {
    const text = passwordDisplay.value;
    
    if (!text || text.includes("ERROR") || text === "INITIALIZING...") return;

    navigator.clipboard.writeText(text).then(() => {
        copyAlert.classList.add('active');
        setTimeout(() => {
            copyAlert.classList.remove('active');
        }, 2500);
    });
});

// 6. Init
generateBtn.addEventListener('click', generatePassword);