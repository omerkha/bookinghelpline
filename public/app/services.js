app.factory('details', function() {
    return {
        number: '0208 771 2362',
        email: 'info@citywindowsandglass.co.uk'
    }
})


app.factory('cats', function() {
  return [
    {name: 'Construction', url: 'construction', icon: 'building-o'},
    {name: 'Health & Safety', url: 'health-safety', icon: 'exclamation-triangle'},
    {name: 'Working at Height', url: 'working-at-height', icon: 'signal'},
    {name: 'First Aid', url: 'first-aid', icon: 'medkit'},
    {name: 'Fire Safety', url: 'fire-safety', icon: 'fire'},
    {name: 'Food Safety', url: 'food-safety', icon: 'cutlery'},
    {name: 'In-House Training', url: 'in-house-training', icon: 'home'},
    {name: 'E-Learning', url: 'e-learning', icon: 'university'}
  ]
})

app.factory('courses', function() {
  return {};
})

app.service('func', function($http) {
  var func = {};

  func.getCourses = function(cb) {
    $http.post('https://hshelpline.co.uk/custom/api/get-products.php').then(function(resp) {
      var courses = resp.data;
      cb(courses);
    })
  }


  return func;
})
