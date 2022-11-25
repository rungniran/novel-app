<template>
  <div class="Novel page">
    <!-- {{$store.state.Novel._NovelEp}} -->
    <!-- #region ______________________________________header novel______________________________________ -->

    <div class="nv-box-white" v-if="resGetNovel">
      <div class="box-nove">
        <div class="image-nv">
          <div class="image-box">
            <img
              :src="
                resGetNovel.image_data
                  ? resGetNovel.image_data.url
                  : $path.image('loading.png')
              "
              class="nv-img-novel img-novel"
              width="100%"
              @error="$event.target.src = $path.image('loading.png')"
            />
            <div class="bg-gradients"></div>
          </div>
        </div>
        <div class="detail">
          <div style="width: 100%">
            <div class="layout-pc-titleview">
              <div class="nv-title line-3">{{ resGetNovel.title }}</div>
              <div class="pc-view-star">
                <NovelStar :rating="Math.round(resGetNovel.avg_star)" />
              </div>
            </div>
            <div class="contain-starview">
              <router-link
                class="line-1"
                style="color: #e4803a; font-size: 17px"
                :to="'/profile/' + resGetNovel.user_id + '/writer'"
              >
                <span v-if="resGetNovel.user_penname !== ''">
                  {{ resGetNovel.user_penname }}
                </span>
                <span v-else>
                  {{ resGetNovel.penname_preview }}
                </span>
              </router-link>
              <div class="mobile-view-star">
                <NovelStar :rating="Math.round(resGetNovel.avg_star)" />
              </div>
            </div>
            <!-- {{tagss}} -->
            <div
              style="display: flex; gap: 5px; flex-wrap: wrap"
              class="nv-mt-10"
            >
              <div
                style="display: flex"
                v-for="(item, index) in tagss"
                :key="index"
                @click="tag(item)"
              >
                <div class="nv-tag" :id="'nv-tag' + index">#{{ item }}</div>
              </div>
            </div>
            <div
              class="story-sub line-5"
              style="margin-top: 15px; line-height: 1.6"
            >
              {{ resGetNovel.detail }}
            </div>
            <div
              class="nv-mt-10"
              style="display: flex; justify-content: center"
            >
              <div class="view-list-header nv-mt-20 mobile-view size-view">
                <div>
                  <div style="text-align: center">ยอดวิว</div>
                  <div class="view">
                    <i class="far fa-eye"></i>
                    <div class="count-numble-view" style="font-size: 20px">
                      {{ $filter.NumbertoText(resGetNovel.ep_total_view) }}
                    </div>
                  </div>
                </div>
                <div>
                  <div style="text-align: center">ตอน</div>
                  <div class="list">
                    <i class="fas fa-list"></i>
                    <div class="count-numble-view" style="font-size: 20px">
                      <span v-if="Eplistcount !== null">
                        {{ $filter.NumbertoText(Eplistcount) }}</span
                      >
                      <span v-else>
                        <img :src="$path.svg('loading.svg')" width="20px" />
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div style="text-align: center">คอมเมนต์</div>
                  <div class="list">
                    <i class="far fa-comment"></i>
                    <div class="count-numble-view" style="font-size: 20px">
                      <span v-if="datacomment">
                        {{ $filter.NumbertoText(datacomment.length) }}</span
                      >
                      <span v-else>
                        <img v-lazy="$path.svg('loading.svg')" width="20px" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="contain-btn-listview">
            <div class="grud-btn">
              <button
                @click="Next()"
                class="nv-btn-orange"
                :disabled="readNext() ? false : true"
              >
                <!--  -->
                อ่าน
              </button>

              <button
                :disabled="
                  resGetNovel.has_bookshelf_preview === true ||
                  isAddBookShelf === true
                "
                class="nv-btn-yellow"
                @click="
                  cleck ? addBookshelf(resGetNovel.id) : $base.openlogin()
                "
              >
                <span v-if="!resGetNovel.has_bookshelf_preview"
                  >ชั้นหนังสือ</span
                >
                <span v-else>มีชั้นหนังสือ</span>
              </button>

              <ShareNetwork
                network="facebook"
                :url="
                  'https://novel-app12.herokuapp.com/novel.php?id=' +
                  resGetNovel.id +
                  '&api=' +
                  cleckapi.callapi()
                "
                :title="resGetNovel.title"
                :description="resGetNovel.detail"
                :quote="resGetNovel.detail"
                :hashtags="resGetNovel.title + ',Novelkingdom'"
              >
                <button class="nv-btn-blue">
                  <!-- อ<i class="fa-solid fa-share"></i> -->
                  <i class="fas fa-share"></i>
                  <!-- <font-awesome-icon :icon="['fas','fa-sort']" /> -->
                </button>
              </ShareNetwork>
            </div>
            <div class="view-list-header pc-view size-view">
              <div>
                <div style="text-align: center">ยอดวิว</div>
                <div class="view">
                  <i class="far fa-eye"></i>
                  <div class="count-numble-view" style="font-size: 18px">
                    {{ $filter.NumbertoText(resGetNovel.ep_total_view) }}
                  </div>
                </div>
              </div>
              <div>
                <div style="text-align: center">ตอน</div>
                <div class="list">
                  <i class="fas fa-list"></i>
                  <div class="count-numble-view" style="font-size: 18px">
                    <span v-if="Eplistcount !== null">
                      {{ $filter.NumbertoText(Eplistcount) }}</span
                    >
                    <span v-else>
                      <img :src="$path.svg('loading.svg')" width="20px" />
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div style="text-align: center">คอมเมนต์</div>
                <div class="list">
                  <i class="far fa-comment"></i>
                  <div class="count-numble-view" style="font-size: 18px">
                    <span v-if="datacomment">
                      {{ $filter.NumbertoText(datacomment.length) }}</span
                    >
                    <span v-else>
                      <img v-lazy="$path.svg('loading.svg')" width="20px" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region ______________________________________description and review novel______________________ -->
    <div class="nv-box-white nv-mt-20" v-if="resGetNovel">
      <div style="position: relative" v-if="resGetNovel.description">
        <div class="nv-title">เรื่องย่อ</div>
        <div
          class="story"
          v-html="resGetNovel.description"
          style="margin-top: 10px; line-height: 2; height: 200px"
        ></div>

        <div class="ade"></div>
        <div class="center">
          <button class="more nv-btn-blue" @click="Element._more()">
            ดูเพิ่มเติม
          </button>
        </div>
      </div>
      <div class="nv-mt-90">
        <NovelReview
          :dataPreview="dataReview"
          @fetch="reviewFetch"
          ref="NovelReview"
        />
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region ______________________________________Sarabun novel_____________________________________ -->

    <div id="HeaderSarabun"></div>
    <div class="nv-box-white nv-mt-40 con-Sarabun" v-if="dataMomentEp">
      <div v-if="dataMomentEp.length === 0">ยังไม่มีตอนนิยาย</div>
      <div v-else>
        <div class="sarabun nv-col-2">
          <div class="nv-title">
            สารบัญ
            <span>
              <span v-if="Eplistcount !== null">
                ( {{ $filter.NumberToString(Eplistcount) }} )
              </span>
              <span v-else> รอสักครู่ </span>
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px">
            <button @click="_sort()" class="nv-btn-yellow">
              <!-- <i class="fa fa-sort-alpha-asc" aria-hidden="true"></i> -->
              <!-- <i class="fas fa-sort-alpha-up"></i> -->
              <i :class="sort=== 'asc' ?'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up'"></i>
            </button>
            <!-- <button @click="test()">เรียงชื่อตอน</button> -->
            <button
              v-if="resGetNovel.novel_promotion_datas.length !== 0"
              class="nv-btn-light-blue blink_me"
              @click="
                cleck
                  ? $refs.NovelBuySet.open({
                      item: EplistNext,
                    })
                  : $base.openlogin()
              "
            >
              ซื้อยกชุด
            </button>
            <button
              v-else
              class="nv-btn-light-blue"
              @click="
                cleck
                  ? $refs.NovelBuySet.open({
                      item: EplistNext,
                    })
                  : $base.openlogin()
              "
            >
              ซื้อยกชุด
            </button>
          </div>
        </div>
        <div id="sortMomentEp">
          <div v-for="(item, index) in dataMomentEp" :key="index">
            <div
              :class="'box-price_range box-price_range' + index"
              @click="openEp(item, index)"
            >
              <div>{{ item.moment }}</div>
              <div>
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
            <!-- {{item.ep}} -->
            <div :class="'container-ep container-ep' + index">
              <!-- <pre>{{item}}</pre> -->

              <div
                v-for="(itemep, index) in item.ep"
                :key="index"
                @click="
                  !isBuy
                    ? openmenuBuy(itemep, !Element.status_hide(itemep).status)
                    : null
                "
              >
                <div
                  :style="Element.status_hide(itemep).style"
                  :class="
                    readNext() === itemep.id
                      ? 'ep-activate mobile ep ep' + index
                      : 'mobile ep ep' + index
                  "
                >
                  <div class="con-h">
                    <div class="line-1">
                      #{{ itemep.ep_no }}
                      <span v-if="itemep.name.length > 30"
                        >{{ itemep.name.slice(0, 30) }}...
                        <font-awesome-icon
                          v-if="Element.status_hide(itemep).view"
                          icon="fa-regular fa-eye-slash"
                      /></span>
                      <span v-else
                        >{{ itemep.name }}
                        <font-awesome-icon
                          v-if="Element.status_hide(itemep).view"
                          icon="fa-regular fa-eye-slash"
                      /></span>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center">
                      <div
                        v-if="itemep.old_coin"
                        style="
                          display: flex;
                          justify-content: end;
                          align-items: center;
                          position: relative;
                        "
                      >
                        <span class="discount-coin"
                          ><img
                            :src="$path.image('coin-gold.png')"
                            width="20px"
                          />
                          {{ itemep.old_coin }}</span
                        >
                        <div class="linecut"></div>
                      </div>
                      <div v-else></div>
                      <div class="con-coin" v-if="itemep.coin !== '0.00'">
                        <div
                          :id="'coinbgm-m' + itemep.id"
                          :class="
                            itemep.bought === false ? 'coinbg' : 'coinbg-gray'
                          "
                        ></div>
                        <span
                          :id="'count-coin-m' + itemep.id"
                          :class="
                            itemep.bought === false
                              ? 'count-coin'
                              : 'count-coin-gray'
                          "
                          >{{ itemep.coin }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="con-h grey">
                    <div
                      style="
                        display: flex;
                        font-size: 12px;
                        align-items: center;

                        gap: 10px;
                        /* width: 75px; */
                        justify-content: space-between;
                      "
                    >
                      <div class="eye-icon-sarabun">
                        <i class="far fa-eye"></i>
                        <p>
                          {{ $filter.NumbertoText(itemep.count_view) }}
                        </p>
                      </div>
                      <div class="eye-icon-sarabun">
                        <i class="far fa-comment"></i>
                        {{ itemep.commend_datas_count }}
                      </div>
                      <div>
                        {{ itemep.count_character }}<small> อักษร</small>
                      </div>
                    </div>
                    <div class="date">
                      {{
                        $filter.toThaiDateString(
                          itemep.publisher_episode_data.date_time
                        )
                      }}
                      น.
                    </div>
                  </div>
                </div>
                <!-- {{sldsd( item.ep[index +1])}} -->
                <!-- <span v-if="item.ep[index +1]" > {{item.ep[index +1]['status_hide_ep']}} </span> -->
                <div
                  :style="Element.status_hide(itemep).style"
                  :class="
                    readNext() === itemep.id
                      ? 'ep-activate pc ep ep' + index
                      : 'pc ep ep' + index
                  "
                >
                  <!-- <span v-if="item.ep[index +1]" > 
                <div >
                </div>
                </span> -->
                  <div class="line-1 nameitemep">
                    <!-- <spanv-if="Element.status_hide(itemep).view"  style=" font-size: 14px;">#{{ itemep.ep_no }} {{ itemep.name }} <font-awesome-icon icon="fa-regular fa-eye-slash" /></span> -->
                    <span
                      >#{{ itemep.ep_no }} {{ itemep.name }}
                      <font-awesome-icon
                        v-if="Element.status_hide(itemep).view"
                        icon="fa-regular fa-eye-slash"
                    /></span>

                    <!-- <span  v-if="itemep.status_hide_ep">color: coral; <font-awesome-icon icon="fa-regular fa-eye-slash" /> </span> -->
                  </div>
                  <div
                    v-if="itemep.old_coin"
                    style="
                      display: flex;
                      justify-content: end;
                      align-items: center;
                      position: relative;
                    "
                  >
                    <span class="discount-coin"
                      ><img :src="$path.image('coin-gold.png')" width="20px" />
                      {{ itemep.old_coin }}</span
                    >
                    <div class="linecut"></div>
                  </div>
                  <div v-else></div>

                  <div class="con-coin" v-if="itemep.coin !== '0.00'">
                    <div class="con-coin">
                      <div
                        :id="'coinbg' + itemep.id"
                        :class="
                          itemep.bought === false ? 'coinbg' : 'coinbg-gray'
                        "
                      ></div>
                      <span
                        :id="'count-coin' + itemep.id"
                        :class="
                          itemep.bought === false
                            ? 'count-coin'
                            : 'count-coin-gray'
                        "
                        >{{ itemep.coin }}</span
                      >
                    </div>
                    <!-- <div class="con-coin" v-else> :src="itemep.bought === false ? $path.image('coin-gold.png') : $path.image('coin-gray.png')" 
                      <img :src="$path.image('coin-gray.png')" width="20px" />
                      <span class="count-coin" style="color: #cecece">{{
                        itemep.coin
                      }}</span>
                    </div> -->
                  </div>
                  <div class="con-coin" v-else>
                    <img width="20px" />
                    <span class="count-coin"></span>
                  </div>
                  <div class="date">
                    {{
                      $filter.toThaiDateString(
                        itemep.publisher_episode_data.date_time
                      )
                    }}
                    น.
                  </div>
                  <div class="eye-icon-sarabun">
                    <i class="far fa-eye"></i>
                    <p style="padding-left: 5px">
                      {{ $filter.NumbertoText(itemep.count_view) }}
                    </p>
                  </div>
                  <div>
                    <i class="far fa-comment"></i>
                    {{ itemep.commend_datas_count }}
                  </div>
                  <div class="count_character">
                    {{ itemep.count_character }}<small> อักษร</small>
                  </div>
                  <!-- </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="nv-box-white nv-mt-40 con-Sarabun"
      style="display: flex; justify-content: center; align-items: center"
      v-else
    >
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="40px"
        height="40px"
        viewBox="0 0 50 50"
        style="enable-background: new 0 0 50 50"
        xml:space="preserve"
      >
        <path
          fill="#000"
          d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      กำลังโหลดสารบัญ...
    </div>
    <!-- #endregion -->

    <!-- #region ______________________________________Writer data novel_________________________________ -->

    <div class="writer-info nv-box-white" v-if="resGetNovel">
      <div class="bg-writer-info line">
        <div class="nv-title">ข้อมูลนักเขียน</div>
        <div class="writer-sarabun">
          <div class="writer-profile">
            <div
              class="img-profile-box activat-m"
              @click="pagelink(resGetNovel.user_id)"
            >
              <figure>
                <!-- <img class="image-profile-user" :src="profile_writer" alt="" /> -->
                <div
                  class="image-profile-user"
                  :style="
                    'background: url(' +
                    profile_writer +
                    ') center center/cover;'
                  "
                ></div>
              </figure>
            </div>
            <div class="activat-m" @click="pagelink(resGetNovel.user_id)">
              <div class="line-1">
                <router-link
                  :to="'/profile/' + resGetNovel.user_id + '/writer'"
                >
                  <span v-if="resGetNovel.user_penname !== ''">
                    {{ resGetNovel.user_penname }}
                  </span>
                  <span v-else>
                    {{ resGetNovel.penname_preview }}
                  </span>
                </router-link>
              </div>
              <small>นักรบมังกร</small>
            </div>
            <div class="follow-btn">
              <div v-if="isfollow">
                <button
                  v-if="followStatus === true"
                  class="nv-btn-orange"
                  @click="follow()"
                >
                  ติดตาม
                </button>
                <button v-else class="nv-btn-orange" @click="unfollow()">
                  เลิกติดตาม
                </button>
              </div>
              <div v-else>กำลังโหลด...</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-writer-release line-mobile">
        <div class="nv-title">เผยแพร่</div>
        <div class="writer-sarabun">
          <div class="writer-release">
            <div>วันที่เผยแพร่: {{ resGetNovel.timestamp }} น.</div>
            <div>
              ตอนล่าสุด:
              {{ $filter.toThaiDateString(resGetNovel.timestamp_update) }} น.
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region ______________________________________DragonHouse novel_________________________________-->
    <div
      class="nv-box-white dash nv-mt-40"
      v-if="
        NovelID === '9755FCB8-78CB-42A0-85AC-272845D833C5' ||
        NovelID === '807A2FA2-D699-4B4E-B49F-F41508F5F051'
      "
    >
      <DragonHouse />
    </div>
    <!-- #endregion -->

    <!-- #region ______________________________________Comments novel____________________________________ -->
    <div class="nv-box-white nv-mt-40 NovelEditterComment bg-editor-comments">
      <div class="title-com">แสดงความคิดเห็น</div>
      <NovelEditterComment @click="ClickPost" @opanstikers="opanstikers" />
    </div>
    <div class="nv-box-white nv-mt-40 Comments" v-if="datacomment">
      <Comments
        ref="Comments"
        :DataComment="setcm"
        :novelCommentEffet="resGetNovel.status_comment_effect"
        @fetch="fetch"
        @opanstikers="opanstikers"
      />
      <div class="paginate" v-show="datacomment.length > pageMax">
        <NovelPaginate
          v-if="datacomment"
          :count="~~(datacomment.length / pageMax) + 1"
          @click="page"
        />
      </div>
    </div>
    <div
      v-else
      class="nv-box-white nv-mt-40 Comments"
      style="display: flex; justify-content: center; align-items: center"
    >
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="40px"
        height="40px"
        viewBox="0 0 50 50"
        style="enable-background: new 0 0 50 50"
        xml:space="preserve"
      >
        <path
          fill="#000"
          d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      กำลังโหลดความคิดเห็น...
    </div>
    <!-- #endregion -->

    <!-- #region ______________________________________Modal buy EP novel________________________________-->
    <NovelModal2
      ID="buyNovelEpAuto"
      IDCrad="buyNovelEpAutoCard"
      ref="buyNovelEpAuto"
      :Close="true"
    >
      <template v-slot:body>
        <div style="font-size: 23px">เปิดรายตอน</div>
        <div id="epName" class="line-1"></div>
        <img
          class="dagod"
          v-lazy="$path.image('removebg-preview.png')"
          width="50%"
        />
        <div class="buy-ep--coin">
          <span id="epCoin"></span>
          <img v-lazy="$path.image('coin-gold.png')" width="20%" />
        </div>
        <div style="display: flex; align-items: center; grid-gap: 10px">
          <input
            type="checkbox"
            :checked="cleckAuten"
            @change="switchsell"
            id="switch"
          />
          เลือกเพื่อซื้ออัตโนมัติ
        </div>
        <button class="buy" id="" @click="buy()">ซื้อนิยาย</button>
      </template>
    </NovelModal2>
    <!-- #endregion -->

    <!-- #region ______________________________________Modal Buy Set EP novel____________________________ -->
    <NovelBuySet
      v-if="this.$store.state.auth.dataset"
      ref="NovelBuySet"
      :lastEP="this.Eplistcount"
      @reface="refacecoin"
      @resetpage="getnNovel()"
      @addcoin="$refs.walletModal.open()"
    />
    <!-- #endregion -->

    <Sticker ref="Sticker" />
    <WalletMOdal v-if="$store.state.auth.token" ref="walletModal" />
    <NovelLoading ref="loading" />
  </div>
</template>
<script lang="ts">
//#region _________________________________________import_______________________________________________

import Vue from "vue";
import VueSocialSharing from "vue-social-sharing";
Vue.use(VueSocialSharing);
import { _cleckapi } from "@/shares/services/checkapi.service";
import { Gatway } from "@/shares/services";
import { alert } from "@/shares/modules/alert";
import { sms_alert_Add_BookShelf } from "@/shares/constants/smsalert";
import { setAutoBuy, getAutoBuy } from "@/shares/modules/autobuy";
import { sms_alert_BuyEpisode } from "@/shares/constants/smsalert";
import NovelPaginate from "@/components/widget/NovelPaginate.vue";
import profile_writer from "@/shares/modules/image";
import Sticker from "@/components/widget/Sticker.vue";
import "highlight.js/styles/tomorrow.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { _Novel, _NovelSetdata, _NovelElement } from "./Novel";
const logic = new _Novel();
const Setdata = new _NovelSetdata();
const cleckapi = new _cleckapi();
//#endregion

export default Vue.extend({
  name: "Novel",
  components: {
    NovelStar: () => import("@/components/widget/NovelStar.vue"),
    DragonHouse: () => import("./dragonhouse/DragonHouse.vue"),
    NovelModal2: () => import("@/components/widget/NovelModal2.vue"),
    Comments: () => import("@/components/Comments.vue"),
    NovelReview: () => import("./NovelReview/NovelReview.vue"),
    NovelEditterComment: () =>
      import("@/components/widget/NovelEditterComment.vue"),
    NovelBuySet: () => import("./NovelBuySet/NovelBuySet.vue"),
    Sticker,
    NovelPaginate,
  },
  data() {
    return {
      Element: new _NovelElement(),
      cleckapi: cleckapi,
      review: [...Array(6).keys()],
      price_range: [...Array(6).keys()],
      img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      current: "DragonHouse",
      resGetNovel: null as any,
      dataMomentEp: null as any,
      NovelID: this.$route?.params?.id as string,
      EpID: "",
      cleckAuten: getAutoBuy(this.$route?.params?.id as string),
      datacomment: null as any,
      dataReview: [],
      Eplistcount: null,
      EplistNext: null as any,
      metaTitle: "",
      tags: [] as any,
      followStatus: true,
      profile_writer: "",
      isfollow: true,
      pagesdata: [0, 15],
      pageMax: 15,
      isBuy: false,
      isAddBookShelf: false,
      tagss: "" as any,
      KeyComment: null as any,
      epsort: false,
      setcm: null as any,
      pageNovel: 1,
      sort: "asc",
    };
  },
  // metaInfo() {
  //   return {
  //     title: (this as any).metaTitle,
  //     meta: [
  //       {
  //         property: "og:title",
  //         content: "Epiloge - Build your network in your field of interest",
  //       },
  //     ],
  //   };
  // },

  methods: {
    async openEp(item: any, index: any) {
      if (item.ep.length == 0) {
        const url = (await this.$store.state.auth.token)
          ? "/novel/novel-data"
          : "/guest/novel/novel-data";

        const res = await this.$store.getters._GetNovelEp(
          url,
          this.$route.params.id,
          index + 1,
          this.sort
        );
        this.dataMomentEp[index].ep = res.data;
        this.Element._openEp(index);
      } else {
        this.Element._openEp(index);
      }
    },

    page(page: number) {
      this.pagesdata[1] = page * this.pageMax;
      this.pagesdata[0] = this.pagesdata[1] - this.pageMax;
      this.setcm = this.datacomment.slice(this.pagesdata[0], this.pagesdata[1]);
    },
    pagelink(id: string) {
      this.$router.push("/profile/" + id + "/writer");
    },

    fetchLike(uuid: string) {
      const index = logic._findIndex(this.datacomment, uuid);
      this.datacomment[index].click_like + 1;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async refacecoin(item: any[]) {
      this.getEp(1);
      // item.forEach(async (element) => {
      //   const index = logic._findIndex(this.EplistNext, element.id);
      //   const idex = logic._findIndex(
      //     this.dataMomentEp[~~(index / 50)].ep,
      //     element.id
      //   );
      //   this.dataMomentEp[~~(index / 50)].ep[idex].bought = true;
      //   console.log(this.dataMomentEp[~~(index / 50)].ep[idex]);
      // });
      // await this.getNovelEP(true);
    },

    async opanstikers() {
      await (this as any).$refs.Sticker.openmodel();
    },
    async follow() {
      if (this.$store.state.auth.token) {
        this.isfollow = false;
        let res = await Gatway.postService("/customers/follow-datas", {
          follow_user_id: this.resGetNovel.user_id,
        } as any);

        if (res.data.code === 200) {
          alert("ติดตาม", "success");
          this.cleckfollow();
        } else {
          console.log();
        }
      } else {
        (this as any).$login.openlogin();
      }
    },

    async unfollow() {
      this.isfollow = false;
      let follow1 = await Gatway.getService("/customers/follow-datas");
      let data = follow1.data.data.filter((item: any) => {
        return item.follow_user.id === this.resGetNovel.user_id;
      });
      await Gatway.DelService("/customers/follow-datas/" + data[0].id);
      this.cleckfollow();
    },

    async Next() {
      this.$router.push("/read/" + this.readNext());
      // const uuidnext = this.readNext();
      // const index = logic._findIndex(this.EplistNext, uuidnext);
      // this.openmenuBuy(await this.EplistNext[index]);
    },

    async getnNovel() {
      const res = await this.$store.getters._GetNovelHeader(
        this.$route.params.id
      );
      this.resGetNovel = await res;
      this.$store.state.auth.token ? await this.cleckfollow() : null;
      this.profile_writer = this.resGetNovel?.user_profile_data_id
        ? await profile_writer(this.resGetNovel?.user_profile_data_id, 0)
        : "";
      this.tagss = logic._Tags(res);
      await this.getNovelEP();
      this.metaTitle = res.title;
    },
    resetsarabun() {
      this.getNovelEP();
    },

    async getNovelEP(reset = false) {
      await this.getEp(this.pageNovel);

      // const ressort = await logic._sort(res.novel_episode_datas, "ep_no");
      // this.Eplistcount = await res.novel_episode_datas.length;
      // this.EplistNext = await ressort;
      // this.dataMomentEp = (await logic._momentEp(ressort)) as any;
      // reset === false
      //   ? setTimeout(async () => this.Element._openEp(0, 1), 100)
      //   : null;
    },

    async getEp(page?: number | undefined, sort = 'asc') {
      // this.dataMomentEp = [];
      const url = this.$store.state.auth.token
        ? "/novel/novel-data"
        : "/guest/novel/novel-data";

      const res = await this.$store.getters._GetNovelEp(
        url,
        this.$route.params.id,
        page, 
        sort
      );
      this.dataMomentEp = await [];
      if (res.data.length !== 0) {
        if (this.pageNovel === 1) {
          
          setTimeout(async () => this.Element._openEp(0, 1), 100);
          this.Eplistcount = await res.total;
          if (this.sort === "asc") {
            let ep = 0;
            let eplast = 50;
            const eplastStas = 50;
            const count = res.total / eplast;
            const momentCount = count + 0.0;
            for (let i = 0; i < ~~momentCount + 1; i++) {
              this.dataMomentEp.push({
                moment: `บทที่ ${ep + 1} - ${eplast}`,
                ep: [],
              });
              ep = +eplast;
              eplast = eplast + eplastStas;
            }
          } else {
            let ep = res.total;
            let eplast = res.total - 50;
            const eplastStas = 50;
            const count = res.total / eplastStas;
            const momentCount = count + 0.0;
            for (let i = 0; i < ~~momentCount + 1; i++) {
              this.dataMomentEp.push({
                moment: `บทที่ ${ep} - ${ eplast < 1 ? 1 : eplast + 1}`,
                ep: [],
              });
              ep = ep - 50;
              eplast = eplast - 50;
            }
          }

          // for (let i = 0; i < ~~momentCount + 1; i++) {
          //   this.dataMomentEp.push({
          //     moment: `บทที่ ${ep+1} - ${eplast}`,
          //     ep: [],
          //   });
          //   ep = +eplast;
          //   eplast = eplast + eplastStas;
          // }
        }
        this.dataMomentEp[this.pageNovel - 1].ep = res.data;
        // this.pageNovel += 1;
        // setTimeout(async () => {
        //   await this.getEp(true, this.pageNovel);
        // }, 2100);
      }
    },

    async openmenuBuy(item: any, status_hide_ep = true): Promise<void> {
      if (status_hide_ep) {
        if (
          item.coin === "0.00" ||
          this.resGetNovel.user_id === (this as any).profile?.id
        ) {
          this.$router.push(`/read/${item.id}`);
        } else {
          (this as any).profile
            ? this.bought(item)
            : (this as any).$base.openlogin();
        }
      } else {
        alert("เนื้อหา " + item.name + " ถูกซ่อนอยู่", "wraning");
      }
    },

    async bought(item: any) {
      if (item.bought === true) {
        this.$router.push(`/read/${item.id}`);
      } else {
        if (this.cleckAuten === true) {
          (this.EpID = await item.id), this.buy();
        } else {
          const epName = document.getElementById("epName") as HTMLElement;
          const epCoin = document.getElementById("epCoin") as HTMLElement;
          epName.innerHTML = item.name;
          epCoin.innerHTML = item.coin;
          this.EpID = item.id;
          (this as any).$refs.buyNovelEpAuto.open();
        }
      }
    },

    readNext() {
      const item = this.$store.getters._story_Read;
      return logic._readNext(item, this.$route.params.id);
    },

    async buy() {
      (this as any).$refs.buyNovelEpAuto.close();
      this.isBuy = true;
      let res = await Gatway.postService("/reader/novel-episode/read", {
        novel_episode_datas: [this.EpID],
        payment_confirmation: true,
      } as any);
      if (res.data.code !== 402) {
        this.$store.commit("reset");
        this.refacecoin([res.data.data.current.id]);
        alert(
          sms_alert_BuyEpisode(
            this.resGetNovel.title,
            res.data.data.current.coin
          ),
          "success"
        );
        this.$router.push(`/read/${this.EpID}`);
        // this.isBuy = false
      } else {
        (this as any).$refs.walletModal.open();
        alert("เหรียญของคุณมีไม่เพียงพอ", "error");
      }
      this.isBuy = false;
    },

    switchsell() {
      this.cleckAuten = setAutoBuy(this.$route.params.id);
    },

    async addBookshelf(uuid: string) {
      this.isAddBookShelf = true;
      await Gatway.getIDService("/customers/novel/add-bookshelf", uuid);
      this.getnNovel();
      alert(sms_alert_Add_BookShelf(this.resGetNovel.title), "success");
    },

    async _sort() {
      this.dataMomentEp =null
      if (this.sort === "desc") {
        this.sort = "asc";
        this.getEp(1, this.sort)
      } else {
        this.sort = "desc";
        this.getEp(1, this.sort)
      }
    },

    async fetch() {
      await this.getCommentAll(false);
    },

    reviewFetch() {
      (this as any).$refs.NovelReview.getReviewAll();
    },

    async ClickPost(html: any) {
      var id = document.getElementById(0 + "box-review") as HTMLElement;
      if (this.datacomment.length !== 0) {
        this.setcm.unshift(
          Setdata._setModelComment(html, this.$store.state.auth.display_name)
        );
        id.style.opacity = "0.3";
      }
      let data = {
        action: "create-novel-comment",
        html: html,
        star: "0",
        novel_data_id: this.$route.params.id,
      };
      let res = await Gatway.postService(
        "/customers/comments/post",
        data as any
      );
      if (res.data.code === 200) {
        await this.getCommentAll(false);
        if (this.datacomment.length !== 0) {
          id.style.opacity = "1";
        }
      }
    },

    async getCommentAll(scroll = true) {
      // this.getnNovel()

      const data = {
        action: "fetch-comment-all",
        novel_data_id: this.$route.params.id,
      };
      this.datacomment = await Setdata._setCommentAll(data, "comment-all");
      this.page(1);
      if (scroll && this.$route.query.ref) {
        const index = logic._findIndex(this.datacomment, this.$route.query.ref);
        this.datacomment[index].active = true;
        console.log(this.datacomment[index]);
        const page = index / this.pageMax;
        setTimeout(async () => {
          await this.page(~~page + 1);
          const doc = document.getElementById(
            this.datacomment[index].id + "comment-main"
          ) as HTMLElement;
          // doc.classList.add("activate-com")
          window.scrollTo({ top: doc.offsetTop - 85, behavior: "smooth" });
        }, 1000);
      }

      // console.log(this.$route.query.ref);
    },
    async filterSarabun() {
      if (this.$route.query.type == "novel_episode_datas") {
        setTimeout(async () => {
          const doc = document.getElementById("HeaderSarabun") as HTMLElement;
          // doc.classList.add("activate-com")
          window.scrollTo({ top: doc.offsetTop - 20, behavior: "smooth" });
        }, 1000);
      }
    },

    async getReviewAll() {
      const data = {
        action: "fetch-preview",
        novel_data_id: this.$route.params.id,
      } as any;
      this.dataReview = await Setdata._setCommentAll(data, "comment-preview");
    },

    tag(key: string) {
      this.$router.push("/search?key=" + key);
    },

    async cleckfollow() {
      const res = await Setdata._cleckfollow(this.resGetNovel.user_id);
      if (this.$store.state.auth.token) {
        this.isfollow = true;
        this.followStatus = res.data.data.followStatus;
      }
    },
  },

  async mounted() {
    this.filterSarabun();
    this.getnNovel();

    this.getReviewAll();
    this.getCommentAll();
    await this.$store.getters._GetNovelEpSet(this.NovelID);
  },
});

// notifyMe() {
//   if (!("Notification" in window)) {
//     window.alert("This browser does not support desktop notification");
//   } else if (Notification.permission === "granted") {
//     let notification = new Notification("Hi there!");
//   } else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then(function (permission) {
//       if (permission === "granted") {
//         let notification = new Notification("Hi there!");
//       }
//     });
//   }
// },
</script>
<style lang="scss" scoped src="./Novel.scss"></style>
