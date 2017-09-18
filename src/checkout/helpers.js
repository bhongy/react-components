// @flow
/* eslint-disable import/prefer-default-export */

export function joinPathname(paths: string[]): string {
  if (!Array.isArray(paths)) {
    return '';
  }

  return paths
    .join('/')
    // handle multiple slashes e.g. "//path-to-something"
    .replace(/\/+/g, '/');
}
