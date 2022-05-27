ymaps.ready(init);
var myMap, suggestView, placemark, subwaylist, highwaylist, centermap, zoom, iconCaption, balloonContent;

function init() {
    if (centermap == undefined) {
        centermap = [45.054381, 38.980350];
        zoom = 10;
    }
    myMap = new ymaps.Map("map", {
        center: centermap,
        zoom: zoom
    });
    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');

    suggestView = new ymaps.SuggestView('suggest');
    suggestView.events.add('select', function (event) {
        geocode();
    });
}

function geocode() {
    var request = $('#suggest').val();
    ymaps.geocode(request).then(function (res) {
        var obj = res.geoObjects.get(0);
        showResult(obj);
    }, function (e) {
        console.log(e)
    });
}

function showResult(obj) {
    let mapContainer = $('#map'),
        bounds = obj.properties.get('boundedBy'),
        mapState = ymaps.util.bounds.getCenterAndZoom(
            bounds, [mapContainer.width(), mapContainer.height()]
        ),
        shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
    addOnMapBalloon(mapState, shortAddress);
}

function addOnMapBalloon(state, shortAddress) {
    let objname = $("#objname").val();
    let iconCaption = (objname.length > 0) ? objname : shortAddress;
    let balloonContent = (objname.length > 0) ? objname + "<br>" + shortAddress : shortAddress;
    $('#coords').val(state.center);
    myMap.setCenter(state.center, state.zoom);
    myMap.geoObjects.remove(placemark); //удалим старую метку
    placemark = new ymaps.Placemark(state.center, {
        iconCaption: iconCaption,
        balloonContent: balloonContent
    }, {
        preset: 'islands#redDotIconWithCaption',
        draggable: true
    });
    myMap.geoObjects.add(placemark);

    placemark.events.add('dragend', function (e) {
        let cord = e.get('target').geometry.getCoordinates();
        $('#coords').val(cord);
        ymaps.geocode(cord).then(function (res) {
            var data = res.geoObjects.get(0).properties.getAll();
            $('#suggest').val(data.text);
        });
    });
}

function setsuggestion(id, provider) {
    if ($('#' + id).val().length < 1) {
        var suggesth = new ymaps.SuggestView(id, {
            provider: provider,
            results: 3
        });
        suggesth.events.add('select', function (event) {
            console.log('select');
            $('#' + id).parent().next().find('input[type=text]').focus();
        });
    }
}

$(function () {
    let flag = true

    $('#object_adding').on('submit', function (e) {
        e.preventDefault();

        if (!flag) return

        flag = false
        setTimeout(()=>{flag = true }, 1000)
        // return

        const btn = document.getElementById('object_adding').querySelector('.-obj-edit-submit-');
        btn.classList.remove('btn--primary');
        btn.classList.add('btn--gray');


        const btnText = btn.textContent;


        const loader = document.createElement('div');
        loader.classList.add('loader');
        loader.classList.add('loader--prev');
        btn.setAttribute('disable', true);
        btn.textContent = 'Сохраняем'
        btn.insertAdjacentElement('afterbegin', loader)

        var $that = $(this),
            formData = new FormData($that.get(0));

        const form = $that.get(0);

        const fileInputs = [...form.querySelectorAll('input[type="file"]')];
        fileInputs.map((input) => {
            if (input.detail) {
                formData.delete(input.getAttribute('name'));
                input.detail.files.map((file) => {
                    formData.append(input.getAttribute('name'), file, file.name);
                })
            }
        })




        const edit_id = parseInt($('#object_adding').find('input[name=ID]').val());
        const is_ajax = $('#object_adding').find('input[name=IS_ARCHIVE]').val();
        var basse_url = '/manager/';
        $.ajax({
            type: "POST",
            url: '/local/ajax/obj_add_edit_save.php',
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            data: formData,
            success: function (data) {
                if (data.status == "ok") {

                    $.fancybox.close();
                    // объекты не обновляются пока открыта модалка
                    if (data.update) {
                        //почему если раскоментить происходит сбой
                        Modal.open('success-obj-modal-update');
                    } else {
                        Modal.open('success-obj-modal');
                    }

                    btn.innerHTML = btnText;

                    if (edit_id > 0) {
                        if (is_ajax=='Y') {basse_url='/manager/archive/objects.php';}
                        $.ajax({
                            type: "GET", url: basse_url+"?id="+edit_id+"&reloadobj=Y", dataType: 'html',
                            success: function(html) {
                                $('.object-element[data-id="'+edit_id+'"]').replaceWith(html);

                                jQuery.fancybox.modalInit();
                                if (document.querySelector('.jk-item-gallery-slider')) {
                                    var jkItemGallerySwiper = new Swiper('.jk-item-gallery-slider', {
                                        watchSlidesProgress: true,
                                        watchSlidesVisibility: true,
                                        loop: false,
                                        spaceBetween: 10,
                                        slidesPerView: 1,
                                        slidesPerGroup: 1,
                                        slideClass: 'swiper-slide',
                                        touchRatio: 1,
                                        navigation: {
                                            prevEl: '.jk-item-gallery-arrow-prev',
                                            nextEl: '.jk-item-gallery-arrow-next',
                                        },
                                        pagination: {
                                            el: '.jk-item-gallery-pagination',
                                            type: 'fraction',
                                        },
                                        breakpoints: {
                                            992: {}
                                        }
                                    });
                                }
                                
                            }
                        });
                    }else{
                        let compid = $("#objlist_bxajaxid").val();
                        BX.ajax.insertToNode("/manager/?bxajaxid=" + compid, "comp_" + compid);
                        //Чтобы отображалось количество элемнтов в слайдере
                        setTimeout(
                            function () {
                                jQuery.fancybox.modalInit();
                                if (document.querySelector('.jk-item-gallery-slider')) {
                                    var jkItemGallerySwiper = new Swiper('.jk-item-gallery-slider', {
                                        watchSlidesProgress: true,
                                        watchSlidesVisibility: true,
                                        loop: false,
                                        spaceBetween: 10,
                                        slidesPerView: 1,
                                        slidesPerGroup: 1,
                                        slideClass: 'swiper-slide',
                                        touchRatio: 1,
                                        navigation: {
                                            prevEl: '.jk-item-gallery-arrow-prev',
                                            nextEl: '.jk-item-gallery-arrow-next',
                                        },
                                        pagination: {
                                            el: '.jk-item-gallery-pagination',
                                            type: 'fraction',
                                        },
                                        breakpoints: {
                                            992: {}
                                        }
                                    });
                                }
                            }, 4000
                        );
                    }
                }
            },
            dataType: "json"
        });
    });




});

(function () {
    const removedIds = [];
    const removedIdsInput = document.getElementById('PHOTO_SECOND_REMOVELIST');
    document.addEventListener('click', (event) => {
        if (!event.target.closest('[data-secondremid]')) return;
        event.stopPropagation();
        event.preventDefault();
        const id = event.target.closest('[data-secondremid]').getAttribute('data-secondremid');
        removedIds.push(id);
        removedIdsInput.value = removedIds.join(',');

        const item = event.target.closest('.form-field-file')
        item.parentElement.removeChild(item);
    })
})();