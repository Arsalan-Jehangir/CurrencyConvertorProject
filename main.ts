
import chalk from "chalk";
import inquirer from "inquirer";


let apiLink =  "https://v6.exchangerate-api.com/v6/1f25266fbe6d0827b74e7080/latest/PKR";

let fetchData = async (data:any) =>{
    let fetchData = await fetch(data)
    let res = await fetchData.json()
    return res.conversion_rates;
}

let data = await fetchData(apiLink);

let countries = Object.keys(data);

let firstCountry = await inquirer.prompt({  
    type: "list",
    name: "name",
    message: "Converting From",
    choices: countries,
});

let userMoney = await inquirer.prompt({
    type: "number",
    name: "rupee",
    message: `Please Enter The Amount in ${chalk.blueBright.bold(firstCountry.name)}`

})

let secondCountry = await inquirer.prompt({  
    type: "list",
    name: "name",
    message: "Converting To",
    choices: countries,
});

let conv =  `https://v6.exchangerate-api.com/v6/1f25266fbe6d0827b74e7080/pair/${firstCountry.name}/${secondCountry.name}`;

let convData = async (data:any) =>{
    let convData = await fetch(data)
    let res = await convData.json()
    return res.conversion_rate;
};

let conversionRate = await  convData(conv);

let convertedRate = userMoney.rupee *   conversionRate

console.log(`Your ${chalk.bold.blueBright(firstCountry.name)} ${chalk.bold.blueBright(userMoney.rupee)} in ${chalk.bold.blueBright(secondCountry.name)} is ${chalk.bold.blueBright(convertedRate)}`)


