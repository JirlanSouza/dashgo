class Logger {
  private static instance: Logger;
  private color = {
    info: "\u001b[44m",
    warn: "\u001b[43m",
    error: "\u001b[41m",
  };

  private textColor = {
    white: "\u001b[37m",
  };

  private resetColor = "\u001b[m";
  private ctxTitle: string = "";
  private hasCtxTitle = false;

  private constructor() {}

  static getLogger() {
    if (Logger.instance) {
      return Logger.instance;
    }

    return new Logger();
  }

  setContext(ctx: string) {
    this.ctxTitle = ctx + " :\n";
    this.hasCtxTitle = true;

    return this;
  }

  error(...err: any) {
    console.error(
      this.setBackgroundColor(this.color.error, this.getDate()),
      this.ctxTitle.toUpperCase(),
      ...err,
      "\n"
    );

    this.ctxTitle = "";
  }

  info(...info: any) {
    console.info(
      this.setBackgroundColor(this.color.info, this.getDate()),
      this.ctxTitle.toUpperCase(),
      ...info,
      "\n"
    );

    this.ctxTitle = "";
  }

  warn(...warn: any) {
    console.warn(
      this.setBackgroundColor(this.color.warn, this.getDate()),
      this.ctxTitle.toUpperCase(),
      ...warn,
      "\n"
    );

    this.ctxTitle = "";
  }

  private getDate() {
    return `[ ${new Date().toISOString()} ]`;
  }

  private setBackgroundColor(color: string, text: string) {
    return `${color}${text}${this.resetColor}`;
  }
}

export const logger = Logger.getLogger();
