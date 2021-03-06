import {
  parseQuery,
  goToPostDetail,
  navigate,
  openDeeplink,
  showCart,
  showSearch
} from '../../utils/navigate';
import { getPosts } from '../../services/index';
import { systemInfo } from '../../utils/system';
import { defaultSorts } from '../../utils/constant';
import { filters, formatFiltersToQuery } from '../../utils/filter';
import { group } from '../../utils/common';

Page({
  hasMore: false,
  actionButtons: 0,

  data: {
    showActions: false,
    showCategory: false,
    isLoadingPost: true,
    isLoadingMorePost: false,
    Posts: {
      data: [],
      paging: {
        current_page: 0,
        last_page: 0,
      },
    },

   
    isStickButtons: false,
    isScrollUp: false,
  },

  async loadData() {
    this.setData({
      isLoadingPost: true,
      isLoadingCategories: true,
    });

    try {
      const [Posts] = await Promise.all([
        getPosts(),
      ]);
      this.hasMore = Posts.paging.current_page < Posts.paging.last_page;

      this.setData({
        Posts,
        isLoadingPost: false,
        isLoadingCategories: false,
      });
    } catch {
      this.setData({
        isLoadingPost: false,
        isLoadingCategories: false,
      });
    }
  },

  async loadPosts() {
    this.setData({
      isLoadingPost: true,
    });
    try {
      const Posts = await getPosts({
        page: 1,
        limit: 10,
        sort: this.data.selectedSort.value,
        category: this.data.selectedCategory,
        filter: formatFiltersToQuery(this.data.selectedFilters),
      });
      this.hasMore = Posts.paging.current_page < Posts.paging.last_page;
      this.setData({
        Posts,
        isLoadingPost: false,
      });
    } catch {
      this.setData({
        isLoadingPost: false,
      });
    }
  },

  async loadMorePosts() {
    const { Posts, isLoadingPost, isLoadingMorePost } = this.data;

    if (!this.hasMore || isLoadingPost || isLoadingMorePost) return;

    this.setData({ isLoadingMorePost: true });

    const { data: currentPosts, paging: currentPaging } = Posts;

    try {
      const { data: nextPosts, paging } = await getPosts({
        page: currentPaging.current_page + 1,
        limit: 10,
        sort: this.data.selectedSort.value,
        category: this.data.selectedCategory,
        filter: formatFiltersToQuery(this.data.selectedFilters),
      });

      this.hasMore = paging.current_page < paging.last_page;

      this.setData({
        Posts: {
          data: [...currentPosts, ...nextPosts],
          paging,
        },
        isLoadingMorePost: false,
      });
    } catch {
      this.setData({ isLoadingMorePost: false });
    }
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
      title: 'News Feed',
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
