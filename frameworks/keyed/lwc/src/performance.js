let startTime;
let lastMeasure;

const startMeasure = (name) => {
	startTime = performance.now();
	lastMeasure = name;
}

const stopMeasure = () => {
	let last = lastMeasure;
	if (lastMeasure) {
		window.setTimeout(function () {
			lastMeasure = null;
			var stop = performance.now();
			console.log(last + ' took ' + (stop-startTime));
		}, 0);
	}
}

export default {
	start: startMeasure, 
	stop: stopMeasure,
};
