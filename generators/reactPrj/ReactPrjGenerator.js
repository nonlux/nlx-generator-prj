import { Base as BaseGenerator } from 'yeoman-generator';
import config, { promptLocal }  from '../config';

export default class ReactPrjGenerator extends BaseGenerator {
  initializing() {
  //  this.composeWith('prj:gitIgnore');
  }
  prompting() {
    return config(this, [
      'projectType'
    ]);
  }
  /*
  promptingLocal() {
    return promptLocal(this, {
    });
  }
  */
  writing() {
    this.directory(
      this.templatePath(),
      this.destinationPath('src')
    );
  }
}
