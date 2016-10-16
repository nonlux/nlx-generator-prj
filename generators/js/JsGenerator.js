import { Base } from 'yeoman-generator';
import config from '../config';

export default class JsGenerator extends Base {
  initializing() {
    this.composeWith('prj:gitIgnore');
  }
  prompting() {
    return config(this, [
      'projectName',
      'projectType',
      'isGithub',
      'isBabel',
      'isEslint',
    ]);
  }
  writing() {
    if (this.props.projectType === 'javascript') {
      const name = this.props.projectName;
      const config = {
        license: 'MIT',
        author: 'nonlux <nonluxi@gmail.com>',
        scripts: {
          postinstall: './npm-post.sh',
        },
        name,
        version: '0.0.1',
      };
      if (this.props.isGithub) {
        const url = `https://github.com/nonlux/${name}`;
        config.repository = {
          type: 'git',
          url: `${url}.git`
        };
        config.bugs = {
          url: `${url}/issues`
        };
        config.homepage = url;
      }
      if (!this.fs.exists(this.destinationPath('package.json'))) {
        console.log('generate package json');
        this.spawnCommandSync('npm', ['init', '-f']);
      }
      this.fs.extendJSON(this.destinationPath('package.json'), config);
      this.fs.copyTpl(
        this.templatePath('npm-post.sh'),
        this.destinationPath('npm-post.sh'),
        this.props
      );
    }
  }
  install() {
    if (this.props.projectType === 'javascript') {
      const devPackges = ['install'];
      if (this.props.isBabel) {
        devPackges.push('nlx-babel-config');
        this.spawnCommandSync('npm', ['install', 'nlx-babel-config', '--save-dev']);
      }
      if (this.props.isEslint) {
        devPackges.push('nlx-eslint-config');
      }
      devPackges.push('--save-dev');
      this.spawnCommandSync('npm', devPackges);
      this.spawnCommandSync('npm', ['install']);
    }
  }
}
