# boostrap-confirm

confirmation dialog using bootstap modal css classes

## example

```js
var confirm = require('bootstrap-confirm');

confirm('Are you sure', function(confirmed) {
    console.log('user confirmed: %s', confirmed);
});
```

## api

### confirm(message, [options,] cb)

Show a confirmation dialog with the given `message` *String*. When the user closes (accept or cancel) the callback is called with a single boolean argument `confirmed`.

Confirmed will be `true` if the user accepted (clicked ok) or false if rejected (clicked cancel or closed the dialog)

Options

* `ok` *String* message on ok button (default is 'ok')

## tests

Manually test using the `beefy` npm module.

```
$ cd tests
$ beefy . app.js
```
