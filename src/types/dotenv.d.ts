declare module 'dotenv' {
  interface DotenvParseOutput {
    [name: string]: string;
  }

  interface DotenvConfigOutput {
    parsed?: DotenvParseOutput;
    error?: Error;
  }

  interface DotenvConfigOptions {
    path?: string;
    encoding?: string;
    debug?: boolean;
    override?: boolean;
  }

  export function config(options?: DotenvConfigOptions): DotenvConfigOutput;
  export function parse(src: Buffer | string): DotenvParseOutput;
}
