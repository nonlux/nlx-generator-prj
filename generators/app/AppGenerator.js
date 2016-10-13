
// import yeoman from 'yeoman-generator';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var HOME = process.env.HOME;
var path = require('path');
var jsYaml = require('js-yaml');
var config = require('../config');

module.exports = yeoman.Base.extend({
    initializing : function () {
        this.composeWith('prj:js');
    },
    prompting: function() {
        var generator = this;
        return config(generator, ['projectName', 'shortName'], true);
    },
    writing: function() {
        console.log('this');
        console.log(this.config.getAll());
    }
    

    /*
      prompting: function () {
      // Have Yeoman greet the user.
      this.log(yosay(
      'Welcome to the lovely ' + chalk.red('generator-prj') + ' generator!'
      ));

      return this.prompt(prompts).then(function (props) {
      this.props = Object.assign({}, props, this.props);
      this.destinationRoot(path.join(HOME,'src', this.props.projectName));
      }.bind(this));
      },

      prompting2: function () {
      var prompts = [
      {
      type: 'prompt',
      name: 'shortName',
      message: 'Project short name:',
      default: this.props.projectName,
      },
      {
      type: 'prompt',
      name: 'description',
      message: 'Description:',
      default:'',
      },
      {
      type: 'list',
      name: 'projectType',
      message: 'Type of project:',
      choices: ['shell', 'javascript'],
      },
      {
      type: 'prompt',
      name: 'isGithub',
      message: 'Publish on github?(y/n)',
      default: !true,
      },

      ];

      return this.prompt(prompts).then(function (props) {
      this.props = Object.assign({}, props, this.props);
      this.props.isGithub = this.props.isGithub === 'y' || this.props.isGithub === true;
      }.bind(this));
      },
      
      writing: function () {
      console.log(this.props,this.destinationRoot());
      this.config.set(this.props);
      this.config.save();
      this.log('Project path: ' + this.destinationRoot());
      if (!this.fs.exists( this.destinationPath('.git') )) {
      this.spawnCommandSync('git',['init']);
      if (this.props.isGithub) {
      this.spawnCommandSync('hub', ['create', '-d', this.props.description]);
      }
      }
      this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props
      );
      this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'),
      this.props
      );
      },
      writingTmux: function () {
      var shortName = this.props.shortName;
      var fileName = this.destinationPath('.ide/'+shortName+'.yml')
      if (!this.fs.exists(fileName)) {
      this.log('Generate tmuxinator file')
      var obj = {
      name: shortName,
      root: this.destinationRoot(),
      pre: 'emacs --eval "(setq server-name \\"'+shortName+'\\")" --daemon',
      startup_window: 'editor',
      windows: [
      {none: ''},
      {editor: 'emacsclient -s '+shortName+' ./README.md'},
      {zsh: ''},
      ]
      };
      this.fs.write(fileName,jsYaml.dump(obj));
      }
      var _this = this;
      this.fs.commit([], function(){
      _this.spawnCommand('ln',[fileName, path.join(HOME,'.tmuxinator/'+shortName+'.yml')])
      })
      },

      writingJs: function () {
      if (this.props.projectType === 'javascript') {
      var name = this.props.projectName;
      var config = {
      license:  "MIT",
      author: "nonlux <nonluxi@gmail.com>",
      scripts: {
      postinstall: './npm-post.sh',
      }
      };
      if (this.props.isGithub) {
      var url = "https://github.com/nonlux/"+name;
      config.repository= {
      "type": "git",
      "url": url+".git"
      };
      config.bugs= {
      "url": url+"/issues"
      };
      config.homepage= url;
      };
      if (!this.fs.exists( this.destinationPath('package.json') )) {
      this.spawnCommandSync('npm', ['init', '-f']);
      this.fs.extendJSON(this.destinationPath('package.json'), config);
      }
      this.fs.copyTpl(
      this.templatePath('npm-post.sh'),
      this.destinationPath('npm-post.sh'),
      this.props
      );
      this.fs.write(
      this.destinationPath('.gitignore'),
      this.fs.read(this.destinationPath('.gitignore'))+
      this.fs.read(this.templatePath('.gitignore')),
      );

      this.spawnCommand('npm', ['install', 'nlx-babel-config', '--save-dev']);
      }
      }
    */
});
