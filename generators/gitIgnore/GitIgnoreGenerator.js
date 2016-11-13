import { Base } from 'yeoman-generator';
import config from '../config';
import { mergeText } from '../utils';

 function  ignors({projectType}) {
    let defaultsIgnors = [
      '*~',
      '*\#*',
      '\#*',
      '*.log',
      '*.pyc',
      '*.swp',
      '/tmp/*',
    ];
    const ignorsByProjects = {
      shell: [
      ],
      javascript: [
        'node_modules/*'
      ],
      ansible: [
        '*.retry'
      ],
    };

  return [...defaultsIgnors, ...ignorsByProjects[projectType]];
}

export default class GitIgnoreGenerator extends Base {
  prompting() {
    return config(this, ['projectType']);
  }
  writing() {
    const file = this.destinationPath('.gitignore');
    let content = '';
    if (this.fs.exists(file)) {
      content = this.fs.read(file, ' ');
    }
    this.fs.write(file, mergeText(content, ignors(this.props)));
  }
}
