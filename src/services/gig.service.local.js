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

async function query(filterBy, sortBy) {
	var gigs = await storageService.query(STORAGE_KEY)

	if (gigs && filterBy) {
		if (filterBy.type === 'budget') {
			gigs = gigs.filter((gig) => {
				return gig.price >= filterBy.min && gig.price <= filterBy.max
			})
		}
		if (filterBy.type === 'delivery') {
			gigs = gigs.filter((gig) => {
				return gig.daysToMake <= filterBy.delivery
			})
		}
		if (filterBy.type === 'txt')
			gigs = gigs.filter((gig) => {
				const isInTitle = gig.title
					.toLowerCase()
					.includes(filterBy.txt.toLowerCase())

				const isInTags = gig.tags.some((tag) =>
					tag.toLowerCase().includes(filterBy.txt.toLowerCase())
				)

				return isInTitle || isInTags
			})
	}

	if (gigs && sortBy === 'Highest Rating') {
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

	if (gigs && sortBy === 'Most Reviews') {
		gigs = gigs.sort((a, b) => {
			return b.reviews.length - a.reviews.length
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

// ;(async () => {
// 	await storageService.post(STORAGE_KEY, {
// 		_id: 'i101',
// 		title: 'I will design a creative minimalist business logo',
// 		price: 120,
// 		owner: {
// 			_id: 'u101',
// 			fullname: 'Jennifer Martha',
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
// 		description:
// 			"Welcome to my logo design gig on Fiverr! I am a professional graphic designer with years of experience creating unique and memorable logos for businesses and individuals. My design process begins with understanding your brand's essence and target audience. I'll craft a logo that not only stands out but also communicates your brand's values effectively. With attention to color, typography, and symbolism, I'll ensure your logo leaves a lasting impact. Whether you need a sleek and modern design or a playful and vibrant one, I'm here to bring your vision to life. Let's collaborate and create a logo that sets you apart from the competition!",
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
// 			{level: 'Basic' ,price: 120, title: 'The Gold Fish - Basic', specials: ['Product imagery', '1 length variation', '20 seconds running time'], benefit1: '5 Day Delivery', benefit2: '2 Revisions', description: 'Start-up and basic logos included. Good for Socialmedia & small business owners (ex: Nike logo)' },
// 			{level: 'Standard' ,price: 240, title: 'The Dolphin - Recommended', specials: ['Voice over recording', 'Product imagery writing', '20 seconds running time'], benefit1: '2 Day Delivery', benefit2:'4 Revisions', description: 'Mid-Segment variants of logo. Highlyrecommended for pro business and printing (ex: AirBnb) ' },
// 			{level: 'Premium', price: 360, title: 'The Blue Whale - Premium', specials: ['Video editing', 'Script writing', '20 seconds running time'], benefit1: '1 Day Delivery' ,benefit2: '5 Revisions', description: 'Ultimate and deep conceptual logo design. Must for premiumbusiness & high-end users (ex: Mercedes)' }
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
// 			description:
// 				"Hello, Hi There, I am Duda - talented, experienced graphic designer and most important positive person. With 11.000+ successfully completed orders, here on Fiverr. This is my Retro Vintage Logo style gig, only on Fiverr. I believe in the importance of logos and branding in a company's success, and nothing gives me more pride than to see one of my logos at the top.All graphic and Logo Design work will be of very High Quality Standards and always adjusted to meet your needs from which I have accumulated exceptional custom reviews.You will Get: Delivery time within 24 hours. I do Modern Vintage Retro Logo, Clothing brand, Gaming, Minimalist, y2k, Signature... for Your Business or Persional. Deliverable files will be JPG and PNG with transparent background. High Quality image (3000px x 3000px). Black & White or color. Friendly communication and fast response. Unique & custom made Wordmark / Logotype designs without any reused cheesy icons.Full assistance until you're satisfied .",
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
// 				{level: 'Basic' ,price: 80, title: 'The Gold Fish - Basic', specials: ['Product imagery', '1 length variation', '20 seconds running time'], benefit1: '5 Day Delivery', benefit2: '2 Revisions', description: 'Start-up and basic logos included. Good for Socialmedia & small business owners (ex: Nike logo)' },
// 				{level: 'Standard' ,price: 160, title: 'The Dolphin - Recommended', specials: ['Voice over recording', 'Product imagery writing', '20 seconds running time'], benefit1: '2 Day Delivery', benefit2:'4 Revisions', description: 'Mid-Segment variants of logo. Highlyrecommended for pro business and printing (ex: AirBnb) ' },
// 				{level: 'Premium', price: 220, title: 'The Blue Whale - Premium', specials: ['Video editing', 'Script writing', '20 seconds running time'], benefit1: '1 Day Delivery' ,benefit2: '5 Revisions', description: 'Ultimate and deep conceptual logo design. Must for premiumbusiness & high-end users (ex: Mercedes)' }
// 			],
// 		})
// })()

// 	{
// 		id: utilService.makeId(),
// 		txt: "Working with Ardita was a delight! She crafted a well-researched and engaging blog article that perfectly aligned with my requirements. Her writing style is impressive, and the content surpassed my expectations. Emily's professionalism and prompt communication made the entire process smooth. I highly recommend her for top-notch blog writing services. I'll definitely be a returning customer. Thank you, Ardita!",
// 		rate: 5,
// 		createdAt: "2023-07-18T16:40:00Z",
// 		by: {
// 			_id: "u207",
// 			fullname: "Alice Thompson",
// 			imgUrl: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/095033550aa35c07abbce4837d337d16-1607850951895/bc2b6185-cc86-45c7-970c-550132be32a9.jpg",
// 			country: {name:"United Kingdom", img: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png'
// 		}
// 	},
// },
