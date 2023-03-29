<template>
    <Transition
        enter-active-class="transition ease-in-out duration-200 transform"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition ease-in-out duration-200 transform"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
    >
        <aside 
            v-show="isOpen"
            class="fixed max-w-sm w-full max-h-screen min-h-screen overflow-auto bg-gray-700 right-0 z-40 py-3"
        >
            <section class="flex flex-row content-center items-center flex-nowrap container mx-auto px-10">
                <div class="basis-1/4"></div>
                <div class="basis-1/2 text-center">
                    <MainLogo class="gray-100"/>
                </div>
                <div class="basis-1/4 items-center flex flex-row-reverse">
                    <BaseSvgIcon @click="closeMenu" class="cursor-pointer" name="times" fill="#BDBDBD" width="30" height="30"/>
                </div>
            </section>
            <section class="menu-list flex flex-column px-10 mt-20">
                <ul>
                    <li class="font-black text-4xl mb-14"><RouterLink @click="closeMenu()" to="/">Bots</RouterLink></li>
                    <li class="font-black text-4xl mb-14"><RouterLink @click="closeMenu()" to="/feedback">Feedback</RouterLink></li>
                    <li class="font-black text-4xl "><RouterLink @click="closeMenu()" to="/about">About</RouterLink></li>
                </ul>
            </section>
            
        </aside>
    </Transition>
    
    <Transition
        enter-active-class="transition-opacity ease-linear duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div 
            v-show="isOpen" 
            class="fixed inset-0 bg-black bg-opacity-50 z-30"
            @click="closeMenu()"
        >
        </div>
    </Transition>

</template>

<script>
    import MainLogo from './MainLogo.vue'
    import BaseSvgIcon from './BaseSvgIcon.vue'

    export default {
        props: ['isOpen', 'closeMenu'],

        components: {
            MainLogo,
            BaseSvgIcon
        },

        data() {
            return {}
        }
    }
</script>