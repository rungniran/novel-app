<template>
    <div class="banner">
        <carousel
            class="banner-box"
            :items="1"
            :loop="true"
            :margin="5"
            :center="true"
            :autoplay="false"
            :nav="false"
            :dots="false"
            :responsive="responsive"
        >
            <div v-for="(items, index) in item" :key="index">
                <img
                    src="https://novelkingdom.co/banner/banner_pc_202202034194803.jpg"
                    alt
                />
            </div>
        </carousel>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import carousel from "vue-owl-carousel";

export default Vue.extend({
    name: "NovelBaner",
    props: {
        item: [] as [],
    },
    components: {
        carousel,
    },
    data() {
        return {
            responsive: {
                415: {
                    items: 1,
                },
                768: {
                    items: 1.29,
                },
                1024: {
                    items: 2.4,
                },
            },
        };
    },
});
</script>
<style>
.banner {
    margin-top: 20px;
}

.banner-box .owl-item {
    opacity: 0.5;
    transition: 0.4s ease all !important;
    transform: scale(0.95) !important;
}
.banner-box .center {
    opacity: 1 !important;
    transform: scale(1.0) !important;
}
.banner-box .owl-carousel .owl-item img {
    border-radius: 10px;
}

@media (max-width: 768px) {
}

@media (max-width: 415px) {
    .banner-box .owl-carousel .owl-item img {
        border-radius: 0px;
    }
    .banner {
           margin-top: 36px;
    }
}
</style>
