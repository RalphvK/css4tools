const router = new VueRouter({
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: hex_rgb
        },
        {
            path: '/relative-hsl',
            component: scss
        }
    ]
});

// Vue app
var vm = new Vue({
    router,
    el: '#app'
}).$mount('#app');

function setThemeColor(color) {
    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", color);
}

function setBodyInverse(value) {
    if (value) {
        document.body.classList.add('inverse');
    } else {
        document.body.classList.remove('inverse');
    }
}