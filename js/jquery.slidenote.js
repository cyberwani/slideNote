/*
 * Slide Note
 * A jQuery Plugin for flexible, customizable sliding notifications.
 *
 * Copyright 2010 Tom McFarlin, http://tommcfarlin.com
 * Released under the MIT License
 * More information: http://slidenote.info
*/

;(function($) {

	$.slideNoteCount = 0;
	$.fn.slideNote = function(options) {
		
		$.slideNoteCount += this.length;
		
		var opts = $.extend({}, $.fn.slideNote.defaults, options);
		return this.each(function() {
			
			var $note = $(this).toggle().css(opts.corner, -1 * $(this).outerWidth());

			if(opts.url !== null) {
				_retrieveData($note, opts);
			}
			
			$(document).scroll(function() {
				if($(this).scrollTop() > opts.where) {
					if(!$note.is(':visible')) {
						_slideIn($note, opts);
					}
				} else if ($(this).scrollTop() < opts.where && $note.queue('fx')[0] !== 'inprogress') {
					if($note.is(':visible')) {
						_slideOut($note, opts);
					}
				}
				
			});
			
		});
		
	};
	
	function _slideIn($obj, opts) {	
		var direction = opts.corner === 'right' ? { 'right' : 0 } : { 'left' : 0 } ;
		$obj.show().animate(direction, 1000, 'swing');
	}
	
	function _slideOut($obj, opts) {
		var direction = opts.corner === 'right' ? { 'right' : -1 * $obj.outerWidth() } : { 'left' : -1 * $obj.outerWidth() };
		$obj.animate(direction, 1000, 'swing', function() {
			if($.slideNoteCount === 1) {
				$obj.stop(true).hide();
			} else {
				$obj.hide();
			}
		});
	}
	
	function _retrieveData($obj, opts) {
	
		if(opts.container.length !== 0 && opts.container.indexOf('#') === -1) {
			opts.container = '#' + opts.container;
		}
		
		var sUrl = opts.container.length === 0 ? opts.url : opts.url + ' ' + opts.container;
		$obj.load(sUrl);
		
	}

	$.fn.slideNote.defaults = {
		where: 640,
		corner: 'right',
		url: null,
		container: ''
	};
	
})(jQuery);