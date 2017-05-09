app.config(function($routeProvider, $locationProvider, $httpProvider) {

    var viewDir = 'app/views/';

    $routeProvider

    .when('/', {
        templateUrl : viewDir+'home/home-view.html',
        controller  : 'HomeCtrl'
    })

    .when('/contact', {
        templateUrl : viewDir+'home/contact-view.html',
        controller  : 'HomeCtrl'
    })

    .when('/cscs-cards', {
        templateUrl : viewDir+'menu/cscs-view.html',
        controller  : 'HomeCtrl'
    })

    .when('/cscs-test', {
        templateUrl : viewDir+'menu/test-view.html',
        controller  : 'HomeCtrl'
    })

    .when('/:catName', {
        templateUrl : viewDir+'cat/cat-view.html',
        controller  : 'CatCtrl'
    })

    .when('/:catName/:courseName', {
        templateUrl : viewDir+'course/course-view.html',
        controller  : 'CourseCtrl'
    })



    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

});
