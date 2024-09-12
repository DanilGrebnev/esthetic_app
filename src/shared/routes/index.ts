export const routes = {
    main: {
        getRoute: () => '/',
        math: (route: string) => route === '/',
    },

    createPost: '/create-posts',

    postsDetail: {
        getRoute(postId: string) {
            return `/detail-posts/${postId}`
        },
    },
    editUserInfo: {
        getRoute(userId?: string) {
            return `/user/${userId}/edit-user-info`
        },
    },
    userCreatedPosts: {
        getRoute(userId?: string) {
            return `/user/${userId}/created-posts`
        },
        math: (route: string) => {
            return /\/user\/.+\/created-posts/.test(route)
        },
    },

    userDashboardDetail: {
        getRoute(userId: string, dashboardId: string) {
            return `/user/${userId}/dashboard-detail/${dashboardId}`
        },
    },
    userSavedPosts: {
        getRoute(userId?: string) {
            return `/user/${userId}/saved-posts`
        },
        math(route: string) {
            return /\/user\/.+\/saved-posts/.test(route)
        },
    },
    userAllSavedPosts: {
        getRoute(userId: string) {
            return `/user/${userId}/all-saved-posts`
        },
    },
    registration: {
        getRoute: () => '/registration',
    },
    login: {
        getRoute: () => '/login',
    },
} as const
