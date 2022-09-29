

$(function () {
    var form = layui.form
    var layer = layui.layer
    initArtCateList();

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr);
            }
        });
    }

    var indexAdd = null;
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        // console.log('ok');
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('ADD faild')
                }
                initArtCateList();
                layer.msg('ADD success');
                layer.close(indexAdd);
            }
        })
    })
    var indexEdit = null
    $('tbody').on('click', '#btn-edit', function () {
        console.log('ok');
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id');

        // console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('UPDATE faild');
                }
                layer.msg('UPDATE success');
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })

    $('body').on('click', '.btn-delete', function () {

        // console.log('ok');
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' },
            function (index) {
                //do something
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg('delete faild')
                        }
                        layer.msg('delete success');
                        layer.close(index);
                        initArtCateList();
                    }
                });

            });
    })
})