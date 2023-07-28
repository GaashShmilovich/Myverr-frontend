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
}
window.cs = gigService

async function query(filterBy) {
	var gigs = await storageService.query(STORAGE_KEY)
	if (gigs && filterBy && filterBy.type === 'budget') {
		gigs = gigs.filter((gig) => {
			return gig.price >= filterBy.min && gig.price <= filterBy.max
		})
	}
	if (gigs && filterBy && filterBy.type === 'delivery') {
		gigs = gigs.filter((gig) => {
			return gig.daysToMake <= filterBy.delivery
		})
	}
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
		daysToMake: '',
		description: '',
		imgUrls: [''],
		tags: [],
		likedByUsers: [],
		reviews: [
			{
				id: '',
				txt: '',
				rate: '',
				createdAt: '',
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
// ; (async () => {
// 	await storageService.post(STORAGE_KEY, {
// 		_id: "i101", title: "I will design your logo", price: 12,
// 		owner: { "_id": "u101", "fullname": "Dudu Da", "moto":"Nothing beats the Experience!" ,
// 		"instagram": "@DuduCharm123", "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/2f1f82bbc1e2b7b7585b4c1afaaf69d8-1648815612653/f6c26d4e-10b8-4e67-ac62-3c9d39dcead1.jpg", 
// 		"level": "basic/premium", "rate": 4, "country": "Sount Africa", "language": ["Zulu", "English", "Swati"],
// 		"since": "September 2021", "lastDelivery": "6 hours ago", "averageResponse": "50 minutes",
// 		"about": "Hey! My name is Vasily Kichigin, and I am excited to connect with you here on Fiverr! Since 2015, I have worked with over 11,000 customers and completed more than 20,000 orders on the platform. I am super passionate about Instagram and eager to help you with every aspect of it. Over the years, I have worked with a diverse range of creators, small businesses, celebrities, and Fortune 500 companies here on Fiverr. If you have any questions, please feel free to send me a message here, and I will be happy to help you! 🙂" },
// 		daysToMake: 3, description: "Hello, Hi There, I am Bruce - talented, experienced graphic designer and most important positive person. With 11.000+ successfully completed orders, here on Fiverr. This is my Retro Vintage Logo style gig, only on Fiverr. I believe in the importance of logos and branding in a company's success, and nothing gives me more pride than to see one of my logos at the top.All graphic and Logo Design work will be of very High Quality Standards and always adjusted to meet your needs from which I have accumulated exceptional custom reviews.You will Get: Delivery time within 24 hours. I do Modern Vintage Retro Logo, Clothing brand, Gaming, Minimalist, y2k, Signature... for Your Business or Persional. Deliverable files will be JPG and PNG with transparent background. High Quality image (3000px x 3000px). Black & White or color. Friendly communication and fast response. Unique & custom made Wordmark / Logotype designs without any reused cheesy icons.Full assistance until you're satisfied .",
// 		imgUrls: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/290928503/original/46338c22812e3d72eb57485406c886313b8be338/provide-professional-german-seo-blog-articles.png"],
// 		tags: ["logo-design", "artisitic", "proffesional", "accessible"],chosenTag: "", likedByUsers: ['mini-user'],
// 		reviews: [{ "id": utilService.makeId(), "txt": "Very kind and works fast", "rate": 4, 
// 		"createdAt": new Date(), "by": { "_id": "u101", "fullname": "Mamaba Boy", 
// 		"imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/343cbc5a4144649085a4e957a46671b5-1683638733243/eaf94025-da9a-4cdd-95d5-4b65362cbe9c.JPG", 
// 		"country": "Belgium" } },
// 		{ "id": utilService.makeId(), "txt": "I love his work!", "rate": 5, 
// 		"createdAt": new Date(), "by": { "_id": "u102", "fullname": "Juliuos Keysar", 
// 		"imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/30544a9820b9cc72a3f3c46e260091cc-1642546839079/42396a49-d576-4cdc-a5a6-f61678941743.jpg", 
// 		"country": "Netherlands" } }
// 		]
// 	})
// 	await storageService.post(STORAGE_KEY, {
// 		_id: "i103", title: "I make fake Coding Academy certifications", price: 190,
// 		owner: { "_id": "u103", "fullname": "Dima","moto":"The best way is to have fun!" ,
// 		"instagram": "@DimaKing123", "imgUrl": "https://ca.slack-edge.com/T04U05NLZ2M-U056VBMJLKG-51a0b5aa8bbe-512", 
// 		"level": "basic/premium", "rate": 5, "country": "Israel", "language": ["Hebrew", "English", "Russian"],
// 		"since": "November 2018", "lastDelivery": "5 hours ago", "averageResponse": "3 hours",
// 		"about": "Hello! I'm an enthusiastic and creative graphic artist who is passionate about Logo and Banner Design! And have many more skills! I'm a fun loving guy who loves nature, pets and dressing up! I'm also a bit of a perfectionist! I freelance exclusively on Fiverr!" },
// 		daysToMake: 1, description: "Well, search no longer. If you are looking for someone to PLAN the story of your game - you are at the right place. Sometimes as a writer, you might be stuck - and not know what to write. Having someone else deal with all the planning can be helpful (and it's a known way to cure writer's block!) I will write the plot, create the characters (I can even include reference images albeit my art skills are lacking) and come up with an outline, all in one gig! I can even help come up with a detailed setting! As this gig might require detailed communication, please know that I might send frequent updates/questions as I work on your piece!",
// 		imgUrls: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/9377852/original/7fa1ab489ad31ef89c2f5c7eea6870cadd4fe27d/design-an-awesome-vintage-or-retro-logo-88d601db-60fd-43f1-9778-0bd57e615805.jpg"],
// 		tags: ["artisitic", "proffesional"], chosenTag: "", likedByUsers: ['mini-user'],
// 		reviews: [{ "id": utilService.makeId(), "txt": "Amazing work, and beautiful person", "rate": 4, 
// 		"createdAt": new Date(), "by": { "_id": "u107", "fullname": "California love", 
// 		"imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/3117f94ffeecab5deb8b391a4896369c-1656262932417/44ecb256-12e6-4e39-a663-9f9a411296ce.jpg", 
// 		"country": "United-States" } },
// 		{ "id": utilService.makeId(), "txt": "Bad service", "rate": 2, 
// 		"createdAt": new Date(), "by": { "_id": "u108", "fullname": "Moshe Simha", 
// 		"imgUrl": "https://ca.slack-edge.com/T04U05NLZ2M-U0511SL2JAE-5a79c2b1c487-512", 
// 		"country": "Israel" } }
// 		]
// 	})
	
// })()

const gig = {
	_id: "i101",
	title: "I will design your logo",
	price: 12,
	owner: {
		"_id": "u101",
		"fullname": "Dudu Da",
		"instagram": "@DuduCharm123",
		"moto":"Nothing beats the Experience!",
		"imgUrl": "url",
		"level": "basic/premium",
		"rate": 4,
		"country": "Israel",
		"language": [],
		"since": "", 
		"lastDelivery": "", 
		"averageResponse": "",
		"about": ""

	},
	daysToMake: 3,
	description: "Make unique logo...",
	imgUrls: [""],
	tags: ["logo-design", "artisitic", "proffesional", "accessible"],
	chosenTag: "",
	likedByUsers: ['mini-user'],
	reviews: [
		{ "id": utilService.makeId(), "txt": "Very kind and works fast", "rate": 4, "createdAt": new Date(), "by": { "_id": "u101", "fullname": "Mamaba Boy", "imgUrl": "/img/img2.jpg", "country": "Belgium" } },
		{ "id": utilService.makeId(), "txt": "I love his work!", "rate": 5, "createdAt": new Date(), "by": { "_id": "u102", "fullname": "Juliuos Keysar", "imgUrl": "/img/img2.jpg", "country": "Netherlands" } }
	]
}
