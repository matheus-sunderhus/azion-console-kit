/**
 * @typedef {import('semantic-release').BranchSpec} BranchSpec
 * @typedef {import('semantic-release').GlobalConfig} GlobalConfig
 */

/**
 * @type {GlobalConfig}
 */
export default {
  branches: [
    /** @type {BranchSpec} */
    { name: 'main' },
    /** @type {BranchSpec} */
    { name: 'dev', prerelease: 'dev' }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/github',
    '@semantic-release/git'
  ],
  preset: 'vue',
  releaseRules: [
    { type: 'feat', release: 'minor' },
    { type: 'fix', release: 'patch' },
    { type: 'chore', release: false },
    { type: 'docs', release: false },
    { type: 'style', release: 'minor' },
    { type: 'refactor', release: false },
    { type: 'perf', release: 'patch' },
    { type: 'test', release: false }
  ],
  parserOpts: {
    headerPattern: /^(\[UXE-.*])?\s?(\w+):\s(.*)$/,
    headerCorrespondence: ['scope', 'type', 'subject']
  }
}
