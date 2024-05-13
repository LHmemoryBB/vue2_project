import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue';
import login from '../views/login.vue';
import forgot from '../views/forgot.vue';
Vue.use(VueRouter)

const routes = [
    // 主页
    {
        path: '/',
        name: 'index',
        component: index,
        meta: {
            index: 0,
            title: '首页'
        }
    },

    // 登录
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            index: 0,
            title: '登录'
        }
    },

    
    // 忘记密码
    {
        path: '/forgot',
        name: "forgot",
        component: forgot,
        meta: {
            index: 0,
            title: '忘记密码'
        }
    },

    // 修改密码
    {
        path: '/user/password',
        name: "password",
        component: () => import("../views/user/password.vue"),
        meta: {
            index: 0,
            title: '修改密码'
        }
    },

    // 视频播放页
    {
        path: "/media/video",
        name: "video",
        component: () => import('../views/media/video.vue'),
        meta: {
            index: 0,
            title: "视频"
        }
    },

    // 音频播放页
    {
        path: "/media/audio",
        name: "audio",
        component: () => import('../views/media/audio.vue'),
        meta: {
            index: 0,
            title: "音频"
        }
    },

    
    
                // 轮播图路由
        {
            path: '/slides/table',
            name: 'slides_table',
            component: () => import('../views/slides/table.vue'),
            meta: {
                index: 0,
                title: '轮播图列表'
            }
        },
        {
            path: '/slides/view',
            name: 'slides_view',
            component: () => import('../views/slides/view.vue'),
            meta: {
                index: 0,
                title: '轮播图详情'
            }
        },
                    // 文章路由
            {
                path: '/article/table',
                name: 'article_table',
                component: () => import('../views/article/table.vue'),
                meta: {
                    index: 0,
                    title: '文章列表'
                }
            },
            {
                path: '/article/view',
                name: 'article_view',
                component: () => import('../views/article/view.vue'),
                meta: {
                    index: 0,
                    title: '文章详情'
                }
            },

            // 文章分类路由
            {
                path: '/article_type/table',
                name: 'article_type_table',
                component: () => import('../views/article_type/table.vue'),
                meta: {
                    index: 0,
                    title: '文章分类列表'
                }
            },
            {
                path: '/article_type/view',
                name: 'article_type_view',
                component: () => import('../views/article_type/view.vue'),
                meta: {
                    index: 0,
                    title: '文章分类详情'
                }
            },
                // 敏感词路由
        {
            path: '/sensitive_vocabulary/table',
            name: 'sensitive_vocabulary_table',
            component: () => import('../views/sensitive_vocabulary/table.vue'),
            meta: {
                index: 0,
                title: '敏感词列表'
            }
        },
        {
            path: '/sensitive_vocabulary/view',
            name: 'sensitive_vocabulary_view',
            component: () => import('../views/sensitive_vocabulary/view.vue'),
            meta: {
                index: 0,
                title: '敏感词详情'
            }
        },
            
    
    
            // 公告路由
        {
            path: '/notice/table',
            name: 'notice_table',
            component: () => import('../views/notice/table.vue'),
            meta: {
                index: 0,
                title: '公告消息列表'
            }
        },
        {
            path: '/notice/view',
            name: 'notice_view',
            component: () => import('../views/notice/view.vue'),
            meta: {
                index: 0,
                title: '公告消息详情'
            }
        },
                
            // 评论路由
        {
            path: '/comment/table',
            name: 'comment_table',
            component: () => import('../views/comment/table.vue'),
            meta: {
                index: 0,
                title: '评论列表'
            }
        },
        {
            path: '/comment/view',
            name: 'comment_view',
            component: () => import('../views/comment/view.vue'),
            meta: {
                index: 0,
                title: '评论详情'
            }
        },
        
            // 普通用户路由
        {
            path: '/regular_users/table',
            name: 'regular_users_table',
            component: () => import('../views/regular_users/table.vue'),
            meta: {
                index: 0,
                title: '普通用户列表'
            }
        },
        {
            path: '/regular_users/view',
            name: 'regular_users_view',
            component: () => import('../views/regular_users/view.vue'),
            meta: {
                index: 0,
                title: '普通用户详情'
            }
        },
            // 景点类型路由
        {
            path: '/types_of_attractions/table',
            name: 'types_of_attractions_table',
            component: () => import('../views/types_of_attractions/table.vue'),
            meta: {
                index: 0,
                title: '景点类型列表'
            }
        },
        {
            path: '/types_of_attractions/view',
            name: 'types_of_attractions_view',
            component: () => import('../views/types_of_attractions/view.vue'),
            meta: {
                index: 0,
                title: '景点类型详情'
            }
        },
            // 景点信息路由
        {
            path: '/attraction_information/table',
            name: 'attraction_information_table',
            component: () => import('../views/attraction_information/table.vue'),
            meta: {
                index: 0,
                title: '景点信息列表'
            }
        },
        {
            path: '/attraction_information/view',
            name: 'attraction_information_view',
            component: () => import('../views/attraction_information/view.vue'),
            meta: {
                index: 0,
                title: '景点信息详情'
            }
        },
            // 景点预约路由
        {
            path: '/attraction_reservation/table',
            name: 'attraction_reservation_table',
            component: () => import('../views/attraction_reservation/table.vue'),
            meta: {
                index: 0,
                title: '景点预约列表'
            }
        },
        {
            path: '/attraction_reservation/view',
            name: 'attraction_reservation_view',
            component: () => import('../views/attraction_reservation/view.vue'),
            meta: {
                index: 0,
                title: '景点预约详情'
            }
        },
            // 景点退票路由
        {
            path: '/tourist_attraction_ticket_refund/table',
            name: 'tourist_attraction_ticket_refund_table',
            component: () => import('../views/tourist_attraction_ticket_refund/table.vue'),
            meta: {
                index: 0,
                title: '景点退票列表'
            }
        },
        {
            path: '/tourist_attraction_ticket_refund/view',
            name: 'tourist_attraction_ticket_refund_view',
            component: () => import('../views/tourist_attraction_ticket_refund/view.vue'),
            meta: {
                index: 0,
                title: '景点退票详情'
            }
        },
            // 美食分类路由
        {
            path: '/food_classification/table',
            name: 'food_classification_table',
            component: () => import('../views/food_classification/table.vue'),
            meta: {
                index: 0,
                title: '美食分类列表'
            }
        },
        {
            path: '/food_classification/view',
            name: 'food_classification_view',
            component: () => import('../views/food_classification/view.vue'),
            meta: {
                index: 0,
                title: '美食分类详情'
            }
        },
            // 美食信息路由
        {
            path: '/food_information/table',
            name: 'food_information_table',
            component: () => import('../views/food_information/table.vue'),
            meta: {
                index: 0,
                title: '美食信息列表'
            }
        },
        {
            path: '/food_information/view',
            name: 'food_information_view',
            component: () => import('../views/food_information/view.vue'),
            meta: {
                index: 0,
                title: '美食信息详情'
            }
        },
            // 民宿信息路由
        {
            path: '/homestay_information/table',
            name: 'homestay_information_table',
            component: () => import('../views/homestay_information/table.vue'),
            meta: {
                index: 0,
                title: '民宿信息列表'
            }
        },
        {
            path: '/homestay_information/view',
            name: 'homestay_information_view',
            component: () => import('../views/homestay_information/view.vue'),
            meta: {
                index: 0,
                title: '民宿信息详情'
            }
        },
            // 民宿预约路由
        {
            path: '/homestay_reservation/table',
            name: 'homestay_reservation_table',
            component: () => import('../views/homestay_reservation/table.vue'),
            meta: {
                index: 0,
                title: '民宿预约列表'
            }
        },
        {
            path: '/homestay_reservation/view',
            name: 'homestay_reservation_view',
            component: () => import('../views/homestay_reservation/view.vue'),
            meta: {
                index: 0,
                title: '民宿预约详情'
            }
        },
            // 民宿退款路由
        {
            path: '/refunds_for_homestays/table',
            name: 'refunds_for_homestays_table',
            component: () => import('../views/refunds_for_homestays/table.vue'),
            meta: {
                index: 0,
                title: '民宿退款列表'
            }
        },
        {
            path: '/refunds_for_homestays/view',
            name: 'refunds_for_homestays_view',
            component: () => import('../views/refunds_for_homestays/view.vue'),
            meta: {
                index: 0,
                title: '民宿退款详情'
            }
        },
            // 论坛分享路由
        {
            path: '/forum_sharing/table',
            name: 'forum_sharing_table',
            component: () => import('../views/forum_sharing/table.vue'),
            meta: {
                index: 0,
                title: '论坛分享列表'
            }
        },
        {
            path: '/forum_sharing/view',
            name: 'forum_sharing_view',
            component: () => import('../views/forum_sharing/view.vue'),
            meta: {
                index: 0,
                title: '论坛分享详情'
            }
        },
            // 积分商品路由
        {
            path: '/integral_products/table',
            name: 'integral_products_table',
            component: () => import('../views/integral_products/table.vue'),
            meta: {
                index: 0,
                title: '积分商品列表'
            }
        },
        {
            path: '/integral_products/view',
            name: 'integral_products_view',
            component: () => import('../views/integral_products/view.vue'),
            meta: {
                index: 0,
                title: '积分商品详情'
            }
        },
            // 商品兑换路由
        {
            path: '/product_exchange/table',
            name: 'product_exchange_table',
            component: () => import('../views/product_exchange/table.vue'),
            meta: {
                index: 0,
                title: '商品兑换列表'
            }
        },
        {
            path: '/product_exchange/view',
            name: 'product_exchange_view',
            component: () => import('../views/product_exchange/view.vue'),
            meta: {
                index: 0,
                title: '商品兑换详情'
            }
        },
            // 在线客服路由
        {
            path: '/online_service/table',
            name: 'online_service_table',
            component: () => import('../views/online_service/table.vue'),
            meta: {
                index: 0,
                title: '在线客服列表'
            }
        },
        {
            path: '/online_service/view',
            name: 'online_service_view',
            component: () => import('../views/online_service/view.vue'),
            meta: {
                index: 0,
                title: '在线客服详情'
            }
        },
    
    // 用户路由
    {
        path: '/user/table',
        name: 'user_table',
        component: () => import('../views/user/table.vue'),
        meta: {
            index: 0,
            title: '用户列表'
        }
    },
    {
        path: '/user/view',
        name: 'user_view',
        component: () => import('../views/user/view.vue'),
        meta: {
            index: 0,
            title: '用户详情'
        }
    },
    {
        path: '/user/info',
        name: 'user_info',
        component: () => import('../views/user/info.vue'),
        meta: {
            index: 0,
            title: '个人信息'
        }
    },
    // 用户组路由
    {
        path: '/user_group/table',
        name: 'user_group_table',
        component: () => import('../views/user_group/table.vue'),
        meta: {
            index: 0,
            title: '用户组列表'
        }
    },
    {
        path: '/user_group/view',
        name: 'user_group_view',
        component: () => import('../views/user_group/view.vue'),
        meta: {
            index: 0,
            title: '用户组详情'
        }
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let token = to.query.token;
    if (token) {
        $.db.set("token", token, 120);
    }
    next();
})

router.afterEach((to, from, next) => {
    let title = "江西乡村旅游服务平台-admin";
    document.title = title;
})

export default router
