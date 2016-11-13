import { Base } from 'yeoman-generator';
import config, { promptLocal }  from '../config';
import merge from 'deepmerge';
import { switchToEditor} from '../utils.js'

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
      task: () => {
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
    switchToEditor(shortName, filePath);
  }
}
