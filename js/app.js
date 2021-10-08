function rot13(str) {
    let newStr = "",
        regex = /[A-Z]/,
        alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i in str) {
        if (regex.test(str[i])) {
            let index = alpha.indexOf(str[i]);
            let newI = index + 13;
            if (newI > 26) {
                newI -= 26;
                newStr += alpha[newI];
            } else if (newI == 26) {
                newStr += alpha[0];
            } else if (newI < 26) {
                newStr += alpha[newI];
            }

        } else newStr += str[i];

    }
    console.log(newStr);
    return newStr;
}
rot13('PUNEVMNEQ');

function distanceToNearestVowel(str) {
    let newStr = str.toLowerCase().split('');
    let regex = /[aueioy]/;
    let vowels = [];

    function nearestVowel(arr, index) {
        return arr.reduce((acc, crr) => Math.min(acc, Math.abs(crr - index)), Infinity);
    }
    for (let i in newStr) {
        if (newStr[i].match(regex)) {
            vowels.push(i);
        }
    }

    return newStr.map((crr, index) => nearestVowel(vowels, index));
}
console.log(distanceToNearestVowel('aaaaa'));
console.log(distanceToNearestVowel("babbb"));
console.log(distanceToNearestVowel("abcdabcd"));
console.log(distanceToNearestVowel("shopper"));

function translatePigLatin(str) {
    let regexVowels = /^[aeuioy]+/,
        regexConsonants = /^[^aeuioy]+/,
        vowel = /[aeuioy]/,
        newStr = "";
    if (regexVowels.test(str)) {
        newStr = str.concat('way');
    } else if (!vowel.test(str)) {
        newStr = str.concat('ay');
    } else {
        let consonants = str.match(regexConsonants);
        // console.log(consonants);
        let newStr1 = str.substr(consonants[0].length);
        newStr = newStr1.concat(consonants[0], 'ay');
    }
    return newStr;
}
console.log(translatePigLatin('california'));
console.log(translatePigLatin('paragraphs'));
console.log(translatePigLatin('algorithm'));
console.log(translatePigLatin('schwartz'));


let boxes = document.querySelectorAll('.box')
let t = document.querySelector('#time')
let timer = null
let app = {
    color: '',
    change: ''
}

function time() {
    return setInterval(() => {
        if (t.value == 0) {
            clearInterval(timer)
            alert('Bạn đã thua!')
        } else {
            t.value = parseFloat(t.value) - 0.01
        }
    }, 100)
}

function createColor() {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    let a = 0.6
    let color = `rgb(${r}, ${g}, ${b})`
    let change = `rgba(${r}, ${g}, ${b}, ${a})`
    app.color = color
    app.change = change
}

function changeColor() {
    let index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    index = index.sort((a, b) => Math.random() - Math.random())
    index.forEach((e, i) => {
        if (i == 0) {
            boxes[e].style.backgroundColor = app.change
        } else {
            boxes[e].style.backgroundColor = app.color
        }
    })
}
createColor()
changeColor()
timer = time()
boxes.forEach(box => {
    box.addEventListener('click', (e) => {
        if (e.target.style.backgroundColor == app.change) {
            createColor()
            changeColor()
            clearInterval(timer)
            t.value = 5
            timer = time()
        } else {
            clearInterval(timer)
            alert('Bạn đã thua!')
        }
    })
})