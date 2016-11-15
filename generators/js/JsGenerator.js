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
      'isWebpack',
      'isGulp',
      'isReact',
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
        config.main="lib/index.js";
      }
      if (this.props.isWebpack) {
        this.fs.copyTpl(
          this.templatePath('webpack/conf.js'),
          this.destinationPath('webpack.config.js'),
          this.props
        );
        if (false) {
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
        }
        config.scripts.webpack = 'webpack';
        config.scripts.dev = 'webpack-dev-server --hot --inline';
      }
      if (this.props.isGulp) {
            this.fs.copyTpl(
              this.templatePath('gulp/gulpfile.js'),
              this.destinationPath('gulpfile.js'),
              this.props
            );
        const html = this.destinationPath('static/index.html');
        if (!this.fs.exists(html)) {
            this.fs.copyTpl(
              this.templatePath('gulp/index.html'),
              html,
              this.props
            );
        }
        const less = this.destinationPath('less/index.less');
        if (!this.fs.exists(less)) {
            this.fs.copyTpl(
              this.templatePath('gulp/index.less'),
              less,
              this.props
            );
        }
      }
      const packagePath = this.destinationPath('package.json');
      const pack = require(packagePath);//eslint-disable-line global-require
      this.fs.write(packagePath, JSON.stringify(merge(pack, config)));
    }
  }
  install() {
    if (this.props.projectType === 'javascript') {
      let devPackges = ['install', 'npm-check-updates'];
      let prodPackges = ['install'];
      if (this.props.isBabel) {
        devPackges.push('nlx-babel-config');
      }
      if (this.props.isEslint) {
        devPackges.push('nlx-eslint-config');
      }
      if (this.props.isWebpack) {
        devPackges.push('nlx-webpack-config');
      }
      if (this.props.isGulp) {
        devPackges.push('nlx-gulp-tasks');
      }
      if (this.props.isReact) {
        devPackges = [
          ...devPackges,
          ...[
            'react-hot-loader',
            'react-render-visualizer',
            'react-render-visualizer-decorator',
            'react-transform-catch-errors',
            'redbox-react',
            'redux-devtools',
            'redux-devtools-dispatch',
            'redux-devtools-dock-monitor',
            'redux-devtools-log-monitor',
            'redux-devtools-multiple-monitors',
            'why-did-you-update',
          ],
        ];
        prodPackges = [
          ...prodPackges,
          ...[
            'react',
            'react-addons-pure-render-mixin',
            'react-autosuggest',
            'react-bootstrap',
            'react-dom',
            'react-redux',
            'react-router',
            'redux',
            'redux-form',
            'redux-thunk',
            'reselect',
            'classnames',
          ],
        ];
        if (this.props.projectName !== 'nlx-react-common' ) {
          prodPackges.push('nlx-react-common');
        }
      }
      devPackges.push('--save-dev');
      prodPackges.push('--save');
      if (prodPackges.length > 2 ) {
        this.spawnCommandSync('npm', prodPackges);
      }
      this.spawnCommandSync('npm', devPackges);
    }
  }
}
