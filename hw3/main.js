/*###############################################*/
/*                   dom node                    */
/*###############################################*/
var item_node_array = [];
var main_node = document.createElement('section');
var input_node = document.createElement('input');
var root_node = document.getElementById('root');
var list_node = document.createElement('ul');


/*###############################################*/
/*              dom node setting                 */
/*###############################################*/
main_node.className = 'todo-app__main';
input_node.className = 'todo-app__input';
list_node.className = "todo-app__list";
input_node.setAttribute('placeholder', 'What needs to be done?')


/*###############################################*/
/*                 append child                  */
/*###############################################*/
root_node.appendChild(main_node);
main_node.appendChild(input_node);
main_node.appendChild(list_node);

/*###############################################*/
/*                     class                     */
/*###############################################*/
class list_item {
    constructor(_content, _parent_node) {
        this.node = document.createElement('li');
        this.node.className = 'todo-app__item';
        _parent_node.appendChild(this.node);
        this.node.textContent = _content;

    }
}

/*###############################################*/
/*                   function                    */
/*###############################################*/
input_node.addEventListener('keyup', function (e) {
    if (event.keyCode === 13) {
        var input_info = this.value;
        item_node_array.push(new list_item(input_info, list_node));
        input_node.textContent = "";
        this.value = "";
    }
});