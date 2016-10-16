import { Base } from 'yeoman-generator';
import config from '../config';

export default class GitInitGenerator extends Base {
  prompting() {
    return config(this, ['projectName', 'isGithub', 'description']);
  }
  writing() {
    if (!this.fs.exists(this.destinationPath('.git'))) {
      this.spawnCommandSync('git', ['init']);
    }
    if (this.props.isGithub) {
      this.spawnCommandSync('hub', ['create', '-d', this.props.description]);
    }
  }
}
