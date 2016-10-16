import { Base } from 'yeoman-generator';
import config from '../config';

export default class GitIgnoreGenerator extends Base {
  prompting() {
    return config(this, ['projectType']);
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'),
      {
        isBabel: false,
        isEslint: false,
        ...this.props
      }
    );
  }
}
