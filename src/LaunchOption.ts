import yargs from "yargs";

export interface Args {
  headful: boolean;
  slowMotion: number;
}

export const args = (): Args =>
  yargs.options({
    headful:    { alias: 'h', type: 'boolean', default: false },
    slowMotion: { alias: 's', type: 'number',  default: 0 }
  }).help().argv;

export const options = {
  headless: !args().headful,
  slowMo: args().slowMotion,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
};
