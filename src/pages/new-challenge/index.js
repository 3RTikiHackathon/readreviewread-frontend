import { getChallenges } from '../../services/index';
import { navigate } from '../../utils/navigate';

Page({
  data: {
    isLoading: false,
    isLoadingChallenge: false,
    Challanges: {
      data: [
        {
          id: 1,
          title: 'Bố già',
          bookCover: '/assets/images/book-cover-bo-gia.jpg',
          content: 'Express your feeling about Bố già.',
          startTime: '',
          finishTime: '',
          isJoined: true,
          isSubmitted: false,
          timeRemaining: '12 hours'
        },
        {
          id: 2,
          title: 'Sapiens',
          bookCover: '/assets/images/book-cover-sapiens.jpg',
          content: 'Express your feeling about Sapiens.',
          startTime: '',
          finishTime: '',
          isJoined: true,
          isSubmitted: false,
          timeRemaining: '2 days'
        },
        {
          id: 3,
          title: 'Sách Nhã Nam',
          bookCover: '/assets/images/book-cover-tuoi-tre.jpg',
          content: 'Take a photo with books by Nhã Nam.',
          startTime: '',
          finishTime: '',
          isJoined: true,
          isSubmitted: false,
          timeRemaining: '5 days'
        }
      ],
    },
    activeTab1: 0,
    tabs1: [
      { title: "06/2022" },
      { title: "07/2022" }
    ],
    leaderboard: {
      data: [
        {
          time: "06/2022",
          top: [
            {
              topId: 1,
              userId: 1,
              displayName: "Hoàng",
              avaPath: "/assets/images/sample-avatar-1.jpg",
              point: 100
            },
            {
              topId: 2,
              userId: 2,
              displayName: "Khang",
              avaPath: "/assets/images/sample-avatar-2.jpg",
              point: 90
            },
            {
              topId: 3,
              userId: 3,
              displayName: "Trường",
              avaPath: "/assets/images/sample-avatar-3.jpg",
              point: 80
            }
          ]
        },
        {
          time: "07/2022",
          top: [
            {
              topId: 1,
              userId: 2,
              displayName: "Khang",
              avaPath: "/assets/images/sample-avatar-2.jpg",
              point: 80
            },
            {
              topId: 2,
              userId: 3,
              displayName: "Trường",
              avaPath: "/assets/images/sample-avatar-3.jpg",
              point: 50
            },
            {
              topId: 3,
              userId: 1,
              displayName: "Hoàng",
              avaPath: "/assets/images/sample-avatar-1.jpg",
              point: 40
            }
          ]
        }
      ]
    }
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });

    try {
      // const [Challenges] = await Promise.all([
        // getChallenges()
      // ]);
      this.setData({
        // Challenges,
        isLoading: false,
      })
    } catch (error) {
      this.setData({
        isLoading: false,
      });
    }
  },


  // Life cycle
  onReady() {
    this.loadData();
  },

  onTabClick({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  onChange({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
});