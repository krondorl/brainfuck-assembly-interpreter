// Copyright (c) 2025- Adam Burucs. MIT license

import {
  execute,
  parse,
  tokenize,
  validate,
  printOutput,
} from "./interpreter.ts";
import { RESET, BRIGHT_WHITE_TEXT, BLUE_BG } from "./colors.ts";
import type { ExecutionContext } from "./interpreter.ts";
import { exitProcessError, exitProcessOk } from "./exit.ts";

// Simple character 'A' (ASCII 65) output
const program = `
    INC
    INC
    INC
    INC
    INC
    INC
    INC
    INC
    INC
    INC
    INC
    INC
    INC
    LOOP_START
        RIGHT
        INC
        INC
        INC
        INC
        INC
        LEFT
        DEC
    LOOP_END
    RIGHT
    PRINT
`;

function main(): void {
  console.log();
  console.log(
    BLUE_BG + BRIGHT_WHITE_TEXT + "Brainfuck Assembly interpreter" + RESET
  );
  console.log();

  const context: ExecutionContext = {
    memory: new Array(30000).fill(0),
    pointer: 0,
    output: [],
    maxValue: 255,
    maxSteps: 30000,
    stepCounter: 0,
    debug: false,
  };

  const tokens = tokenize(program);
  const isValid = validate(tokens);

  if (isValid) {
    const parsedInstructions = parse(tokens);
    execute(parsedInstructions, context);
    console.log("Result");
    printOutput(context.output);
    console.log();
    console.log("Program executed.");
    console.log();
    exitProcessOk();
  } else {
    console.log();
    console.error("🔴 Error: tokens are not valid.");
    console.log();
    exitProcessError();
  }
}

main();
