$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    var form = layui.form;
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd != value) {
                return 'NONONONONONO';
            };
        }
    });
    //
    //  form_reg
    //
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message);
            }
            // console.log('OK');
            layer.msg('OKOKOK!LOGIN!');
            $('#link_login').click();
        })
    })

    //
    // form_login
    //
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('LOGIN FAILD');
                }
                layer.msg('LOGIN SUCCESS');
                // console.log(res.token);
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
});
