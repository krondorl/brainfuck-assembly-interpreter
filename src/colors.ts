// Copyright (c) 2025- Adam Burucs. MIT license

/**
 * Demonstrates Turbo Pascal-style color schemes using ANSI escape codes
 * for use in modern terminals (Ubuntu, macOS Terminal, Windows Terminal).
 *
 * No external libraries are used. These examples are *not* executed,
 * they are shown for documentation purposes only.
 */

// ANSI escape code constants
export const RESET = "\x1b[0m";

export const BLACK_TEXT = "\x1b[30m";
export const BRIGHT_WHITE_TEXT = "\x1b[38;5;15m";
export const WHITE_TEXT = "\x1b[37m";

export const BRIGHT_WHITE_BG = "\x1b[48;5;15m";
export const WHITE_BG = "\x1b[47m";
export const BLUE_BG = "\x1b[44m";
export const YELLOW_BG = "\x1b[43m";

/**
 * Example: White background with black text
 * Turbo Pascal-style screen appearance.
 *
 * @example
 * console.log(WHITE_BG + BLACK_TEXT + 'White background, black text (Turbo Pascal style)' + RESET);
 */

/**
 * Example: Blue background with white text
 * Common header color style in Turbo Pascal.
 *
 * @example
 * console.log(BLUE_BG + WHITE_TEXT + 'Blue background, white text (Turbo Pascal style)' + RESET);
 */

/**
 * Example: Yellow background with black text
 * Used for highlighted or warning sections.
 *
 * @example
 * console.log(YELLOW_BG + BLACK_TEXT + 'Yellow background, black text (Turbo Pascal style)' + RESET);
 */
