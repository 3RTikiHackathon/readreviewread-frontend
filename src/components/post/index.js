import {navigate} from '../../utils/navigate';
Component({
  mixins: [], // các minxin sử dụng trong Component
  data: { x: 1 }, // data của component
  props: {     
    post: {
    id: '1',
    book:'',
    user:'',
    action: 'reviewed',
    image:'/assets/images/dark-nhan-tam.png',
    content: 'Cuốn sách này đã cho mình nhiều bài học trong cuộc sống. Đặc biệt cuốn sách này tạo động lực cho mình về các kế hoạch tương lai. Mình cảm ơn giả đã tạo ra một cuốn sách ý nghĩa này.',
    postedTime: '16:30 July 7, 2022',
    likes: 1251,
    comments: 1032,
    shares: 51,
    isLiked: false
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
    onCommentTap(){

      navigate({
        page: 'comments',
        params: {
          postId: this.props.post.id
        }
      });
    }
  },

});