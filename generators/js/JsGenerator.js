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
        config.scripts.babel = 'babel';
        config.scripts['babel-build'] = 'babel src --out-dir lib';
        if (this.props.projectName === 'nlx-webpack-config') {
          config.scripts['babel-build'] = 'babel config --out-dir lib';
        }
      }
      if (this.props.isWebpack) {
        this.fs.copyTpl(
          this.templatePath('webpack/conf.js'),
          this.destinationPath('webpack.config.js'),
          this.props
        );
        this.fs.copyTpl(
          this.templatePath('webpack/dev.js'),
          this.destinationPath('src/dev.js'),
          this.props
        );
        this.fs.copyTpl(
          this.templatePath('webpack/pug.js'),
          this.destinationPath('pug/index.js'),
          this.props
        );
        if (!this.fs.exists(this.destinationPath('src/index.js'))) {
          this.fs.copyTpl(
            this.templatePath('webpack/index.js'),
            this.destinationPath('src/index.js'),
            this.props
          );
        }
        config.scripts.webpack = 'webpack';
        config.scripts.dev = 'webpack-dev-server --hot --inline';
      }
      const packagePath = this.destinationPath('package.json');
      const pack = require(packagePath);//eslint-disable-line global-require
      this.fs.write(packagePath, JSON.stringify(merge(pack, config)));
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
