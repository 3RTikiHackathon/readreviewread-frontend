import {
  parseQuery,
  goToPostDetail,
  navigate,
  openDeeplink,
  showCart,
  showSearch
} from '../../utils/navigate';
import { getPosts, getBookDetail } from '../../services/index';
import { systemInfo } from '../../utils/system';
import { defaultSorts } from '../../utils/constant';
import { filters, formatFiltersToQuery } from '../../utils/filter';
import { group } from '../../utils/common';

Page({
  hasMore: false,
  actionButtons: 0,

  data: {
    isLoading: false,
    bookDetail: {},
    paperPrice: "105.000 đ",
    ePrice: "70.000 đ",
    isStickButtons: false,
    isScrollUp: false,
    show: false,
    position: 'top',
    animation: true,
    mask: true,
    zIndex: 10,
    disableScroll: true
  },

  async loadData() {
    this.setData({
      isLoading: true,
    });

    try {
      const [bookDetail] = await Promise.all([
        getBookDetail(),
      ]);

      this.setData({
        bookDetail,
        isLoading: false,
      });
    } catch (error) {
      this.setData({
        isLoading: false,
      });
    }
  },

  onOk() {
    this.setData({ show: false });
  },
  onCancel() {
    this.setData({ show: false });
  },
  onTap(e) {
    this.setData({ ...e.target.dataset.popup });
  },
  onBlockScout(){
    navigate({page:"blockscout"})
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

    if (item.key === 'priceRange') {
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
        (serv) => serv.query_name === item.key,
      );

    if (typeof servicePos === 'number' && servicePos !== -1) {
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
    goToPostDetail({ Post, page: 'Post' });
  },

  goToCategoryDetail(category) {
    navigate({
      page: 'Post',
      params: {
        title: category.display_value,
        category: category.query_value,
        // sort: this.data.selectedSort.value,
        showCategory: false,
      },
    });
  },

  onCustomIconEvent() {
    openDeeplink('tikivn://cart');
  },

  // Life cycle
  onLoad(query) {
    const {
      title,
      sort,
      category,
      showCategory = true,
      showActions = true,
    } = parseQuery(query);

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
      title: 'Blockscout',
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
      .select('.Post-action-buttons')
      .boundingClientRect()
      .exec(([actionButtons]) => {
        this.actionButtons =
          actionButtons && actionButtons.top ? actionButtons.top : 0;
      });
  },
});
