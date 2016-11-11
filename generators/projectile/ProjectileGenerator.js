import { Base as BaseGenerator } from 'yeoman-generator';
import config, { promptLocal }  from '../config';
import { mergeText } from '../utils';

function  ignors({projectType}) {
    let defaultsIgnors = [
    ];
    const ignorsByProjects = {
      shell: [
      ],
      javascript: [
        '-node_modules'
      ],
      ansible: [
      ],
    };

  return [...defaultsIgnors, ...ignorsByProjects[projectType]];
}

export default class ProjectileGenerator extends BaseGenerator {
  initializing() {
  //  this.composeWith('prj:gitIgnore');
  }
  prompting() {
    return config(this, [
      'projectType',
    ]);
  }
  /*
  promptingLocal() {
    return promptLocal(this, {
    });
  }
  */
  writing() {
    const file = this.destinationPath('.projectile');
    let content = '';
    if (this.fs.exists(file)) {
      content = this.fs.read(file, ' ');
    }
    this.fs.write(file, mergeText(content, ignors(this.props)));
  }
}
