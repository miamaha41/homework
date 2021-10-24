const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (() => {
    const cars = ['BMW'];
    const root = $('#root');
    const input = $('#input');
    const submit = $('#submit');
    return {
        add(car) {
            cars.push(car);
        },
        delete(index) {
            cars.splice(index, 1)
        },
        render() {
            const html = cars.map((car, index) => `
            <li>
            ${car}
            <span class="delete" data-index="${index}">&times</span>
            </li>
            `).join('');
            root.innerHTML = html;
        },
        handleDelete(e) {
            //e.target is element 
            //closest is method of dom element , check element child or parent has class ""
            const deleteBtn = e.target.closest('.delete');
            if (deleteBtn) {
                //dataset
                const index = deleteBtn.dataset.index;
                this.delete(index);
                this.render();
            }
        },
        init() {
            //handle dom events
            // const that = this if use submit.onclick = function(){}
            submit.onclick = () => {
                const car = input.value.trim();
                if (car == null || car == "") {
                    alert("Please enter a car!");
                } else {
                    this.add(car);
                    this.render();
                    input.value = null;
                }
                input.focus();
            }
            root.onclick = this.handleDelete.bind(this);
            this.render();
        }
    }
})();
app.init();

//Delegate patterm (catch event in dom after program running)