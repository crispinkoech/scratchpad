<template>
  <p class="p-2 mb-0">
    <a @click="start_timer" class="mr-2" v-if="!timerOn" href="javascript:void(0)" title="Start a new timer">
      <font-awesome-icon icon="play"/>
    </a>
    <a v-else @click="stop_timer" class="mr-2" href="javascript:void(0)">
      <font-awesome-icon icon="stop"/>
    </a>
    <span class="mr-2">{{ timer | toHumanDate }}</span>
    <span v-if="!timerOn & timer > 0">
      <input v-model="timerEntry" @keyup.enter="save_timer_entry" type="text" class="p-1 border-0 mr-2" placeholder="(Enter to save)">
      <a href="javascript:void(0)" @click="save_timer_entry" class="mr-2 text-success">Save</a>
      <a href="javascript:void(0)" @click="clear_timer_entry" class="mr-2 text-danger">Clear</a>
    </span>
  </p>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Timer',
  data(){
    return{
      timerOn: false,
      timer: 0,
      intervalFunctionId: null,
      timerEntry:''
    }
  },
  filters:{
    toHumanDate(d){
      var duration = moment.duration(d)
      var _h = duration.hours()
      var _m = duration.minutes()
      var _s = duration.seconds()
      return `${_h < 10 ? "0" + _h : _h}:${_m < 10 ? "0" + _m : _m}:${_s < 10 ? "0" + _s : _s}`
    }
  },
  methods:{
    start_timer(){
      this.timerOn = true
      var s = moment()
      var b = setInterval(()=>{
        this.timer = moment() - s
        document.title = this.$options.filters.toHumanDate(this.timer)
      },1000)
      this.intervalFunctionId = b.toString()
    },
    stop_timer(){
      this.timerOn = false
      clearInterval(this.intervalFunctionId)
      document.title = 'Scratchy'
    },
    save_timer_entry(){
      this.$store.dispatch('timer/add_timer', {
        id: Math.floor(Math.random() * 100000),
        note: this.timerEntry, 
        timer: this.$options.filters.toHumanDate(this.timer),
        created: moment()})
      this.clear_timer_entry()
    },
    clear_timer_entry(){
      this.timer = 0
      this.timerEntry = ''
      this.intervalFunctionId = null
    }
  }
}
</script>

<style>
.navbar-nav{
  flex-direction: unset!important;
}
</style> 