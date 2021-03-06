'use strict';

//dependencies
var _ = require('lodash');

/**
 * @module convertor
 * @type {Object}
 * @version 0.1.0
 * @public
 */
var convertor = {};


/**
 * @description parse and detect boolean attributes of given node and 
 *              convert them to javascript boolean
 *              
 *              Algorithm:
 *              for each node attribute
 *              if value is or match `true()` 
 *                  convert it to js true boolen
 *              if value is or match `false()` 
 *                  convert it to js false boolen
 *              end
 *              
 * @param  {Object} node valid xform node object in json format
 * @return {Object}         a node with attribute
 */
convertor.parseBooleans = function(node) {

    //TODO parallelize
    _.forEach(node, function(value, key) {

        //detect true and covert it to js type
        if (value && _.startsWith(value, 'true')) {
            node[key] = true;
        }

        //detect false and convert it to js type
        if (value && _.startsWith(value, 'false')) {
            node[key] = false;
        }

    });


    return node;
};


convertor.parseRegexConstraint = function(constraint) {
    if (_.startsWith(constraint, 'regex')) {
        //remove regex(., at the begin
        var regex = constraint.replace('regex(.,', '');

        //remove bracket at the end
        regex = regex.substring(0, regex.length - 1);

        //trim
        regex = regex.trim();

        constraint = {
            type: 'regex',
            pattern: regex
        };
    }

    return constraint;
};


//export convertor
module.exports = exports = convertor;