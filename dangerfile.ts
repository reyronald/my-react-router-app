import { danger, fail, warn } from "danger"

// https://danger.systems/js/reference

export default async function main() {
  await dependencies()
}

async function dependencies() {
  const packageDiff = await danger.git.JSONDiffForFile("package.json")
  const lockfile = danger.git.fileMatch("package-lock.json")

  const hasDependencyChanges = "devDependencies" in packageDiff || "dependencies" in packageDiff

  const hasBundleSizeLabel = danger.github.issue.labels.some(
    (label) => label.name === "build-size-report",
  )

  if (hasDependencyChanges) {
    if (!hasBundleSizeLabel) {
      fail(`Found dependency changes. Please add the "build-size-report" label.`)
    }

    if (!lockfile.edited) {
      warn("There are package.json changes with no corresponding lockfile changes.")
    }
  }
}
