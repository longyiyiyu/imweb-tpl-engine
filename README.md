imweb-tpl-engine
================

a template engine for imweb group

[usage]
var te = require("imweb-tpl-engine");
console.log(te.getTpl(te.addTpl('<h1><%=name%></h1>'), {"title": "Hello World!"})); //<h1>Hello World!</h1>
