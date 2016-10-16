var HOME = process.env.HOME;
var path = require('path');


function loadConfig(generator, refresh) {
    var data = global.DATA ? global.DATA : generator.config.getAll();
    if (refresh) {
        data = {};
    }

    return new Promise(function(resolve){ resolve(data)});
}
function filterData(allowed) {
    return  function (data) {
        var ret = {};
        allowed.forEach(function(key) {
            if (key in data){
                ret[key] = data[key];
            }
        });
        return new Promise(function (resolve) { return resolve(ret) });
    }

}

function getPromptedFields(data, required) {
    var ret = [];
    required.forEach(function(key) {
        if (!(key in data )){
            ret.push(key);
        }
    });

    return ret;


}
function promptRequired(required, generator) {
    return function(data)  {
        var  promptKeys = getPromptedFields(data, required);

        return new Promise(function(resolve) {
            prompt(data, promptKeys, generator, resolve);
        });
    }
}

function prompt(data, promptKeys, generator, resolve) {
    var schema = {
        projectName: function() {
            return {
                type: 'prompt',
                name: 'projectName',
                message: 'Project name:',
            }},
        shortName:function(data) {
            return {
                type: 'prompt',
                name: 'shortName',
                message: 'Project short name:',
                default: data.projectName
            }},
        projectType: function() {
            return {
                type: 'list',
                name: 'projectType',
                message: 'Type of project:',
                choices: ['shell', 'javascript'],
            };
        },
        isGithub: function() {
            return {
                type: 'confirm',
                name: 'isGithub',
                message: 'Publish on github?',
            };
        },
        isBabel: function() {
            return {
                type: 'confirm',
                name: 'isBabel',
                message: 'Use babel.js?',
            };
        },
        description: function() {
            return {
                type: 'prompt',
                name: 'description',
                message: 'Description:',
                default:'',
            };
        },
    };
    var key  = promptKeys.shift();
    if (key) {
        generator.prompt([schema[key](data)]).then(function(props) {
            Object.assign(data, props);
            prompt(data, promptKeys, generator, resolve);
        });
    }
    else {
        resolve(data);
    }

}

function config(generator, options, refresh ){
    return new Promise(function(resolve){
        loadConfig(generator, refresh)
            .then(promptRequired(options, generator))
            .then(function(data){
                generator.props=data;
                generator.destinationRoot(path.join(HOME,'src', data.projectName));
                generator.config.set(data);
                generator.config.save();
                global.DATA  = data;
                resolve(data);
            });
    });
};


module.exports = config;
