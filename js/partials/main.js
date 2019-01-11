const router = new VueRouter({
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