import numberToDisplayString from "../../utils/common"
Component({
  mixins: [], // các minxin sử dụng trong Component
  data: { x: 1 }, // data của component
  props: {     
    comment: {
    id: '',
    userName: 'Trường Nguyễn',
    userAvatar: '/assets/images/ava.png',
    content: 'Sách này cũng không hay lắm đâu',
    postedTime: '16:30 July 7, 2022',
    likes: 1251,
    } 
  }, // các thuộc tính

  // các hàm life cycles
  didMount() {
   
  },
  didUpdate() {
  },
  didUnmount() {},

  // các methods
  methods: {
    handleTap() {
     
    }
  },

});