import { storageService } from './async-storage.service'


const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore
}

window.userService = userService

function getUsers() {
    return storageService.query('user')
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update({ _id, score }) {
    const user = await storageService.get('user', _id)
    user.score = score
    await storageService.put('user', user)

    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    console.log(users);
    const user = users.find(user => user.username === userCred.username)
    console.log(user);
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    userCred.score = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}

function saveLocalUser(user) {
    user = {
        id: user._id,
        isSeller: user.isSeller,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        username: user.username,
        password: user.password,
        level: user.level,
        country: user.country,
        reviews: [
            {
                id: user.reviews[0]._id,
                gig: user.reviews[0].gig,
                txt: user.reviews[0].txt,
                rate: user.reviews[0].rate,
                by: {
                    _id: user.reviews[0].by._id,
                    fullname: user.reviews[0].by.fullname,
                    imgUrl: user.reviews[0].by.imgUrl
                }
            }
        ],
        orders: user.orders
    },
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// Initial data

// ; (async () => {
//     await userService.signup({
//         _id: "u101",
//         isSeller: true,
//         fullname: "User 1",
//         imgUrl: "/img/img1.jpg",
//         username: "user1",
//         password: "secret",
//         level: "basic/premium",
//         country: 'Israel',
//         reviews: [
//             {
//                 id: "madeId",
//                 gig: "{optional-mini-gig}",
//                 txt: "Very kind and works fast",
//                 rate: 4,
//                 by: {
//                     _id: "u102",
//                     fullname: "user2",
//                     imgUrl: "/img/img2.jpg"
//                 }
//             }
//         ],
//         orders: [],
//     }

//     )
//     await userService.signup({
//         id: "u102",
//         isSeller: false,
//         fullname: "User 2",
//         imgUrl: "/img/img2.jpg",
//         username: "user2",
//         password: "topsecret",
//         level: "premium",
//         country: 'United States',
//         reviews: [
//             {
//                 id: "madeId",
//                 gig: "{optional-mini-gig}",
//                 txt: "Excellent work and great communication!",
//                 rate: 5,
//                 by: {
//                     _id: "u103",
//                     fullname: "User 3",
//                     imgUrl: "/img/img3.jpg"
//                 }
//             }
//         ],
//         orders: [],
//     }

//     )
//     await userService.signup({
//         id: "u103",
//         isSeller: false,
//         fullname: "User 3",
//         imgUrl: "/img/img3.jpg",
//         username: "user3",
//         password: "hidden",
//         level: "basic",
//         country: 'United Kingdom',
//         reviews: [
//             {
//                 id: "madeId",
//                 gig: "{optional-mini-gig}",
//                 txt: "Great communication and quality work!",
//                 rate: 5,
//                 by: {
//                     _id: "u101",
//                     fullname: "User 1",
//                     imgUrl: "/img/img1.jpg"
//                 }
//             }
//         ],
//         orders: [],
//     }

//     )
// })()