const { spawn } = require("child_process");
const path = require("path");

const task = process.argv[2] || "quarkusDev";

const projectPath = path.join(__dirname, "../apps/webrtc-communications");
const isWin = process.platform === "win32";

const gradleCmd = isWin ? "gradlew.bat" : "./gradlew";

if (task === "serve") {
  const dockerDown = spawn("docker-compose", ["down", "-v"], {
    cwd: path.join(__dirname, "../docker"),
    stdio: "inherit",
    shell: true
  });

  dockerDown.on("close", (code) => {
    if (code !== 0) process.exit(code);

    const dockerUp = spawn("docker-compose", ["up", "-d", "--build"], {
      cwd: path.join(__dirname, "../docker"),
      stdio: "inherit",
      shell: true
    });

    dockerUp.on("close", (code) => {
      if (code !== 0) process.exit(code);

      const gradleProcess = spawn(gradleCmd, ["quarkusDev", "-p", projectPath], {
        stdio: "inherit",
        shell: true
      });

      gradleProcess.on("close", (code) => process.exit(code));
    });
  });
} else {
  const gradleProcess = spawn(gradleCmd, [task, "-p", projectPath], {
    stdio: "inherit",
    shell: true
  });

  gradleProcess.on("close", (code) => process.exit(code));
}
