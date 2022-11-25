<!-- eslint-disable vue/valid-template-root -->
<template>
  <div
    v-for="(item, index) in item.ep"
    :key="index"
    :class="
      !isdraggable
        ? 'episode episode' + index
        : 'episode draggable episode' + index
    "
  >
    <div class="line-1" style="display: flex; gap: 10px">
      <input
        v-show="isdraggable"
        :id="item.id"
        :checked="isCheckd"
        :value="item.id"
        type="checkbox"
        @change="setepid"
      />
      <div v-show="isdraggable">
        <i class="fas fa-grip-lines"></i>
      </div>
      <div>
        <span v-show="!isdraggable"> #{{ item.ep_no }}</span>
        {{ item.name }}
      </div>
    </div>
    <div class="p-con-detail">
      <div v-if="item.coin != 0.0" class="coin">
        <img :src="$path.image('coin-gold.png')" width="20px" />
        {{ item.coin }}
      </div>
      <div v-else class="coin"></div>
      {{ $filter.toThaiDateString(item.publisher_episode_data.date_time) }}
      น.
      <div class="grud-btn-manager">
        <router-link
          :to="'/writer/novelpreview/' + novelUuid + '/novelep/' + item.id"
          class="grud-btn-manager"
        >
          <img :src="$path.svg('edit.svg')" />
        </router-link>

        <div
          @click="deleteEP(item, { indexmoment, index })"
          class="grud-btn-manager"
        >
          <!-- $base.openalert('deleteEP', 'conDeleteEp');
                        epObj = item;
                        epIndex = index;
                        momentIndex = indexmoment; -->
          <img :src="$path.svg('delete.svg')" />
        </div>
      </div>
    </div>
  </div>
</template>



<style>
</style>