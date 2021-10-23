/*###############################################*/
/*               global variable                 */
/*###############################################*/
var item_total_amount = 2;  //不知道為什麼不能for = '1'
var item_valid_amount = 2;
var first_time = true;


/*###############################################*/
/*                   dom node                    */
/*###############################################*/
var item_node_array = [];
var list_node = document.createElement('h1');

var main_node = document.createElement('section');
var input_node = document.createElement('input');
var root_node = document.getElementById('root');


var footer_node = document.createElement('footer');
var total_node = document.createElement('div');
var clean_node = document.createElement('div');
var clean_button_node = document.createElement('button');
var view_buttons_node = document.createElement('ul');
var all_button_node = document.createElement('button');
var active_button_node = document.createElement('button');
var completed_button_node = document.createElement('button');
/*###############################################*/
/*              dom node setting                 */
/*###############################################*/
main_node.className = 'todo-app__main';
input_node.className = 'todo-app__input';
list_node.className = "todo-app__list";

footer_node.className = 'todo-app__footer';
total_node.className = 'todo-app__total';
clean_node.className = 'todo-app__clean';
view_buttons_node.className = 'todo-app__view-buttons';
// all_button_node.className = 'button';
// active_button_node.className = 'button';
// completed_button_node.className = 'button';

input_node.setAttribute('placeholder', 'What needs to be done?');
input_node.autofocus = true;
total_node.textContent = '1 left'
all_button_node.textContent = 'All';
active_button_node.textContent = 'Acitve';
completed_button_node.textContent = 'Completed';
clean_button_node.textContent = 'Clear completed';
/*###############################################*/
/*                 append child                  */
/*###############################################*/
root_node.appendChild(main_node);
//root_node.appendChild(footer_node);

main_node.appendChild(input_node);
main_node.appendChild(list_node);

// footer_node.appendChild(total_node);
// footer_node.appendChild(view_buttons_node);
// view_buttons_node.appendChild(all_button_node);
// view_buttons_node.appendChild(active_button_node);
// view_buttons_node.appendChild(completed_button_node);
// footer_node.appendChild(clean_node);
// clean_node.appendChild(clean_button_node);

/*###############################################*/
/*                     class                     */
/*###############################################*/
class list_item {
    constructor(_content, _parent_node, _total_node) {


        this.node = document.createElement('li');
        this.detail_node = document.createElement('h1');
        this.checkbox_node = document.createElement('div');
        this.detail_input_node = document.createElement('input');
        this.detail_label_node = document.createElement('label');
        this.total_node = _total_node;

        this.node.className = 'todo-app__item';
        this.checkbox_node.className = "todo-app__checkbox";
        this.detail_node.className = 'todo-app__item-detail';
        this.detail_input_node.setAttribute('id', item_total_amount);
        this.detail_label_node.setAttribute('for', item_total_amount);


        _parent_node.appendChild(this.node);
        this.node.appendChild(this.checkbox_node);
        this.node.appendChild(this.detail_node);
        this.checkbox_node.appendChild(this.detail_input_node);
        this.checkbox_node.appendChild(this.detail_label_node);

        this.detail_node.textContent = _content;
        this.detail_input_node.setAttribute('type', 'checkbox');
        item_total_amount++;
        item_valid_amount++;
        _total_node.textContent = `${item_valid_amount - 2} left`;
        this.detail_input_node.addEventListener(
            'click', () => {
                if (this.detail_input_node.checked == true) {
                    this.detail_node.setAttribute('style',
                        'text-decoration: line-through; opacity: 0.5;');
                    item_valid_amount--;

                }
                else {
                    this.detail_node.removeAttribute('style');
                    item_valid_amount++;

                }
                _total_node.textContent = `${item_valid_amount - 2} left`;
            }
        )
    }

}

/*###############################################*/
/*                   function                    */
/*###############################################*/
input_node.addEventListener('keyup', function (e) {
    if (event.keyCode === 13) {
        var input_info = this.value;
        item_node_array.push(new list_item(input_info, list_node, total_node));
        input_node.textContent = "";
        this.value = "";
        if (first_time) {
            root_node.appendChild(footer_node);
            footer_node.appendChild(total_node);
            footer_node.appendChild(view_buttons_node);
            view_buttons_node.appendChild(all_button_node);
            view_buttons_node.appendChild(active_button_node);
            view_buttons_node.appendChild(completed_button_node);
            footer_node.appendChild(clean_node);
            clean_node.appendChild(clean_button_node);
        }
    }


});

