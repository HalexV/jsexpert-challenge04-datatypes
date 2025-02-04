import DraftLog from 'draftlog';
import chalkTable from 'chalk-table';
import chalk from 'chalk';
import readline from 'readline';
import asciichart from 'asciichart';
import terminalConfig from '../config/terminal.js';

const TABLE_OPTIONS = terminalConfig.table;

const kPrint = Symbol('kPrint');
const kTerminal = Symbol('kTerminal');

/**
 * Inviável o uso do WeakMap pois:
 * 1. O programa necessita de informações sobre se a estrutura de dados possui ou não dados. O WeakMap infelizmente não possui formas de verificar isso.
 * 2. O programa precisa da lista de itens presentes na estrutura de dados. O WeakMap não possui mecanismos de iteração.
 * 3. O WeakMap só aceita objetos como chaves.
 * 4. Tentar usar uma estrutura auxiliar como um array para guardar as chaves e recuperar os valores do WeakMap através de um 'for' no array chamando WeakMap.get() é uma complexidade adicional desnecessária. Basta usar o Map normal mesmo.
 */

class CustomTerminal {
  #kData = Symbol('kData')
  constructor() {
    this[kPrint] = {};
    this[this.#kData] = new Map();
    this[kTerminal] = null;
  }

  initialize() {
    DraftLog(console).addLineListener(process.stdin);
    this[kTerminal] = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  draftTable() {
    const data = [];

    for(const [, value] of this[this.#kData]){
      data.push(value)
    }

    const table = chalkTable(TABLE_OPTIONS, data);
    this[kPrint] = console.draft(table);
  }

  hasDataToPrint() {
    return this[this.#kData].size > 0;
  }

  /**
   * Dado um array de objetos, adiciona cada registro aos dados a serem impressos.
   * @param {Array<Crypto>} data
   */
  addDataToPrint(data) {
    data.forEach(data => {
      this[this.#kData].set(data.id, data)
    })
  }

  getDataById(id) {
    return this[this.#kData].get(id);
  }

  removeDataById(id) {
    return this[this.#kData].delete(id);
  }

  dataSize() {
    return this[this.#kData].size
  }

  plotQuoteChart(data) {
    if (!data) return;
    const s0 = [
      ...Array.from({ length: 30 }, () => data.percent_change_90d),
      ...Array.from({ length: 30 }, () => data.percent_change_60d),
      ...Array.from({ length: 30 }, () => data.percent_change_30d),
      ...Array.from({ length: 7 }, () => data.percent_change_7d),
      data.percent_change_24h,
    ];
    this.print(asciichart.plot(s0));
  }

  print(message) {
    this[kPrint] = console.log(message);
  }

  printSuccess(message) {
    this.print(chalk.green(message));
  }

  printInfo(message) {
    this.print(chalk.cyan(message));
  }

  printError(message) {
    this.print(chalk.red(message));
  }

  async readLine(label = '') {
    return new Promise(resolve => this[kTerminal].question(label, resolve));
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  close() {
    this[kTerminal].close();
  }
}

export default CustomTerminal;
