import {
  parseQuery,
  goToCommentDetail,
  navigate,
  openDeeplink,
  showCart,
  showSearch
} from '../../utils/navigate';
import { getComments } from '../../services/index';
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
    isLoadingComment: true,
    isLoadingMoreComment: false,
    Comments: {
      data: [],
      paging: {
        current_page: 0,
        last_page: 0,
      },
    },
    postId:"1",
   
    isStickButtons: false,
    isScrollUp: false,
  },

  async loadData() {
    this.setData({
      isLoadingComment: true,
      isLoadingCategories: true,
    });

    try {
      const [Comments] = await Promise.all([
        getComments(this.data.postId),
      ]);
      this.hasMore = Comments.paging.current_page < Comments.paging.last_page;

      this.setData({
        Comments,
        isLoadingComment: false,
        isLoadingCategories: false,
      });
    } catch (e) {
      console.log(e)
      this.setData({
        isLoadingComment: false,
        isLoadingCategories: false,
      });
    }
  },

  async loadComments() {
    this.setData({
      isLoadingComment: true,
    });
    try {
      const Comments = await getComments({
        page: 1,
        limit: 10,
        sort: this.data.selectedSort.value,
        category: this.data.selectedCategory,
        filter: formatFiltersToQuery(this.data.selectedFilters),
      });
      this.hasMore = Comments.paging.current_page < Comments.paging.last_page;
      this.setData({
        Comments,
        isLoadingComment: false,
      });
    } catch {
      this.setData({
        isLoadingComment: false,
      });
    }
  },

  async loadMoreComments() {
    const { Comments, isLoadingComment, isLoadingMoreComment } = this.data;

    if (!this.hasMore || isLoadingComment || isLoadingMoreComment) return;

    this.setData({ isLoadingMoreComment: true });

    const { data: currentComments, paging: currentPaging } = Comments;

    try {
      const { data: nextComments, paging } = await getComments({
        page: currentPaging.current_page + 1,
        limit: 10,
        sort: this.data.selectedSort.value,
        category: this.data.selectedCategory,
        filter: formatFiltersToQuery(this.data.selectedFilters),
      });

      this.hasMore = paging.current_page < paging.last_page;

      this.setData({
        Comments: {
          data: [...currentComments, ...nextComments],
          paging,
        },
        isLoadingMoreComment: false,
      });
    } catch {
      this.setData({ isLoadingMoreComment: false });
    }
  },

  onSelectFilter(selectedFilters) {
    this.setData({
      selectedFilters,
    });
    this.loadComments();
  },

  onSelectSort(selectedSort) {
    this.setData({
      selectedSort,
    });
    this.loadComments();
  },

  removeFilter(item) {
    const data = { ...this.data };

    if (item.key === 'priceRange') {
      data.selectedFilters[item.key] = {
        start: null,
        end: null,
      };

      this.setData(data);
      this.loadComments();

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
      this.loadComments();

      return;
    }

    data.selectedFilters[item.key] = null;

    this.setData(data);
    this.loadComments();
  },

  onTapComment(Comment) {
    goToCommentDetail({ Comment, page: 'Comment' });
  },

  goToCategoryDetail(category) {
    navigate({
      page: 'Comment',
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
      postId
    } = parseQuery(query);
    this.setData({postId})
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
      title: 'Comments',
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
      this.loadMoreComments();
  },

  onReady() {
    this.loadData();
    this.setData({
      filters,
    });

    my.createSelectorQuery()
      .select('.Comment-action-buttons')
      .boundingClientRect()
      .exec(([actionButtons]) => {
        this.actionButtons =
          actionButtons && actionButtons.top ? actionButtons.top : 0;
      });
  },
});
