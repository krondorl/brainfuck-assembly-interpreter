// Copyright (c) 2025- Adam Burucs. MIT license

/**
 * The setTimeout is a workaround fix for this Node.js bug:
 * `Assertion failed: !(handle->flags & UV_HANDLE_CLOSING), file src\win\async.c, line 76`
 */
export function exitProcessOk() {
  setTimeout(() => {
    process.exit(0);
  }, 10);
}

/**
 * Fixes the Node.js bug similar to above (`exitProcessOk()`) using setTimeout.
 */
export function exitProcessError() {
  setTimeout(() => {
    process.exit(1);
  }, 10);
}
