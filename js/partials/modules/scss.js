const scss = {
    data: function () {
        return {
            baseColor: '#00004d',
            baseColorDisplay: '#00004d',
            variantColor: '#3d24ff',
            variantColorDisplay: '#3d24ff',
            scss: '// SCSS goes here'
        }
    },
    beforeCreate: function () {
        setBodyInverse(true);
    },
    destroyed: function () {
        setBodyInverse(false);
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
            this.setBackground('body', '#e6e6e6');
            this.update();
        },
        update() {
            // create color objects
            var bc = new colorCode(this.baseColor);
            var vc = new colorCode(this.variantColor);
            // set color displays
            this.baseColorDisplay = bc.hex();
            this.variantColorDisplay = vc.hex();
            // set new scss
            return this.scss = '$color: ' + this.baseColorDisplay + ';\n$variant: ' + bc.scssTransformTo(vc, '$color');
        },
        setBackground(selector, value) {
            document.querySelector(selector).style.background = value;
        }
    },
    mounted() {
        this.init();
    },
    template: `
        <div class="container">

            <!-- input row -->
            <div id="row-input">
                <div id="row-color" class="row animated fadeInDown" style="animation-delay: 0.3s;">
                    <div class="col-md-6">
                        <div class="color-display form-group" v-bind:style="{ backgroundColor: baseColorDisplay}"></div>
                    </div>
                    <div class="col-md-6">
                        <div class="color-display form-group" v-bind:style="{ backgroundColor: variantColorDisplay}"></div>
                    </div>
                </div>
                <form class="row animated fadeInDown" style="animation-delay: 0.1s;">
                    <div class="col-md-6">
                        <div class="form-group">
                            <b-input-group prepend="FROM">
                                <b-form-input v-model="baseColor" type="text" size="lg"></b-form-input>
                            </b-input-group>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <b-input-group prepend="TO">
                                <b-form-input v-model="variantColor" type="text" size="lg"></b-form-input>
                            </b-input-group>
                        </div>
                    </div>
                </form>
                <form class="row">
                    <div class="col">
                        <div class="form-group animated fadeInDown code" style="animation-delay: 0s;">
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