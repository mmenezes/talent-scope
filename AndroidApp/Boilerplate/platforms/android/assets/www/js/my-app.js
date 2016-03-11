document.addEventListener('deviceready', function () {
	// Cordova's device APIs have loaded and are ready to access
	pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
	
	/*
	// Does not work with the PhoneGap Developer app
	cordova.plugins.notification.local.schedule({
		id         : 1,
		title      : 'I will bother you every minute',
		text       : '.. until you cancel all notifications',
		sound      : null,
		every      : 'minute',
		autoClear  : false,
		at         : new Date(new Date().getTime() + 10*1000)
	});
	*/
	
	/*
	// Does not work with the PhoneGap Developer app
	window.plugins.toast.showWithOptions(
		{
			message: "hey there",
			duration: "short",
			position: "bottom",
			addPixelsY: -40  // added a negative value to move it up a bit (default 0)
		},
		onSuccess, // optional
		onError    // optional
	);
	*/
	
	var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    console.log('Connection type: ' + states[networkState]);
	
	/*
	// Does not work with the PhoneGap Developer app
	OAuth.initialize('wpC-hWqTXtHcWtfgAL0ltVEVG2I');
	*/
	
	/*
	// Does not work with the PhoneGap Developer app
	var exitApp = false, interval = setInterval(function (){ exitApp = false; }, 1000);
	document.addEventListener("backbutton", function (e){
        e.preventDefault();
        
		if(exitApp){
			clearInterval(interval);
            (navigator.app && navigator.app.exitApp()) || (device && device.exitApp())
        }else {
			window.plugins.toast.show('Press back once more to exit the app', 'short', 'center', function(a){
				console.log('toast success: ' + a);
			}, function(b){
				alert('toast error: ' + b)
			});
            exitApp = true
            history.back(1);
        }
    }, false);
	*/
}, false);

// Export selectors engine
var $$ = Dom7;

// Initialize your app
var myApp = new Framework7({
	init: false,
	pushState: true, // Gets hardware back button working
	material: true,
	swipePanelOnlyClose: true,
	hideNavbarOnPageScroll: true,
	// Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    },
	preroute: function (view, options) {
        
    }
});

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages:
myApp.onPageInit('index', function (page) {
    // run createContentPage func after link was clicked
    $$('#getContacts').on('click', function () {
		getContacts();
		
		console.log('Load performing');
		$$.get('http://10.244.54.86:3000/route/bye', {}, function (response) {
			console.log(response);
			console.log('Load was performed');
		});
	});
	
	$$('#vibrate').on('click', function () {
		navigator.vibrate(1000);
		
		console.log('Load performing');
		$$.get('http://10.244.54.86:3000/route/hi', {}, function (response) {
			console.log(response);
			console.log('Load was performed');
		});
	});
	
	console.log('Load performing');
	$$.get('http://10.244.54.86:3000/route/bye', {}, function (response) {
		console.log(response);
		console.log('Load was performed');
	});
	
	$$('#uploadFileChoose').on('click', function () {
		navigator.camera.getPicture(successCallback, errorCallback, {
			quality: 50,
			destinationType: destinationType.FILE_URI,
			sourceType: pictureSource.PHOTOLIBRARY,
			mediaType: navigator.camera.MediaType.ALLMEDIA
		});
	});
	
	/*
	var options = {
		'bgcolor': '#0da6ec',
		'fontcolor': '#fff',
		'onOpened': function () {
			console.log("welcome screen opened");
		},
		'onClosed': function () {
			console.log("welcome screen closed");
		}
    },
    welcomescreen_slides = [
		{
			id: 'slide0',
			picture: '<div class="tutorialicon">A</div>',
			text: 'Welcome to this tutorial. In the <a class="tutorial-next-link" href="#">next steps</a> we will guide you through a manual that will teach you how to use this app.'
		},
		{
			id: 'slide1',
			picture: '<div class="tutorialicon">B</div>',
			text: 'This is slide 2'
		},
		{
			id: 'slide2',
			picture: '<div class="tutorialicon">C</div>',
			text: 'This is slide 3'
		},
		{
			id: 'slide3',
			picture: '<div class="tutorialicon">D</div>',
			text: 'Thanks for reading! Enjoy this app or go to <a class="tutorial-previous-slide" href="#">previous slide</a>.<br><br><a class="tutorial-close-btn" href="#">End Tutorial</a>'
		}
    ],
    welcomescreen = myApp.welcomescreen(welcomescreen_slides, options);
    
    $$(document).on('click', '.tutorial-close-btn', function () {
		welcomescreen.close();
    });

    $$('.tutorial-open-btn').click(function () {
		welcomescreen.open();  
    });
    
    $$(document).on('click', '.tutorial-next-link', function (e) {
		welcomescreen.next(); 
    });
    
    $$(document).on('click', '.tutorial-previous-slide', function (e) {
		welcomescreen.previous(); 
    });
	*/
});

// Initialize the app
myApp.init();

myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
	
	$$('#loginBtn').on('click', function () {
		console.log("loginBtn clicked");
		
        /*
		// Does not work with the PhoneGap Developer app
		OAuth.popup('linkedin', {
			cache: true
		})
		.done(function(result) {
			//use result.access_token in your API request 
			//or use result.get|post|put|del|patch|me methods (see below)
		})
		.fail(function (err) {
			//handle error with err
		});
		*/
    });
	
	$$('.open-indicator').on('click', function () {
		myApp.showIndicator();
		
		setTimeout(function () {
			myApp.hideIndicator();
		}, 2000);
	});
});

myApp.onPageInit('form', function (page) {
    var myCalendar = myApp.calendar({
		input: '#calendar-input',
		dateFormat: 'dd/mm/yyyy',
		monthPicker: true,
		yearPicker: true
	});
});

function getContacts(){
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;
	options.desiredFields = [navigator.contacts.fieldType.id];
	options.hasPhoneNumber = true;
	options.hasPhoneNumber = true;
	var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
	navigator.contacts.find(fields, onSuccess, onError, options);
}

function onSuccess(contacts){
	console.log(contacts);
}

function onError(){
	console.log("Some Error Occured");
}

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        
        '<div class="pages">' +
        '    <!-- Page, data-page contains page name-->' +
        '    <div data-page="dynamic-pages" class="page navbar-fixed">' +
		'        <!-- Top Navbar-->' +
        '        <div class="navbar">' +
        '            <div class="navbar-inner">' +
        '                <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i></a></div>' +
        '                <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '            </div>' +
        '        </div>' +
        '        <!-- Scrollable page content-->' +
        '        <div class="page-content">' +
        '            <div class="content-block">' +
        '                <div class="content-block-inner">' +
        '                    <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '                    <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    );
	return;
}

function successCallback(fileURI) {
	console.log(fileURI);
	
	window.FilePath.resolveNativePath(fileURI, function (realFileURI) {
        console.log(realFileURI);
    }, function (error) {
        console.log(error);
    });
}

function errorCallback(error) {
	console.log(error);
}