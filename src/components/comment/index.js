import numberToDisplayString from "../../utils/common"
Component({
  mixins: [], // các minxin sử dụng trong Component
  data: { x: 1 }, // data của component
  props: {     
    comment: {
    id: '',
    userName: 'Trường Nguyễn',
    userAvatar: '/assets/images/ava_truong.jpg',
    content: 'Cuốn sách này đã cho mình nhiều bài học trong cuộc sống. Đặc biệt cuốn sách này tạo động lực cho mình về các kế hoạch tương lai.',
    postedTime: '2h',
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