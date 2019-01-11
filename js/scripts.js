class colorCode{constructor(...args){return this.set(...args)}set(red,green,blue,alpha){return this.red=void 0!==red?red:0,this.green=void 0!==green?green:0,this.blue=void 0!==blue?blue:0,this.alpha=void 0!==alpha?alpha:void 0,this}hex(hex){return void 0!==hex?this.parseHex(hex):this.getHex()}rgb(rgb){return void 0!==rgb?this.parseRgb(rgb):this.getRgb()}parseHex(hex){if(6==(hex=hex.replace("#","")).length||8==hex.length){var channels=this.splitString(hex,2);this.red=this.hexToNumber(channels[0]),this.green=this.hexToNumber(channels[1]),this.blue=this.hexToNumber(channels[2]),this.alpha=void 0!==channels[3]?this.hexToOpacity(channels[3]):void 0}else{if(3!=hex.length&&4!=hex.length)throw"Invalid HEX string provided to parseHex()! Provided: "+hex;var channels=this.splitString(hex,1);this.red=this.hexToNumber(channels[0]+channels[0]),this.green=this.hexToNumber(channels[1]+channels[1]),this.blue=this.hexToNumber(channels[2]+channels[2]),this.alpha=void 0!==channels[3]?this.hexToOpacity(channels[3]):void 0}return this}parseRgb(rgb){rgb.indexOf("(")>-1&&(rgb=rgb.substring(rgb.lastIndexOf("(")+1,rgb.lastIndexOf(")")));var channels=(rgb=rgb.replace(/\s+/g,"")).split(",");if(3!=channels.length&&4!=channels.length)throw"Invalid RGB string provided to parseRgb()";return this.red=parseInt(channels[0]),this.green=parseInt(channels[1]),this.blue=parseInt(channels[2]),channels[3]=parseFloat(channels[3]),isNaN(channels[3])?this.alpha=void 0:this.alpha=this.round(channels[3],2),this}getHex(){var output="",colorChannels=[this.red,this.green,this.blue],dedupeFlag=!0;return colorChannels.forEach(value=>{output+=this.numberToHex(value),this.isDoubleChar(this.numberToHex(value))||(dedupeFlag=!1)}),void 0!==this.alpha&&(dedupeFlag=!1,output+=this.decToHexAlpha(this.alpha)),dedupeFlag&&(output=this.dedupe(output)),output="#"+output}getRgb(){var output=void 0!==this.alpha?"rgba(":"rgb(";return output+=[this.red,this.green,this.blue].join(","),output+=void 0!==this.alpha?","+this.alpha+")":")"}numberToHex(number){var hex=number.toString(16);return 1==hex.length?"0"+hex:hex}decToHexAlpha(decimal){return this.numberToHex(this.round(100*decimal*2.55,0))}testHexAlpha(){for(var i=100;i>0;i-=1)console.log(i+"% - "+this.decToHexAlpha(i/100))}hexToOpacity(hex){var scale=Math.pow(16,hex.length)-1;return this.round(this.hexToNumber(hex)/scale,2)}hexToNumber(hex){return parseInt(hex,16)}round(value,precision){return Number(Math.round(value+"e"+precision)+"e-"+precision)}splitString(string,size){return string.match(new RegExp(".{1,"+size+"}","g"))}isDoubleChar(string){return string[0]==string[1]}dedupe(string){for(var chars=string.split(""),i=1;i<chars.length;i+=2)chars[i]="";return chars.join("")}}
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