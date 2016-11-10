import { Base } from 'yeoman-generator';
import config, { promptLocal }  from '../config';
import merge from 'deepmerge';
import { exec } from 'child_process';

export default class JsGenerator extends Base {
  initializing() {
  //  this.composeWith('prj:gitIgnore');
  }
  prompting() {
    return config(this, [
      'shortName',
    ]);
  }
  promptingLocal() {
    return promptLocal(this, {
      role: () => {
        return {
          type: 'prompt',
          name: 'role',
          message: 'Role name:',
        };
      },
      file: () => {
        return {
          type: 'prompt',
          name: 'task',
          message: 'task:',
          default: 'main',
        };
      },
    });
  }
  writing() {
    const {task, role, shortName} = this.props;
    const filePath = this.destinationPath(`roles/${role}/tasks/${task}.yml`);
    this.fs.copyTpl(
      this.templatePath('main.yml'),
      filePath,
      this.props
    );
    const execLog = (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    };
    exec(`nohup sleep 0.5 && emacsclient -n -s ${shortName} ${filePath} &`, execLog);
    exec(`nohup tmux select-window -t :=1 &`, execLog);
  }
}
