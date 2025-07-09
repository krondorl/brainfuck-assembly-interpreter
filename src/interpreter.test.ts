// Copyright (c) 2025- Adam Burucs. MIT license

import assert from "node:assert";
import { tokenize, validate } from "./interpreter.ts";

const tests = [testValidCommands, testInvalidCommands];

for (const test of tests) {
  try {
    test();
    console.log(`✅ ${test.name} passed`);
  } catch (err) {
    console.error(`🔴 ${test.name} failed:`, err);
  }
}

function testValidCommands(): void {
  const program = `
    INC
    DEC
    INC
  `;
  const commands = tokenize(program);
  assert.strictEqual(validate(commands), true);
}

function testInvalidCommands(): void {
  const program = `
    INC
    DEC
    MOV
    XOR
  `;
  const commands = tokenize(program);
  assert.strictEqual(validate(commands), false);
}

testValidCommands();
testInvalidCommands();
