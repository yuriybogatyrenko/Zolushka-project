$doc = $(document);

$(function () {
	$doc.on('click', '[data-toggle]', function () {
		var target = $(this).attr('data-toggle');
		var bl = $('[data-toggle-target="'+target+'"]');

		bl.slideToggle(300);
		$(this).toggleClass('active');
		console.log(target);
		console.log(bl);
	});
});