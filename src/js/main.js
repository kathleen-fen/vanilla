function CounterComponent( props = {}) {
    let state = {
        count: props.initialCount || 0
    }

    let incrementCounter = () => {
        state.count += 1;
    }

    let updateButton = (button) => {
        button.innerText = state.count;
    }

    let renderButton = () => {
        let button = document.createElement('button');
        console.log('button', button)
        button.addEventListener('click', () => {
            incrementCounter();
            updateButton(button);
        })
        updateButton(button);
        return button;
    }
    let renderContainer = () => {
        let div = document.createElement('div');
        console.log('div', div)
        div.appendChild(renderButton());
        return div;
    }
     
    return renderContainer();
}
document.body.appendChild(CounterComponent());
function jsxToDom(element, props, ...children) {
    console.log('jsxToDom')
    if (typeof(element) === 'function') {
        return element({...props, children});
    }
    let el = document.createElement(element);

    if (props) {
        for (let key of Object.keys(props)) {
            let eventName = key.match(/^on([A-Z]\w+)$/);
            if (eventName) {
                el.addEventListener(eventName[1].toLowerCase(), props[key]);
            }
            else {
                el.setAttribute(key, props[key]);
            }
        }
    }

    for (let child of children) {
        el.appendChild( child instanceof HTMLElement ? child : document.createTextNode(child));
    }

    return el;

} 
/** @jsx jsxToDom */
/* function Counter( props = {}) {
    let state = {
        count: props.initialCount || 0
    }

    let incrementCounter = () => {
        state.count += 1;
    }

    let updateButton = (button) => {
        button.innerText = state.count;
    }

   let Button = () => {
       let updateCounter = (button) => {
           incrementCounter();
           updateButton(button);
       }
       let button = (
           <button onClick = { () => updateCounter(button) }>
               { state.count }
           </button>
       );
       return button;
   }
   return (
       <div>
           <Button />
       </div>
   );
}
document.body.appendChild(<Counter />); */

function Content( props = {}) {
    console.log('props',props)
    let state = {
        list: props.table || "default text!!!"
    }
    
    /* let incrementCounter = () => {
        state.count += 1;
    }

    let updateButton = (button) => {
        button.innerText = state.count;
    }

    let renderButton = () => {
        let button = document.createElement('button');
        console.log('button', button)
        button.addEventListener('click', () => {
            incrementCounter();
            updateButton(button);
        })
        updateButton(button);
        return button;
    } */
    let renderContainer = () => {
        let div = document.createElement('div');
        let ul = document.createElement('ul');
        console.log('state',state)
        state.list.forEach(element => {
           let li = document.createElement('li');
           li.innerText = element.name;
           ul.appendChild(li); 
        });
        div.appendChild(ul);
        return div;
        /* div.textContent = state.text;
        console.log(div)
        return div; */
    }
     
    return renderContainer();
}

document.addEventListener('DOMContentLoaded', function(){
    let ar = [
        {
            id:0,
            name: "Aron"
        },
        {
            id:1,
            name: "Alice"
        },
        {
            id:3,
            name: "Harry"
        }
    ];
    console.log("document ready")
    document.querySelector('#standard-select').addEventListener('change', function(e) {
        
        document.querySelector("#content").innerHTML="";
        console.log('ar',ar)
        ar.forEach(el => {
            document.querySelector("#content").appendChild(Item({
                item: el.name,
                id: el.id
            }));
        })
       
    })
});
function Item( props = {}) {
    let state = {
        item: props.item,
        id: props.id
    };
    let $item_template = document.querySelector("#item");
    let li = $item_template.content.cloneNode(true);
    console.log(li)
    li.querySelector("[data-element='name']").textContent = state.item;
    li.querySelector("[data-element='id']").textContent = state.id;
    return li;
}