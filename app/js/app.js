(function() {

function CINDRELLAPROJECT(doc) {
	var _self = this;

	_self.doc = doc;

	_self.constructor(_self);
}

CINDRELLAPROJECT.prototype.constructor = function() {
	var progressBars = this.doc.querySelectorAll('[data-progress-bar]');

	for(var i=0; i<progressBars.length; i++) {
		progressBars[i].style.width = progressBars[i].dataset.progressBar;
	}

	$('.owl-carousel').owlCarousel({
		loop:true,
		margin:15,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			1000:{
				items:6
			}
		}
	});

	$('[data-scroll]').click(function (e) {
		$('html, body').stop().animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 1000);
	});
};

var app = new CINDRELLAPROJECT(document);

})();