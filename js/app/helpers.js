var helpers = {
	_clear_div: function (divtarget) {
		divtarget = typeof divtarget !== 'undefined' ? divtarget : 'app';
		document.getElementById(divtarget).innerHTML = "";
	}
};