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

export const getBook = () =>  {
  let book = require('./mock/book_detail.json')
  return book;
}

export const getPostsProfile=()=>{
  let posts = require('./mock/post_profile.json');
  let books = require('./mock/books.json');
  let users = require('./mock/user.json');
  posts.map(post => {
    books.map(book => {
      if (book.id == post.bookId){
        post.book = book;
      }
    })
    users.map(user => {
      if(user.id == post.userId){
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
      if(user.id == post.userId){
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
export const getMyRead = (listName) =>{
  let myRead = require('./mock/my-read.json');
  let books = require('./mock/books.json');
  let booksToReturn = [];
  myRead.map(read => {
    if(read.list == listName){
      books.map(book => {
        if(read.bookId == book.id){
          read.book = book;
        }
      })
      booksToReturn.push(read)
    }
  })
  return {
    data : booksToReturn,
    paging: {
      current_page: 0,
      last_page: 0,
    }
  };
}

export const getMyReadDetail = (myReadId) =>{
  let myRead = require('./mock/my-read.json');
  let books = require('./mock/books.json');
  let readToReturn;
  myRead.map(read => {
    
    if(read.id == myReadId){
      books.map(book => {
        if(book.id == read.bookId){
          read.book = book;
          readToReturn = read;
        }
        
      })
    }
    
  })
    return readToReturn;
}

export const getComments = (postId) =>{
  let comments = require('./mock/comment.json');
  let users = require('./mock/user.json')
  let commentsToReturn =[];
  comments.map(comment => {
    if (comment.postId == postId){
      users.map(user => {
        if (comment.userId == user.id)
        {
          comment.userName = user.userName;
          comment.userAvatar = user.userAvatar;
        } 
      })
      commentsToReturn.push(comment);
    }
  })
  return {
    data : commentsToReturn,
    paging: {
      current_page: 1,
      last_page: 1,
    }
  };
}


export const getBookDetail = (bookId) => {
  let BookDetail = require('./mock/books.json');
  let bookToReturn;
  BookDetail.map(book => {
    if (book.id == bookId){
      bookToReturn = book;
    }
  })
  return bookToReturn;
}

export const getChallenges = () => {
  let challenges = require('./mock/challenges.json');
  return challenges;
}
