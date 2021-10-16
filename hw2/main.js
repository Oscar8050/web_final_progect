var CAT_photos = ["https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/8519607/pexels-photo-8519607.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/2064110/pexels-photo-2064110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/3635550/pexels-photo-3635550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260https://images.pexels.com/photos/3635550/pexels-photo-3635550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"];
class photo {
    constructor(_source, _album) {
        this.source = _source;
        this.indivdual_img_index = 0;
        this.album = _album;
        this.node = document.createElement('img');
        this.node.src = _source;
        this.node.className = "cat_prev"
    }
    set_index(_index) {
        this.indivdual_img_index = _index;
    }
    set_parent_node(_parent_node) {
        _parent_node.appendChild(this.node);
    }
    set_event_listener(_album) {
        this.node.addEventListener('click',
            function () {
                console.log(this.indivdual_img_index)
                _album.set_current_index(this.indivdual_img_index);
                console.log(_album.current_index);
            })
    }



}
class album {
    constructor(_name) {
        this.name = _name;
        this.index = 0;
        this.photos = [];
        this.current_index = 0;
    }
    add_photo(_photo) {
        this.photos.push(_photo);
        _photo.set_index(this.index++);
    }
    set_current_index(_num) {
        this.current_index = _num;
    }
}


/*##################################*/
/*              dom node            */
/*##################################*/
var display_block = document.getElementById("big");
var preview_block = document.querySelector('.preview');


/*##################################*/
/*              default             */
/*##################################*/
var album_1 = new album('C.A.T');
for (let i = 0; i < 5; ++i) {          //  第一組預覽圖
    album_1.add_photo(new photo(CAT_photos[i], album_1));
    album_1.photos[i].set_parent_node(preview_block);
    album_1.photos[i].set_event_listener(album_1);
}


/*##################################*/
/*               yep                */
/*##################################*/
var album_set = [album_1];




display_block.src = CAT_photos[album_1.current_index];


// function change_display_block(_index) {
//     display_block.src = album_1.photos[_index];
// }



