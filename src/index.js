const defaults = require('lodash.defaults');
const flatten = require('lodash.flatten');
const union = require('lodash.union');

module.exports = plugin;

function plugin (opts) {
    opts = defaults(opts || {}, {
        name: 'page',
        exclude: []
    });

    var whitelist = flatten(union([opts.exclude], ['mode', 'stats']));

    return function (files, metalsmith, done) {

        for (var file in files) {

            for (var prop in files[file]) {

                if (whitelist.indexOf(prop) === -1) {

                    if (!files[file].hasOwnProperty(opts.name)) {
                        files[file][opts.name] = {};
                    }

                    files[file][opts.name][prop] = files[file][prop];
                    delete files[file][prop];
                }
            }
        }

        done();
    };
}
