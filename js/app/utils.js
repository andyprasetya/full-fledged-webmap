function _dummy_function () {
	console.log('This is a dummy function.');
}
function attachTopNavFunction () {
	$('#navbarCollapse a.nav-link.flat').on('click', function(e){
		e.stopImmediatePropagation();
		var menuid = $(this).attr('id');
		$('.navbar-collapse').collapse('hide');
		switch(menuid){
			case 'home':
				helpers._clear_div('app');
				maps._createLandingPageMap();
				break;
			case 'login':
				createLoginBox();
				break;
			default:
				helpers._clear_div('app');
				console.log('__UNDEFINED__');
				break;
		}
		return false;
	});
	$('#navbarCollapse a.dropdown-item').on('click', function(e){
		e.stopImmediatePropagation();
		var menuid = $(this).attr('id');
		$('.navbar-collapse').collapse('hide');
		$(this).closest('li.nav-item.dropdown').find('.nav-link.dropdown-toggle').dropdown('toggle');
		helpers._clear_div('app');
		
		return false;
	});
}
function attachSidebarMenuFunction(){
	$('.sidebar-wrapper > ul.list-group > li.list-group-item-action').on('click', function(evt){
		evt.stopImmediatePropagation();
		helpers._clear_div('app_body');
		var menuid = $(this).attr('id');
		switch (menuid) {
			/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
			case '__example__1':
				/* set #app_body for application layout */
				$('#app_body').removeClass().addClass('col-md-10 app-body-application');
				var content = "" +
					"<div class='row'>" +
						"<div class='col-md-12'>" +
							"<nav aria-label='breadcrumb'>" +
								"<ul class='breadcrumb'>" +
									"<li class='breadcrumb-item'>Application</li>" +
									"<li class='breadcrumb-item active' aria-current='page'>Data</li>" +
								"</ul>" +
							"</nav>" +
							"<hr/>" +
							"" +
						"</div>" +
					"</div>" +
					"";
				document.getElementById('app_body').innerHTML = content;
				break;
			case '__example__2':
				/* set #app_body for map layout */
				$('#app_body').removeClass().addClass('col-md-10 app-body-map');
				_dummy_function();
				break;
			/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
			default:
				console.log('__UNDEFINED__');
				break;
		}
		return false;
	});
}
function createLoginBox () {
	/* needs a standard modal div in bootstrap 4.x */
	$('#form_modal_label').html("<i class='fa fa-lock'></i>&nbsp;Login");
	$('#form_modal_footer').html("<button type='button' class='btn btn-danger' data-dismiss='modal'><i class='fa fa-power-off'></i>&nbsp;Batal</button><button type='submit' class='btn btn-primary'><i class='fa fa-lock'></i>&nbsp;Login</button>");
	var htmlcomponent = "" +
		"<input type='hidden' id='loginrequest' name='loginrequest' value='LOGINDASHBOARD'>" +
		"<div class='form-group'>" +
			"<label for='username'>Username</label>" +
			"<input type='text' class='form-control' id='username' name='username' placeholder='Username'>" +
		"</div>" +
		"<div class='form-group'>" +
			"<label for='password'>Password</label>" +
			"<input type='password' class='form-control' id='password' name='password' placeholder='Password'>" +
		"</div>" +
		"<div id='notice' class='alert alert-primary text-center' role='alert'>Masukkan username dan password Anda.</div>" +
		"";
	$('#form_modal_body').html(htmlcomponent);
	$('#modalform').modal('show');
	$('#modalform').on('shown.bs.modal', function () {
		$('#dynamicform').submit(function(e){
			e.preventDefault();
			var _thisUsername = $('#username').val();
			var _thisPassword = $('#password').val();
			if (_thisUsername.length < 3 || _thisPassword.length < 3) {
				$('#notice').empty().removeClass().addClass('alert alert-danger text-center').html("Username/password tidak diterima.");
				setTimeout(function(){
					$('#notice').empty().removeClass().addClass('alert alert-primary text-center').html("Masukkan username dan password Anda.");
					$('#username,#password').val('');
					$('#username').focus();
				}, 2000);
			} else {
				console.log('process login..');
				$('#modalform').modal('hide');
			}
		});
	});
}