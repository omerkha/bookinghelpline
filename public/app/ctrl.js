app.controller('NaviCtrl', function($scope, $timeout, $http, cats, courses, $localStorage, func, $location) {
  if($localStorage.bh !== undefined && $localStorage.bh.courses) {
    courses = $localStorage.bh.courses;
    $scope.courses = courses;
  } else {
    $localStorage.bh = {};
    func.getCourses(function(respCourses) {
      courses = respCourses;
      $localStorage.bh.courses = courses;
      $scope.courses = courses;
    })
  }

  if($location.path() == '/') {
    $localStorage.bh = {};
    func.getCourses(function(respCourses) {
      courses = respCourses;
      $localStorage.bh.courses = courses;
      $scope.courses = courses;
    })
  }

  $scope.addCartSubmit = function(prodID) {
    func.addCart(prodID, function() {
      $location.path('/cart');
    })
  }


})

app.controller('HomeCtrl', function($scope, $timeout, $http, cats, courses, details) {

  $scope.cats = cats;
  $scope.details = details;


  $scope.presentShow = function(catName) {
    console.log(catName);
    $('.pres-menu').removeClass('active');
    $('[data-presmenu="'+catName+'"]').addClass('active');
    $scope.presentCat = catName;
  }



  $timeout(function () {
    for(key in cats) {
      var eles = $('[data-row="'+cats[key].name+'"]');
      for(k in eles) {
        if(k > 3) {
          //$(eles[k])[0].remove();
        }
      }
    }
    $scope.presentShow('Construction');
  }, 500);

  $timeout(function () {

    /*if(loadCount == 1) {
      $scope.getProd();
    }

    loadCount++;*/

    // -------------------------------------------------------------
    //  select options
    // -------------------------------------------------------------

    (function() {
          $('.select-cat').on('click', function() {
            $('this').closest('div').find('select').slideToggle(110)

        });

    }());


     // -------------------------------------------------------------
    //  Home Carousel
    // -------------------------------------------------------------

    (function( $ ) {

        //Function to animate slider captions
        function doAnimations( elems ) {
            //Cache the animationend event in a variable
            var animEndEv = 'webkitAnimationEnd animationend';

            elems.each(function () {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function () {
                    $this.removeClass($animationType);
                });
            });
        }

        //Variables on page load
        var $myCarousel = $('#home-section'),
            $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");

        //Initialize carousel
        $myCarousel.carousel();

        //Animate captions in first slide on page load
        doAnimations($firstAnimatingElems);

        //Pause carousel
        $myCarousel.carousel('pause');

        //Other slides to be animated on carousel slide event
        $myCarousel.on('slide.bs.carousel', function (e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });

    })(jQuery);


    // -------------------------------------------------------------
    //  language Select
    // -------------------------------------------------------------

   (function() {

        $('.category-dropdown').on('click', '.category-change a', function(ev) {
            if ("#" === $(this).attr('href')) {
                ev.preventDefault();
                var parent = $(this).parents('.category-dropdown');
                parent.find('.change-text').html($(this).html());
            }
        });

    }());



    // -------------------------------------------------------------
    // Accordion
    // -------------------------------------------------------------

        (function () {
            $('.collapse').on('show.bs.collapse', function() {
                var id = $(this).attr('id');
                $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-faq');
                $('.list-title span').html('<i class="fa fa-minus"></i>');
            });

            $('#advanced-filter').on('hide.bs.collapse', function() {
                var id = $(this).attr('id');
                $('.list-title span').html('<i class="fa fa-plus"></i>');
            });
        }());


    // -------------------------------------------------------------
    //  Checkbox Icon Change
    // -------------------------------------------------------------

    (function () {

        $('input[type="checkbox"]').change(function(){
            if($(this).is(':checked')){
                $(this).parent("label").addClass("checked");
            } else {
                $(this).parent("label").removeClass("checked");
            }
        });

    }());


   // -------------------------------------------------------------
    //  tab view change
    // -------------------------------------------------------------

    $('.tab-view .grid-view-tab').on('click', function() {
        $('.tab-view .grid-view-tab').addClass('active');
        $('.tab-view .list-view-tab, .tab-view .small-view-tab').removeClass('active');
        $('.category-tab .tab-content').removeClass('list-view-tab small-view-tab').addClass('grid-view-tab');
    });

     $('.tab-view .small-view-tab').on('click', function() {
        $('.tab-view .small-view-tab').addClass('active');
        $('.tab-view .list-view-tab, .tab-view .grid-view-tab').removeClass('active');
        $('.category-tab .tab-content').removeClass('list-view-tab grid-view-tab').addClass('small-view-tab');
    });

    $('.tab-view .list-view-tab').on('click', function() {
        $('.tab-view .list-view-tab').addClass('active');
        $('.tab-view .grid-view-tab, .tab-view .small-view-tab').removeClass('active');
        $('.category-tab .tab-content').removeClass('grid-view-tab small-view-tab').addClass('list-view-tab');

    });


  }, 100);


  $timeout(function () {


  // -------------------------------------------------------------
  //  Owl Carousel
  // -------------------------------------------------------------


  (function() {

      $("#top-featured").owlCarousel({
          items:4,
          nav:true,
          autoplay:true,
          dots:true,
          autoplayHoverPause:true,
          loop:true,
          nav:false,
          navText: [
      "<i class='fa fa-angle-left '></i>",
      "<i class='fa fa-angle-right'></i>"
      ],
          responsive: {
              0: {
                  items: 1,
                  slideBy:1
              },
              480: {
                  items: 2,
                  slideBy:1
              },
              991: {
                  items: 3,
                  slideBy:1
              },
              1000: {
                  items: 4,
                  slideBy:1
              },
          }

      });

  }());

}, 2000);

}) // ctrl end


app.controller('CatCtrl', function($scope, $timeout, $http, cats, $location, $routeParams, Slug, courses, $localStorage, func) {
    $scope.catCourse = [];
    $scope.catName = $routeParams.catName;
    $scope.catNameDispay = func.unslug($scope.catName);
    if($localStorage.bh !== undefined && $localStorage.bh.courses !== undefined) {
      courses = $localStorage.bh.courses;
      $scope.courses = courses;
    } else {
      func.getCourses(function(respCourses) {
        courses = respCourses;
        $localStorage.bh.courses = courses;
        $scope.courses = courses;
      })
    }

    $scope.cats = cats;


    var loadCourse = function(everythingElse){
      var interval = setInterval(function(){
        if(typeof $scope.courses !== 'undefined'){
          clearInterval(interval);
          everythingElse();
        }
      },1);
    };

    loadCourse(function(){
      for(key in $scope.courses) {
          if(Slug.slugify($scope.courses[key].productcategory) == $scope.catName) {
            $scope.catCourse.push($scope.courses[key]);
          }
      }
    });

})

app.controller('CourseCtrl', function($scope, $timeout, $http, cats, $location, $routeParams, courses, Slug, $localStorage, func) {

  $scope.courseSlug = $routeParams.courseName;

  if($localStorage.bh !== undefined && $localStorage.bh.courses !== undefined) {
    courses = $localStorage.bh.courses;
    $scope.courses = courses;
  } else {
    func.getCourses(function(respCourses) {
      courses = respCourses;
      $localStorage.bh.courses = courses;
      $scope.courses = courses;
    })
  }

  var loadCourse = function(everythingElse){
    var interval = setInterval(function(){
      if(typeof $scope.courses !== 'undefined'){
        clearInterval(interval);
        everythingElse();
      }
    },1);
  };

  loadCourse(function(){
    for(key in $scope.courses) {
        if(Slug.slugify($scope.courses[key].productname) == $scope.courseSlug) {
            $scope.currCourse = $scope.courses[key];
        }
    }
    console.log($scope.currCourse);
  });


})

app.controller('CartCtrl', function($scope, $localStorage, $location) {
  $scope.location = $location;
  $scope.customerData = {};

  if($localStorage.bh !== undefined) {
    $scope.cart = $localStorage.bh.cart;
  }


  $scope.changeQty = function(key) {
    console.log($scope.cart);
  }

  $scope.removeItem = function(key) {
    $scope.cart.splice(key, 1);
    $localStorage.bh.cart = $scope.cart;
  }

  $scope.cartTotal = function() {
    var total = 0;
    for(var i = 0; i < $localStorage.bh.cart.length; i++){
        var product = $localStorage.bh.cart[i];
        total += (product.unit_price * product.qty);
    }
    return total;
  }

})
