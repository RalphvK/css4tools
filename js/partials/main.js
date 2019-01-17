const router = new VueRouter({
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: hex_rgb,
            meta: {
                'title': 'CSS4 HEXA - RGBA Converter'
            }
        },
        {
            path: '/relative-hsl',
            component: scss,
            meta: {
                'title': 'SCSS Relative Color'
            }
        }
    ],
});

// change page title
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
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