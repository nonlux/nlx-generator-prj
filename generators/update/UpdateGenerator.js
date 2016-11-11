import { Base as BaseGenerator } from 'yeoman-generator';
import config, { promptLocal }  from '../config';

export default class UpdateGenerator extends BaseGenerator {
  initializing() {
    this.composeWith('prj:gitInit');
    this.composeWith('prj:gitIgnore');
    this.composeWith('prj:readme');
    this.composeWith('prj:tmuxinator');
    this.composeWith('prj:js');
    this.composeWith('prj:projectile');
  }
}
