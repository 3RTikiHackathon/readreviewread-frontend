import {
  parseQuery,
  goToPostDetail,
  navigate,
  openDeeplink,
  showCart,
  showSearch,
} from "../../utils/navigate";
import { getPosts, getMyReadDetail } from "../../services/index";
import { systemInfo } from "../../utils/system";
import { defaultSorts } from "../../utils/constant";
import { filters, formatFiltersToQuery } from "../../utils/filter";
import { group } from "../../utils/common";

Page({
  hasMore: false,
  actionButtons: 0,

  data: {
    isLoading: false,
    id : '1',
    bookDetail: {},
    isStickButtons: false,
    isScrollUp: false,
    show: false,
    showNote: false,
    pageInput: 0,
    pageNoteInput: "",
    noteInput: "",
    isConfirm: false,
    position: 'top',
    animation: true,
    mask: true,
    zIndex: 10,
    disableScroll: true,
    selected: [
      { key: 1, label: 'Currently' }
    ],
    items: [
      { key: 1, label: 'Currently' },
      { key: 2, label: 'Read' },
      { key: 3, label: 'Want' }
    ]
  },

  onSelect(selected) {
    this.setData({ selected });
  },

  async loadData() {

    this.setData({
      isLoading: true,
    });

    try {
      const bookDetail = getMyReadDetail(this.data.id.toString());
      
      this.setData({
        bookDetail,
        isLoading: false,
      });
    } catch (error) {
      console.log(error)
      this.setData({
        isLoading: false,
      });
    }
  },
  onCancelNote(){
    this.setData({showNote: false})
  },
  
  onConfirm(e){
    
    this.setData(
      {
        bookDetail: {
          ...this.data.bookDetail,
          percent: parseInt(this.data.pageInput/this.data.bookDetail.book.pages*100)
        }
      }
      
      )
    this.setData({show: false})
  },
  onOk() {
    this.setData({ show: true });
  },
  onNote(){
    this.setData({showNote: true})
  },
  onCancel() {
    this.setData({ show: false });
  },
  onTap(e) {
    this.setData({ ...e.target.dataset.popup });
  },
  onConfirmNote(){
    // this.setData({note: [...this.data.note, {page: this.data.pageNoteInput, note: this.data.noteInput}]})
    // console.log(this.data.note)
    this.setData(
      {bookDetail: {
        ...this.data.bookDetail, 
        notes: [
          ...this.data.bookDetail.notes, 
          {
            page: this.data.pageNoteInput, 
            note: this.data.noteInput
          }
        ]
      },
      showNote: false
    }
      )
  },
  onBuy(){
    navigate({
      page: 'book_detail',
      params: {
        bookId: this.data.bookDetail.bookId
      }
    });
  },
  onInputProgress(e){
    this.setData({pageInput: e.detail.value})
  },
  onInputPageNote(e){
    this.setData({pageNoteInput: e.detail.value})
  },
  onInputNote(e){
    this.setData({noteInput: e.detail.value})
  },
  onBlockScout(){
    navigate({
      page:'blockscout',
      params:''
    })
  },
  onSelectFilter(selectedFilters) {
    this.setData({
      selectedFilters,
    });
    this.loadPosts();
  },

  onSelectSort(selectedSort) {
    this.setData({
      selectedSort,
    });
    this.loadPosts();
  },

  removeFilter(item) {
    const data = { ...this.data };

    if (item.key === "priceRange") {
      data.selectedFilters[item.key] = {
        start: null,
        end: null,
      };

      this.setData(data);
      this.loadPosts();

      return;
    }

    const servicePos =
      data.selectedFilters.service &&
      data.selectedFilters.service.findIndex(
        (serv) => serv.query_name === item.key
      );

    if (typeof servicePos === "number" && servicePos !== -1) {
      data.selectedFilters.service[servicePos].checked = false;

      this.setData(data);
      this.loadPosts();

      return;
    }

    data.selectedFilters[item.key] = null;

    this.setData(data);
    this.loadPosts();
  },

  onTapPost(Post) {
    goToPostDetail({ Post, page: "Post" });
  },

  goToCategoryDetail(category) {
    navigate({
      page: "Post",
      params: {
        title: category.display_value,
        category: category.query_value,
        // sort: this.data.selectedSort.value,
        showCategory: false,
      },
    });
  },

  onCustomIconEvent() {
    openDeeplink("tikivn://cart");
  },

  // Life cycle
  onLoad(query) {
    const {
      id,
      sort,
      category,
      showCategory = true,
      showActions = true,
    } = parseQuery(query);
    this.setData({id})
  
    const data = { ...this.data };

    if (sort) {
      const sortObject = defaultSorts.find((item) => item.value === sort);
      if (sortObject) data.selectedSort = sortObject;
    }

    if (category) {
      data.selectedCategory = category;
    }

    this.setData({
      ...data,
      showCategory,
      showActions,
    });

    my.setNavigationBar({
      title: "Book detail",
    });

    showSearch();
  },

  onPageScroll(event) {
    const { isStickButtons, isScrollUp } = this.data;
    const { scrollHeight, scrollTop } = event;

    if (scrollTop >= this.actionButtons + 40 && !isStickButtons)
      this.setData({
        isStickButtons: true,
      });
    if (scrollTop < this.actionButtons + 40 && isStickButtons)
      this.setData({
        isStickButtons: false,
      });
    if (scrollTop < this.prevScrollTop && !isScrollUp)
      this.setData({
        isScrollUp: true,
      });
    if (scrollTop > this.prevScrollTop && isScrollUp)
      this.setData({
        isScrollUp: false,
      });

    this.prevScrollTop = scrollTop;

    if (systemInfo.windowHeight + scrollTop >= scrollHeight - 1000)
      this.loadMorePosts();
  },

  onReady() {
    this.loadData();
    this.setData({
      filters,
    });

    my.createSelectorQuery()
      .select(".Post-action-buttons")
      .boundingClientRect()
      .exec(([actionButtons]) => {
        this.actionButtons =
          actionButtons && actionButtons.top ? actionButtons.top : 0;
      });
  },
});
