var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var HOME = process.env.HOME;
var path = require('path');
var jsYaml = require('js-yaml');
var config = require('../config');

module.exports = yeoman.Base.extend({
    initializing : function () {
    },
    prompting: function() {
        var generator = this;
        return config(generator, ['shortName']);
    },
    writing: function() {
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
                  {editor: 'emacsclient -s '+shortName+' ./'},
                  {zsh: ''},
              ]
          };
          this.fs.write(fileName,jsYaml.dump(obj));
      }
        var _this = this;
        this.fs.commit([], function(){
            _this.spawnCommand('ln',[fileName, path.join(HOME,'.tmuxinator/'+shortName+'.yml')])
        })
    }
});
