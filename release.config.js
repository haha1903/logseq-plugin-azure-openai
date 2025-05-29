module.exports = {
  branches: ["master"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    "@semantic-release/git",
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "mkdir build && zip -qq -r build/logseq-plugin-azure-openai.zip dist README.md icon.png LICENSE package.json",
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: "build/*.zip",
        successComment: false,
        failComment: false,
        releasedLabels: false,
      },
    ],
  ],
};
