/* global jQuery: true, module: true */

jQuery = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var models = require('./models.js');
window.jQuery = window.$ = jQuery;
require('bootstrap');

var ImageMapView = Backbone.View.extend({
    events: {
        'mouseover  #imageMapArea area': 'onMouseOver',
        'mouseout  #imageMapArea area': 'onMouseOut',
        'hover #imageMapArea area': 'onHover',
        'click #imageMapArea area': 'onClick',
    },
    initialize: function(options) {
        _.bindAll(this, 'render', 'onMouseOver', 'onMouseOut', 'onClick');

        var self = this;
        this.template = options.template;
        this.items = new models.ItemList(options.items);

        for (var i = 0; i < this.items.length; i++) {
            this.items.at(i).bind('change', self.render);
        }

        jQuery(window).on('beforeunload', this.beforeUnload);

        this.render();
    },
    render: function() {
        var context = {
            'items': this.items.toTemplate()
        };

        var markup = this.template(context);
        jQuery(this.el).html(markup);
    },
    reset: function() {
        jQuery('#imageMapArea area').each(function() {
            var areaIdx = jQuery(this).attr('alt');
            jQuery('#chart_nav' + areaIdx)
                .removeClass().addClass('nav' + areaIdx);
        });

        jQuery(this.el).find('.textactive').removeClass('textactive');
    },
    onMouseOut: function(evt) {
        var areaIdx = jQuery(evt.target).attr('alt');
        var $elt = jQuery('#chart_nav' + areaIdx);
        $elt.removeClass('nav' + areaIdx + '-hover');
    },
    onMouseOver: function(evt) {
        var areaIdx = jQuery(evt.target).attr('alt');
        var $elt = jQuery('#chart_nav' + areaIdx);
        if (!$elt.hasClass('nav' + areaIdx + '-active')) {
            $elt.addClass('nav' + areaIdx + '-hover');
        }
    },
    onClick: function(evt) {
        evt.preventDefault();

        this.reset();
        var areaIdx = jQuery(evt.target).attr('alt');

        jQuery('#chart_nav' + areaIdx).addClass('nav' + areaIdx + '-active');
        jQuery('.text' + areaIdx).addClass('textactive');
        return false;
    }
});

var ImageMapChartApp = {
    initialize: function(options) {
        var view = new ImageMapView({
            el: jQuery(options.el),
            template: options.template,
            items: options.items
        });

        jQuery('body').show();
    }
};

module.exports.ImageMapChartApp = ImageMapChartApp;
