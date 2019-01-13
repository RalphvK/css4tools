const hex_rgb = {
    data: function () {
        return {
            color: new colorCode().parseHex('#00f9'),
            hex_active: false,
            rgb_active: false,
            hex_input: '',
            rgb_input: ''
        }
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
                this.setBackground('body', this.color.hex());
                this.checkContrast();
                setThemeColor(this.color.hex());
            },
            deep: true
        }
    },
    methods: {
        init() {
            this.hex_input = this.color.hex();
            this.rgb_input = this.color.rgb();
            this.setBackground('body', this.color.hex());
        },
        setBackground(selector, value) {
            document.querySelector(selector).style.background = value;
        },
        logChannels() {
            return { red: this.color.red, green: this.color.green, blue: this.color.blue, alpha: this.color.alpha };
        },
        checkContrast() {
            if (this.color.getHslArray('integer')[2] > 70) {
                setBodyInverse(true);
            } else {
                setBodyInverse(false);
            }
        }
    },
    mounted() {
        this.init();
    },
    template: `
            <div class="container">

                <!-- input row -->
                <div id="row-input" class="row">
                    <div class="col">
                        <form>
                            <div class="form-group animated fadeInDown">
                                <b-input-group prepend="HEX">
                                    <b-form-input v-model="hex" type="text" size="lg" @focus.native="hex_active = true" @blur.native="hex_active = false"></b-form-input>
                                </b-input-group>
                            </div>
                            <div class="form-group animated fadeInDown" style="animation-delay: 0.1s;">
                                <b-input-group prepend="RGB">
                                    <b-form-input v-model="rgb" type="text" size="lg" @focus.native="rgb_active = true" @blur.native="rgb_active = false"></b-form-input>
                                </b-input-group>
                            </div>
                        </form>                
                    </div>
                </div>

            </div>
            `
};