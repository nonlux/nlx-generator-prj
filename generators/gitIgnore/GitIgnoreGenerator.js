import { Base } from 'yeoman-generator';
import config, {ignors}  from '../config';
import { mergeText } from '../utils';

export default class GitIgnoreGenerator extends Base {
  prompting() {
    return config(this, ['projectType']);
  }
  writing() {
    const file = this.destinationPath('.gitignore');
    const content = this.fs.read(file, ' ');
    console.log(mergeText(content, ignors(this.props)));
    this.fs.write(file, mergeText(content, ignors(this.props)));
  }
}
