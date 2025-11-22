import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const command = `npx serve -s ${path.join(__dirname, "build")} -l 3000`;
console.log("🚀 Starting React build server...");
console.log(command);

const child = exec(command);

child.stdout.on("data", data => console.log(data.toString()));
child.stderr.on("data", data => console.error(data.toString()));

