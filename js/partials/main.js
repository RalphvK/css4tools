const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: hex_rgb
        }
    ]
});

// Vue app
var vm = new Vue({
    router,
    el: '#app',
    data: {
        color: new colorCode().parseHex('#00f9'),
        hex_active: false,
        rgb_active: false,
        hex_input: '',
        rgb_input: ''
    },
    computed: {
        hex: {
            get() {
                if (!this.hex_active) {
                    return this.color.hex();
                } else {
                    return this.hex_input;
                }
            },
            set(value) {
                this.color.hex(value);
                if (!this.hex_active) {
                    this.hex_input = this.color.hex();
                } else {
                    this.hex_input = value;
                }
            }
        },
        rgb: {
            get() {
                if (!this.rgb_active) {
                    return this.color.rgb();
                } else {
                    return this.rgb_input;
                }
            },
            set(value) {
                this.color.rgb(value);
                if (!this.rgb_active) {
                    this.rgb_input = this.color.rgb();
                } else {
                    this.rgb_input = value;
                }
            }
        }
    },
    watch: {
        color: {
            handler(object) {
                this.logChannels();
                this.setBackgroundColor('body', this.color.hex());
                setThemeColor(this.color.hex());
            },
            deep: true
        }
    },
    methods: {
        init() {
            this.hex_input = this.color.hex();
            this.rgb_input = this.color.rgb();
            this.setBackgroundColor('body', this.color.hex());
        },
        setBackgroundColor(selector, value) {
            document.querySelector(selector).style.backgroundColor = value;
        },
        logChannels() {
            return { red: this.color.red, green: this.color.green, blue: this.color.blue, alpha: this.color.alpha };
        }
    }
}).$mount('#app');

function setThemeColor(color) {
    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", color);
}