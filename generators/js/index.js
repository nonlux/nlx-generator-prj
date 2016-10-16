var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var HOME = process.env.HOME;
var path = require('path');
var config = require('../config');

module.exports = yeoman.Base.extend({

    initializing: function() {
        this.composeWith('prj:gitIgnore');
    },
    prompting: function() {
        var generator = this;
        return config(generator, [
            'projectName',
            'projectType',
            'isGithub',
            'isBabel',
            'isEslint',
        ]);
    },
    writing: function () {
        if (this.props.projectType === 'javascript') {
            console.log(this.props);
            console.log(this.destinationPath('package.json'));
            var name = this.props.projectName;
            var config = {
                license:  "MIT",
                author: "nonlux <nonluxi@gmail.com>",
                scripts: {
                    postinstall: './npm-post.sh',
                },
                name: name,
                version: '0.0.1',
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
    },
    install: function () {
        if (this.props.projectType === 'javascript') {
            if (this.props.isBabel) {
                this.spawnCommandSync('npm', ['install', 'nlx-babel-config', '--save-dev']);
            }
            if (this.props.isEslint) {
                this.spawnCommandSync('npm', ['install', 'nlx-eslint-config', '--save-dev']);
            }
          this.spawnCommandSync('npm', ['install']);
        }
    }
});
