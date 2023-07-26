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
//     daysToMake: 3,description: "Hello, Hi There, I am Bruce - talented, experienced graphic designer and most important positive person. With 11.000+ successfully completed orders, here on Fiverr. This is my Retro Vintage Logo style gig, only on Fiverr. I believe in the importance of logos and branding in a company's success, and nothing gives me more pride than to see one of my logos at the top.All graphic and Logo Design work will be of very High Quality Standards and always adjusted to meet your needs from which I have accumulated exceptional custom reviews.You will Get: Delivery time within 24 hours. I do Modern Vintage Retro Logo, Clothing brand, Gaming, Minimalist, y2k, Signature... for Your Business or Persional. Deliverable files will be JPG and PNG with transparent background. High Quality image (3000px x 3000px). Black & White or color. Friendly communication and fast response. Unique & custom made Wordmark / Logotype designs without any reused cheesy icons.Full assistance until you're satisfied .",
// 	 imgUrls: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/290928503/original/46338c22812e3d72eb57485406c886313b8be338/provide-professional-german-seo-blog-articles.png"],
//     tags: [ "logo-design", "artisitic",  "proffesional", "accessible" ],  likedByUsers: ['mini-user'],
//     reviews: [{"id": utilService.makeId(),"txt": "Very kind and works fast", "rate": 4, "createdAt": new Date() ,"by": {"_id": "u101","fullname": "Mamaba Boy","imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/755da15ee87a62b93cae1384c24c4c71-1549272824565/689c1a94-7604-463f-8820-d794a3aadc07.jpg", "country": "Belgium"} },
//         {"id": utilService.makeId(),"txt": "I love his work!", "rate": 5, "createdAt":  new Date(),"by": {"_id": "u102","fullname": "Juliuos Keysar","imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/6640180a2dbba46cad4068dcd9ad47f1-1646966940115/25a12acd-5e46-4636-a01a-a289c6749009.png", "country": "Netherlands"} }
//     ]})
//     await storageService.post(STORAGE_KEY, { _id: "i102",title: "I can do sprint 4 4 u!!",price: 220,
//     owner: {"_id": "u102","fullname": "Dima","instagram": "@DimaKing123","imgUrl": "https://ca.slack-edge.com/T04U05NLZ2M-U056VBMJLKG-51a0b5aa8bbe-512","level": "basic/premium","rate": 5},
//     daysToMake: 10,description: "Are you looking to create yourself a new source of income, quit your job or better yet GROW YOUR ONLINE EMPIRE!? With years of experience in the e-commerce industry and as a Shopify expert, I use proven marketing strategies and I incorporate AI to enhance our services, in order to create a custom store that's tailored to your unique needs. I offer a complete One Product Shopify dropshipping store creation service, which includes everything you need to start and run a successful e-commerce business. From product research and selection to website design and optimization, I handle everything to ensure that your store is set up for success, you can check my packages above. And why a one product store? Being only 1 product, you'll have time to focus with different video content and audience targeting to increase the store conversions.",
// 	 imgUrls: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/109611151/original/42d4814c676b9f4320152d541bb6c8be7cd83d39/design-3-professional-logo-for-you-in-24-hours.jpg"],tags: [ "artisitic",  "proffesional" ],  likedByUsers: ['mini-user'],
//     reviews: [{"id": utilService.makeId(),"txt": "The best there is! way better than my expectations!", "rate": 5, "createdAt": new Date() ,"by": {"_id": "u103","fullname": "Jerry Fisher","imgUrl": "https://ca.slack-edge.com/T04U05NLZ2M-U055TJHS215-337363a46142-512", "country": "Canada"} },
//         {"id": utilService.makeId(),"txt": "Ok job, not the best profesional to work with", "rate": 2, "createdAt":  new Date(),"by": {"_id": "u104","fullname": "Kulun Mbaba","imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/31faa7021d4e21ce39975906f4a8640d-1591639582187/a9286d70-e958-474f-9629-55b7cd43e612.jpg", "country": "Sangha"} }
//     ] })
//     await storageService.post(STORAGE_KEY, { _id: "i103",title: "I make fake Coding Academy certifications",price: 190,
//     owner: {"_id": "u102","fullname": "Dima","instagram": "@DimaKing123","imgUrl": "https://ca.slack-edge.com/T04U05NLZ2M-U056VBMJLKG-51a0b5aa8bbe-512","level": "basic/premium","rate": 3},
//     daysToMake: 1,description: "Well, search no longer. If you are looking for someone to PLAN the story of your game - you are at the right place. Sometimes as a writer, you might be stuck - and not know what to write. Having someone else deal with all the planning can be helpful (and it's a known way to cure writer's block!) I will write the plot, create the characters (I can even include reference images albeit my art skills are lacking) and come up with an outline, all in one gig! I can even help come up with a detailed setting! As this gig might require detailed communication, please know that I might send frequent updates/questions as I work on your piece!",
// 	imgUrls: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/9377852/original/7fa1ab489ad31ef89c2f5c7eea6870cadd4fe27d/design-an-awesome-vintage-or-retro-logo-88d601db-60fd-43f1-9778-0bd57e615805.jpg"],tags: [ "artisitic",  "proffesional" ],  likedByUsers: ['mini-user'],
//     reviews: [{"id": utilService.makeId(),"txt": "Amazing work, and beautiful person", "rate": 4, "createdAt": new Date() ,"by": {"_id": "u107","fullname": "California love","imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/3117f94ffeecab5deb8b391a4896369c-1656262932417/44ecb256-12e6-4e39-a663-9f9a411296ce.jpg", "country": "United-States"} },
//         {"id": utilService.makeId(),"txt": "Bad service", "rate": 2, "createdAt":  new Date(),"by": {"_id": "u108","fullname": "Moshe Simha","imgUrl": "https://ca.slack-edge.com/T04U05NLZ2M-U0511SL2JAE-5a79c2b1c487-512", "country": "Israel"} }
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
