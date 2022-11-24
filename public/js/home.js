$.ajax({
    url: '/getMenu',
    dataType: 'json',
    success: function (result) {
        console.log(result);

        let els = "";
        $.each(result.menu, function (i, data) {
            els += `
        <div class="card col-3 m-2 p-2 shadow-sm">
            <div class="image-content">
                <div class="card-image">
                    <div class="menu-img" style="background-image:url(${data.image}); background-size: cover;"></div>
                </div>
            </div>

            <div class="card-content">
                <h2 class="name">${data.title}</h2>
                <p class="description mb-2">${data.ingredients}</p>
                <button class="btnx  button-add btn-outline-success">Add</button>
            </div>
        </div>`
        });
        $('#view_menu').prepend(els);
    }
});


