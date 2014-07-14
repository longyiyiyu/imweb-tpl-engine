/*!
 * imweb-tpl-engine
 *
 * ref: grunt-imweb-tpl-complie (https://github.com/miniflycn/grunt-imweb-tpl-complie.git)
 * des: a template engine for imweb
 * author: lqlongli
 *
 * The ISC License
 */
'use strict';

var seed = 0,
	tcache = {},
	fcache = {},
	EOL = '\n';

function compileTmpl(tmpl) {
	var res = []
		, strict = (/\bit\b/).test(tmpl);
	tmpl.replace(/<\/script>/ig, '</s<%=""%>cript>');
	res.push([
		"      it = it || {};",
		"      opt = opt || {};",
		"      with (it) {",
		"        var _$out_= [];",
			"        _$out_.push('" + tmpl
			.replace(/\r\n|\n|\r/g, "\v")
			.replace(/(?:^|%>).*?(?:<%|$)/g, function($0) {
				return $0.replace(/('|\\)/g, "\\$1").replace(/[\v\t]/g, "").replace(/\s+/g, " ")
			})
			.replace(/<!--[\s\S]+?-->/g, '')
			.replace(/[\v]/g, EOL)
			.replace(/<%==(.*?)%>/g, "', opt.encodeHtml ? opt.encodeHtml($1) : html.encode($1), '")
			.replace(/<%=(.*?)%>/g, "', $1, '")
			.replace(/<%(<-)?/g, "');" + EOL + "        ")
			.replace(/->(\w+)%>/g, EOL + "        $1.push('")
			.split("%>").join(EOL + "        _$out_.push('") + "');",
		"        return _$out_.join('');",
		"      }"
	].join(EOL).replace(/_\$out_\.push\(''\);/g, ''));

	return new Function('it', 'opt', res.join(''));
}

function addTpl(tmpl) {
	var tid = (new Date())+seed++;
	tcache[tid] = tmpl;
	return tid;
}

function getTpl(tid, it, opt) {
	try {
		if (!tcache[tid]&&!fcache[tid]) return;
		if (!fcache[tid]) {
			fcache[tid] = compileTmpl(tcache[tid]);
			delete tcache[tid];
		}
		return fcache[tid](it, opt);
	} catch (e) {
		return e.message;
	}
}

module.exports = {
	addTpl: addTpl,
	getTpl: getTpl
};