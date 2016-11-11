import { exec } from 'child_process';
export function switchToEditor(emacsServer, file) {
    const execLog = (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    };
    exec(`nohup sleep 0.5 && emacsclient -n -s ${emacsServer} ${file} &`, execLog);
    exec(`nohup tmux select-window -t :=1 &`, execLog);
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
