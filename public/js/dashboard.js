// $.ajax({
//     url: '/getMenu',
//     dataType: 'json',
//     success: function (result) {
//         console.log(result);

//         let els = "";
//         $.each(result.menu, function (i, data) {
//             els += `
//         <div class="card col-3 m-2 p-2 shadow-sm">
//             <div class="image-content">
//                 <div class="card-image">
//                     <div class="menu-img" style="background-image:url(${data.image}); background-size: cover;"></div>
//                 </div>
//             </div>

//             <div class="card-content">
//                 <h2 class="name">${data.title}</h2>
//                 <p class="description mb-2">${data.ingredients}</p>
//                 <button class="btnx  button-add btn-outline-success">Add</button>
//             </div>
//         </div>`
//         });
//         $('#view_menu').prepend(els);
//     }
// });

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const per_page = params.per_page ?? 3
const page = params.page ?? 1

$(document).ready((e) => {
    loadData(page, per_page)
})

function loadData(page, per_page = 1) {
    $('#menuDashboard').show()
    $('.data').remove()
    $.ajax({
        url: `/dashboardMenu?page=${page}&per_page=${per_page}`,
        accept: 'application/json',
        success: (res) => {
            let tr = "";
            $.each(res.menu, (i, data) => {
                tr += `<tr class="data" data-target-id=${data.id}>
                  <td class="text-center">${++i}</td>`
                tr += `<td>${data.title}</td>`
                tr += `<td class="" style="height: auto; width: 10px;"><img style="height: 100px; width: auto;" src="${data.image}" alt=""></td>`
                tr += `<td>${data.description}</td>`
                tr += `<td class="bg-danger">${data.ingredients}</td>`
                tr += `<td class="text-center">
                <button class="btn btn-primary p-2" style="height: auto; width: 50%;" onclick="detailMenu(${data.id_product})">Detail</button>
                | <button class="btn btn-danger p-2" style="height: auto; width: 50%;" onclick="removeMenu(${data.id_product})">Remove</button>
                | <button class="btn btn-success p-2" style="height: auto; width: 50%;" onclick="editMenu(${data.id_product})">Edit</button>
                </tr>`
            })
            currentPage = parseInt(res.page)
            nextPage = (currentPage < res.total_page) ? '' : 'disabled'
            prevPage = (currentPage == 1) ? 'disabled' : ''
            $('table').append(tr)
            $('table').append(`<tr class="data">
            <td colspan="4" class="text-start p-2"><span>Page ke - ${res.page} dari ${res.total_page} page dengan Jumlah Products yang tersedia ${res.jumlah}<span></td>
            <td class="text-center">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><button class="page-link ${prevPage} mx-3" onclick="loadData(${currentPage - 1})"><span aria-hidden="true">&laquo;</span> Prev</button></li>
                  <li class="page-item"><button class="page-link ${nextPage}" onclick="loadData(${currentPage + 1})">Next <span aria-hidden="true">&raquo;</span></button></li>
                </ul>
              </nav>
            </td>
          </tr>`)
            $('#loader').hide()


        },
        error: (res) => {
            const { msg } = JSON.parse(res.responseText)
            $('#loader').hide()
            $('table').append(`<td colspan="5" class="text-center p-2" id="loader"><h3>${msg}<h3></td>`)
        }
    })
}

// post untuk tambah data
// $('#modalAddProduct').submit(e => {
//     e.preventDefault();
//     $('#modalAddProduct #dataLoader').removeClass('d-none')
//     var fd = new FormData();
//     var files = $('#modalAddProduct #gambar')[0].files;
//     const nama = $('#modalAddProduct input#name').val()
//     const deskripsi = $('#modalAddProduct #deskripsi').val()
//     const total = $('#modalAddProduct input#total').val()
//     const harga = $('#modalAddProduct input#harga').val()
//     fd.append('id', files[0])
//     fd.append('title', title)
//     fd.append('description', description)
//     fd.append('ingredients', ingredients)
//     fd.append('image', image)
//     $.ajax({
//         url: '/getMenu',
//         method: 'POST',
//         data: fd,
//         contentType: false,
//         processData: false,
//         success: function (response) {
//             $('.data').remove()
//             loadData(page, per_page)
//             $('#modalAddProduct .form-control').val('')
//             $('#dataLoader').addClass('d-none')
//             $('.modal').modal('hide')
//             $('#success').modal('show')
//             setInterval(() => {
//                 $('#success').modal('hide')
//             }, 800)
//         },
//         fail: (e) => {
//             console.log(e);
//         },
//     })
// })

// // function untuk hapus data

// const deleteData = (id) => {
//     $('#ModalHapus').modal('show')
//     $('#btn_hapus').click(() => {
//         $('#ModalHapus #dataLoader').removeClass('d-none')
//         $.ajax({
//             url: `/api/products/${id}`,
//             method: 'DELETE',
//             success: (res) => {
//                 $('#ModalHapus #dataLoader').addClass('d-none')
//                 $(`tr[data-target-id="${id}"]`).remove()
//                 $('.modal').modal('hide')
//                 $('#success').modal('show')
//                 loadData(currentPage)
//                 setInterval(() => {
//                     $('#success').modal('hide')
//                 }, 1000)
//             }
//         })
//     })
// }

const lihatProduct = (id) => {
    $('#modalEditProduct #dataLoader').removeClass('d-none')
    let nama = $('#modalEditProduct input#name')
    let deskripsi = $('#modalEditProduct #deskripsi')
    let total = $('#modalEditProduct input#total')
    let harga = $('#modalEditProduct input#harga')
    $('#modalEditProduct').modal('show')
    $.ajax({
        url: `/api/products/${id}`,
        method: 'GET',
        success: (res) => {
            $('#modalEditProduct #dataLoader').addClass('d-none')
            nama.val(res.nama)
            deskripsi.val(res.deskripsi)
            total.val(res.total)
            harga.val(res.harga)
            console.log($('#modalEditProduct img').attr('src', `/uploads/img/${res.gambar}`))
        }
    })
    $('#edit_btn').click(function (e) {
        e.preventDefault()
        $(this).fadeOut()
        $('#submit_btn').removeClass('d-none').fadeIn()
        $('#modalEditProduct .form-control').removeAttr('disabled')
        nama.focus()
    })

}