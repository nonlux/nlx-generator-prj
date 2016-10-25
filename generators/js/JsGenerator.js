import { Base } from 'yeoman-generator';
import config from '../config';
import merge from 'deepmerge';

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
      'isWebpack'
    ]);
  }
  writing() {
    if (this.props.projectType === 'javascript') {
      const name = this.props.projectName;
      const config = {
        license: 'MIT',
        author: 'nonlux <nonluxi@gmail.com>',
        scripts: {
          postinstall: '',
          ncu: 'ncu'

        },
        name,
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
        config.version = '0.0.1';
      }
      const pack = require(this.destinationPath('package.json')); //eslint-disable-line global-require
      this.fs.write(this.destinationPath('package.json'), JSON.stringify(merge(pack, config)));
      if (this.props.isEslint) {
        this.fs.copyTpl(
          this.templatePath('eslintrc.js'),
          this.destinationPath('.eslintrc.js'),
          this.props
        );
      }
      if (this.props.isBabel) {
        this.fs.copyTpl(
          this.templatePath('babelrc.js'),
          this.destinationPath('.babelrc'),
          this.props
        );
      }
    }
  }
  install() {
    if (this.props.projectType === 'javascript') {
      const devPackges = ['install', 'npm-check-updates'];
      if (this.props.isBabel) {
        devPackges.push('nlx-babel-config');
      }
      if (this.props.isEslint) {
        devPackges.push('nlx-eslint-config');
      }
      if (this.props.isWebpack) {
        devPackges.push('nlx-webpack-config');
      }
      devPackges.push('--save-dev');
      this.spawnCommandSync('npm', devPackges);
    }
  }
}
