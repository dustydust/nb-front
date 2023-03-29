<template>
    <div class="heading-line bg-gray-600 text-center text-2xl py-1 mb-8">
        Bots
    </div>

    <div class="bot-list mx-2 flex flex-col gap-2.5">
        <RouterLink to="/bots/helga">
            <ListItem name="helga"/>
        </RouterLink>
        <!-- <RouterLink to="/bots/helga">
            <ListItem name="fyodor"/>
        </RouterLink>
        <RouterLink to="/bots/helga">
            <ListItem name="bigears"/>
        </RouterLink> -->
    </div>
</template>

<script>
    import ListItem from '../bots/_common/ListItem.vue'

    export default {
        components: {
            ListItem
        }
    }
</script>