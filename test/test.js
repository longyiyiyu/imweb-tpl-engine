var fs = require('fs');
var tengine = require('../index.js');

var it = {
	1: "重点解析",
	2: "高分冲刺",
	3: "考前辅导",
	4: "实战模拟",
	length: 4
};

fs.readFile('test_tpl.html', function(err, data) {
	if (err) { console.dir(err); return; }
	fs.writeFile('test_ret.html', tengine.getTpl(tengine.addTpl(data.toString()), {data: it}), function(err) {
		if (err) { console.dir(err); return; }
		console.log('write test_ret.html success;');
	});
});
