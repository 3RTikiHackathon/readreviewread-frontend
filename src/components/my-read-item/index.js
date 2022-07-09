import {navigate} from '../../utils/navigate';
Component({
  mixins: [], // các minxin sử dụng trong Component
  data: { x: 1 }, // data của component
  props: {     
    book: {
    id: '1',
    bookName: 'Đắc Nhân Tâm',
    bookCover: '/assets/images/dac-nhan-tam-biamem2019-76k-bia11.jpg',
    percent: 69,
    author: "Tim Marshall",
    reviews: 2,
    read: 1023,
    rate: 4.5,
    rateImage: "/assets/icons/rating - 4.5.png",
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
    onItemTap(){
      navigate({
        page: 'my-read-detail',
        params: {id: this.props.book.id}
      });
    }
  },

});