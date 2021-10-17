var CAT_photos = ["https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/8519607/pexels-photo-8519607.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/2064110/pexels-photo-2064110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/3635550/pexels-photo-3635550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260https://images.pexels.com/photos/3635550/pexels-photo-3635550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"];
var Dog_photos = ['https://p3-tt.byteimg.com/origin/pgc-image/93dc86c8fb9c4c0b8374d5f694b604e7?from=pc', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/AlaskanMalamuteDog.jpg/1280px-AlaskanMalamuteDog.jpg', 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/4422100/pexels-photo-4422100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940']
var displaying_index = 0;


class photo {
    constructor(_source, _album) {
        //var that = this;
        this.source = _source;
        this.individual_img_index = 0;
        this.album = _album;
        this.node = document.createElement('img');
        this.node.src = _source;
        this.node.className = "cat_prev";
        this.node.addEventListener('click',
            () => {
                this.album.photos[displaying_index].node.removeAttribute('id');
                displaying_index = this.individual_img_index;
                change_display_block(displaying_index);
                this.node.setAttribute('id', 'displaying');
            });
    }
    set_index(_index) {
        this.individual_img_index = _index;
    }

    set_parent_node(_parent_node) {
        _parent_node.appendChild(this.node);
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


/*##################################*/
/*              default             */
/*##################################*/
var album_1 = new album('C.A.T');
var album_2 = new album('Doggy');
for (let i = 0; i < 5; ++i) {          //  第一組預覽圖
    album_1.add_photo(new photo(CAT_photos[i], album_1));
    album_2.add_photo(new photo(Dog_photos[i], album_2));
    //album_1.photos[i].set_parent_node(preview_block);
    album_2.photos[i].set_parent_node(preview_block);
    //album_1.photos[i].set_event_listener(album_1);
    //    console.log(album_1.photos[i].individual_img_index)
}


/*##################################*/
/*               yep                */
/*##################################*/

var album_set = [album_1];

//display_block.src = CAT_photos[displaying_index];

change_display_block(displaying_index);
album_1.photos[0].node.setAttribute('id', 'displaying');


function change_display_block(_index) {
    display_block.src = CAT_photos[_index];
}

album_E.addEventListener('click',
    () => {
        alert('This is an EMPTY album. Please click on another one!');
    }
)


