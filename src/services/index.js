import request from './request';

export const getProductsAPI = async ({
  page = 1,
  limit = 10,
  sort,
  filter,
  search,
  ...rest
}) => {
  const res = await request({
    baseUrl: 'https://tiki.vn/api/v2',
    path: '/products',
    params: {
      aggregations: 2,
      page,
      limit,
      sort,
      q: search,
      ...filter,
      ...rest,
    },
  });

  return res;
};

export const getProductsSearchAPI = async ({
  sellerId = 0,
  limit = 6,
  keyword = '',
  sort = 'default',
  page = 1,
}) => {
  const res = await request({
    path: `merchant/products`,
    params: {
      aggregations: '1',
      seller_id: sellerId,
      q: keyword,
      sort,
      page,
      limit,
    },
  });
  const next_page =
    res.paging.current_page < res.paging.last_page
      ? res.paging.current_page + 1
      : null;

  return {
    data: res.data,
    next_page,
  };
};

export const getBannersAPI = async () => {
  const res = await request({
    baseUrl: 'https://tiki.vn/api/shopping/v2',
    path: '/banners',
    params: {
      group: 'home_banner_main_v2',
    },
  });

  return res.data;
};

export const getUserInfo = () => {
  let user = require('./mock/user.json');
  return user[0];
};

export const getNumOrders = () => {
  let numOrders = require('./mock/num-orders.json')
  return numOrders;
};

export const getMyPoint = () => {
  let myPoint = require('./mock/my-point.json')
  return myPoint;
};

export const getCouponsAPI = () => {
  let coupons = require('./mock/coupons.json')
  return coupons;
};

export const getPosts = () =>{
  let posts = require('./mock/post.json');
  let books = require('./mock/books.json');
  let users = require('./mock/user.json');
  posts.map(post => {
    books.map(book => {
      if (book.id == post.bookId){
        post.book = book;
      }
    })
    users.map(user => {
      if(user.id == user.bookId){
        post.user = user;
      }
    })
  })
  return {
    data : posts,
    paging: {
      current_page: 1,
      last_page: 1,
    }
  };
}
export const getMyRead = () =>{
  let books = require('./mock/books.json');
  return {
    data : books,
    paging: {
      current_page: 0,
      last_page: 0,
    }
  };
}
export const getComments = () =>{
  let comments = require('./mock/comment.json');
  return {
    data : comments,
    paging: {
      current_page: 1,
      last_page: 1,
    }
  };
}