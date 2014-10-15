/**
 * Created by Yang on 2014/10/14.
 */
var uid = require('uid-safe').sync;
var signature = require('./signature');
var encode = encodeURIComponent;
var serialize = function(name, val,opt){
    opt = opt || {};
    var enc = opt.encode || encode;
    var pairs = [name + '=' + enc(val)];

    if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
        pairs.push('Max-Age=' + maxAge);
    }

    if (opt.domain) pairs.push('Domain=' + opt.domain);
    if (opt.path) pairs.push('Path=' + opt.path);
    if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
    if (opt.httpOnly) pairs.push('HttpOnly');
    if (opt.secure) pairs.push('Secure');

    return pairs.join('; ');
};



function getCookie() {
    var name = 'connect.sid';
    var secret = '123456';
    var val = uid(24);
    var opt = {"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"};

    var signed = 's:' + signature.sign(val, secret);

    var data = serialize(name, signed,opt);

    console.log('set-cookie %s', data);

    return data;
}

exports.getCookie = getCookie;


