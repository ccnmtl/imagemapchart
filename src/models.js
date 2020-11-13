/* global module: true */

var Backbone = require('backbone');

var Item = Backbone.Model.extend({
    defaults: {
        clicked: false
    },
    toTemplate: function() {
        return {...this.attributes};
    }
});

var ItemList = Backbone.Collection.extend({
    model: Item,
    initialize: function(lst) {
        if (lst !== undefined && lst instanceof Array) {
            for (var i = 0; i < lst.length; i++) {
                var x = new Item(lst[i]);
                this.add(x);
            }
        }
    },
    getByDataId: function(internalId) {
        return this.get(internalId);
    },
    toTemplate: function() {
        var a = [];
        this.forEach(function(item) {
            a.push(item.toTemplate());
        });
        return a;
    },
    clicked: function() {
        var clicked = 0;
        this.forEach(function(item) {
            if (item.get('clicked')) {
                clicked++;
            }
        });
        return clicked;
    }
});

module.exports.Item = Item;
module.exports.ItemList = ItemList;
