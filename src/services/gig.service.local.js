import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.local.js'

const STORAGE_KEY = 'gig'

export const gigService = {
	query,
	getById,
	save,
	remove,
	getEmptyGig,
	// addGigMsg
}
window.cs = gigService

async function query(filterBy = { txt: '' }) {
	var gigs = await storageService.query(STORAGE_KEY)
	if (filterBy.txt) {
		const regex = new RegExp(filterBy.txt, 'i')
		gigs = gigs.filter(
			(gig) =>
				regex.test(gig.title) ||
				regex.test(gig.description) ||
				regex.test(gig.owner.fullname)
		)
	}
	// if (filterBy.price) {
	//     gigs = gigs.filter(gig => gig.price <= filterBy.price)
	// }
	return gigs
}

function getById(gigId) {
	return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
	await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
	var savedGig
	if (gig._id) {
		savedGig = await storageService.put(STORAGE_KEY, gig)
	} else {
		// Later, owner is set by the backend
		gig.owner = userService.getLoggedinUser()
		savedGig = await storageService.post(STORAGE_KEY, gig)
	}
	return savedGig
}

async function addGigMsg(gigId, txt) {
	// Later, this is all done by the backend
	const gig = await getById(gigId)
	if (!gig.msgs) gig.msgs = []

	const msg = {
		id: utilService.makeId(),
		by: userService.getLoggedinUser(),
		txt,
	}
	gig.msgs.push(msg)
	await storageService.put(STORAGE_KEY, gig)

	return msg
}

function getEmptyGig() {
	return {
		_id: '',
		title: '',
		price: '',
		owner: {},
		daysToMake: null,
		description: '',
		imgUrls: [''],
		tags: [],
		likedByUsers: [],
	}
}

// Initial data
// ;(async ()=>{
//     await storageService.post(STORAGE_KEY, { _id: "i101",title: "I will design your logo",price: 12,owner: {"_id": "u101","fullname": "Dudu Da","imgUrl": "url","level": "basic/premium","rate": 4},daysToMake: 3,description: "Make unique logo...", imgUrls: [""],tags: [ "logo-design", "artisitic",  "proffesional", "accessible" ],  likedByUsers: ['mini-user'] })
//     await storageService.post(STORAGE_KEY, { _id: "i102",title: "I can do sprint 4 4 u!!",price: 220,owner: {"_id": "u102","fullname": "Dima","imgUrl": "url","level": "basic/premium","rate": 5},daysToMake: 10,description: "Pay me up and go have fun...", imgUrls: [""],tags: [ "artisitic",  "proffesional" ],  likedByUsers: ['mini-user'] })
//     await storageService.post(STORAGE_KEY, { _id: "i103",title: "I make fake Coding Academy certifications",price: 190,owner: {"_id": "u102","fullname": "Dima","imgUrl": "url","level": "basic/premium","rate": 3},daysToMake: 1,description: "No one will ever know...", imgUrls: [""],tags: [ "artisitic",  "proffesional" ],  likedByUsers: ['mini-user'] })
// })()

// const gig = {
//     _id: "i101",
//     title: "I will design your logo",
//     price: 12,
//     owner: {
//       "_id": "u101",
//       "fullname": "Dudu Da",
//       "imgUrl": "url",
//       "level": "basic/premium",
//       "rate": 4
//     },
//     daysToMake: 3,
//     description: "Make unique logo...",
//     imgUrls: [""],
//     tags: [ "logo-design", "artisitic",  "proffesional", "accessible" ],
//     likedByUsers: ['mini-user']
//   }
