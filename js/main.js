let selectPerson = $('#person');
let spotsWrapper = $('.spots-wrapper');
let logo = $('.logo');
let logoClicks = 0;
let speechBubble = $('.speech-bubble');

var addRule = (function (style) {
    var sheet = document.head.appendChild(style).sheet;
    return function (selector, css) {
        var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
            return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
        }).join(";");
        sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
    };
})(document.createElement("style"));

var openMarker = (id) => {
    markers.removeClass('active');
    speechBubble.html('');
    speechBubble.hide();
    let index = $('.marker[data-id="'+ id +'"]').data('index');
    $('.marker[data-id="'+ id +'"]').addClass('active');
    speechBubble.html('<div class="name">'+ guests[index].id + '. ' + guests[index].name +"</div> " + guests[index].description);
    speechBubble.find('.link').click(function(el){
        let linkId = $(el.target).data('link-to-id');
        openMarker(linkId);
    });
    speechBubble.css('top', parseInt(guests[index].y) + 9 + '%');
    addRule(".speech-bubble:after", {
        left: (parseInt(guests[index].x) + 6) + '%',
    });
    if(speechBubble.html().length) {
        speechBubble.show();
    }
}

logo.click(() => {
    logoClicks += 1;
    if( logoClicks > 4 ) {
        logo.html('<div class="dick">c=3</div>');
    } else if ( logoClicks > 2 ) {
        logo.html(`<img id="logo" src="http://thecatapi.com/api/images/get?format=src&type=gif">`);
    } else {
    }
});

let guests = (function() {
    let json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/guests.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

selectPerson.append(`<option value="null"> Hitta din plats...</option>`);

guests.forEach((guest, index) => {
    if ( index <= 11 ) {
        guests[index].x = "2.3%";
        guests[index].y = ((index + 1) * 6) + 1.6 + "%";
    } else if ( index > 11 && index <= 23 ) {
        guests[index].x = "15.4%";
        guests[index].y = ((index - 11 ) * 6) + 1.6 + "%";
    } else if ( index > 23 && index <= 35 ) {
        guests[index].x = "28%";
        guests[index].y = ((index - 23 ) * 6) + 1.6 + "%";
    } else if ( index > 35 && index <= 47 ) { 
        guests[index].x = "40.4%";
        guests[index].y = ((index - 35 ) * 6) + 1.6 + "%";
    } else if ( index > 47 && index <= 59 ) { 
        guests[index].x = "53%";
        guests[index].y = ((index - 47 ) * 6) + 1.6 + "%";
    } else if ( index > 58 && index <= 70 ) { 
        guests[index].x = "66%";
        guests[index].y = ((index - 58 ) * 6) + 1.6 + "%";
    } else if ( index > 70 && index <= 83 ) { 
        guests[index].x = "78.5%";
        guests[index].y = ((index - 70 ) * 6) - 4.5 + "%";
    } else if ( index > 83 && index <= 96 ) { 
        guests[index].x = "91%";
        guests[index].y = ((index - 83 ) * 6) - 4.5 + "%";
    } else {
        guests[index].x = ((index - 96 ) * 6.95) + 1.4 + "%";
        guests[index].y = "92%";
    }
    let htmlOption = `<option value="${ index }">${ guest.name }</option>`;
    selectPerson.append(htmlOption);
    let marker = 
    `<div data-index="${ index }" data-id="${ guest.id }" style="top:${ guest.y };left:${ guest.x };" class="marker">
    ${guest.id}
    </div>`
    spotsWrapper.append(marker);
});
let options = $('select option');
let arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
options.each(function(i, o) {
  o.value = arr[i].v;
  $(o).text(arr[i].t);
});
let markers = $('.marker');
markers.click((marker) => {
    markers.removeClass('active');
    speechBubble.html('');
    speechBubble.hide();
    let index = parseInt(marker.target.getAttribute('data-index'));
    $(marker.target).addClass("active");
    speechBubble.html('<div class="name">'+ guests[index].id + '. ' + guests[index].name +"</div> " + guests[index].description);
    speechBubble.find('.link').click(function(el){
        let linkId = $(el.target).data('link-to-id');
        openMarker(linkId);
    });
    speechBubble.css('top', parseInt(guests[index].y) + 9 + '%');
    addRule(".speech-bubble:after", {
        left: (parseInt(guests[index].x) + 6) + '%',
    });
    if(speechBubble.html().length) {
        speechBubble.show();
    }
});
speechBubble.click((event) => {
    if ( $(event.target).hasClass('link') ) {
        return;
    }
    speechBubble.hide();
    markers.removeClass('active');
});


selectPerson.change(() => {
    let selectedIndex = selectPerson.val();
    if(selectedIndex === "null") {
        return;
    }
    markers[parseInt(selectedIndex)].click();
});
