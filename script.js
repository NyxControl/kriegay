$(() => {
    'use strict';

    // Load saved theme on startup
    const savedTheme = localStorage.getItem('savedTheme');
    if (savedTheme) {
        $('#windows-container').attr('class', savedTheme);
        $('.theme').removeClass('selected');
        $('#' + savedTheme).addClass('selected');
        $('#theme-name').text($('#' + savedTheme).text());
    }


    alert('password russiagays');
    var isEnter = e => e.key === 'Enter' || e.which === 13;

    /***** LOGIN *****/
    $('#password').keyup(e => { if (isEnter(e)) $('#start').click() });
    $('#start').click(e => {
        if ($('#password').val() !== 'russiagays') {
            alert('Incorrect password. The correct password is: russiagays');
            return;
        }
        $('#startup')[0].play();
        $('#logon').hide();
        $('#windows').show();
        $('#password').val('russiagays');
    });


    /***** TASKBAR *****/

    // datetime
    var today, date, time;
    var tFormat = 'hh:mm';
    var dFormat = 'dd/mm/yyyy';
    var padZero = o => o < 10 ? '0' + o : o;
    var timer = () => {
        today = new Date();
        time = tFormat
            .replace('hh', padZero(today.getHours()))
            .replace('mm', padZero(today.getMinutes()));
        date = dFormat
            .replace('dd', padZero(today.getDate()))
            .replace('mm', padZero(today.getMonth() + 1))
            .replace('yyyy', today.getFullYear());

        $('#time').text(time);
        $('#date').text(date);
    };
    timer();
    setInterval(timer, 30000);

    // battery
    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
            $('#gauge')
                .height(battery.level * 100 + '%')
                .css('top', (1 - battery.level) * 100 + '%');
        });
    }

    // start menu
    var $menu = $('#start-menu');
    var $btn = $('#start-button');
    $('body').click(e => {
        $menu.hide();
        $btn.removeClass('active');
    });
    $menu.click(e => e.stopPropagation());
    $btn.click(e => {
        e.stopPropagation();
        $menu.toggle();
        $(e.target).toggleClass('active');
    });
    $('#logoff').click(e => {
        $('#logon').show();
        $('#windows').hide();
    });


    /***** WINDOWS *****/

    // show desktop
    $('#show-desktop').click(() => {
        var $items = $('.taskbar-item.left');
        if (!$items.length) return; // check opened items
        $items.each((i, item) => $(item.dataset.target).toggle());
    });

    // open
    var openw = e => {
        var $target = $(e.target.dataset.target);
        $target.trigger('ontop');

        // window is already opened
        if ($('[data-id=' + $target.attr('id') + ']').length) {
            if (!$target.is(':visible')) $target.show();
            return;
        }

        $target.show();

        if ($target.hasClass('window-child')) return;

        // display icon in taskbar
        var icon = $target.attr('id').split('-')[1];
        $('<div>', {
            'class': 'taskbar-item left minimize ' + icon,
            'data-id': $target.attr('id'),
            'data-target': '#' + $target.attr('id'),
            'appendTo': '#taskbar'
        });
    };
    $(document).on('click', '[data-toggle=window]', openw);
    $('[data-toggle=window]').click(openw);

    // close
    $(document).on('click', '.closewin', e => {
        var $target = $(e.target.dataset.target),
            $child = $($target.data('child'));
        $target.hide();
        $child.hide();
        $('[data-id=' + $target.attr('id') + ']').remove();
    });

    // maximize
    $(document).on('click', '.maximize', e => $(e.target.dataset.target).toggleClass('maximized'));

    // minimize
    $(document).on('click', '.minimize', e => $(e.target.dataset.target).toggle());

    // focus
    var focus = e => {
        var $target = $(e.target).hasClass('window')
            ? $(e.target)
            : $(e.target).parents('.window');
        if ($target.hasClass('focused')) return;
        $('.window').removeClass('focused');
        $target.addClass('focused');
    };
    $(document)
        .on('click', '.window', focus)
        .on('ontop', '.window', focus);

    // move
    $('.window').draggable({
        containment: 'parent',
        handle: '.title'
    });

    /***** DESKTOP *****/
    
    // Make desktop icons draggable
    $('#desktop .icon').draggable({
        containment: '#desktop' // Keeps icons from being dragged off the desktop
    });

    // toggle menu
    var menu = $('#desktop-menu');
    var sub = $('.sub-menu');
    var desktop = $('#desktop');
    desktop
        .on('click', e => {
            // if current target is not desktop menu -> hide
            if ($(e.target).parents('#desktop-menu').attr('id') !== 'desktop-menu'
                && menu.is(':visible'))
                menu.hide();
        })
        .on('contextmenu', e => {
            if (e.target.id !== 'desktop'
                && e.target.className.indexOf('icons') < 0) return;

            e.preventDefault();

            var x = e.offsetX || e.touches[0].offsetX;
            var y = e.offsetY || e.touches[0].offsetY;
            var w = menu.outerWidth();
            var h = menu.outerHeight();
            var dw = desktop.width();
            var dh = desktop.height();
            menu.show()
                .css({
                    left: x + w < dw ? x : x - w,
                    top: y + h < dh ? y : y - h
                });
            if (x + w + sub.width() > dw)
                sub.css({ left: 'initial', right: '100%' });
            else
                sub.css({ left: '98%', right: '' });
        });

    //  hide icons
    $('.menu-item:not(.has-sub)').click(() => menu.hide());
    $('.ico-hide').click(e => {
        $('.icon').toggle();
        $(e.target).toggleClass('active');
    });

    // resize icons
    $('.ico-size').click(e => {
        var $target = $(e.target);
        $('.icons').attr('class', 'icons icons-' + $target.data('size'));
        $('.ico-size').removeClass('active');
        $target.addClass('active');
    });

    // refresh
    var refresh = val => $('.icon').css('opacity', val);
    $('#refresh').click(() => {
        refresh(0);
        setTimeout(() => refresh(1), 100);
    });

    // new folder
    var count = 0;
    function Window(title, controls, components) { // Window object
        this.titlebar = $('<div>', { 'class': 'titlebar' });
        this.addrbar = $('<div>', { 'class': 'addrbar' });
        this.toolbar = $('<div>', { 'class': 'toolbar' });
        this.content = $('<div>', { 'class': 'container' });
        this.title = $('<div>', { 'class': 'title folder' });
        this.controls = $('<div>', { 'class': 'controls' });

        this.controls
            .append(this.makeCtrl(controls))
            .appendTo(this.titlebar);
        this.title
            .text(title)
            .appendTo(this.titlebar);
        this.addrbar
            .append([
                $('<div>').append([
                    $('<div class="button round back">&#x279C;</div>'),
                    $('<div class="button round">&#x279C;</div>')
                ]),
                $('<div>', {
                    'class': 'addr folder',
                    append: $('<label>', { text: title })
                }),
                $('<div>', {
                    'class': 'input',
                    append: $('<input>', {
                        type: 'search',
                        placeholder: 'Search ' + title
                    })
                })
            ]);
        this.content.append('<div class="text-center text-muted">This folder is empty.</div>');
        var _window = $('<div>', { 'class': 'window', id: 'window-folder-' + count++ });
        _window.append(this.titlebar);
        components.forEach(component => { _window.append(this[component]) });
        return _window;
    }
    Window.prototype.makeCtrl = function (controls) {
        var _controls = [];
        controls.forEach(control => {
            _controls.push(
                $('<div>', {
                    'class': 'control ' + control,
                    'data-target': '#window-folder-' + count,
                    'text':
                        control === 'maximize' ? '□' :
                            control === 'minimize' ? '–' : '×'
                })
            );
        });
        return _controls;
    };

    var $input;
    var rename = target => {
        $(target)
            .parents('.folder')
            .attr('data-target', '#window-folder-' + count);
        $(target).parent().text(target.value);
        $(target).remove();
        new Window(target.value,
            ['minimize', 'maximize', 'closewin'],
            ['addrbar', 'toolbar', 'content']
        ).appendTo('#desktop')
            .draggable({
                containment: 'parent',
                handle: '.title'
            });
    };
    $('#new-folder').click(() => {
        $input = $('<input>')
            .val('New folder')
            .focus(e => e.target.select())
            .blur(e => rename(e.target))
            .keyup(e => { if (isEnter(e)) rename(e.target) });
        $('<div>', {
            'class': 'icon folder',
            'data-toggle': 'window',
            appendTo: $('.icons > .column'),
            append: $('<label>', { append: $input })
        });
        $input.focus();
    });

    /***** CALCULATOR *****/
    var $res = $('#result'),
        $op = $('#operation'),
        flag = false; // calculating flag

    var input = e => {
        var value = $res.val(),
            input = e.target.innerText;

        if (input === '.' && value.indexOf('.') > 0 // only allow 1 decimal point
            || value.length === 20) // limit 20 digits
            return;
        else if (input === '.' && value === '0') // add zero before decimal point
            $res.val('0.');
        else if (flag || value === '0') {
            flag = false;
            $res.val(input);
        }
        else
            $res.val(value + input);
    };

    var calc = e => {
        var v_raw = $res.val(),
            v_num = parseFloat(v_raw),
            input = e.target.innerText,
            operation = $op.val(),
            result = 0;
        switch (input) {
            case '←':
                result = v_raw.length === 1 ? 0 : v_raw.slice(0, v_raw.length - 1);
                break;
            case 'CE':
                result = 0;
                break;
            case 'C':
                operation = '';
                break;
            case '±':
                if (v_raw === '0')
                    return;
                else if (v_raw.indexOf('-') === 0)
                    result = v_raw.slice(1, v_raw.length);
                else
                    result = '-' + v_num;
                break;
            case 'v':
                operation = 'sqrt(' + v_num + ')';
                result = Math.sqrt(v_num);
                break;
            case '%':
                operation = v_num + ' / 100';
                result = v_num / 100;
                break;
            case '1/x':
                operation = '1 / ' + v_num;
                result = 1 / v_num;
                break;
            case '=':
                result = eval(operation + v_num);
                operation = '';
                break;
            default:
                result = eval(operation + v_num);
                operation += v_num + ' ' + input + ' ';
                break;
        }
        flag = true;
        $op.val(operation);
        $res.val(isNaN(result) ? 'Invalid input' : result);
    };
    $('.btn-num').click(input);
    $('.btn-fnc').click(calc);


    /***** IE *****/
    var $addr = $('#webaddr'),
        $page = $('#webpage'),
        $bing = $('#bing');
    $addr.focus(e => e.target.select());
    $addr.keyup(e => {
        if (!isEnter(e)) return;
        $page[0].src = e.target.value;
    });
    $bing.keyup(e => {
        if (!isEnter(e)) return;
        $page[0].src = 'https://www.bing.com/search?q=' + e.target.value;
    });

    /***** NOTEPAD *****/

    var $editor = $('#notepad-editor'),
        start, end; // cursor position

    $editor.prop('readonly', true);
    $('#notepad-new').click(() => $editor.val(''));
    var copy = () => document.execCommand('copy');
    var del = () => document.execCommand('delete');
    var cut = () => document.execCommand('cut');
    $('#notepad-undo').click(() => document.execCommand('undo'));
    $('#notepad-all').click(() => $editor.select());
    $('#notepad-datetime').click(() => {
        var date = new Date();
        var time = date.toLocaleTimeString();
        var dateString = date.toLocaleDateString();
        insertTextAtCursor(time + ' ' + dateString);
    });
    $editor.blur(e => {
        start = e.target.selectionStart;
        end = e.target.selectionEnd;
        if (end === start) {
            $('#notepad-cut').addClass('text-muted').off('click');
            $('#notepad-copy').addClass('text-muted').off('click');
            $('#notepad-del').addClass('text-muted').off('click');
        } else {
            $('#notepad-cut').removeClass('text-muted').on('click', cut);
            $('#notepad-copy').removeClass('text-muted').on('click', copy);
            $('#notepad-del').removeClass('text-muted').on('click', del);
        }
    });
    function insertTextAtCursor(text) {
        var value = $editor.val();
        var before = value.substring(0, start);
        var after = value.substring(end, value.length);
        $editor.val(before + text + after);
        start += text.length;
        end = start;
        $editor[0].setSelectionRange(start, end);
    }
    function writeTextToEditor(text) {
        $editor.val(text);
    }
    writeTextToEditor('"MalcomX is the best cheat" lmao meanwhile he has pain in ass: https://imgur.com/a/ZvblTH9');
    $('#notepad-wrap').click(e => {
        $editor.toggleClass('wrap');
        $(e.target).toggleClass('active');
    });
    $('#notepad-font').click(e => {
        $editor.css({
            'font-family': $('input[name="font-family"]:checked').val(),
            'font-style': $('input[name="font-style"]:checked').val().split(',')[0],
            'font-weight': $('input[name="font-style"]:checked').val().split(',')[1],
            'font-size': $('input[name="font-size"]:checked').val() + 'pt'
        });
    });

    /***** PAINT APP *****/
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');
    let isPainting = false;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    function startPosition(e) {
        isPainting = true;
        draw(e);
    }
    function endPosition() {
        isPainting = false;
        ctx.beginPath();
    }
    function draw(e) {
        if (!isPainting) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000000';
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    $(canvas).on('mousedown touchstart', startPosition);
    $(canvas).on('mouseup touchend', endPosition);
    $(canvas).on('mousemove touchmove', draw);
    $('#paint-clear').click(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    /***** PERSONALIZE *****/
    $('.theme').click(function () {
        var $body = $('#windows-container');
        if ($body.hasClass(this.id)) return;
        var $wait = $('#window-wait');
        $wait.show();
        $body.addClass('grayout');
        setTimeout(() => {
            $body.attr('class', this.id);
            $('#theme-name').text(this.innerText);
            $('.theme').removeClass('selected');
            $(this).addClass('selected');
            localStorage.setItem('savedTheme', this.id);
            if (/basic-2|basic-3|basic-4/.test(this.id))
                $('#startup')[0].src = 'https://vignette.wikia.nocookie.net/khangnd/images/2/2c/Windows7-startup-sound-classic.ogv';
            else
                $('#startup')[0].src = 'https://vignette.wikia.nocookie.net/khangnd/images/5/58/Windows7-startup-sound.ogg';
            $wait.hide();
        }, Math.random() * 2000);
    });

    /***** MY COMPUTER *****/
    $('[data-toggle=expand').click(e => $(e.target.dataset.target).toggle());
    function Disk(selector, values) {
        var max = values.max - Math.random() * values.max / 50;
        var cur = values.cur;
        $(selector + ' > .storage-bar').progressbar({ value: cur, max: max });
        $(selector + ' > .storage-txt').text(
            (max - cur).toFixed(1)
            + ' GB free of '
            + max.toFixed(1) + ' GB'
        );
        if ((max - cur) / max * 100 <= 10) $(selector + ' > .storage-bar').addClass('red-bar');
    };
    Disk('#disk-C', { cur: 44, max: 150 })
    Disk('#disk-D', { cur: 140, max: 150 })
    Disk('#disk-E', { cur: 100, max: 200 })
    Disk('#disk-G', { cur: 2, max: 8 })

    /***** SNIPPING TOOL *****/
    var $snip = $('#snip-result');
    var $wind = $('#window-snipping');
    var screen = $('#windows')[0];
    var options = {
        allowTaint: true,
        imageTimeout: 0
    };
    var show = snip => {
        $wind.show()
            .addClass('maximized');
        $snip.removeClass('direction')
            .html(snip);
    };
    function Overlay() {
        this.canv = $('<canvas>', {
            appendTo: screen,
            attr: {
                width: $(screen).width(),
                height: $(screen).height()
            },
            css: {
                'z-index': '9999',
                position: 'absolute',
                cursor: 'crosshair'
            }
        });
        var canv = this.canv[0];
        this.ctx = canv.getContext('2d');
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'red';
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.fillRect(0, 0, canv.width, canv.height);
    }
    var snipArea = () => {
        var x, y, x1, y1, rect;
        var overlay = new Overlay();
        var ctx = overlay.ctx;
        var canv = overlay.canv;
        $(screen).on('mousedown touchstart', function (e) {
            x = e.offsetX || e.touches[0].clientX - $(e.target).offset().left;
            y = e.offsetY || e.touches[0].clientY - $(e.target).offset().top;
            $(this).on('mousemove touchmove', function (e) {
                x1 = e.offsetX || e.touches[0].clientX;
                y1 = e.offsetY || e.touches[0].clientY;
                rect = {
                    x: x1 > x ? x : x1,
                    y: y1 > y ? y : y1,
                    width: Math.abs(x1 - x),
                    height: Math.abs(y1 - y)
                };
                ctx.clearRect(0, 0, canv[0].width, canv[0].height);
                ctx.fillRect(0, 0, canv[0].width, canv[0].height);
                ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
                ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
            });
            $(this).on('mouseup touchend', function (e) {
                html2canvas(screen, $.extend(rect, options)).then(show);
                canv.remove();
                $(this)
                    .off('mousedown mouseup mousemove')
                    .off('touchstart touchmove touchend');
            });
        });
    };
    $('.snip').click(e => {
        switch (e.target.id) {
            case 'snip-rect':
                $wind.hide();
                snipArea();
                break;
            case 'snip-win':
                break;
            case 'snip-full':
                html2canvas(screen, options).then(show);
                break;
        }
    });
    $('#snip-cancel').click(e => {
        $wind.removeClass('maximized');
        $snip.addClass('direction')
            .html('Select snip mode to start snipping.');
    });
    navigator.getBattery().then(function (battery) {
        var level = battery.level;
        document.getElementById("batt").innerHTML = Math.round(Number(level * 100)) + "%";
    });
});