<template>
    <div class="bot-list-item container cursor-pointer border-4 rounded-2xl bg-white-50 border-black px-6 py-5">
        <div class="flex head mb-4">
            <div class="flex-none">
                <ListItemAvatar class="-ml-2" :name="name"/>
            </div>
            <div class="flex-1 w-64 self-center pl-3">
                <div class="bot-info font-rubik font-black pink-400 uppercase leading-5">
                    <div class="name text-3xl leading-7">Helga</div>
                    <div class="status green-400">COPYWRITER</div>
                    <div class="short-description">CLICKBAIT HEADLINES</div>
                </div>
            </div> 
        </div>
        <div class="flex">
            <div class="description text-black font-rubik font-normal leading-5">
                Creates headline options for your idea. Tweak text and give feedback for improved results.
            </div>
        </div>
    </div>
</template>

<script>
    import ListItemAvatar from './ListItemAvatar.vue'

    export default {
        props: ['name'],
        components: {
            ListItemAvatar
        }
    }
</script>