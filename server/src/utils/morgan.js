import morgan from 'morgan';
import chalk from 'chalk';

const getStatusColor = (status) => {
    if (status >= 500) {
      return chalk.red(status);
    } else if (status >= 400) {
      return chalk.yellow(status);
    } else if (status >= 300) {
      return chalk.cyan(status);
    } else if (status >= 200) {
      return chalk.green(status);
    } else {
      return status;
    }
  };
export const morganChalk = morgan((tokens, req, res) => {
    const status = tokens.status(req, res);
    const statusColor = getStatusColor(status);

    return [
        chalk.gray(tokens.method(req, res)),
        chalk.blue(tokens.url(req, res)),
        statusColor,
        chalk.gray(tokens['response-time'](req, res) + ' ms'),
    ].join(' ');
})