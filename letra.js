import fs from 'fs'
import path from 'path'
import { stringify } from 'querystring';
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'dobasok.txt');
let content = "";
try {
    content = fs.readFileSync(filePath, 'utf8').split('\n')[0];
} catch(err) {
    console.log(err);
}
const randomNumbers = [];
for (let i = 0; i < 18; i++) {
    let min = 1;
    let max = 7;
    let rndnumber = Math.ceil(Math.random() * (max - min) + min);
    randomNumbers.push(rndnumber);
}

let writeThis = `\n${randomNumbers.map(String).join(", ")}`;


try {
    fs.writeFileSync(filePath, content + writeThis);
} catch(err) {
    console.log(err);
}

//const throws = content.split(", ").map(x => parseInt(x));
const throws = content.split(", ").map(Number);

let start = 0;
const visitedFields = [];
let ladders = 0;
let finish = "";
let finish2 = "";

for (let i = 0; i < throws.length; i++) {
    start += throws[i];
    if(start == 7 || start == 17 || start == 27 || start == 37) {
        start += 3;
        ladders++;
    }
    visitedFields.push(start);
    if(start == 45) {
        finish = "4. feladat\nA játékot befejezte.";
        finish2 = "A játékot befejezte.";
        break;
    }
    else if(start > 45) {
        finish = "4. feladat\nA játékot abbahagyta.";
        finish2 = "A játékot abbahagyta.";
        break;
    }
}

visitedFields.map(String);
let strVisitedFields = visitedFields.join(" ");
console.log(`2. feladat\n${strVisitedFields}`);
console.log(`3. feladat\nA játék során ${ladders} alkalommal lépett létrára.`);
console.log(finish);

const filePath2 = path.join(__dirname, 'megoldas.txt');

try {
    fs.writeFileSync(filePath2, strVisitedFields + '\n' + ladders + '\n'+ finish2);
} catch(err) {
    console.log(err);
}
