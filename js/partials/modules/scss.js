const scss = {
    data: function () {
        return {
            baseColor: '#000',
            variantColor: '#000',
            scss: 'test'
        }
    },
    watch: {
        baseColor: {
            handler(object) {
                // compare colors
                this.update();
            }
        },
        variantColor: {
            handler(object) {
                // compare colors
                this.update();
            }
        }
    },
    methods: {
        init() {
            this.update();
        },
        update() {
            // create color objects
            var bc = new colorCode(this.baseColor);
            var vc = new colorCode(this.variantColor);
            // set background color
            this.setBackground('body', bc.hex(), vc.hex());
            // set new scss
            return this.scss = bc.scssTransformTo(vc);
        },
        setBackground(selector, colorA, colorB) {
            document.querySelector(selector).style.background = `linear-gradient(to right, ${colorA} 50%, ${colorB} 50%)`;
        }
    },
    mounted() {
        this.init();
    },
    template: `
        <div class="container">

            <!-- input row -->
            <div id="row-input">
                <form class="row">
                    <div class="col-md-6">
                        <div class="form-group animated fadeInDown">
                            <b-input-group prepend="FROM">
                                <b-form-input v-model="baseColor" type="text" size="lg"></b-form-input>
                            </b-input-group>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group animated fadeInDown" style="animation-delay: 0.1s;">
                            <b-input-group prepend="TO">
                                <b-form-input v-model="variantColor" type="text" size="lg"></b-form-input>
                            </b-input-group>
                        </div>
                    </div>
                </form>
                <form class="row">
                    <div class="col">
                        <div class="form-group animated fadeInDown code" style="animation-delay: 0.1s;">
                            <b-input-group>
                                <b-form-textarea v-model="scss" type="text" size="lg" :rows="3" @focus.native="$event.target.select()" @click.native="$event.target.select()" readonly></b-form-textarea>
                            </b-input-group>
                        </div>
                    </div>
                </form>
            </div>

        </div>
        `
};