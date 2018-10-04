function buildCart() {
    $('table').empty();
    $.ajax({
        url: 'http://localhost:3000/cart',
        dataType: 'json',
        success: function(cart) {
            var $table = $('table');

            cart.forEach(function (item) {
                var $tr = $('<tr />');
                var $td = $('<td />', {
                    class: 'td-img'
                });

                var $a = $('<a />', {
                    href: 'product.html'
                });

                var $img = $('<img />', {
                    src: item.img,
                    alt: 'product image'
                });




                var $div = $('<div />', {
                    class: 'td-text'
                });

                var $h2 = $('<h2 />', {
                    text: item.name

                });

                var $span = $('<span />', {
                    html: 'Color <p> Red </p>'
                });

                var $span2 = $('<span />', {
                    html: 'Color <p> XII </p>'
                });


                $div.append($h2);
                $div.append($span);
                $div.append($span2);
                $a.append($img);
                $a.append($div);
                $td.append($a);
                $tr.append($td);

                var $tdPrice = $('<td />', {
                    text: item.price + ' Р'
                });

                $tr.append($tdPrice);

                var $_td = $('<td />');


                var $tdDiv = $('<div />', {
                    class: 'product-qun'
                });



                var $tdInput = $('<input />', {
                   type: 'number',
                    value: item.quantity
                });


                $tdDiv.append($tdInput);
                $_td.append($tdDiv);
                $tr.append($_td);


                var $tdFree = $('<td />', {
                    text: 'FREE'
                });

                var $tdTotal = $('<td />', {
                    text: item.price
                });

                $tr.append($tdFree);
                $tr.append($tdTotal);

                var $tdDelete = $('<td />', {
                    class: 'cart-delete-item'
                });

                var $tdDeleteA = $('<button />', {
                    class: 'deleteItem',
                    'data-id': item.id,
                    'data-price': item.price,
                    'data-img': item.img,
                    'data-quantity': item.quantity
                });

                var $tdDeleteI = $('<i />', {
                   class: 'fas fa-times-circle'
                });


                $tdDeleteA.append($tdDeleteI);
                $tdDelete.append($tdDeleteA);
                $tr.append($tdDelete);

                $table.append($tr);
            });

        }
    })
}


function buildMiniCart() {
    $('.cart-items').empty();
    $.ajax({
        url: 'http://localhost:3000/cart',
        dataType: 'json',
        success: function(cart) {
            var $cart_items = $('.cart-items');
            var amount = 0;
            cart.forEach(function (item) {

                var $div = $('<div />', {
                    class: 'cart-item',
                    'data-id': item.id,
                    'data-price': item.price,
                    'data-img': item.img,
                    'data-quantity': item.quantity
                });

                var $divItemImg = $('<div />', {
                    class: 'cart-item-img'
                });

                var $a = $('<a />', {
                    href: 'product.html'
                });

                var $img = $('<img />', {
                    src: item.img,
                    alt: ''
                });

                $a.append($img);
                $divItemImg.append($a);
                $div.append($divItemImg);

                var $aItem = $('<a />', {
                    href: 'product.html',
                    class: 'cart-item-text'
                });

                var $h2 = $('<h2 />', {
                    text: item.name
                });

                var $span = $('<span />', {
                    text: '#####'
                });

                var $h3 = $('<h3 />', {
                    text:  item.quantity + ' x '  + item.price + 'Р'
                });

                $aItem.append($h2);
                $aItem.append($span);
                $aItem.append($h3);
                $div.append($aItem);

                var $divDelete = $('<div />', {

                });

                var $divDeleteA = $('<a />', {
                    href: '',
                    id: 'DeleteBtn',
                    'data-id': item.id,
                    'data-price': item.price,
                    'data-img': item.img,
                    'data-quantity': item.quantity
                });

                var $divDeleteI = $('<i />', {
                    class: 'fas fa-times-circle'
                });

                $divDeleteA.append($divDeleteI);
                $divDelete.append($divDeleteA);
                $div.append($divDelete);




                $cart_items.append($div);
                amount += +item.quantity * +item.price;




            });
            $('#totalPrice').text(amount + ' Р');
        }

    })

}


function buildGoodsList() {
    $.ajax({
        url: 'http://localhost:3000/goods',
        dataType: 'json',
        success: function(good) {
            var $items = $('.items');

            good.forEach(function (item) {
                var $div = $('<div />', {
                    class: 'parent-product',
                    'data-id': item.id,
                    'data-price': item.price
                });
                var $a = $('<a />',{
                    href: 'product.html',
                    class: 'item'
                });
                var $img = $('<img />',{
                    src: item.img,
                    alt: 'Img'
                });
                var $h3 = $('<h3 />',{
                    text: item.name,
                    class: 'product-text'
                });
                var $span = $('<span />',{
                    text: item.price + ' Р'

                });
                var $item_hover = $('<button />',{
                    class: 'item-hover',
                    text: 'Добавить в корзину',
                    'data-id': item.id,
                    'data-price': item.price,
                    'data-img': item.img,
                    'data-quantity': item.quantity
                });
                var $item_hover_img = $('<img />',{
                    src: 'img/cart-w.svg'

                });

                $h3.append($span);
                $a.append($img);
                $a.append($h3);
                // $item_hover.append($item_hover_img);
                $div.append($item_hover);
                $div.append($a);








                $items.append($div);
            });

        }
    })
}


(function($) {
    $(function() {
        // Рисуем корзину
        buildCart();
        // Рисуем список товаров
        buildGoodsList();
        buildMiniCart();

        console.log('Отрисовали');

        // Удалить

        $('table').on('click', '.deleteItem', function() {

            console.log("Удаляем товар");
            // Получаем id товара, который пользователь хочет удалить
            var id = $(this).attr('data-id');
            // Отправляем запрос на удаление

            $.ajax({
                url: 'http://localhost:3000/cart/' + id,
                type: 'DELETE',
                success: function() {
                    // Перерисовываем корзины
                    buildCart();
                }
            })

        });


        // Слушаем нажатия на кнопку Купить
        $('.items').on('click', '.item-hover', function() {


            console.log('Нажали купить');


            var id = $(this).attr('data-id');
            // Пробуем найти такой товар в корзине
            var entity = $('.header-cart [data-id="' + id + '"]');
            if(entity.length) {
                // Товар в корзине есть, отправляем запрос на увеличение количества
                $.ajax({
                    url: 'http://localhost:3000/cart/' + id,
                    type: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: JSON.stringify({
                        quantity: +$(entity).attr('data-quantity') + 1,
                    }),
                    success: function() {
                        // Перестраиваем корзину
                        buildMiniCart();
                    }
                })
            } else {
                // Товара в корзине нет - создаем в количестве 1
                $.ajax({
                    url: 'http://localhost:3000/cart',
                    type: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    data: JSON.stringify({
                        id: id,
                        quantity: 1,
                        name: $(this).attr('data-name'),
                        price: $(this).attr('data-price'),
                        img: $(this).attr('data-img'),
                    }),
                    success: function() {
                        // Перерисовываем корзину
                        buildMiniCart();
                    }
                })
            }
        });
    });
})(jQuery);