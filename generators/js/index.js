var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var HOME = process.env.HOME;
var path = require('path');
var config = require('../config');

module.exports = yeoman.Base.extend({

    initializing: function() {
    },
    prompting: function() {
        var generator = this;
        return config(generator, ['projectName', 'projectType']);
    },

    writing2: function () {
        console.log('props');
        console.log(this.props);
    }
/*        console.log(this.config.get('projectName'));
        if (this.config.get('projectType') === 'javascript') {
        var name = this.config.get('projectName');
        var config = {
            license:  "MIT",
            author: "nonlux <nonluxi@gmail.com>",
            scripts: {
                postinstall: './npm-post.sh',
            }
        };
        if (this.config.get('isGithub')) {
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
        }

    },
    install: function () {
        this.spawnCommand('npm', ['install', 'nlx-babel-config', '--save-dev']);
    }
    */
});
