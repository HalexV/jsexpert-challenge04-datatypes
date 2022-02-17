import DraftLog from 'draftlog';
import chalkTable from 'chalk-table';
import chalk from 'chalk';
import readline from 'readline';
import asciichart from 'asciichart';
import terminalConfig from '../config/terminal.js';

const TABLE_OPTIONS = terminalConfig.table;

const kPrint = Symbol('kPrint');
// TODO: Criar um Symbol para a propriedade privada 'kData'
const kTerminal = Symbol('kTerminal');

class CustomTerminal {
  #kData = Symbol('kData')
  constructor() {
    this[kPrint] = {};
    // TODO: inicializar a propriedade privada 'kData' como uma estrutura importante vista no curso
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
