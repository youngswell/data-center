<template>
    <div class="map">
        <el-button type="primary" @click="openMap">选择坐标</el-button>
        <el-dialog
                :visible.sync="visible"
                :fullscreen="true"
                :show-close="false"
                :before-close="beforeCloseMap"
                custom-class="map">
            <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
            <el-amap vid="amap"
                     :zoom="11"
                     :plugin="plugin"
                     :events="events"
                     :amap-manager="amapManager"
                     :mapStyle="mapStyle">
                <el-amap-marker v-for="(marker, key) in markers"
                                :position="marker"
                                :key="key"></el-amap-marker>
            </el-amap>
            <div class="btn-container" style="position: fixed;top: 15px;right: 20px;">
                <el-button type="success" @click="beforeCloseMap" v-if="lng && lat && address">选好了</el-button>
                <el-button type="success" v-else disabled>点击地图，添加标记点</el-button>
                <el-button type="danger" @click="closeMap">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { Button, Dialog, Message } from "element-ui"
    import { AMapManager } from 'vue-amap';
    const amapManager = new AMapManager();
    export default {
        name: "amap",
        components: {
            "el-button": Button,
            "el-dialog": Dialog,
        },
        data() {
            const _this = this;
            return {
                amapManager: amapManager,
                map: null,
                visible: false,
                model: "",
                center: [0, 0],
                zoom: 13,
                markers: [],
                address: "",
                lng: "",
                lat: "",
                searchOption: {
                    city: '全国',
                    citylimit: true
                },
                mapStyle: "normal",
                plugin: [
                    'Autocomplete',
                    'PlaceSearch',
                    'Scale',
                    'Marker',
                    'OverView',
                    'ToolBar',
                    'PolyEditor',
                    'AMap.CircleEditor'
                ],
                events: {
                    init: (o) => {
                        // console.log(o);
                        _this.map = o;
                    },
                    click(e) {
                        const AMap = window.AMap;
                        const { lng, lat } = e.lnglat;
                        console.log(lng, lat);
                        _this.$set(_this, "markers", [[lng, lat]]);
                        const geocoder = new AMap.Geocoder({
                            radius: 1000,
                            extensions: "all"
                        });
                        geocoder.getAddress([lng, lat], function(status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                if (result && result.regeocode) {
                                    // console.log(result.regeocode.formattedAddress);
                                    _this.lng = lng;
                                    _this.lat = lat;
                                    _this.address = result.regeocode.formattedAddress;
                                    _this.$nextTick();
                                }
                            }
                        });
                        // if (_this.mapDialog.markers.length < 1) {
                        // }
                    }
                }
            }
        },
        methods: {
            openMap(model) {
                this.visible = true;
                this.model = model;
            },
            beforeCloseMap() {
                if (this.lng && this.lat && this.address) {
                    this.closeMap();
                } else {
                    Message({
                        type: 'error',
                        message: '没有选地址!'
                    });
                }
                console.log("before close", this.model);
            },
            closeMap() {
                this.visible = false;
                this.markers = [];
                this.model = '';
                this.lng = '';
                this.lat = '';
                this.address = '';
            },
            onSearchResult(pois) {
                let latSum = 0;
                let lngSum = 0;
                const arr = [];
                if (pois.length > 0) {
                    pois.forEach(poi => {
                        const { lng, lat } = poi;
                        lngSum += lng;
                        latSum += lat;
                        arr.push([poi.lng, poi.lat]);
                        // console.log(poi);
                    });
                    this.markers = arr;
                    const center = {
                        lng: lngSum / pois.length,
                        lat: latSum / pois.length
                    };
                    this.center = [center.lng, center.lat];
                    this.map.setCenter([center.lng, center.lat]);
                    pois.sort((a, b) => {
                        return (Math.abs(a.lat) + Math.abs(a.lng)) - (Math.abs(b.lat) + Math.abs(b.lng));
                    });
                    const zoom = {
                        width: pois[pois.length - 1].lng - pois[0].lng,
                        height: pois[pois.length - 1].lat - pois[0].lat
                    };
                    console.log("onSearchResult");
                    setTimeout(() => {
                        this.map.setZoom(20 * (Math.ceil(zoom.height / 90)) - 7);
                    }, 300);
                }
            },
            clickMarker(e) {
                const { lng, lat } = e.lnglat;
                this.$set(this, "markers", [this.markers.length === 1 ? this.markers[0] : [lng, lat]]);
                console.log([this.markers.length === 1 ? this.markers[0] : [lng, lat]]);
                this.$nextTick(() => {
                    this.beforeCloseMap();
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/style/theme.scss";
    .map{

    }
</style>