// Copyright (c) 2025- Adam Burucs. MIT license

export const VALID_INSTRUCTIONS = new Set([
  "INC",
  "DEC",
  "LEFT",
  "RIGHT",
  "PRINT",
  "LOOP_START",
  "LOOP_END",
]);

export type Instruction =
  | { type: "INC" | "DEC" | "LEFT" | "RIGHT" | "PRINT" }
  | { type: "LOOP"; body: Instruction[] };

export interface ExecutionContext {
  memory: number[];
  pointer: number;
  output: string[];
  maxValue?: number;
  maxSteps?: number;
  stepCounter?: number;
  debug?: boolean;
}

export function tokenize(source: string): string[] {
  return source
    .replace(/\r?\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("//"));
}

export function validate(tokens: string[]): boolean {
  let valid = true;
  for (const token of tokens) {
    if (!VALID_INSTRUCTIONS.has(token)) {
      valid = false;
      break;
    }
  }
  return valid;
}

export function parse(tokens: string[]): Instruction[] {
  const instructions: Instruction[] = [];
  const stack: Instruction[][] = [instructions];

  for (const token of tokens) {
    if (token === "LOOP_START") {
      const loopInstr: Instruction = { type: "LOOP", body: [] };
      stack[stack.length - 1].push(loopInstr);
      stack.push(loopInstr.body);
    } else if (token === "LOOP_END") {
      if (stack.length === 1) {
        throw new Error("Unexpected LOOP_END without matching LOOP_START");
      }
      stack.pop();
    } else if (
      token === "INC" ||
      token === "DEC" ||
      token === "LEFT" ||
      token === "RIGHT" ||
      token === "PRINT"
    ) {
      stack[stack.length - 1].push({ type: token });
    } else {
      throw new Error(`Unknown token: ${token}`);
    }
  }

  if (stack.length !== 1) {
    throw new Error("Unclosed LOOP_START detected");
  }

  return instructions;
}

// Debug helper
function debugMemory(
  context: ExecutionContext,
  instr: Instruction,
  step: number
): void {
  const viewSize = 10;
  const mem = context.memory
    .slice(0, viewSize)
    .map((v) => String(v).padStart(3, " "))
    .join(" ");
  const ptr = Array(viewSize)
    .fill("   ")
    .map((_, i) => (i === context.pointer ? " ↑ " : "   "))
    .join("");
  const label = instr.type === "LOOP" ? "LOOP" : instr.type;
  console.log(`Step ${step}: ${label}`);
  console.log(mem);
  console.log(ptr);
  console.log();
}

export function execute(
  instructions: Instruction[],
  context: ExecutionContext
): void {
  context.stepCounter ??= 0;
  context.maxSteps ??= 100_000;

  for (const instr of instructions) {
    context.stepCounter++;

    if (context.stepCounter > context.maxSteps) {
      throw new Error(
        `❌ Step limit exceeded at step ${context.stepCounter}, instruction: ${instr.type}`
      );
    }

    if (context.debug) {
      debugMemory(context, instr, context.stepCounter);
    }

    const max = context.maxValue ?? 255;

    switch (instr.type) {
      case "INC":
        if (context.memory[context.pointer] < max) {
          context.memory[context.pointer]++;
        }
        break;
      case "DEC":
        if (context.memory[context.pointer] > 0) {
          context.memory[context.pointer]--;
        }
        break;
      case "LEFT":
        if (context.pointer > 0) {
          context.pointer--;
        } else {
          console.warn(
            "⚠️ Pointer is already at position 0 — cannot move LEFT."
          );
        }
        break;
      case "RIGHT":
        if (context.pointer < context.memory.length - 1) {
          context.pointer++;
        } else {
          console.warn(
            "⚠️ Pointer is at the last memory cell — cannot move RIGHT."
          );
        }
        break;
      case "PRINT":
        context.output.push(
          String.fromCharCode(context.memory[context.pointer])
        );
        break;
      case "LOOP":
        while (context.memory[context.pointer] !== 0) {
          execute(instr.body, context);
        }
        break;
    }
  }
}

export function printOutput(output: string[]): void {
  const result = output.join("");
  console.log(result);
}
