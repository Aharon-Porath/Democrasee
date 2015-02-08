var Tools = {

    JsDecode: function (str) {
        return str.replace(/##27##/gi, "'");
    },

    IsNoSpashelCharInStr: function (str) {
        var reg = /[\`|~|\\|!|@|#|\$|%|\^|&|\+|\*|\(|\)|\<|\>|,|\/|\\|\||:|;|\{|}|\?|=]/;
        return !reg.test(str);
    },

    GetURLVar: function (varName) {
        varName = varName.toLowerCase();
        var urlHalves = String(document.location).toLowerCase().split('?');
        var urlVarValue = '';
        if (urlHalves[1]) {
            var urlVars = urlHalves[1].split('&');
            for (i = 0; i <= (urlVars.length); i++) {
                if (urlVars[i]) {
                    var urlVarPair = urlVars[i].split('=');
                    if (urlVarPair[0] && (urlVarPair[0] == varName)) {
                        urlVarValue = urlVarPair[1];
                    }
                }
            }
        }
        return urlVarValue;
    },

    replaceAll: function (text, strA, strB) {
        return text.replace(new RegExp(strA, "g"), strB);
    },

    isContainNumbers: function (str) {
        var reg = /^.*([0-9]).*$/
        return reg.test(str);
    },


    trim: function (str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },

    isNumeric: function (str) {
        var reg = /^[-+]?\d*\.?\d*$/;
        return reg.test(str);
    },

    isEmail: function (str) {
        var reg = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return reg.test(str);
    },

    isPhone: function (str) {
        var reg = /^0([50|52|54|53|58|57|72|74|76|77]{2}|[2|3|4|7|8|9]{1})-{0,1}?[0-9]{7}$/
        return reg.test(str);
    },

    IsFullName: function (str) {
        if (Tools.trim(str) == "") { return false; }
        var pattern = /^\s*[a-zא-ת][a-zא-ת\'\"]*\s+[a-zא-ת][a-zא-ת\'\"]*([\s\-]+[a-zא-ת][a-zא-ת\'\"]*)*\s*$/gi;
        var isFullName = pattern.test(str);
        if (isFullName) {
            var arr = str.split(" ");
            for (var i = 0; i < 2; i++) {
                if (arr[i].length < 2) { return false; }
            }
        }
        return isFullName;
    },

    IsValidID: function (idnum) {
        if (idnum.length < 8 || idnum.length > 9) { return false; }

        while (idnum.length < 9) {
            idnum = "0" + idnum;
        }
        idnum1 = idnum.substr(0, 1) * 1;
        idnum2 = idnum.substr(1, 1) * 2;
        idnum3 = idnum.substr(2, 1) * 1;
        idnum4 = idnum.substr(3, 1) * 2;
        idnum5 = idnum.substr(4, 1) * 1;
        idnum6 = idnum.substr(5, 1) * 2;
        idnum7 = idnum.substr(6, 1) * 1;
        idnum8 = idnum.substr(7, 1) * 2;
        idnum9 = idnum.substr(8, 1) * 1;

        if (idnum1 > 9) idnum1 = (idnum1 % 10) + 1
        if (idnum2 > 9) idnum2 = (idnum2 % 10) + 1
        if (idnum3 > 9) idnum3 = (idnum3 % 10) + 1
        if (idnum4 > 9) idnum4 = (idnum4 % 10) + 1
        if (idnum5 > 9) idnum5 = (idnum5 % 10) + 1
        if (idnum6 > 9) idnum6 = (idnum6 % 10) + 1
        if (idnum7 > 9) idnum7 = (idnum7 % 10) + 1
        if (idnum8 > 9) idnum8 = (idnum8 % 10) + 1
        if (idnum9 > 9) idnum9 = (idnum9 % 10) + 1

        var sumval = idnum1 + idnum2 + idnum3 + idnum4 + idnum5 + idnum6 + idnum7 + idnum8 + idnum9;

        sumval = sumval % 10
        if (sumval > 0) {
            return false;
        }
        return true;
    },

    IsEmailsListValid: function (str) {
        if (str == "") { return true; }
        var arr = str.split(";");
        for (var i = 0; i < arr.length; i++) {
            if (!this.isEmail(Tools.trim(arr[i]))) { return false; }
        }
        return true;
    },

    isOnlyHebrew: function (str) {
        var reg = /^.*([\u0591-\u05F4])$/
        return reg.test(str);
    },

    IsOnlyEnglish: function (str) {
        var reg = /^[a-zA-Z_]*$/
        return reg.test(str);
    },

    isContainHebrew: function (str) {
        var reg = /[\u0591-\u05F4]/
        return reg.test(str);
    },

    isSafeString: function (str) {
        var _str = str;
        _str = replaceAll(_str, "\n", "");
        _str = replaceAll(_str, "\t", "");
        _str = replaceAll(_str, "\r", "");
        var reg = new RegExp("^[א-תa-zA-Z0-9 \".,()?]{0,}$", "gim");
        return reg.test(_str);
    },

    isDatesRangeValid: function (startDate, endDate) {
        var sDate = startDate.split('/');
        var eDate = endDate.split('/');

        if (sDate[2] < eDate[2]) {//years            
            return true;
        }
        if (sDate[2] > eDate[2]) {//years           
            return false;
        }

        if (sDate[1] < eDate[1]) {//months           
            return true;
        }
        if (sDate[1] > eDate[1]) {//months
            return false;
        }

        if (sDate[0] >= eDate[0]) {//dayes            
            return false;
        }
        return true;
    },


    ValidIfNum: function (evtKeyPress) {
        if (window.event) {
            if ((event.keyCode < 47) || (event.keyCode > 57)) return false;
        }
        else {
            if (evtKeyPress.charCode == 0) return true
            if ((evtKeyPress.charCode < 47) || (evtKeyPress.charCode > 57)) return false;
        }
        return true;
    },

    stringFormat: function (format, args) {
        var str = format
        var arg = this.stringFormat.arguments

        for (var i = 1; i < arg.length; i++) {
            str = str.replace(/%s/, arg[i]);
        }
        var reg = new RegExp();
        for (var i = 1; i < arg.length; i++) {
            reg.compile("%" + i + "s", "g");
            str = str.replace(reg, arg[i]);
        }
        return str;
    },

    getCookie: function (c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    },

    setCookie: function (c_name, value, expiredays) {
        var exdate = new Date(); exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) +
        ";path=/";
    },

    /* JSON */
    ClassToJson: function (classEle) {/* Class object to Json */
        return JSON.stringify(classEle);
    },

    JsonToClass: function (jsonEle) { /* Json to class object */
        return JSON.parse(jsonEle);
    },

    ToInt: function (val, defaultVal) {
        var num = parseInt(val) || defaultVal;
        return num;
    },

    HasValue: function (val) {
        return val != "" && val != undefined;
    },

    /* URL Encode/Decode */
    UrlEncode: function (value) {
        var unencoded = value;
        return encodeURIComponent(unencoded).replace(/'/g, "%27").replace(/"/g, "%22");        
    },

    UrlDecode: function (value) {
        var encoded = value;
        return decodeURIComponent(encoded.replace(/\+/g, " "));        
    },

    End: function () { }
}



try {
    var INFO = {
        ie: (document.all && !window.opera),
        nn6: $ && !document.all,
        safari: navigator.userAgent.indexOf("Safari") != -1, // Or chrome
        whichMouseButPress: 0,
        version: parseInt(navigator.appVersion),
        browser: navigator.appName,
        prevXMouse: null,
        pervYMouse: null,
        XMouse: null,
        YMouse: null
    }
} catch (e) { }