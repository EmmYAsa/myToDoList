function PageLoaded() {
    let $pencil = window.pencil;
    let $input = document.querySelector('.lists');
    let $ul = document.querySelector('.todos');
    let $filter = document.querySelector('.filter');
    let $clear = document.querySelector('.clear');
    let $tipBtn = document.querySelector('.tipButton');
    let $overlay = document.querySelector('#overlay');
    let $closebtn = document.querySelector('.closebtn');
    let $exclamation = document.querySelector('.exclam')

    loadTodos();
    deleteItem();

    $input.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter') {
            return;
        }
        if (/!\W/.test(this.value)) {
            return;
        }

        let li = document.createElement('li');
        let spanCest = document.createElement('span');
        let icon = document.createElement('i');
        let spanExclam = document.createElement('span');
        let img = document.createElement('img');

        icon.setAttribute('class', 'fas fa-trash-alt');
        spanCest.insertAdjacentElement('afterbegin', icon);
        spanExclam.classList.add('exclam');

        img.setAttribute('src', 'img/icons8-exclamation-mark-26.png');
        img.setAttribute('alt', '');

        spanExclam.appendChild(img);

        li.textContent = this.value;

        spanCest.addEventListener('click', () => {
            spanCest.parentElement.remove();
            save();
        });

        li.insertAdjacentElement('afterbegin', spanCest);
        li.insertAdjacentElement('beforeend', spanExclam);

        $ul.insertAdjacentElement('beforeend', li);
        this.value = '';
        save();

        

        document.querySelectorAll('.exclam').forEach($exclamation => {
            $exclamation.addEventListener('click', () => {
                const listItem = $exclamation.parentElement;
                listItem.classList.toggle('important');
                save();
            });
        });
        
    });



    $pencil.addEventListener('click', () => {
        $input.classList.toggle('display');
    });

    $clear.addEventListener('click', () => {
        localStorage.clear();
        $ul.innerHTML = '';
    });

    $tipBtn.addEventListener('click', () => {
        $overlay.style.height = '100vh';
    });

    $closebtn.addEventListener('click', () => {
        $overlay.style.height = '0';
    });

    $ul.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('checked');
            save()
        }
    });

    document.querySelectorAll('.exclam').forEach($exclamation => {
        $exclamation.addEventListener('click', () => {
            const listItem = $exclamation.parentElement;
            listItem.classList.toggle('important');
            save();
        });
    });

    function loadTodos() {
        if (localStorage.getItem('todos')) {
            $ul.innerHTML = localStorage.getItem('todos');
        }
    }

    function deleteItem() {
        let $li = document.querySelectorAll('.todos .cest');
        for (let i = 0; i < $li.length; i++) {
            $li[i].addEventListener('click', () => {
                $li[i].parentElement.remove();
                save();
            });
        }
    }

    function save() {
        localStorage.setItem('todos', $ul.innerHTML);
    }

    function getList() {
        let list = localStorage.getItem('todos').split('</li>');
        list = list.map((item) => item + '</li>');
        if (list[list.length - 1].indexOf('<li') === -1) {
            list.pop();
        }
        return list;
    }

    $filter.addEventListener('click', function () {
        let nameBtn = ['All', 'Done', 'Active', 'Important'];
        let index = nameBtn.indexOf(this.textContent);
        index++;
        if (index >= nameBtn.length) {
            index = 0;
        }
        this.textContent = nameBtn[index];
        filterList();
    });


    function filterList() {
        let checkedItems = getList().filter((item) => item.indexOf('checked') !== -1).join('');
        switch ($filter.textContent) {
            case 'All':
                $ul.innerHTML = localStorage.getItem('todos');
                break;
            case 'Done':
                $ul.innerHTML = checkedItems;
                break;
            case 'Active':
                $ul.innerHTML = getList().filter((item) => item.indexOf('checked') === -1).join('');
                break;
            case 'Important': 
                $ul.innerHTML = getList().filter((item) => item.indexOf('important') !== -1).join('');
                break;
        }
    }
    

}

document.addEventListener('DOMContentLoaded', PageLoaded);
