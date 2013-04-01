(function() {
	var $ = document.querySelector.bind(document);

	var fs = (function() {
		var body = document.documentElement,
			rfs = body.requestFullscreen || body.webkitRequestFullscreen,
			efs = document.exitFullscreen || document.webkitExitFullscreen;

		this.toggle = function() {
			if (!(document.fullscreenElement || document.webkitFullscreenElement)) {
				if (rfs) {
					rfs.call(body, [Element.ALLOW_KEYBOARD_INPUT]);
				}
				else if (body.mozRequestFullScreen) {
					alert('Sorry, Firefox is too lame to support keyboard input in fullsceen.');
				}
				else {
					alert('Sorry, your browser is too lame to support fullscreen');
				}
			}
			else {
				if (efs) {
					efs.apply(document);
				}
			}
		}.bind(this);

		return this;
	})();


	var	c = $('#content'),
		t = $('#title');

	var lastItem = localStorage.getItem('lastItem'),
		items = JSON.parse(localStorage.getItem('items')),
		currentItem = null;

	function clearPlaceholder(e) {
		e.target.innerHTML = '';
		var range = document.createRange(),
			selection = window.getSelection();

		range.selectNodeContents(e.target);
		selection.removeAllRanges();
		selection.addRange(range);

		e.target.removeEventListener('focus', clearPlaceholder);
	}

	if (lastItem && (currentItem = items[lastItem])) {
		t.innerHTML = currentItem.title;
		c.innerHTML = currentItem.content;
		c.focus();
		
		var range = document.createRange(),
			selection = window.getSelection();

		range.selectNodeContents(c);
		range.collapse(false);
		selection.removeAllRanges();
		selection.addRange(range);
	}
	else {
		t.innerHTML = 'This is where you write the title';
		c.innerHTML = 'This is where you write whatever you want to write.<br><br>WARNING: THIS IS A WORK IN PROGRESS. DON\'T USE THIS FOR ANYTHING SERIOUS';
		t.addEventListener('focus', clearPlaceholder);
		c.addEventListener('focus', clearPlaceholder);
		items = [];
		currentItem = {
			title: '',
			content: ''
		};
		items.push(currentItem);

		localStorage.setItem('lastItem', 0);
	}

	$('button[fs]').addEventListener('click', function() {
		fs.toggle();
	})

	document.addEventListener('DOMContentLoaded', function() {
	});

	document.documentElement.addEventListener('keyup', function(e) {
		currentItem.title = t.innerHTML;
		currentItem.content = c.innerHTML;
		localStorage.setItem('items', JSON.stringify(items));
	});

	$('button[light]').addEventListener('click', function() {
		document.documentElement.classList.toggle('dark');
	});
}());