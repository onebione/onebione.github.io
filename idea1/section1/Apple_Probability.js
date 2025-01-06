const readline = require('readline-sync');

let alive_outcomes = 0;
let total_outcomes = 0;

const Apples_Total = parseInt(readline.question("Apples in Total: "));
const Poisonous = parseInt(readline.question("Poisonous Apples: "));
const Apples_To_Kill = parseInt(readline.question("Amount of Poisonous Apples to kill: "));
const Apples_Eat = parseInt(readline.question("Amount of Apples You Will Eat: "));

if (Apples_To_Kill > Poisonous || Apples_Eat > Apples_Total) {
    console.log("You'll be fine, the apple amounts make no sense");
    process.exit();
}

function binomial_coefficients(N, K) {
    if (K > N) {
        return 0;
    }
    return factorial(N) / (factorial(K) * factorial(N - K));
}

function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

for (let case_num = 0; case_num < Apples_To_Kill; case_num++) {
    let var1 = binomial_coefficients(Poisonous, case_num);
    let var2 = binomial_coefficients(Apples_Total - Poisonous, Apples_Eat - case_num);
    alive_outcomes += var1 * var2;
}

total_outcomes = binomial_coefficients(Apples_Total, Apples_Eat);

console.log(((alive_outcomes / total_outcomes) * 100).toFixed(2) + "%");
