import {navigate} from '../../utils/navigate';
Component({
  data: {},
  props: {
    challenge: {
      id: '1',
      title: 'Bố già',
      bookCover: 'assets/images/book-cover-bo-gia.jpg',
      content: 'Express your feeling about Bố già by Mario Puzo.',
      startTime: '',
      finishTime: '',
      isJoined: true,
      isSubmitted: false,    
    }
  },

  didMount() {

  },

  didUnmount() {

  },

  didUpdate() {

  },

  methods: {
    onChallengeTap() {
      // navigate to challenge-detail page with param
    }
  }
})