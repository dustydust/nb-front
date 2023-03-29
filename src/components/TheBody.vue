<template>
    <TheMenu :isOpen="isMenuOpen" :closeMenu="closeMenu"/>
    <header class="py-3">
        <div class="flex flex-row content-center items-center flex-nowrap container mx-auto px-10">
            <div class="basis-1/4"></div>
            <div class="basis-1/2 text-center">
                <RouterLink to="/"><MainLogo class="gray-600"/></RouterLink>
            </div>
            <div class="basis-1/4 items-center flex flex-row-reverse">
                <span class="inline-flex" @click="this.openMenu">
                    <BaseSvgIcon 
                        class="cursor-pointer"
                        name="bars"
                        fill="#000"
                        width="30"
                        height="30"
                    />
                </span>
            </div>
        </div>
    </header>
    <router-view></router-view>
</template>

<script>
    import MainLogo from './MainLogo.vue'
    import BaseSvgIcon from './BaseSvgIcon.vue'
    import TheMenu from './TheMenu.vue'
    import ListItem from '../bots/_common/ListItem.vue'

    export default {
        components: {
            MainLogo,
            BaseSvgIcon,
            TheMenu,
            ListItem
        },

        data() {
            return {
                isMenuOpen: false
            }
        },
        methods: {
            openMenu() { this.isMenuOpen = true },
            closeMenu() { this.isMenuOpen = false }
        },
    }
</script>