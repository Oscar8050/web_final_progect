var CAT_photos = ["https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/8519607/pexels-photo-8519607.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/2064110/pexels-photo-2064110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/3635550/pexels-photo-3635550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260https://images.pexels.com/photos/3635550/pexels-photo-3635550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"];
var DOG_photos = ['https://p3-tt.byteimg.com/origin/pgc-image/93dc86c8fb9c4c0b8374d5f694b604e7?from=pc', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/AlaskanMalamuteDog.jpg/1280px-AlaskanMalamuteDog.jpg', 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/4422100/pexels-photo-4422100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940']
var displaying_index = 0;


class photo {
    constructor(_source, _album) {
        //var that = this;
        this.source = _source;
        this.individual_img_index = 0;
        this.album = _album;
        this.node = document.createElement('img');
        this.parent_node = this.node;
        this.node.src = _source;
        this.node.className = "cat_prev";
        this.node.addEventListener('click',
            () => {
                this.album.photos[displaying_index].node.removeAttribute('id');
                displaying_index = this.individual_img_index;
                change_display_block(this.album, displaying_index);
                this.node.setAttribute('id', 'displaying');
            });
    }
    set_index(_index) {
        this.individual_img_index = _index;
    }

    set_parent_node(_parent_node) {
        _parent_node.appendChild(this.node);
        this.parent_node = _parent_node;
    }
    rmeove_parent_node() {
        var tmp = this.parent_node.removeChild(this.node);
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
var album_C = document.getElementById('sub_menuC');
var album_D = document.getElementById('sub_menuD');
var album_E = document.getElementById('sub_menuE');
var album_P = document.getElementById('sub_menu+');
var album_title = document.getElementById('current_album_title');

/*##################################*/
/*              default             */
/*##################################*/
var album_1 = new album('C.A.T');
var album_2 = new album('Doggy');
for (let i = 0; i < 5; ++i) {          //  第一組預覽圖
    album_1.add_photo(new photo(CAT_photos[i], album_1));
    album_2.add_photo(new photo(DOG_photos[i], album_2));
    album_1.photos[i].set_parent_node(preview_block);
    //album_2.photos[i].set_parent_node(preview_block);

}


/*##################################*/
/*               yep                */
/*##################################*/

var album_set = [album_1, album_2];
var current_album = 0;
album_title.setAttribute('id', 'current_album')

change_display_block(album_1, displaying_index);
album_1.photos[0].node.setAttribute('id', 'displaying');


function change_display_block(_album, _index) {
    display_block.src = _album.photos[_index].source;
}

album_E.addEventListener('click',
    () => {
        alert('This is an EMPTY album. Please click on another one!');
    }
)

album_C.addEventListener('click',
    () => {
        album_title.innerHTML = 'C.A.T';
        album_set[current_album].photos[displaying_index].node.removeAttribute('id');
        displaying_index = 0;
        current_album = 0;
        change_display_block(album_1, displaying_index);
        album_set[current_album].photos[displaying_index].node.setAttribute('id', 'displaying');
        for (let i = 0; i < album_2.index; ++i) {
            album_2.photos[i].rmeove_parent_node(preview_block);
            album_1.photos[i].set_parent_node(preview_block);
        }

    }
)

album_D.addEventListener('click',
    () => {
        album_title.innerHTML = "Doggy";
        album_set[current_album].photos[displaying_index].node.removeAttribute('id');
        displaying_index = 0;
        current_album = 1;
        change_display_block(album_2, displaying_index);
        album_set[current_album].photos[displaying_index].node.setAttribute('id', 'displaying');
        for (let i = 0; i < album_1.index; ++i) {
            album_1.photos[i].rmeove_parent_node(preview_block);
            album_2.photos[i].set_parent_node(preview_block);
        }

    }
)

album_P.addEventListener('click',
    () => {
        alert("I haven't done it yet.");
    }
)