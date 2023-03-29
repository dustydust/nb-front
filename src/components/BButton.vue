<template>
    <button
        class="outline-none font-montserrat text-xl font-extrabold text-center "
        :disabled="disabled"
        @click.prevent="action"
        :class="getOuterClasses"
    >
        <span 
            class="flex items-center content-center justify-center border-2 rounded-2xl" 
            :class="getInnerClasses"
        >
            <BaseSvgIcon
                v-if="iconPosition === 'left'"
                class=""
                :name="iconName"
                :fill="iconColor"
                width="22"
                height="22"
            />
            <span class="pr-2 pl-2">{{ text }}</span>
            <BaseSvgIcon
                v-if="iconPosition === 'right'"
                class=""
                :name="iconName"
                :fill="iconColor"
                width="22"
                height="22"
            />
        </span>
    </button>
</template>

<script>
    import BaseSvgIcon from './BaseSvgIcon.vue'

    export default {
        components: {
            BaseSvgIcon
        },

        data() {
            return {
                iconColor: '#fff',
                classes: []
            }
        },

        computed: {
            getOuterClasses() {
                if (this.size == 'medium') {
                    return [
                        'w-full',
                        'max-w-sm'
                    ]
                }
            },
            getInnerClasses() {
                let classes = []
                if (this.size == 'small') classes = ['py-1', 'px-3']
                if (this.size == 'medium') classes = ['py-4']

                if (this.disabled) {
                    this.iconColor = '#fff'
                    return [
                        ...classes,
                        'bg-gray-50',
                        'text-white',
                        'border-gray-50'
                    ]
                }

                if (this.color == 'white') {
                    this.iconColor = '#000'
                    return [
                        ...classes,
                        'bg-white',
                        'border-black'
                    ]
                }

                if (this.color == 'black') 
                    return [
                        ...classes,
                        'bg-black',
                        'text-white',
                        'border-black'
                    ]
            }
        },

        created() {
            if (this.color == 'white') {
                this.iconColor = '#000'
            }
        },

        props: {
            text: {
                default: "Button",
                type: String
            },
            outline: {
                default: false,
                type: Boolean
            },
            iconName: {
                default: "bars",
                type: String
            },
            iconPosition: {
                default: "",
                type: String
            },
            action: {
                default: () => false,
                type: Function
            },
            color: {
                default: "white",
                type: String
            },
            disabled: {
                default: false,
                type: Boolean
            },
            size: {
                default: "medium",
                type: String
            },
        }
    }
</script>