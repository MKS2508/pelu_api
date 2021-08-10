import chalk, { bgRed } from 'chalk';

/*LOGGING*/
export const log = console.log;
export const logBold = chalk.magentaBright.bold;
export const logBoldBG = chalk.whiteBright.bgMagenta.bold;
export const logBoldBG2 = chalk.whiteBright.bgCyan.bold;
export const IOT = chalk.blue.bgWhiteBright.bold(' 👾 IOT SERVER 👾: ') + " ";


export const logInfo = chalk.white.bgCyan.bold('  ℹ️  INFO ℹ️ : ');