// JavaScript Document

var x;

$(document).ready(function () {
    adjustGrid();
    setScreenStyle();
    if ($(".galleryArea").length > 0)
        setSelection(selectorIndex() - 1);
    homeAsideAdjust();

    //resize adjustment
    $(window).resize(function () {
        adjustGrid(); //Adjusting Primary Navigation Tabs
        homeAsideAdjust(); //Adjusting Aside div on Homepage
        setScreenStyle();
    });


    //focus state - primary navigation
    $(".siteNavigation li").focusin(function () {
        $(this).children("ul").addClass("focusNavigation");
    });

    //blur state - primary navigation
    $(".siteNavigation li").focusout(function () {
        $(this).children("ul").removeClass("focusNavigation");
    });

    //IE6 Hack - Site Navigation
    if (!$.support.boxModel) {
        $(".siteNavigation li").bind('mouseover focusin', function () {
            clearNavigation();
            $(this).children("ul").css("left", "-9999px");
            $(this).children("ul").css("left", $(this).position().left);
        });

        $(".siteNavigation ul").bind('mouseover focusin', function () {
            clearTimeout(x);
        });

        $(".siteNavigation ul").bind('mouseout focusout', function () {
            x = setTimeout("clearNavigation()", 150);
        });
    }


    //Featured Rotation/Controls

    //initialization
    var featuredlength = $(".galleryArea li").length;

    //next button
    $("#next a").click(function (event) {
        switchSlide(1);
        event.stopPropagation();
        event.preventDefault();
        ensureFocus();
    });

    //previous button
    $("#previous a").click(function (event) {
        switchSlide(-1);
        event.stopPropagation();
        event.preventDefault();
        ensureFocus();
    });

    //selectors
    $(".selector li").not("#previous,#next").delegate("a", "click", function (event) {
        clearSelection();
        $(this).parent("li").addClass("selected");
        setSelection(selectorIndex() - 1);

        homeAsideAdjust();

        event.stopPropagation();
        event.preventDefault();

        ensureFocus();
    });

    //rotation
    $(window).load(function () {
        if (featuredlength > 0) {
            $(".selector").css("display", "block");
        }
    });
});

function homeAsideAdjust() {
    if ($("body").hasClass("largescreen")) {
        var galleryHeight = $(".gallery").height();
        if (galleryHeight > 0)
            $("body.largescreen .aside_home").css("margin-top", "-" + (galleryHeight + 15) + "px");
        else
            $(".aside_home").css("margin-top", "auto");
    }
    else {
        $(".aside_home").css("margin-top", "auto");
    }
}

function setScreenStyle() {
    if (!($.browser.msie && $.browser.version == "6.0")) { //non-IE6
        if (document.body.clientWidth > 1400) {
            $("body").removeClass('smallscreen mediumscreen').addClass('largescreen');
        }
        else if (document.body.clientWidth > 900) {
            $("body").removeClass('smallscreen largescreen').addClass('mediumscreen');
        }
        else {
            $("body").removeClass('mediumscreen largescreen').addClass('smallscreen');
        }
    }
}

//featured counter
function currentIndex() {
    counter = 0;
    $(".galleryArea li").each(function (index) {
        if ($(this).attr("class") == "selected") {
            counter = index;
        }
    });
    return counter;
};

//selector counter
function selectorIndex() {
    counter2 = 0;
    $(".selector li").each(function (index) {
        if ($(this).attr("class") == "selected") {
            counter2 = index;
        }
    });
    return counter2;
};

//adjusting site navigation height
function adjustGrid() {
    heights = [];

    if ($.browser.msie) //SD: auto doesn't work for IE
        $(".siteNavigation h2 a").css("height", "100%");
    else
        $(".siteNavigation h2 a").css("height", "auto");

    $(".siteNavigation h2 a").each(function (i) {
        heights[i] = $(this).height();
    });

    test = heights.sort(function (a, b) { return b - a });
    $(".siteNavigation h2 a").height(test[0]);

    newWidth = $(".siteNavigation li:eq(0)").width() - 17;
    $(".siteNavigation ul").width(newWidth);
    $(".siteNavigation li.last ul").width((newWidth + 7));

    //SD: adjust last li element to prevent IE wrapping
    if ($.browser.msie) {
        if ($(".siteNavigation h2 a").length > 0) {
            newWidth = $(".siteNavigation").width() - ($(".siteNavigation li.first").width() * ($(".siteNavigation h2 a").length - 1));
            if (newWidth < $(".siteNavigation li.first").width())
                $(".siteNavigation li.last").width(newWidth);
        }
    }
}

function clearNavigation() {
    $(".siteNavigation ul").css("left", "-9999px");
};

function switchSlide(direction) {
    if (direction < 0) {
        current = currentIndex() - 1;
        if (current < 0) current = $(".galleryArea li").length - 1;
    }
    else if (direction > 0) {
        current = currentIndex() + 1;
        if (current >= $(".galleryArea li").length) current = 0;
    }
    else {
        current = currentIndex();
    }

    clearSelection();
    setSelection(current);
    homeAsideAdjust();
}

function clearSelection() {
    $(".galleryArea li").removeClass("selected");
    $(".selector li").removeClass("selected");
    $(".selector li a span.selected").remove();
}

function setSelection(selection) {
    $(".galleryArea li:eq(" + selection + ")").addClass("selected");
    $(".selector li:eq(" + (selection + 1) + ")").addClass("selected");
    var selHtml = $(".selector li:eq(" + (selection + 1) + ") a").html();
    $(".selector li:eq(" + (selection + 1) + ") a").html(selHtml + '<span class="selected">-selected</span>');

    var pref = "ssp_";
    var sspID = $(".selector li:eq(" + (selection + 1) + ")").attr('id').substr(pref.length);

    logSlideClick(sspID);
}

function ensureFocus() {
    $(".galleryArea li.selected .galleryImage").find("a:first").focus();
}

function urlencode(str) {
    return escape(str).replace(/\+/g, '%2B').replace(/%20/g, '+').replace(/\*/g, '%2A').replace(/\//g, '%2F').replace(/@/g, '%40');
}

function PageMethod(url, data, success, error) {
    // shift arguments if data argument was omited
    if ($.isFunction(data)) {
        error = success;
        success = data;
        data = null;
    }
    // convert data into a format readable by the server
    if (data) {
        var params = '';
        for (var i in data) {
            if (params != '') {
                params += '&';
            }
            params += i + '=' + urlencode(JSON.stringify(data[i]));
        }
        url += '?' + params;
    }
    // call the page method
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        data: '{}',
        dataType: "json",
        success: function (response) { if (response.d) success(response.d); else success(response); },
        error: error
    });
}

String.prototype.toDateFromAspNet = function () {
    var dte = eval("new " + this.replace(/\//g, '') + ";");
    dte.setMinutes(dte.getMinutes() - dte.getTimezoneOffset());
    return dte;
}

function formatDate(date) {
    var ampm = "";
    var hour = date.getUTCHours();
    if (hour < 12) ampm = "AM"; else ampm = "PM";
    if (hour == 0) hour = 12;
    if (hour > 12) hour = hour - 12;
    var min = date.getUTCMinutes();
    if (min < 10) min = "0" + min;
    var month = date.getUTCMonth() + 1;
    return month + "/" + date.getUTCDate() + "/" + date.getUTCFullYear() + " " + hour + ":" + min + " " + ampm;
}

function logSlideClick(slideID) {
    PageMethod(
    //web method
        "default.aspx/LogSlideShowClick",
    //parameters
        {
        nSlideShowPanelID: slideID,
        strPageURL: location.href,
        strPageTitle: document.title
    },
    //success callback
        function (response) {
            if (response.success == true) {
                //alert(response.message);
            }
            else {
                alert(response.message);
            }
        },
    //error callback
        function () {
        }
    );
}