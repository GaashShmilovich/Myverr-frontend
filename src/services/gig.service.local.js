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

async function query(filters, sortBy) {
async function query(filters, sortBy) {
	var gigs = await storageService.query(STORAGE_KEY)

	if (filters.subCategory) {
		const subCategoryLower = filters.subCategory.toLowerCase()
		gigs = gigs.filter((gig) => {
			return gig.tags.some((tag) =>
				tag.toLowerCase().includes(subCategoryLower)
			)
		})
	}

	// Text filter
	if (filters.txt) {
		const txtLower = filters.txt.toLowerCase()
		gigs = gigs.filter((gig) => {
			return (
				gig.title.toLowerCase().includes(txtLower) ||
				gig.tags.some((tag) => tag.toLowerCase().includes(txtLower))
			)
		})
	}

	// Budget filter (removed subCategory condition from here, as it's already handled)
	if (filters.min && filters.max) {
		gigs = gigs.filter(
			(gig) => gig.price >= filters.min && gig.price <= filters.max
		)
	}

	// Delivery filter
	if (filters.delivery) {
		gigs = gigs.filter((gig) => gig.daysToMake <= filters.delivery)
	}

	// Sorting
	if (sortBy) {
		if (sortBy === 'Highest Rating') {
			gigs = gigs.sort((a, b) => {
				const avgRatingA =
					a.reviews.reduce((acc, review) => acc + review.rate, 0) /
					a.reviews.length
				const avgRatingB =
					b.reviews.reduce((acc, review) => acc + review.rate, 0) /
					b.reviews.length
				return avgRatingB - avgRatingA
			})
		}
	// Sorting
	if (sortBy) {
		if (sortBy === 'Highest Rating') {
			gigs = gigs.sort((a, b) => {
				const avgRatingA =
					a.reviews.reduce((acc, review) => acc + review.rate, 0) /
					a.reviews.length
				const avgRatingB =
					b.reviews.reduce((acc, review) => acc + review.rate, 0) /
					b.reviews.length
				return avgRatingB - avgRatingA
			})
		}

		if (sortBy === 'Most Reviews') {
			gigs = gigs.sort((a, b) => {
				return b.reviews.length - a.reviews.length
			})
		}
	}
		if (sortBy === 'Most Reviews') {
			gigs = gigs.sort((a, b) => {
				return b.reviews.length - a.reviews.length
			})
		}
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

// ; (async () => {
// 	await storageService.post(STORAGE_KEY, {
// 		_id: 'i101',
// 		title: 'I will design a creative minimalist business logo',
// 		price: 120,
// 		owner: {
// 			_id: '17QUq',
// 			fullname: 'User 1',
// 			moto: 'Work hard, play hard!',
// 			instagram: '@JenniMama123',
// 			imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/eeafd2296eb286476397e0d195fbf5c8-1680370454842/d21715c4-457c-4687-8ab8-af2639117b55.jpg',
// 			level: 'basic/premium',
// 			rate: 4,
// 			country: 'United Kingdom',
// 			language: ['English'],
// 			since: 'September 2017',
// 			lastDelivery: '2 hours ago',
// 			averageResponse: '50 minutes',
// 			about: 'Hey! My name is Jennifer, and I am excited to connect with you here on Fiverr! Since 2017, I have worked with over 11,000 customers and completed more than 20,000 orders on the platform. I am super passionate about Instagram and eager to help you with every aspect of it. Over the years, I have worked with a diverse range of creators, small businesses, celebrities, and Fortune 500 companies here on Fiverr. If you have any questions, please feel free to send me a message here, and I will be happy to help you!',
// 		},
// 		daysToMake: 1,
// 		description: {
// 			title: 'Welcome to my logo design gig on Fiverr! I am a professional graphic designer with years of experience creating unique and memorable logos for businesses and individuals.',
// 			questions: ['Why choose this gig?', 'Why choosing the higher packages?'],
// 			answers: [
// 				'Quality work and services',
// 				'Excellent communication',
// 				'Creative and original',
// 				'Fast delivery',
// 				'Superior details and quality',
// 				'Editable source files included',
// 				'Higher resolution files',
// 				'More customization level',
// 			],
// 			closer: " My design process begins with understanding your brand's essence and target audience. I'll craft a project that not only stands out but also communicates your brand's values effectively. With attention to all the little details, I'll ensure your project leaves a lasting impact. I'm here to bring your vision to life. Let's collaborate and create something that sets you apart from the competition!",
// 		},
// 		imgUrls: [
// 			'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/115533372/original/67ec94a37b1b51862162ffd326912ebd1616e725/do-modern-minimalist-logo-design-for-your-business.jpg',
// 			'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/115533372/original/7f5fb73fed2347bc06b0a98f5d49c311dbac86ac/do-modern-minimalist-logo-design-for-your-business.jpg',
// 			'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20230613/modern%20logo_dayorn.jpg',
// 		],
// 		tags: ['logo-design', 'artisitic', 'proffesional', 'accessible'],
// 		chosenTag: '',
// 		faqs: [
// 			{
// 				question: 'Why is a logo so important?',
// 				answer: 'Every business has a logo to represent its values and attributes in the market and public. But not all the logos are capable of taking the business effectively to the people. Design of a logo usually plays a major role in the marketing of an organization and its business in the competitive market.',
// 				isOpen: false,
// 			},
// 			{
// 				question: 'What you can expect from working with me?',
// 				answer: 'I am obsessed with helping businesses find their visual voice! My approach goes beyond aesthetics, shapes, and colors... and starts with a clear understanding of your business, the competitive landscape, and the vision you have for your product.',
// 				isOpen: false,
// 			},
// 			{
// 				question: 'What is your refund policy?',
// 				answer: 'I offer a refund if you are not satisfied with the final result and we are unable to reach a resolution. However, I strive to ensure all my clients are happy with the work delivered.',
// 				isOpen: false,
// 			},
// 			{
// 				question: 'Do you offer expedited delivery?',
// 				answer: "Yes, I offer expedited delivery options for an additional fee. If you have a tight deadline, I can prioritize your project to ensure it's completed on time.",
// 				isOpen: false,
// 			},
// 			{
// 				question: 'Can you provide references from past clients?',
// 				answer: 'Yes, I can provide references from past clients upon request. Many of my clients have been satisfied with my work and are happy to share their experience with you.',
// 				isOpen: false,
// 			},
// 		],
// 		likedByUsers: ['mini-user'],
// 		reviews: [
// 			{
// 				id: utilService.makeId(),
// 				txt: 'Impressive logo design! Jennifer created a unique and eye-catching logo that perfectly represents my brand. Their attention to detail and creativity exceeded my expectations. The communication throughout the process was excellent, and they delivered the final design ahead of the deadline. I highly recommend their logo design services!',
// 				rate: 5,
// 				createdAt: '2023-08-10T12:30:15Z',
// 				by: {
// 					_id: 'u305',
// 					fullname: 'Emily Adams',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/2676363b1c77c3845a1281917e4079b5-1680544900130/462bdc5b-ec46-471a-86e7-6c1ecd312c11.jpg',
// 					country: {
// 						name: 'Japan',
// 						img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ef-1f1f5.png',
// 					},
// 				},
// 			},
// 			{
// 				id: utilService.makeId(),
// 				txt: 'Satisfactory rebranding! Jennifer successfully revamped our logo, giving it a fresh and modern look. They incorporated our feedback into the design process, resulting in a logo that aligns perfectly with our brand identity. The turnaround time was reasonable, and we are pleased with the final result!',
// 				rate: 4,
// 				createdAt: '2023-09-22T09:55:32Z',
// 				by: {
// 					_id: 'u509',
// 					fullname: 'Daniel Wilson',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/1ca78811e41baee12d504f5cfcec5504-1680870502858/b67985c8-f98a-47ff-b6f0-a8a91605bfe9.jpg',
// 					country: {
// 						name: 'Canada',
// 						img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png',
// 					},
// 				},
// 			},
// 			{
// 				id: utilService.makeId(),
// 				txt: 'Helpful logo consultation!',
// 				rate: 5,
// 				createdAt: '2023-11-05T14:15:25Z',
// 				by: {
// 					_id: 'u803',
// 					fullname: 'Michael Martinez',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/9bceb875b7788338e9036eaa09a05c7a-1680473320656/1306c413-aed9-4d5b-9205-ef2a611b0c30.jpeg',
// 					country: {
// 						name: 'Romania',
// 						img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f7-1f1f4.png',
// 					},
// 				},
// 			},
// 			{
// 				id: utilService.makeId(),
// 				txt: 'Very kind and works fast',
// 				rate: 4,
// 				createdAt: new Date(),
// 				by: {
// 					_id: 'u101',
// 					fullname: 'Mamaba Boy',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/343cbc5a4144649085a4e957a46671b5-1683638733243/eaf94025-da9a-4cdd-95d5-4b65362cbe9c.JPG',
// 					country: {
// 						name: 'Germany',
// 						img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png',
// 					},
// 				},
// 			},
// 			{
// 				id: utilService.makeId(),
// 				txt: "Excellent work! Jennifer delivered the perfect blog article that exceeded my expectations. Her writing style is captivating, and she skillfully addressed all the key points. The article is SEO-optimized and ranks well on Google. I'm impressed with her professionalism and fast delivery. Highly recommended for quality content!",
// 				rate: 5,
// 				createdAt: '2023-07-25T14:22:10Z',
// 				by: {
// 					_id: 'u204',
// 					fullname: 'John Johnson',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/56600808/original/photo.jpg',
// 					country: {
// 						name: 'United Kingdom',
// 						img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
// 					},
// 				},
// 			},

// 			{
// 				id: utilService.makeId(),
// 				txt: "Excellent work! Jennifer delivered the perfect blog article that exceeded my expectations. Her writing style is captivating, and she skillfully addressed all the key points. The article is SEO-optimized and ranks well on Google. I'm impressed with her professionalism and fast delivery. Highly recommended for quality content!",
// 				rate: 5,
// 				createdAt: '2023-07-25T14:22:10Z',
// 				by: {
// 					_id: 'u204',
// 					fullname: 'John Johnson',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/56600808/original/photo.jpg',
// 					country: {
// 						name: 'United Kingdom',
// 						img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
// 					},
// 				},
// 			},
// 			{
// 				id: utilService.makeId(),
// 				txt: 'It was a pleasure to work with Jennifer, it was easy, and i felt safe and comfortable during the whole time. I love the result as well!',
// 				rate: 5,
// 				createdAt: new Date(),
// 				by: {
// 					_id: 'u102',
// 					fullname: 'Robert J Colin',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/30544a9820b9cc72a3f3c46e260091cc-1642546839079/42396a49-d576-4cdc-a5a6-f61678941743.jpg',
// 					country: {
// 						name: 'United States',
// 						img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
// 					},
// 				},
// 			},
// 		],
// 		packages: [
// 			{
// 				level: 'Basic',
// 				price: 120,
// 				title: 'The Gold Fish - Basic',
// 				specials: [
// 					'Product imagery',
// 					'1 length variation',
// 					'20 seconds running time',
// 				],
// 				benefit1: '5 Day Delivery',
// 				benefit2: '2 Revisions',
// 				description:
// 					'Start-up and basic logos included. Good for Socialmedia & small business owners (ex: Nike logo)',
// 			},
// 			{
// 				level: 'Standard',
// 				price: 240,
// 				title: 'The Dolphin - Recommended',
// 				specials: [
// 					'Voice over recording',
// 					'Product imagery writing',
// 					'20 seconds running time',
// 				],
// 				benefit1: '2 Day Delivery',
// 				benefit2: '4 Revisions',
// 				description:
// 					'Mid-Segment variants of logo. Highlyrecommended for pro business and printing (ex: AirBnb) ',
// 			},
// 			{
// 				level: 'Premium',
// 				price: 360,
// 				title: 'The Blue Whale - Premium',
// 				specials: [
// 					'Video editing',
// 					'Script writing',
// 					'20 seconds running time',
// 				],
// 				benefit1: '1 Day Delivery',
// 				benefit2: '5 Revisions',
// 				description:
// 					'Ultimate and deep conceptual logo design. Must for premiumbusiness & high-end users (ex: Mercedes)',
// 			},
// 		],
// 	}),
// 		await storageService.post(STORAGE_KEY, {
// 			_id: 'i101',
// 			title: 'I will design your logo',
// 			price: 12,
// 			owner: {
// 				_id: 'u101',
// 				fullname: 'Dudu Da',
// 				moto: 'Nothing beats the Experience!',
// 				instagram: '@DuduCharm123',
// 				imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/2f1f82bbc1e2b7b7585b4c1afaaf69d8-1648815612653/f6c26d4e-10b8-4e67-ac62-3c9d39dcead1.jpg',
// 				level: 'basic/premium',
// 				rate: 4,
// 				country: 'Sount Africa',
// 				language: ['Zulu', 'English', 'Swati'],
// 				since: 'September 2021',
// 				lastDelivery: '6 hours ago',
// 				averageResponse: '50 minutes',
// 				about: 'Hey! My name is Dudu Da, and I am excited to connect with you here on Fiverr! Since 2021, I have worked with over 11,000 customers and completed more than 20,000 orders on the platform. I am super passionate about Instagram and eager to help you with every aspect of it. Over the years, I have worked with a diverse range of creators, small businesses, celebrities, and Fortune 500 companies here on Fiverr. If you have any questions, please feel free to send me a message here, and I will be happy to help you! 🙂',
// 			},
// 			daysToMake: 3,
// 			description: {
// 				title: 'Welcome to my gig on Fiverr! I am a professional with years of experience creating unique and memorable projects for businesses and individuals.',
// 				questions: ['Why choose this gig?', 'Why choosing the higher packages?'],
// 				answers: [
// 					'Quality work and services',
// 					'Excellent communication',
// 					'Creative and original',
// 					'Fast delivery',
// 					'Superior details and quality',
// 					'Editable source files included',
// 					'Higher resolution files',
// 					'More customization level',
// 				],
// 				closer: " My design process begins with understanding your brand's essence and target audience. I'll craft a project that not only stands out but also communicates your brand's values effectively. With attention to all the little details, I'll ensure your project leaves a lasting impact. I'm here to bring your vision to life. Let's collaborate and create something that sets you apart from the competition!",
// 			},
// 			imgUrls: [
// 				'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/178146766/original/85f5f84907c14504edf2d9e36c0a2afe1b7f730d/do-modern-minimalist-and-luxury-business-logo-design.jpg',
// 				'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/178146766/original/b7a5429cdc90cdde8d9ef3e5a5c2c8013ccd8b68/do-modern-minimalist-and-luxury-business-logo-design.jpg',
// 				'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/178146766/original/61007478c9c94f83597286887b167efe0ac4e201/do-modern-minimalist-and-luxury-business-logo-design.jpg',
// 				'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20230611/Convert_1_rr9try.jpg',
// 				'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/0e4befaa633b82a4a96d250155b70248-1690667449/1/do-modern-minimalist-and-luxury-business-logo-design.jpg',
// 				'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/5cbd5ca4c3b973653ef90fb0d6f7db6d-1690591470/1/do-modern-minimalist-and-luxury-business-logo-design.jpg',
// 			],
// 			tags: ['logo-design', 'artisitic', 'proffesional', 'accessible'],
// 			chosenTag: '',
// 			faqs: [
// 				{
// 					question: 'Why is a logo so important?',
// 					answer: 'Every business has a logo to represent its values and attributes in the market and public. But not all the logos are capable of taking the business effectively to the people. Design of a logo usually plays a major role in the marketing of an organization and its business in the competitive market.',
// 					isOpen: false,
// 				},
// 				{
// 					question: 'What you can expect from working with me?',
// 					answer: 'I am obsessed with helping businesses find their visual voice! My approach goes beyond aesthetics, shapes, and colors... and starts with a clear understanding of your business, the competitive landscape, and the vision you have for your product.',
// 					isOpen: false,
// 				},
// 				{
// 					question: 'What is your refund policy?',
// 					answer: 'I offer a refund if you are not satisfied with the final result and we are unable to reach a resolution. However, I strive to ensure all my clients are happy with the work delivered.',
// 					isOpen: false,
// 				},
// 				{
// 					question: 'Do you offer expedited delivery?',
// 					answer: "Yes, I offer expedited delivery options for an additional fee. If you have a tight deadline, I can prioritize your project to ensure it's completed on time.",
// 					isOpen: false,
// 				},
// 				{
// 					question: 'Can you provide references from past clients?',
// 					answer: 'Yes, I can provide references from past clients upon request. Many of my clients have been satisfied with my work and are happy to share their experience with you.',
// 					isOpen: false,
// 				},
// 			],
// 			likedByUsers: ['mini-user'],
// 			reviews: [
// 				{
// 					id: utilService.makeId(),
// 					txt: 'Very kind and works fast',
// 					rate: 4,
// 					createdAt: new Date(),
// 					by: {
// 						_id: 'u101',
// 						fullname: 'Mamaba Boy',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/343cbc5a4144649085a4e957a46671b5-1683638733243/eaf94025-da9a-4cdd-95d5-4b65362cbe9c.JPG',
// 						country: {
// 							name: 'Canada',
// 							img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png',
// 						},
// 					},
// 				},
// 				{
// 					id: utilService.makeId(),
// 					txt: "Excellent work! Duda delivered the perfect blog article that exceeded my expectations. His writing style is captivating, and he skillfully addressed all the key points. The article is SEO-optimized and ranks well on Google. I'm impressed with his professionalism and fast delivery. Highly recommended for quality content!",
// 					rate: 5,
// 					createdAt: '2023-07-25T14:22:10Z',
// 					by: {
// 						_id: 'u204',
// 						fullname: 'John Johnson',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/56600808/original/photo.jpg',
// 						country: {
// 							name: 'United Kingdom',
// 							img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
// 						},
// 					},
// 				},
// 				{
// 					id: utilService.makeId(),
// 					txt: 'I love his work!',
// 					rate: 5,
// 					createdAt: new Date(),
// 					by: {
// 						_id: 'u102',
// 						fullname: 'Benjamin Button',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/30544a9820b9cc72a3f3c46e260091cc-1642546839079/42396a49-d576-4cdc-a5a6-f61678941743.jpg',
// 						country: {
// 							name: 'Romania',
// 							img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f7-1f1f4.png',
// 						},
// 					},
// 				},
// 			],
// 			packages: [
// 				{
// 					level: 'Basic',
// 					price: 80,
// 					title: 'The Gold Fish - Basic',
// 					specials: [
// 						'Product imagery',
// 						'1 length variation',
// 						'20 seconds running time',
// 					],
// 					benefit1: '5 Day Delivery',
// 					benefit2: '2 Revisions',
// 					description:
// 						'Start-up and basic logos included. Good for Socialmedia & small business owners (ex: Nike logo)',
// 				},
// 				{
// 					level: 'Standard',
// 					price: 160,
// 					title: 'The Dolphin - Recommended',
// 					specials: [
// 						'Voice over recording',
// 						'Product imagery writing',
// 						'20 seconds running time',
// 					],
// 					benefit1: '2 Day Delivery',
// 					benefit2: '4 Revisions',
// 					description:
// 						'Mid-Segment variants of logo. Highlyrecommended for pro business and printing (ex: AirBnb) ',
// 				},
// 				{
// 					level: 'Premium',
// 					price: 220,
// 					title: 'The Blue Whale - Premium',
// 					specials: [
// 						'Video editing',
// 						'Script writing',
// 						'20 seconds running time',
// 					],
// 					benefit1: '1 Day Delivery',
// 					benefit2: '5 Revisions',
// 					description:
// 						'Ultimate and deep conceptual logo design. Must for premiumbusiness & high-end users (ex: Mercedes)',
// 				},
// 			],
// 		}),
// 		await storageService.post(STORAGE_KEY, {
// 			_id: 'i103',
// 			title: 'I will setup,optimize and do pinterest marketing, pins and boards',
// 			price: 190,
// 			owner: {
// 				_id: '17QUq',
// 				fullname: 'User 1',
// 				moto: 'Nothing beats the Experience!',
// 				instagram: '@ArditaIsMe',
// 				imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/34dcefa9cbe53f3f78fdcefb3e4f6651-1648487792332/9c9df430-f52e-4e1c-9c95-05388321a21c.jpg',
// 				level: 'premium',
// 				rate: 5,
// 				country: 'Russia',
// 				language: ['English', 'Russian'],
// 				since: 'November 2019',
// 				lastDelivery: '16 hours ago',
// 				averageResponse: '20 minutes',
// 				about: 'Hi, im Ardita. I am a Social Media Manager with experience in different industries. I am specialized especially for Pinterest. I can manage and setup social media profiles on Facebook, Twitter, Instagram Marketing, Google My Business and Linkedin. I help businesses define their brand on social media to find better marketing solutions. I am always willing and able to lend a helping hand to anyone who requests my services in the realm of online marketing and digital content creation. I would love to hear about your current needs and discussing how my skills can benefit you and your business.',
// 			},
// 			daysToMake: 1,
// 			description: {
// 				title: 'Welcome to my gig on Fiverr! I am a professional with years of experience creating unique and memorable projects for businesses and individuals.',
// 				questions: ['Why choose this gig?', 'Why choosing the higher packages?'],
// 				answers: [
// 					'Quality work and services',
// 					'Excellent communication',
// 					'Creative and original',
// 					'Fast delivery',
// 					'Superior details and quality',
// 					'Editable source files included',
// 					'Higher resolution files',
// 					'More customization level',
// 				],
// 				closer: " My design process begins with understanding your brand's essence and target audience. I'll craft a project that not only stands out but also communicates your brand's values effectively. With attention to all the little details, I'll ensure your project leaves a lasting impact. I'm here to bring your vision to life. Let's collaborate and create something that sets you apart from the competition!",
// 			},
// 				imgUrls: [
// 				'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/125098235/original/fd486f60da0f9758af41ec3a8988cb3775e9b351/set-up-and-optimize-your-pinterest-profile-boards-and-pins.jpg',
// 				'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/125098235/original/2d52bce49adbfdceb1911492819958e27e8f251d/set-up-and-optimize-your-pinterest-profile-boards-and-pins.png',
// 				'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/125098235/original/548c79ae671aefc4026236d4f558c59fd38cfab1/set-up-and-optimize-your-pinterest-profile-boards-and-pins.jpeg',
// 				'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/4148b06d47a83f2b7b1744b87212b326-1689011501/74e35e2860ca2ca08b29bb5d3cd845b3/set-up-and-optimize-your-pinterest-profile-boards-and-pins.jpg',
// 				'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/70233f889e70a9382d6a9a21b0a68dee-1689016326/a7962d310033daa002fc5e7f31cdd646/set-up-and-optimize-your-pinterest-profile-boards-and-pins.jpg',
// 			],
// 			tags: ['logo-design', 'artisitic', 'proffesional', 'accessible'],
// 			chosenTag: '',
// 			faqs: [
// 				{
// 					question: 'Why is a logo so important?',
// 					answer: 'Every business has a logo to represent its values and attributes in the market and public. But not all the logos are capable of taking the business effectively to the people. Design of a logo usually plays a major role in the marketing of an organization and its business in the competitive market.',
// 					isOpen: false,
// 				},
// 				{
// 					question: 'What you can expect from working with me?',
// 					answer: 'I am obsessed with helping businesses find their visual voice! My approach goes beyond aesthetics, shapes, and colors... and starts with a clear understanding of your business, the competitive landscape, and the vision you have for your product.',
// 					isOpen: false,
// 				},
// 				{
// 					question: 'What is your refund policy?',
// 					answer: 'I offer a refund if you are not satisfied with the final result and we are unable to reach a resolution. However, I strive to ensure all my clients are happy with the work delivered.',
// 					isOpen: false,
// 				},
// 				{
// 					question: 'Do you offer expedited delivery?',
// 					answer: "Yes, I offer expedited delivery options for an additional fee. If you have a tight deadline, I can prioritize your project to ensure it's completed on time.",
// 					isOpen: false,
// 				},
// 				{
// 					question: 'Can you provide references from past clients?',
// 					answer: 'Yes, I can provide references from past clients upon request. Many of my clients have been satisfied with my work and are happy to share their experience with you.',
// 					isOpen: false,
// 				},
// 			],
// 			likedByUsers: [],
// 			reviews: [
// 				{
// 					id: utilService.makeId(),
// 					txt: "Working with Ardita was a delight! She crafted a well-researched and engaging blog article that perfectly aligned with my requirements. Her writing style is impressive, and the content surpassed my expectations. Emily's professionalism and prompt communication made the entire process smooth. I highly recommend her for top-notch blog writing services. I'll definitely be a returning customer. Thank you, Ardita!",
// 					rate: 5,
// 					createdAt: '2023-07-18T16:40:00Z',
// 					by: {
// 						_id: 'u207',
// 						fullname: 'Alice Thompson',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/095033550aa35c07abbce4837d337d16-1607850951895/bc2b6185-cc86-45c7-970c-550132be32a9.jpg',
// 						country: {
// 							name: 'United Kingdom',
// 							img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
// 						},
// 					},
// 				},
// 				{
// 					id: utilService.makeId(),
// 					txt: 'Amazing work, and beautiful person',
// 					rate: 4,
// 					createdAt: new Date(),
// 					by: {
// 						_id: 'u107',
// 						fullname: 'California love',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/3117f94ffeecab5deb8b391a4896369c-1656262932417/44ecb256-12e6-4e39-a663-9f9a411296ce.jpg',
// 						country: {
// 							name: 'Sri Lanka',
// 							img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f1-1f1f0.png',
// 						},
// 					},
// 				},
// 				{
// 					id: utilService.makeId(),
// 					txt: 'Highly impressed with the service! Ardita delivered a fantastic logo for my brand. Quick, professional, and easy to work with. Would definitely recommend!',
// 					rate: 4,
// 					createdAt: '2023-07-20T11:55:00Z',
// 					by: {
// 						_id: 'u206',
// 						fullname: 'Michael Smith',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/59db97bf0d40e52961a0bf12e02abf75-1645531170177/de32371e-d749-4341-b290-a8eca5057246.png',
// 						country: {
// 							name: 'India',
// 							img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f3.png',
// 						},
// 					},
// 				},
// 				{
// 					id: utilService.makeId(),
// 					txt: "Excellent work! Ardita delivered the perfect blog article that exceeded my expectations. Her writing style is captivating, and he skillfully addressed all the key points. The article is SEO-optimized and ranks well on Google. I'm impressed with her professionalism and fast delivery. Highly recommended for quality content!",
// 					rate: 5,
// 					createdAt: '2023-07-25T14:22:10Z',
// 					by: {
// 						_id: 'u204',
// 						fullname: 'John Johnson',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/56600808/original/photo.jpg',
// 						country: {
// 							name: 'United Kingdom',
// 							img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
// 						},
// 					},
// 				},
// 			],
// 			packages: [
// 				{
// 					level: 'Basic',
// 					price: 80,
// 					title: 'The Gold Fish - Basic',
// 					specials: [
// 						'Product imagery',
// 						'1 length variation',
// 						'20 seconds running time',
// 					],
// 					benefit1: '5 Day Delivery',
// 					benefit2: '2 Revisions',
// 					description:
// 						'Start-up and basic logos included. Good for Socialmedia & small business owners (ex: Nike logo)',
// 				},
// 				{
// 					level: 'Standard',
// 					price: 160,
// 					title: 'The Dolphin - Recommended',
// 					specials: [
// 						'Voice over recording',
// 						'Product imagery writing',
// 						'20 seconds running time',
// 					],
// 					benefit1: '2 Day Delivery',
// 					benefit2: '4 Revisions',
// 					description:
// 						'Mid-Segment variants of logo. Highlyrecommended for pro business and printing (ex: AirBnb) ',
// 				},
// 				{
// 					level: 'Premium',
// 					price: 220,
// 					title: 'The Blue Whale - Premium',
// 					specials: [
// 						'Video editing',
// 						'Script writing',
// 						'20 seconds running time',
// 					],
// 					benefit1: '1 Day Delivery',
// 					benefit2: '5 Revisions',
// 					description:
// 						'Ultimate and deep conceptual logo design. Must for premiumbusiness & high-end users (ex: Mercedes)',
// 				},
// 			],
// 		}),
// 		await storageService.post(STORAGE_KEY, {
// 			_id: 'i111',
// 			title: 'I will do hyper realistic pencil portrait by hand drawing',
// 			price: 172,
// 			owner: {
// 				_id: '17QUq',
// 				fullname: 'User 1',
// 				moto: 'Never shy from a challange',
// 				instagram: '@MMManager',
// 				imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg',
// 				level: 'basic',
// 				rate: 2,
// 				country: 'Ghana',
// 				language: ['English'],
// 				since: 'January 2023',
// 				lastDelivery: '1 week ago',
// 				averageResponse: '3 days',
// 				about: 'I am Looking forward to working with you.',
// 			},
// 			daysToMake: 10,
// 			description: {
// 				title: 'Welcome to my gig on Fiverr! I am a professional with years of experience creating unique and memorable projects for businesses and individuals.',
// 				questions: ['Why choose this gig?', 'Why choosing the higher packages?'],
// 				answers: [
// 					'Quality work and services',
// 					'Excellent communication',
// 					'Creative and original',
// 					'Fast delivery',
// 					'Superior details and quality',
// 					'Editable source files included',
// 					'Higher resolution files',
// 					'More customization level',
// 				],
// 				closer: " My design process begins with understanding your brand's essence and target audience. I'll craft a project that not only stands out but also communicates your brand's values effectively. With attention to all the little details, I'll ensure your project leaves a lasting impact. I'm here to bring your vision to life. Let's collaborate and create something that sets you apart from the competition!",
// 			},
// 			imgUrls: [
// 				'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg',
// 				'https://res.cloudinary.com/djm30uwim/image/upload/v1690559802/freelancer_profiles/zrse8ht8zhf4m7a1amsd.jpg',
// 			],
// 			tags: [
// 				'pencil drawing',
// 				'realistic drawing',
// 				'hand drawing',
// 				'portrait drawing',
// 				'pencil sketch',
// 			],
// 			chosenTag: '',
// 			faqs: [
// 				{
// 					question: 'Can you work with multiple languages?',
// 					answer: "Certainly! I have experience working with various languages and can create content, designs, and websites that cater to your target audience's language and cultural preferences.",
// 					isOpen: false,
// 				},
// 				{
// 					question: 'How do you handle confidential information?',
// 					answer: 'Client confidentiality is a top priority. I take all necessary precautions to protect your sensitive information and ensure that any shared data is kept secure and private.',
// 					isOpen: false,
// 				},
// 				{
// 					question: 'What is your response time to messages?',
// 					answer: "I strive to respond to messages as promptly as possible, usually within a few hours during my working hours. If you have urgent queries, please mention it in your message, and I'll prioritize it accordingly.",
// 					isOpen: false,
// 				},
// 				{
// 					question: 'Can you create custom illustrations?',
// 					answer: 'Absolutely! I have a strong background in illustration and can create custom illustrations that match your brand identity and project requirements.',
// 					isOpen: false,
// 				},
// 			],
// 			likedByUsers: ['mini-user'],
// 			reviews: [
// 				{
// 					id: utilService.makeId(),
// 					txt: 'This was a disaster. Totally unprofessional.',
// 					rate: 1,
// 					createdAt: new Date(),
// 					by: {
// 						_id: 'u125',
// 						fullname: 'Carlos Herrera',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/f2f656d9c0f61288f513c02786b65f6b-1645997383500/82933135-8e58-49ec-a07c-08ad4f34859b.jpg',
// 						country: {
// 							name: 'Thailand',
// 							img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png',
// 						},
// 					},
// 				},
// 				{
// 					id: utilService.makeId(),
// 					txt: 'Total waste of money.',
// 					rate: 3,
// 					createdAt: new Date(),
// 					by: {
// 						_id: 'u127',
// 						fullname: 'Kazuki Takahashi',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/de8fc55ec1aea57a02865fc6b679dc19-1683911949401/6c0a6b70-1d2e-43df-b1f3-bb6f02468866.PNG',
// 						country: {
// 							name: 'United Kingdom',
// 							img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
// 						},
// 					},
// 				},
// 			],
// 			packages: [
// 				{
// 					level: 'Basic',
// 					price: 172,
// 					title: 'The Gold Fish - Basic',
// 					specials: [
// 						'Product imagery',
// 						'1 length variation',
// 						'20 seconds running time',
// 					],
// 					benefit1: '5 Day Delivery',
// 					benefit2: '2 Revisions',
// 					description:
// 						'Start-up and basic logos included. Good for Socialmedia & small business owners (ex: Nike logo)',
// 				},
// 				{
// 					level: 'Standard',
// 					price: 280,
// 					title: 'The Dolphin - Recommended',
// 					specials: [
// 						'Voice over recording',
// 						'Product imagery writing',
// 						'20 seconds running time',
// 					],
// 					benefit1: '2 Day Delivery',
// 					benefit2: '4 Revisions',
// 					description:
// 						'Mid-Segment variants of logo. Highlyrecommended for pro business and printing (ex: AirBnb) ',
// 				},
// 				{
// 					level: 'Premium',
// 					price: 320,
// 					title: 'The Blue Whale - Premium',
// 					specials: [
// 						'Video editing',
// 						'Script writing',
// 						'20 seconds running time',
// 					],
// 					benefit1: '1 Day Delivery',
// 					benefit2: '5 Revisions',
// 					description:
// 						'Ultimate and deep conceptual logo design. Must for premiumbusiness & high-end users (ex: Mercedes)',
// 				},
// 			],
// 		}),
// 		await storageService.post(STORAGE_KEY, {
// 			_id: 'i105',
// 			title: 'I will design interactive UI/UX for your web app',
// 			price: 50,
// 			owner: {
// 				_id: 'u112',
// 				fullname: 'Max Chen',
// 				moto: 'Designing the future of web.',
// 				instagram: '@MaxDesigns',
// 				imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1690559803/freelancer_profiles/iwm3linykojt0yle6kxo.jpg',
// 				level: 'premium',
// 				rate: 4,
// 				country: 'Singapore',
// 				language: ['English', 'Mandarin'],
// 				since: 'January 2021',
// 				lastDelivery: '1 year ago',
// 				averageResponse: '2 hours',
// 				about: 'Dedicated UI/UX designer with 10+ years of experience. Crafting visually appealing and user-friendly interfaces is my passion.',
// 			},
// 			daysToMake: 6,
// 			description: {
// 				title: 'Welcome to my gig on Fiverr! I am a professional with years of experience creating unique and memorable projects for businesses and individuals.',
// 				questions: ['Why choose this gig?', 'Why choosing the higher packages?'],
// 				answers: [
// 					'Quality work and services',
// 					'Excellent communication',
// 					'Creative and original',
// 					'Fast delivery',
// 					'Superior details and quality',
// 					'Editable source files included',
// 					'Higher resolution files',
// 					'More customization level',
// 				],
// 				closer: " My design process begins with understanding your brand's essence and target audience. I'll craft a project that not only stands out but also communicates your brand's values effectively. With attention to all the little details, I'll ensure your project leaves a lasting impact. I'm here to bring your vision to life. Let's collaborate and create something that sets you apart from the competition!",
// 			},
// 			imgUrls: [
// 				'https://res.cloudinary.com/djm30uwim/image/upload/v1690559802/freelancer_profiles/zrse8ht8zhf4m7a1amsd.jpg',
// 			],
// 			tags: ['UI-design', 'UX-design', 'web-app', 'responsive'],
// 			chosenTag: '',
// 			faqs: [
// 				{
// 					question: 'Do you work with other different styles?',
// 					answer: 'Yes, I would adapt to the requirements, but also I will give you professional advice on which style fit the most to your brand.',
// 					isOpen: false,
// 				},
// 				{
// 					question: 'What do i need to get started?',
// 					answer: 'It was never as easy as placing the order on my gig. You will be asked few basic questions like your logo company name, slogan, color etc after you place the order.',
// 					isOpen: false,
// 				},
// 				{
// 					question: 'What file formats do you deliver?',
// 					answer: 'I can deliver the final files in various formats, including JPEG, PNG, PDF, and more, depending on your specific requirements.',
// 					isOpen: false,
// 				},
// 				{
// 					question:
// 						'Do you offer ongoing support after project completion?',
// 					answer: "Yes, I offer ongoing support and assistance after project completion. If you have any questions or need further assistance, I'm here to help.",
// 					isOpen: false,
// 				},
// 				{
// 					question: 'Can you work with tight deadlines?',
// 					answer: "Yes, I am accustomed to working with tight deadlines and can deliver high-quality work even under pressure. However, it's always best to contact me in advance to discuss your specific timeline.",
// 					isOpen: false,
// 				},
// 			],
// 			likedByUsers: ['mini-user'],
// 			reviews: [
// 				{
// 					id: utilService.makeId(),
// 					txt: "Max's designs are sleek and user-centric. Worth every penny!",
// 					rate: 4,
// 					createdAt: new Date(),
// 					by: {
// 						_id: 'u113',
// 						fullname: 'Olivia Reyes',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/3efacca80017d7571f7f447e5cb84abd-1689119820986/ab37da2c-fe48-4458-9814-5fa5a6c6a779.png',
// 						country: {
// 							name: 'USA',
// 							img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
// 						},
// 					},
// 				},
// 			],
// 			packages: [
// 				{
// 					level: 'Basic',
// 					price: 50,
// 					title: 'The Gold Fish - Basic',
// 					specials: [
// 						'Product imagery',
// 						'1 length variation',
// 						'20 seconds running time',
// 					],
// 					benefit1: '5 Day Delivery',
// 					benefit2: '2 Revisions',
// 					description:
// 						'Start-up and basic logos included. Good for Socialmedia & small business owners (ex: Nike logo)',
// 				},
// 				{
// 					level: 'Standard',
// 					price: 80,
// 					title: 'The Dolphin - Recommended',
// 					specials: [
// 						'Voice over recording',
// 						'Product imagery writing',
// 						'20 seconds running time',
// 					],
// 					benefit1: '2 Day Delivery',
// 					benefit2: '4 Revisions',
// 					description:
// 						'Mid-Segment variants of logo. Highlyrecommended for pro business and printing (ex: AirBnb) ',
// 				},
// 				{
// 					level: 'Premium',
// 					price: 120,
// 					title: 'The Blue Whale - Premium',
// 					specials: [
// 						'Video editing',
// 						'Script writing',
// 						'20 seconds running time',
// 					],
// 					benefit1: '1 Day Delivery',
// 					benefit2: '5 Revisions',
// 					description:
// 						'Ultimate and deep conceptual logo design. Must for premiumbusiness & high-end users (ex: Mercedes)',
// 				},
// 			],
// 		})

// 	await storageService.post(STORAGE_KEY, {
// 		_id: 'i106',
// 		title: 'I will develop custom plugins for your WordPress site',
// 		price: 70,
// 		owner: {
// 			_id: 'u114',
// 			fullname: "Liam O'Connor",
// 			moto: 'Bringing functionality to your fingertips.',
// 			instagram: '@LiamDevs',
// 			imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1690559772/user_profiles/wboenwolo7ngzd19xfkb.jpg',
// 			level: 'basic',
// 			rate: 4,
// 			country: 'Ireland',
// 			language: ['English'],
// 			since: 'June 2022',
// 			lastDelivery: '2 days ago',
// 			averageResponse: '4 hours',
// 			about: "Experienced WordPress developer with a knack for creating custom plugins to enhance your site's functionality.",
// 		},
// 		daysToMake: 8,
// 		description: {
// 			title: 'Welcome to my gig on Fiverr! I am a professional with years of experience creating unique and memorable projects for businesses and individuals.',
// 			questions: ['Why choose this gig?', 'Why choosing the higher packages?'],
// 			answers: [
// 				'Quality work and services',
// 				'Excellent communication',
// 				'Creative and original',
// 				'Fast delivery',
// 				'Superior details and quality',
// 				'Editable source files included',
// 				'Higher resolution files',
// 				'More customization level',
// 			],
// 			closer: " My design process begins with understanding your brand's essence and target audience. I'll craft a project that not only stands out but also communicates your brand's values effectively. With attention to all the little details, I'll ensure your project leaves a lasting impact. I'm here to bring your vision to life. Let's collaborate and create something that sets you apart from the competition!",
// 		},
// 		imgUrls: [
// 			'https://res.cloudinary.com/djm30uwim/image/upload/v1690559803/freelancer_profiles/fnerrbdqytztdtq9okvs.jpg',
// 		],
// 		tags: [
// 			'WordPress',
// 			'plugin-development',
// 			'custom-plugin',
// 			'web-development',
// 		],
// 		chosenTag: '',
// 		faqs: [
// 			{
// 				question: 'What is your revision process?',
// 				answer: 'After I deliver the initial work, you can provide feedback and request revisions. I will make the necessary adjustments based on your feedback to ensure the final result meets your expectations.',
// 				isOpen: false,
// 			},
// 			{
// 				question: 'Do you have experience with my industry?',
// 				answer: "I have worked with clients from various industries and am confident in my ability to adapt to different project requirements. Whether you're in the tech, fashion, or healthcare industry, I can create designs that align with your brand.",
// 				isOpen: false,
// 			},
// 			{
// 				question: 'Do you work with other different styles?',
// 				answer: 'Yes, I would adapt to the requirements, but also I will give you professional advice on which style fit the most to your brand.',
// 				isOpen: false,
// 			},
// 			{
// 				question: 'What do i need to get started?',
// 				answer: 'It was never as easy as placing the order on my gig. You will be asked few basic questions like your logo company name, slogan, color etc after you place the order.',
// 				isOpen: false,
// 			},
// 		],
// 		likedByUsers: ['user-y'],
// 		reviews: [
// 			{
// 				id: utilService.makeId(),
// 				txt: "Liam's plugin works flawlessly! Happy with the results.",
// 				rate: 4,
// 				createdAt: new Date(),
// 				by: {
// 					_id: 'u115',
// 					fullname: 'Nina Patel',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original/q_auto,f_auto/attachments/profile/photo/sampleimg_ninapatel.jpg',
// 					country: 'India',
// 				},
// 			},
// 		],
// 		packages: [
// 			{
// 				level: 'Basic',
// 				price: 70,
// 				title: 'The Gold Fish - Basic',
// 				specials: [
// 					'Product imagery',
// 					'1 length variation',
// 					'20 seconds running time',
// 				],
// 				benefit1: '5 Day Delivery',
// 				benefit2: '2 Revisions',
// 				description:
// 					'Start-up and basic logos included. Good for Socialmedia & small business owners (ex: Nike logo)',
// 			},
// 			{
// 				level: 'Standard',
// 				price: 120,
// 				title: 'The Dolphin - Recommended',
// 				specials: [
// 					'Voice over recording',
// 					'Product imagery writing',
// 					'20 seconds running time',
// 				],
// 				benefit1: '2 Day Delivery',
// 				benefit2: '4 Revisions',
// 				description:
// 					'Mid-Segment variants of logo. Highlyrecommended for pro business and printing (ex: AirBnb) ',
// 			},
// 			{
// 				level: 'Premium',
// 				price: 160,
// 				title: 'The Blue Whale - Premium',
// 				specials: [
// 					'Video editing',
// 					'Script writing',
// 					'20 seconds running time',
// 				],
// 				benefit1: '1 Day Delivery',
// 				benefit2: '5 Revisions',
// 				description:
// 					'Ultimate and deep conceptual logo design. Must for premiumbusiness & high-end users (ex: Mercedes)',
// 			},
// 		],
// 	})
// 	await storageService.post(STORAGE_KEY, {
// 		_id: 'i108',
// 		title: 'I will mix and master your music track to perfection',
// 		price: 100,
// 		owner: {
// 			_id: 'u118',
// 			fullname: 'Alyssa Smith',
// 			moto: 'Harmonizing sounds, mastering tracks.',
// 			instagram: '@AlyssaBeats',
// 			imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1690559771/user_profiles/j6nnxwsmdtutugkhhfac.jpg',
// 			level: 'basic',
// 			rate: 4,
// 			country: 'UK',
// 			language: ['English'],
// 			since: 'November 2021',
// 			lastDelivery: '2 days ago',
// 			averageResponse: '1 day',
// 			about: 'Experienced sound engineer with a passion for producing clear, harmonized, and professional-sounding tracks.',
// 		},
// 		daysToMake: 3,
// 		description: {
// 			title: 'Welcome to my gig on Fiverr! I am a professional with years of experience creating unique and memorable projects for businesses and individuals.',
// 			questions: ['Why choose this gig?', 'Why choosing the higher packages?'],
// 			answers: [
// 				'Quality work and services',
// 				'Excellent communication',
// 				'Creative and original',
// 				'Fast delivery',
// 				'Superior details and quality',
// 				'Editable source files included',
// 				'Higher resolution files',
// 				'More customization level',
// 			],
// 			closer: " My design process begins with understanding your brand's essence and target audience. I'll craft a project that not only stands out but also communicates your brand's values effectively. With attention to all the little details, I'll ensure your project leaves a lasting impact. I'm here to bring your vision to life. Let's collaborate and create something that sets you apart from the competition!",
// 		},
// 		imgUrls: [
// 			'https://fiverr-res.cloudinary.com/videos/so_1.064461,t_main1,q_auto,f_auto/pwkhwhxk93tqc1oznpm5/add-a-violin-part-to-4-bars-of-your-song.png',
// 		],
// 		tags: ['mixing', 'mastering', 'music-production', 'sound-engineering'],
// 		chosenTag: '',
// 		faqs: [
// 			{
// 				question: 'Can you provide custom package options?',
// 				answer: "Absolutely! I can tailor a package specifically to your needs. Feel free to reach out to me with your requirements, and I'll create a custom offer for you.",
// 				isOpen: false,
// 			},
// 			{
// 				question:
// 					'What makes your social media marketing strategies effective?',
// 				answer: 'My social media marketing strategies are based on in-depth research, target audience analysis, and industry trends. I focus on engaging content, precise targeting, and measurable results to drive success for your brand.',
// 				isOpen: false,
// 			},
// 			{
// 				question: 'Do you offer bulk order discounts?',
// 				answer: 'Yes, I offer discounts for bulk orders or ongoing projects. If you have multiple projects or require a long-term collaboration, I can provide you with a special discount.',
// 				isOpen: false,
// 			},
// 		],
// 		likedByUsers: ['user-c'],
// 		reviews: [
// 			{
// 				id: utilService.makeId(),
// 				txt: 'Track sounds phenomenal. Great job, Alyssa!',
// 				rate: 4,
// 				createdAt: new Date(),
// 				by: {
// 					_id: 'u119',
// 					fullname: 'Khalid Al-Farouq',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original/q_auto,f_auto/attachments/profile/photo/sampleimg_khalidalfarouq.jpg',
// 					country: 'UAE',
// 				},
// 			},
// 		],
// 	}),
// 		await storageService.post(STORAGE_KEY, {
// 			_id: 'i111',
// 			title: 'I will manage your social media accounts',
// 			price: 40,
// 			owner: {
// 				_id: 'u124',
// 				fullname: 'Mario Suhnik',
// 				moto: 'Expanding your social media presence.',
// 				instagram: '@GioraSMManager',
// 				imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1690559771/user_profiles/t8xv3vsvauvhwobepvrz.jpg',
// 				level: 'basic',
// 				rate: 1,
// 				country: 'Australia',
// 				language: ['English'],
// 				since: 'January 2023',
// 				lastDelivery: '1 week ago',
// 				averageResponse: '3 days',
// 				about: 'I am a social media enthusiast ready to manage your accounts. Looking forward to working with you.',
// 			},
// 			daysToMake: 10,
// 			description: {
// 				title: 'Welcome to my gig on Fiverr! I am a professional with years of experience creating unique and memorable projects for businesses and individuals.',
// 				questions: ['Why choose this gig?', 'Why choosing the higher packages?'],
// 				answers: [
// 					'Quality work and services',
// 					'Excellent communication',
// 					'Creative and original',
// 					'Fast delivery',
// 					'Superior details and quality',
// 					'Editable source files included',
// 					'Higher resolution files',
// 					'More customization level',
// 				],
// 				closer: " My design process begins with understanding your brand's essence and target audience. I'll craft a project that not only stands out but also communicates your brand's values effectively. With attention to all the little details, I'll ensure your project leaves a lasting impact. I'm here to bring your vision to life. Let's collaborate and create something that sets you apart from the competition!",
// 			},
// 				imgUrls: [
// 				'https://fiverr-res.cloudinary.com/images/t_thumbnail3_3,q_auto,f_auto/gigs/294648561/original/2d8b64792b5fa8486699cc6175d13642da51e22c/increase-dr-domain-rating-to-45-guaranteed.png',
// 				'https://fiverr-res.cloudinary.com/images/t_smartwm/t_delivery_thumb,q_auto,f_auto/attachments/delivery/asset/f0f3636391255054c175fe86cfb4eabf-1690709360/image_2023-07-30_142914944/increase-dr-domain-rating-to-45-guaranteed.png',
// 				'https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/291069007/original/e5b50430396dfca6129faff57a8d80ed83d014ec.png',
// 				'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/568ae71d65da21b76168189f64e1e799-1690223565/kewrds%20seo/increase-majestic-trust-flow-30-plus-with-increase-tf-and-da.png',
// 			],
// 			tags: ['social-media', 'management', 'marketing', 'branding'],
// 			chosenTag: '',
// 			faqs: [
// 				{
// 					question: 'Can you work with multiple languages?',
// 					answer: "Certainly! I have experience working with various languages and can create content, designs, and websites that cater to your target audience's language and cultural preferences.",
// 					isOpen: false,
// 				},
// 				{
// 					question: 'How do you handle confidential information?',
// 					answer: 'Client confidentiality is a top priority. I take all necessary precautions to protect your sensitive information and ensure that any shared data is kept secure and private.',
// 					isOpen: false,
// 				},
// 				{
// 					question: 'What is your response time to messages?',
// 					answer: "I strive to respond to messages as promptly as possible, usually within a few hours during my working hours. If you have urgent queries, please mention it in your message, and I'll prioritize it accordingly.",
// 					isOpen: false,
// 				},
// 				{
// 					question: 'Can you create custom illustrations?',
// 					answer: 'Absolutely! I have a strong background in illustration and can create custom illustrations that match your brand identity and project requirements.',
// 					isOpen: false,
// 				},
// 			],
// 			likedByUsers: [],
// 			reviews: [
// 				{
// 					id: utilService.makeId(),
// 					txt: 'This was a disaster. Totally unprofessional and no clue about marketing.',
// 					rate: 1,
// 					createdAt: new Date(),
// 					by: {
// 						_id: 'u125',
// 						fullname: 'Carlos Herrera',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original/q_auto,f_auto/attachments/profile/photo/sampleimg_carlosherrera.jpg',
// 						country: 'Spain',
// 					},
// 				},
// 				{
// 					id: utilService.makeId(),
// 					txt: 'I wish I could give zero stars. Total waste of money.',
// 					rate: 1,
// 					createdAt: new Date(),
// 					by: {
// 						_id: 'u127',
// 						fullname: 'Kazuki Takahashi',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original/q_auto,f_auto/attachments/profile/photo/sampleimg_kazuki.jpg',
// 						country: 'Japan',
// 					},
// 				},
// 			],
// 		}),
// 		await storageService.post(STORAGE_KEY, {
// 			_id: 'i112',
// 			title: 'I will design stunning graphics for your brand',
// 			price: 50,
// 			owner: {
// 				_id: 'u128',
// 				fullname: 'Puki Junior',
// 				moto: 'Crafting visuals that resonate.',
// 				instagram: '@PukiDesigns',
// 				imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1690559771/user_profiles/zqpwbbeu551js7dz4oqd.jpg',
// 				level: 'premium',
// 				rate: 5,
// 				country: 'USA',
// 				language: ['English'],
// 				since: 'April 2020',
// 				lastDelivery: '2 hours ago',
// 				averageResponse: '15 minutes',
// 				about: "Passionate about design and branding. Let's create something amazing together!",
// 			},
// 			daysToMake: 2,
// 			description: {
// 				title: 'Welcome to my gig on Fiverr! I am a professional with years of experience creating unique and memorable projects for businesses and individuals.',
// 				questions: ['Why choose this gig?', 'Why choosing the higher packages?'],
// 				answers: [
// 					'Quality work and services',
// 					'Excellent communication',
// 					'Creative and original',
// 					'Fast delivery',
// 					'Superior details and quality',
// 					'Editable source files included',
// 					'Higher resolution files',
// 					'More customization level',
// 				],
// 				closer: " My design process begins with understanding your brand's essence and target audience. I'll craft a project that not only stands out but also communicates your brand's values effectively. With attention to all the little details, I'll ensure your project leaves a lasting impact. I'm here to bring your vision to life. Let's collaborate and create something that sets you apart from the competition!",
// 			},
// 		imgUrls: [
// 				'https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/278927309/original/a32ae315b7157fe1beaccbdd52460f0980d9951e.png',
// 				'https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs2/278927309/original/8e4d62139fbbdff6a07c7df4442b444c3cc6a90c.png',
// 				'https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs3/278927309/original/9b4b140f44f0c1964885a86a4394e0cc345a1caa.png',
// 			],
// 			tags: ['graphic-design', 'branding', 'visuals', 'artistry'],
// 			chosenTag: '',
// 			faqs: [
// 				{
// 					question: 'Do you offer website maintenance services?',
// 					answer: 'Yes, I offer website maintenance services to keep your website up-to-date, secure, and optimized for performance. You can choose from one-time maintenance or ongoing maintenance plans.',
// 					isOpen: false,
// 				},
// 				{
// 					question:
// 						'What information do you need to get started on a project?',
// 					answer: "To get started, I'll need a detailed project brief, any relevant files or assets, and a clear understanding of your goals and preferences. The more information you provide, the better I can tailor the project to your needs.",
// 					isOpen: false,
// 				},
// 				{
// 					question: 'Do you work with other different styles?',
// 					answer: 'Yes, I would adapt to the requirements, but also I will give you professional advice on which style fit the most to your brand.',
// 					isOpen: false,
// 				},
// 				{
// 					question: 'What do i need to get started?',
// 					answer: 'It was never as easy as placing the order on my gig. You will be asked few basic questions like your logo company name, slogan, color etc after you place the order.',
// 					isOpen: false,
// 				},
// 			],
// 			likedByUsers: ['user-g', 'user-h'],
// 			reviews: [
// 				{
// 					id: utilService.makeId(),
// 					txt: "Exceptional design! Puki is the best designer I've worked with.",
// 					rate: 5,
// 					createdAt: new Date(),
// 					by: {
// 						_id: 'u129',
// 						fullname: 'Stacy Miller',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original/q_auto,f_auto/attachments/profile/photo/sampleimg_stacymiller.jpg',
// 						country: 'UK',
// 					},
// 				},
// 			],
// 		})

// 	await storageService.post(STORAGE_KEY, {
// 		_id: 'i113',
// 		title: 'I will optimize your backend server performance',
// 		price: 70,
// 		owner: {
// 			_id: 'u130',
// 			fullname: 'Nod Nodejs',
// 			moto: 'Enhancing server performance one line of code at a time.',
// 			instagram: '@NodServerGuru',
// 			imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1690559770/user_profiles/wwdwqskifbrwuhg1vqgb.jpg',
// 			level: 'premium',
// 			rate: 4,
// 			country: 'Germany',
// 			language: ['English', 'German'],
// 			since: 'August 2018',
// 			lastDelivery: '1 day ago',
// 			averageResponse: '4 hours',
// 			about: 'Experienced backend developer focusing on Node.js optimizations.',
// 		},
// 		daysToMake: 3,
// 		description: {
// 			title: 'Welcome to my gig on Fiverr! I am a professional with years of experience creating unique and memorable projects for businesses and individuals.',
// 			questions: ['Why choose this gig?', 'Why choosing the higher packages?'],
// 			answers: [
// 				'Quality work and services',
// 				'Excellent communication',
// 				'Creative and original',
// 				'Fast delivery',
// 				'Superior details and quality',
// 				'Editable source files included',
// 				'Higher resolution files',
// 				'More customization level',
// 			],
// 			closer: " My design process begins with understanding your brand's essence and target audience. I'll craft a project that not only stands out but also communicates your brand's values effectively. With attention to all the little details, I'll ensure your project leaves a lasting impact. I'm here to bring your vision to life. Let's collaborate and create something that sets you apart from the competition!",
// 		},
// 			imgUrls: [
// 			'https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/133279260/original/eecca09d31e3f26a2784e0307fdb19d736b537aa.png',
// 			'https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs2/133279260/original/d5fd7f0d1ff804a3a10620fe7be829733b5d82e5.png',
// 			'https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/attachments/delivery/asset/1ea32c6b10fcba661035e79ecdb02c1b-1678102994/billing.mikuchnetwork.com_home(1080p).png',
// 			'https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/attachments/delivery/asset/c65e8062e46b948d82bccda6bac4e346-1656520975/fiverr-monterno.png',
// 			'https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/attachments/delivery/asset/77a468b3fcc705901f61cc2d1ff31893-1653216024/billing.png',
// 		],
// 		tags: ['nodejs', 'backend', 'optimization', 'performance'],
// 		chosenTag: '',
// 		faqs: [
// 			{
// 				question: 'Can you work with existing branding guidelines?',
// 				answer: "Absolutely! If you have existing branding guidelines, I'll ensure that my work aligns with your brand's visual identity and tone of voice for a consistent and cohesive representation.",
// 				isOpen: false,
// 			},
// 			{
// 				question: 'What types of businesses do you work with?',
// 				answer: "I work with businesses of all sizes, from startups to established enterprises, across various industries. Whether you're a small business owner or part of a large corporation, I'm here to help you succeed.",
// 				isOpen: false,
// 			},
// 			{
// 				question: 'Do you provide content writing for websites?',
// 				answer: "Yes, I offer content writing services for websites, including homepage content, about us pages, product descriptions, blog posts, and more. I'll create engaging and SEO-friendly content to boost your online presence.",
// 				isOpen: false,
// 			},
// 			{
// 				question: 'Do you work with other different styles?',
// 				answer: 'Yes, I would adapt to the requirements, but also I will give you professional advice on which style fit the most to your brand.',
// 				isOpen: false,
// 			},
// 			{
// 				question: 'What do i need to get started?',
// 				answer: 'It was never as easy as placing the order on my gig. You will be asked few basic questions like your logo company name, slogan, color etc after you place the order.',
// 				isOpen: false,
// 			},
// 		],
// 		likedByUsers: ['user-i', 'user-j'],
// 		reviews: [
// 			{
// 				id: utilService.makeId(),
// 				txt: 'Did a good job, but there were a few delays.',
// 				rate: 4,
// 				createdAt: new Date(),
// 				by: {
// 					_id: 'u131',
// 					fullname: 'Meragesh Stein',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original/q_auto,f_auto/attachments/profile/photo/sampleimg_merageshstein.jpg',
// 					country: 'Austria',
// 				},
// 			},
// 			{
// 				id: utilService.makeId(),
// 				txt: 'The optimizations were effective. Would recommend.',
// 				rate: 4,
// 				createdAt: new Date(),
// 				by: {
// 					_id: 'u132',
// 					fullname: 'Liam Meragesh',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg',
// 					country: 'Ireland',
// 				},
// 			},
// 		],
// 	})
// 	await storageService.post(STORAGE_KEY, {
// 		_id: 'i102',
// 		title: 'Professional Website Design',
// 		price: 300,
// 		owner: {
// 			_id: 'u202',
// 			fullname: 'Sawn Smith',
// 			moto: 'Design is my passion!',
// 			instagram: '@john_designs',
// 			imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1690559771/user_profiles/zqpwbbeu551js7dz4oqd.jpg',
// 			level: 'pro',
// 			rate: 5,
// 			country: 'United States',
// 			language: ['English'],
// 			since: 'January 2015',
// 			lastDelivery: '4 hours ago',
// 			averageResponse: '1 hour',
// 			about: "Hi, I am John, a professional website designer with over 8 years of experience. I have worked with various clients, from startups to established businesses, helping them create visually appealing and functional websites. My goal is to deliver high-quality designs that leave a lasting impression on your visitors. Let's collaborate and take your online presence to the next level!",
// 		},
// 		daysToMake: 7,
// 		description: {
// 			title: 'Welcome to my gig on Fiverr! I am a professional with years of experience creating unique and memorable projects for businesses and individuals.',
// 			questions: ['Why choose this gig?', 'Why choosing the higher packages?'],
// 			answers: [
// 				'Quality work and services',
// 				'Excellent communication',
// 				'Creative and original',
// 				'Fast delivery',
// 				'Superior details and quality',
// 				'Editable source files included',
// 				'Higher resolution files',
// 				'More customization level',
// 			],
// 			closer: " My design process begins with understanding your brand's essence and target audience. I'll craft a project that not only stands out but also communicates your brand's values effectively. With attention to all the little details, I'll ensure your project leaves a lasting impact. I'm here to bring your vision to life. Let's collaborate and create something that sets you apart from the competition!",
// 		},
// 		imgUrls: [
// 			'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20230613/modern%20logo_dayorn.jpg',
// 			'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/115533372/original/7f5fb73fed2347bc06b0a98f5d49c311dbac86ac/do-modern-minimalist-logo-design-for-your-business.jpg',
// 		],
// 		tags: ['web-design', 'responsive', 'modern', 'professional'],
// 		chosenTag: '',
// 		faqs: [
// 			{
// 				question: 'What is the process for designing a website?',
// 				answer: 'The website design process typically involves understanding your requirements, creating wireframes/mockups, obtaining feedback, and then proceeding to develop the website. I will work closely with you throughout the process to ensure your satisfaction.',
// 				isOpen: false,
// 			},
// 			{
// 				question:
// 					'Do you provide website hosting and domain registration?',
// 				answer: 'As a website designer, I focus on creating the design and layout of your site. However, I can guide you on the best hosting and domain registration options to suit your needs.',
// 				isOpen: false,
// 			},
// 			{
// 				question:
// 					'What if I need revisions after the website is complete?',
// 				answer: 'I offer a certain number of revisions based on the package you choose. If you need additional revisions, we can discuss the details to ensure your satisfaction.',
// 				isOpen: false,
// 			},
// 			{
// 				question: 'Will the website be mobile-friendly?',
// 				answer: 'Yes, all websites I design are mobile-friendly and responsive, ensuring a seamless user experience across different devices.',
// 				isOpen: false,
// 			},
// 		],
// 		likedByUsers: ['user123', 'another_user'],
// 		reviews: [
// 			{
// 				id: 'r101',
// 				txt: 'Sawn did an outstanding job designing our website! He was professional, responsive to our needs, and delivered the project on time. The design is sleek and user-friendly. Highly recommended!',
// 				rate: 5,
// 				createdAt: '2023-08-12T14:30:00Z',
// 				by: {
// 					_id: 'u405',
// 					fullname: 'Sarah Johnson',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/987654/original/photo.jpg',
// 					country: {
// 						name: 'Australia',
// 						img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1fa.png',
// 					},
// 				},
// 			},
// 		],
// 	})
// 	await storageService.post(STORAGE_KEY, {
// 		_id: 'i102',
// 		title: 'Professional Website Design',
// 		price: 300,
// 		owner: {
// 			_id: 'u202',
// 			fullname: 'John Smith',
// 			moto: 'Design is my passion!',
// 			instagram: '@john_designs',
// 			imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1690559771/user_profiles/zqpwbbeu551js7dz4oqd.jpg',
// 			level: 'pro',
// 			rate: 4,
// 			country: 'United States',
// 			language: ['English'],
// 			since: 'January 2015',
// 			lastDelivery: '4 hours ago',
// 			averageResponse: '1 hour',
// 			about: "Hi, I am John, a professional website designer with over 8 years of experience. I have worked with various clients, from startups to established businesses, helping them create visually appealing and functional websites. My goal is to deliver high-quality designs that leave a lasting impression on your visitors. Let's collaborate and take your online presence to the next level!",
// 		},
// 		daysToMake: 7,
// 		description: {
// 			title: 'Welcome to my gig on Fiverr! I am a professional with years of experience creating unique and memorable projects for businesses and individuals.',
// 			questions: ['Why choose this gig?', 'Why choosing the higher packages?'],
// 			answers: [
// 				'Quality work and services',
// 				'Excellent communication',
// 				'Creative and original',
// 				'Fast delivery',
// 				'Superior details and quality',
// 				'Editable source files included',
// 				'Higher resolution files',
// 				'More customization level',
// 			],
// 			closer: " My design process begins with understanding your brand's essence and target audience. I'll craft a project that not only stands out but also communicates your brand's values effectively. With attention to all the little details, I'll ensure your project leaves a lasting impact. I'm here to bring your vision to life. Let's collaborate and create something that sets you apart from the competition!",
// 		},
// 		imgUrls: [
// 			'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20230613/modern%20logo_dayorn.jpg',
// 			'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/115533372/original/7f5fb73fed2347bc06b0a98f5d49c311dbac86ac/do-modern-minimalist-logo-design-for-your-business.jpg',
// 		],
// 		tags: ['web-design', 'responsive', 'modern', 'professional'],
// 		chosenTag: '',
// 		faqs: [
// 			{
// 				question: 'What is the process for designing a website?',
// 				answer: 'The website design process typically involves understanding your requirements, creating wireframes/mockups, obtaining feedback, and then proceeding to develop the website. I will work closely with you throughout the process to ensure your satisfaction.',
// 				isOpen: false,
// 			},
// 			{
// 				question:
// 					'Do you provide website hosting and domain registration?',
// 				answer: 'As a website designer, I focus on creating the design and layout of your site. However, I can guide you on the best hosting and domain registration options to suit your needs.',
// 				isOpen: false,
// 			},
// 			{
// 				question:
// 					'What if I need revisions after the website is complete?',
// 				answer: 'I offer a certain number of revisions based on the package you choose. If you need additional revisions, we can discuss the details to ensure your satisfaction.',
// 				isOpen: false,
// 			},
// 			{
// 				question: 'Will the website be mobile-friendly?',
// 				answer: 'Yes, all websites I design are mobile-friendly and responsive, ensuring a seamless user experience across different devices.',
// 				isOpen: false,
// 			},
// 		],
// 		likedByUsers: ['user123', 'another_user'],
// 		reviews: [
// 			{
// 				id: 'r101',
// 				txt: 'John did an outstanding job designing our website! He was professional, responsive to our needs, and delivered the project on time. The design is sleek and user-friendly. Highly recommended!',
// 				rate: 5,
// 				createdAt: '2023-08-12T14:30:00Z',
// 				by: {
// 					_id: 'u405',
// 					fullname: 'Sarah Johnson',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/987654/original/photo.jpg',
// 					country: {
// 						name: 'Australia',
// 						img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1fa.png',
// 					},
// 				},
// 			},
// 			{
// 				id: 'r102',
// 				txt: 'John created a stunning website that perfectly captured our brand image. The design is modern and visually appealing. His attention to detail is exceptional. We are thrilled with the final result!',
// 				rate: 4,
// 				createdAt: '2023-09-05T10:15:00Z',
// 				by: {
// 					_id: 'u706',
// 					fullname: 'Michael Brown',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/456789/original/photo.jpg',
// 					country: {
// 						name: 'Canada',
// 						img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png',
// 					},
// 				},
// 			},
// 			{
// 				id: 'r103',
// 				txt: 'Working with John was a pleasure! He took the time to understand our business and delivered a website that exceeded our expectations. The design is not only beautiful but also functional. Highly recommended!',
// 				rate: 5,
// 				createdAt: '2023-10-20T09:45:00Z',
// 				by: {
// 					_id: 'u808',
// 					fullname: 'Laura Williams',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/543210/original/photo.jpg',
// 					country: {
// 						name: 'United States',
// 						img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
// 					},
// 				},
// 			},
// 		],
// 		packages: [
// 			{
// 				level: 'Basic',
// 				price: 300,
// 				title: 'Starter Package',
// 				specials: [
// 					'3-page design',
// 					'Responsive layout',
// 					'Contact form',
// 				],
// 				benefit1: '7 Day Delivery',
// 				benefit2: '3 Revisions',
// 				description:
// 					'Perfect for small businesses and startups looking to establish an online presence.',
// 			},
// 			{
// 				level: 'Standard',
// 				price: 500,
// 				title: 'Standard Package',
// 				specials: [
// 					'5-page design',
// 					'SEO optimization',
// 					'Customizable elements',
// 				],
// 				benefit1: '5 Day Delivery',
// 				benefit2: '5 Revisions',
// 				description:
// 					'Ideal for growing businesses that require a more comprehensive website with additional features.',
// 			},
// 			{
// 				level: 'Premium',
// 				price: 800,
// 				title: 'Premium Package',
// 				specials: [
// 					'10-page design',
// 					'E-commerce integration',
// 					'Custom animations',
// 				],
// 				benefit1: '3 Day Delivery',
// 				benefit2: 'Unlimited Revisions',
// 				description:
// 					'For established businesses looking for a top-notch website with advanced functionalities and a unique user experience.',
// 			},
// 		],
// 	})
// })()
