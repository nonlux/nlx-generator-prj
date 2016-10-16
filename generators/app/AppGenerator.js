import { Base } from 'yeoman-generator';
import config from '../config';

export default class AppGenerator extends Base {
  initializing() {
    this.composeWith('prj:gitInit');
    this.composeWith('prj:gitIgnore');
    this.composeWith('prj:readme');
    this.composeWith('prj:tmuxinator');
    this.composeWith('prj:js');
  }
  prompting() {
    return config(this, ['projectName'], true);
  }
  writing() {
  }
}
