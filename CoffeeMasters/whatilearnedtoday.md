# SPA's design patterns

An SPA is a type of web app that interacts with the user by dynamically rewriting the current web page with new data from the web server, instead of loading entire new pages

## Lazy load
problem to solve: loading too many js files when the app loads leads to performance and memory usage problems.
solution: use dynamic imports from ECMASCRIPT to load modules when needed.
use cases: 
* load web components when you need them
* load routes in SPA when you access the page for the first time

```js
...
        case "/order":
            // LAZY LOAD PATTERN
            await import("../components/OrderPage.js");
            pageElement = document.createElement("order-page");
            break;
...
//removed web component import on initial load, added dynamic import on Router via lazy load pattern, refactored function to async await for dynamic import

```

## View Transitions

problem to solve: when changing routes there are no transitions as in most apps
solution: use new View Transitions API
use cases: 
* animate page change
* morth elements between pages

>before
```js
//Router.js this code replaces the current page from the DOM
...
        if (pageElement) {
            // get current page element            
            let currentPage = document.querySelector("main").firstElementChild; 
            if (currentPage) {
                currentPage.remove();
                document.querySelector("main").appendChild(pageElement);
            } else {
                document.querySelector("main").appendChild(pageElement);
            }

        }
...

```

>after
```js
//Router.js
...
        if (pageElement) {
            function changePage() {
                // get current page element            
                let currentPage = document.querySelector("main").firstElementChild; 
                if (currentPage) {
                    currentPage.remove();
                    document.querySelector("main").appendChild(pageElement);
                } else {
                    document.querySelector("main").appendChild(pageElement);
                }
            }
            if(document.startViewTransition){
                document.startViewTransition(() => changePage())
            } else {
                changePage();
            }
        }
...

// add view transition logic, via progressive enhancement for browsers that dont support it
```


you can further customise the transitions via css

```css
::view-transition-old(root), ::view-transition-new(root) {
    animation-duration: .7s;
}

@keyframes fade-in {
    from { opacity: 0; }
    }

    @keyframes fade-out {
    to { opacity: 0; }
    }

    @keyframes slide-from-right {
    from { transform: translateX(60px); }
    }
    
    @keyframes slide-to-left {
        to { transform: translateX(-60px); }
    }
    
    ::view-transition-old(root) {
        animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
        300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
    }
    
    ::view-transition-new(root) {
        animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
        300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
    }

```

you can also independently transition elements by naming the `view-transition-name` and passing that value to the old and new transition

```css

body>header {
    view-transition-name: main-header;
}

::view-transition-old(main-header), ::view-transition-new(main-header) {
    animation-duration: .1s;
}

```
## HTML Templates with Interpolation

problem to solve: when using templates for web components, you cant express in the HTML the bindings you want
solution: use ES string templates that will let us interpolate with dynamic data from the HTML (hacky)

## Routing Metadata

problem to solve: when working with an SPA, web page metadata, such as title, SEO data and other information stays static no matter the current URL 
solution: update the metadata dynamically when the route changes
use cases: 
* adapt theme-color
* change the title
* update the favicon based on the current page


<!-- * `document.title` is an old api that can be accessed now in pwa's
* safari (vomit) allows you to control the color of the browser title bar, chrome holds on to your web app name in case of fishing -->

