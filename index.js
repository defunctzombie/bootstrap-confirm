var domify = require('domify');

var tmpl = '<div class="modal fade in" tabindex="-1" role="dialog">' +
    '<div class="modal-dialog">' +
        '<div class="modal-content">' +
            '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '<h4 class="modal-title"></h4>' +
            '</div>' +
            // TODO(shtylman) some message in the dialog?
            // '<div class="modal-body"></div>' +
            '<div class="modal-footer">' +
                '<button type="button" class="btn btn-default" data-dismiss="modal">cancel</button>' +
                '<button type="button" class="btn btn-danger" role="accept">yes</button>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</div>';

var backdrop_tmpl = '<div class="modal-backdrop fade in" />';

var Dialog = function(opt) {
    if (!(this instanceof Dialog)) {
        return new Dialog(opt);
    }

    var self = this;
    var el = self.el = domify(tmpl);
    self.backdrop_el = domify(backdrop_tmpl);

    var close_elems = el.querySelectorAll('[data-dismiss="modal"]');
    for (var i=0 ; i<close_elems.length ; ++i) {
        close_elems[i].addEventListener('click', function() {
            self.hide(false /* not confirmed */);
        });
    }

    self.accept_btn = el.querySelector('[role="accept"]')
    self.accept_btn.addEventListener('click', function() {
        self.hide(true);
    });
};

Dialog.prototype.message = function(msg) {
    var self = this;
    self.el.querySelector('.modal-title').innerHTML = msg;
};

Dialog.prototype.ok_button = function(msg) {
    var self = this;
    self.accept_btn.innerHTML = msg;
};

Dialog.prototype.show = function(cb) {
    var self = this;
    if (self.el.parentNode) {
        return;
    }

    self.callback = cb || function() {};

    // TODO(shtylman) bind esc event?

    self.el.style.display = 'block';
    document.body.appendChild(self.backdrop_el);
    document.body.appendChild(self.el);
};

Dialog.prototype.hide = function(confirm) {
    var self = this;
    self.el.style.display = 'none';
    if (!self.el.parentNode) {
        return;
    }
    self.el.parentNode.removeChild(self.backdrop_el);
    self.el.parentNode.removeChild(self.el);

    self.callback(confirm);
};

module.exports = function(message, opt, cb) {
    var dialog = Dialog();

    if (typeof opt === 'function') {
        cb = opt;
        opt = {};
    }

    dialog.message(message);
    if (opt.ok) {
        dialog.ok_button(opt.ok);
    }

    dialog.show(cb);
    return dialog;
};
