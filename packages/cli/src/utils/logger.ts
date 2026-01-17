import chalk from 'chalk';
import ora, { type Ora } from 'ora';

const BANNER = `
  ██████╗ ██████╗ ██╗██╗   ██╗██╗  ██╗██╗████████╗
  ██╔══██╗██╔══██╗██║██║   ██║██║ ██╔╝██║╚══██╔══╝
  ██████╔╝██████╔╝██║██║   ██║█████╔╝ ██║   ██║
  ██╔═══╝ ██╔══██╗██║╚██╗ ██╔╝██╔═██╗ ██║   ██║
  ██║     ██║  ██║██║ ╚████╔╝ ██║  ██╗██║   ██║
  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝   ╚═╝
`;

export const logger = {
  banner(): void {
    console.log(chalk.blue(BANNER));
    console.log(chalk.dim('  Zero to private in one command\n'));
  },

  spinner(text: string): Ora {
    return ora({
      text,
      color: 'blue'
    }).start();
  },

  success(projectName: string, packageManager: string = 'npm'): void {
    const pm = packageManager;
    const runCmd = pm === 'npm' ? 'npm run' : pm;

    console.log();
    console.log(chalk.green('✔ Success!'), `Created ${chalk.bold(projectName)}`);
    console.log();
    console.log('Next steps:');
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan(`  ${runCmd} dev`));
    console.log();
    console.log('Available commands:');
    console.log(`  ${chalk.cyan(`${runCmd} dev`)}        Start development server`);
    console.log(`  ${chalk.cyan(`${runCmd} build`)}      Build for production`);
    console.log(`  ${chalk.cyan(`${runCmd} test`)}       Run privacy tests`);
    console.log(`  ${chalk.cyan(`${runCmd} deploy`)}     Deploy to devnet`);
    console.log();
    console.log(chalk.dim('Happy building! 🛡️'));
  },

  error(message: string): void {
    console.error(chalk.red('Error:'), message);
  },

  info(message: string): void {
    console.log(chalk.blue('Info:'), message);
  },

  warn(message: string): void {
    console.log(chalk.yellow('Warning:'), message);
  }
};
