var confirm = require('../');

var opt = {
    ok: 'yes, unfriend'
};

var dialog = confirm('Are you sure?', opt, function(confirmed) {
    console.log(confirmed);
});
