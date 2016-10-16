import { Base } from 'yeoman-generator';
import config from '../config';

export default class ReadmeGenerator extends Base {
  prompting() {
    return config(this, ['projectName', 'description']);
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props
    );
  }
}
