<template>
    <unicon
        :name="name"
        :fill="fill"
        :icon-style="iconStyle"
        :width="width"
        :height="height"
    ></unicon>
</template>
  
<script>
    export default {
        props: ['name', 'fill', 'iconStyle', 'width', 'height']
    }
</script>