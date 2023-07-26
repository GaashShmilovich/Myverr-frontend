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
		reviews: [
			{
				id: '',
				txt: '',
				rate: null,
				createdAt: null,
				by: {
					_id: 'u102',
					fullname: 'user2',
					imgUrl: '/img/img2.jpg',
					country: '',
				},
			},
		],
	}
}

// Initial data
// ;(async ()=>{
//     await storageService.post(STORAGE_KEY, { _id: "i101",title: "I will design your logo",price: 12,
//     owner: {"_id": "u101","fullname": "Dudu Da","instagram": "@DuduCharm123","imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/2f1f82bbc1e2b7b7585b4c1afaaf69d8-1648815612653/f6c26d4e-10b8-4e67-ac62-3c9d39dcead1.jpg","level": "basic/premium","rate": 4},
//     daysToMake: 3,description: "Make unique logo...", imgUrls: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/290928503/original/46338c22812e3d72eb57485406c886313b8be338/provide-professional-german-seo-blog-articles.png"],
//     tags: [ "logo-design", "artisitic",  "proffesional", "accessible" ],  likedByUsers: ['mini-user'],
//     reviews: [{"id": utilService.makeId(),"txt": "Very kind and works fast", "rate": 4, "createdAt": new Date() ,"by": {"_id": "u101","fullname": "Mamaba Boy","imgUrl": "/img/img2.jpg", "country": "Belgium"} },
//         {"id": utilService.makeId(),"txt": "I love his work!", "rate": 5, "createdAt":  new Date(),"by": {"_id": "u102","fullname": "Juliuos Keysar","imgUrl": "/img/img2.jpg", "country": "Netherlands"} }
//     ]})
//     await storageService.post(STORAGE_KEY, { _id: "i102",title: "I can do sprint 4 4 u!!",price: 220,
//     owner: {"_id": "u102","fullname": "Dima","instagram": "@DimaKing123","imgUrl": "https://ca.slack-edge.com/T04U05NLZ2M-U056VBMJLKG-51a0b5aa8bbe-512","level": "basic/premium","rate": 5},
//     daysToMake: 10,description: "Pay me up and go have fun...", imgUrls: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/109611151/original/42d4814c676b9f4320152d541bb6c8be7cd83d39/design-3-professional-logo-for-you-in-24-hours.jpg"],tags: [ "artisitic",  "proffesional" ],  likedByUsers: ['mini-user'],
//     reviews: [{"id": utilService.makeId(),"txt": "Ok job, not the best to work with", "rate": 3, "createdAt": new Date() ,"by": {"_id": "u103","fullname": "Jerry Fisher","imgUrl": "/img/img2.jpg", "country": "Canada"} },
//         {"id": utilService.makeId(),"txt": "The best there is! way better than my expectations!", "rate": 5, "createdAt":  new Date(),"by": {"_id": "u104","fullname": "Kulun Mbaba","imgUrl": "/img/img2.jpg", "country": "Sangha"} }
//     ] })
//     await storageService.post(STORAGE_KEY, { _id: "i103",title: "I make fake Coding Academy certifications",price: 190,
//     owner: {"_id": "u102","fullname": "Dima","instagram": "@DimaKing123","imgUrl": "https://ca.slack-edge.com/T04U05NLZ2M-U056VBMJLKG-51a0b5aa8bbe-512","level": "basic/premium","rate": 3},
//     daysToMake: 1,description: "No one will ever know...", imgUrls: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/9377852/original/7fa1ab489ad31ef89c2f5c7eea6870cadd4fe27d/design-an-awesome-vintage-or-retro-logo-88d601db-60fd-43f1-9778-0bd57e615805.jpg"],tags: [ "artisitic",  "proffesional" ],  likedByUsers: ['mini-user'],
//     reviews: [{"id": utilService.makeId(),"txt": "Amazing work, and beautiful person", "rate": 4, "createdAt": new Date() ,"by": {"_id": "u107","fullname": "California love","imgUrl": "/img/img2.jpg", "country": "United-States"} },
//         {"id": utilService.makeId(),"txt": "Bad service", "rate": 2, "createdAt":  new Date(),"by": {"_id": "u108","fullname": "Moshe Simha","imgUrl": "/img/img2.jpg", "country": "Israel"} }
//     ]})
// })()

// const gig = {
//     _id: "i101",
//     title: "I will design your logo",
//     price: 12,
//     owner: {
//       "_id": "u101",
//       "fullname": "Dudu Da",
//       "instagram": "@DuduCharm123",
//       "imgUrl": "url",
//       "level": "basic/premium",
//       "rate": 4
//     },
//     daysToMake: 3,
//     description: "Make unique logo...",
//     imgUrls: [""],
//     tags: [ "logo-design", "artisitic",  "proffesional", "accessible" ],
//     likedByUsers: ['mini-user'] ,
//     reviews: [
//         {"id": utilService.makeId(),"txt": "Very kind and works fast", "rate": 4, "createdAt": new Date() ,"by": {"_id": "u101","fullname": "Mamaba Boy","imgUrl": "/img/img2.jpg", "country": "Belgium"} },
//         {"id": utilService.makeId(),"txt": "I love his work!", "rate": 5, "createdAt":  new Date(),"by": {"_id": "u102","fullname": "Juliuos Keysar","imgUrl": "/img/img2.jpg", "country": "Netherlands"} }
//     ]
//   }
