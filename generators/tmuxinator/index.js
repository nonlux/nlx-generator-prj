'use strict';
var yeoman = require('yeoman-generator');
var HOME = process.env.HOME;
var path = require('path');
var jsYaml = require('js-yaml');
var HOME = process.env.HOME;

module.exports = yeoman.Base.extend({
  prompting: function () {

    var prompts = [ ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var shortName = this.config.get('shortName');
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
});
