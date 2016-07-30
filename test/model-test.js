/* global describe: true, it: true */

var assert = require('chai').assert;

var models = require('../src/models.js');

describe('Models', function() {
    it('ItemList', function() {
        var data = [{'name': 'item'}];
        var a = new models.ItemList(data);
        var output = a.toTemplate();

        assert.equal(output.length, 1);
        assert.equal(data[0].name, output[0].name);
    });

});
