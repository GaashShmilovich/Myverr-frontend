import { storageService } from './async-storage.service'
import { utilService } from './util.service'

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
	changeScore,
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
	console.log(users)
	const user = users.find((user) => user.username === userCred.username)
	console.log(user)
	if (user) {
		return saveLocalUser(user)
	}
}

async function signup(userCred) {
	// userCred.score = 10000
	if (!userCred.imgUrl)
		userCred.imgUrl =
			'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
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
	// user = {
	//     _id: user._id,
	//     isSeller: user.isSeller,
	//     fullname: user.fullname,
	//     imgUrl: user.imgUrl,
	//     username: user.username,
	//     password: user.password,
	//     level: user.level,
	//     country: user.country,
	//     reviews: [
	//         {
	//             id: user.reviews[0]._id,
	//             gig: user.reviews[0].gig,
	//             txt: user.reviews[0].txt,
	//             rate: user.reviews[0].rate,
	//             by: {
	//                 _id: user.reviews[0].by._id,
	//                 fullname: user.reviews[0].by.fullname,
	//                 imgUrl: user.reviews[0].by.imgUrl
	//             }
	//         }
	//     ],
	//     orders: user.orders
	// },
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// Initial data

// ; (async () => {
// 	await userService.signup({
// 		_id: "u101",
// 		id: "gaash",
// 		isSeller: true,
// 		fullname: "Gaash Shmilovich",
// 		imgUrl: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/0d064bcfd4295551910a7bc05c0af05d-1661124606619/0831357d-de18-4877-a0c0-c4aff302f9d2.JPG",
// 		username: "gaash",
// 		password: "gaash",
// 		level: "basic/premium",
// 		country: 'Israel',
// 		orders: [],
// 	}

// 	)
// 	await userService.signup({
// 		_id: "u102",
// 		isSeller: false,
// 		fullname: "Giora Marani",
// 		imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/30544a9820b9cc72a3f3c46e260091cc-1642546839079/42396a49-d576-4cdc-a5a6-f61678941743.jpg",
// 		username: "giora",
// 		password: "giora",
// 		level: "premium",
// 		country: 'United States',
// 	}

// 	)
// 	await userService.signup({
// 		_id: "u103",
// 		isSeller: false,
// 		fullname: "Oryan",
// 		imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/30544a9820b9cc72a3f3c46e260091cc-1642546839079/42396a49-d576-4cdc-a5a6-f61678941743.jpg",
// 		username: "oryan",
// 		password: "oryan",
// 		level: "basic",
// 		country: 'United Kingdom',
// 		orders: [],
// 	}

// 	)
// })()
