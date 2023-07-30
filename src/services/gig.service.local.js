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

// ; (async () => {
// 	await storageService.post(STORAGE_KEY, {
// 		_id: 'i101',
// 		title: 'I will design your logo',
// 		price: 12,
// 		owner: {
// 			_id: 'u101',
// 			fullname: 'Dudu Da',
// 			moto: 'Nothing beats the Experience!',
// 			instagram: '@DuduCharm123',
// 			imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/2f1f82bbc1e2b7b7585b4c1afaaf69d8-1648815612653/f6c26d4e-10b8-4e67-ac62-3c9d39dcead1.jpg',
// 			level: 'basic/premium',
// 			rate: 4,
// 			country: 'Sount Africa',
// 			language: ['Zulu', 'English', 'Swati'],
// 			since: 'September 2021',
// 			lastDelivery: '6 hours ago',
// 			averageResponse: '50 minutes',
// 			about: 'Hey! My name is Vasily Kichigin, and I am excited to connect with you here on Fiverr! Since 2015, I have worked with over 11,000 customers and completed more than 20,000 orders on the platform. I am super passionate about Instagram and eager to help you with every aspect of it. Over the years, I have worked with a diverse range of creators, small businesses, celebrities, and Fortune 500 companies here on Fiverr. If you have any questions, please feel free to send me a message here, and I will be happy to help you! 🙂',
// 		},
// 		daysToMake: 3,
// 		description:
// 			"Hello, Hi There, I am Bruce - talented, experienced graphic designer and most important positive person. With 11.000+ successfully completed orders, here on Fiverr. This is my Retro Vintage Logo style gig, only on Fiverr. I believe in the importance of logos and branding in a company's success, and nothing gives me more pride than to see one of my logos at the top.All graphic and Logo Design work will be of very High Quality Standards and always adjusted to meet your needs from which I have accumulated exceptional custom reviews.You will Get: Delivery time within 24 hours. I do Modern Vintage Retro Logo, Clothing brand, Gaming, Minimalist, y2k, Signature... for Your Business or Persional. Deliverable files will be JPG and PNG with transparent background. High Quality image (3000px x 3000px). Black & White or color. Friendly communication and fast response. Unique & custom made Wordmark / Logotype designs without any reused cheesy icons.Full assistance until you're satisfied .",
// 		imgUrls: [
// 			'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/290928503/original/46338c22812e3d72eb57485406c886313b8be338/provide-professional-german-seo-blog-articles.png',
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
// 				txt: 'Very kind and works fast',
// 				rate: 4,
// 				createdAt: new Date(),
// 				by: {
// 					_id: 'u101',
// 					fullname: 'Mamaba Boy',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/343cbc5a4144649085a4e957a46671b5-1683638733243/eaf94025-da9a-4cdd-95d5-4b65362cbe9c.JPG',
// 					country: 'Belgium',
// 				},
// 			},
// 			{
// 				id: utilService.makeId(),
// 				txt: 'I love his work!',
// 				rate: 5,
// 				createdAt: new Date(),
// 				by: {
// 					_id: 'u102',
// 					fullname: 'Juliuos Keysar',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/30544a9820b9cc72a3f3c46e260091cc-1642546839079/42396a49-d576-4cdc-a5a6-f61678941743.jpg',
// 					country: 'Netherlands',
// 				},
// 			},
// 		],
// 	})
// 	await storageService.post(STORAGE_KEY, {
// 		_id: 'i103',
// 		title: 'I make fake Coding Academy certifications',
// 		price: 190,
// 		owner: {
// 			_id: 'u103',
// 			fullname: 'Dima',
// 			moto: 'The best way is to have fun!',
// 			instagram: '@DimaKing123',
// 			imgUrl: 'https://ca.slack-edge.com/T04U05NLZ2M-U056VBMJLKG-51a0b5aa8bbe-512',
// 			level: 'basic/premium',
// 			rate: 5,
// 			country: 'Israel',
// 			language: ['Hebrew', 'English', 'Russian'],
// 			since: 'November 2018',
// 			lastDelivery: '5 hours ago',
// 			averageResponse: '3 hours',
// 			about: "Hello! I'm an enthusiastic and creative graphic artist who is passionate about Logo and Banner Design! And have many more skills! I'm a fun loving guy who loves nature, pets and dressing up! I'm also a bit of a perfectionist! I freelance exclusively on Fiverr!",
// 		},
// 		daysToMake: 1,
// 		description:
// 			"Well, search no longer. If you are looking for someone to PLAN the story of your game - you are at the right place. Sometimes as a writer, you might be stuck - and not know what to write. Having someone else deal with all the planning can be helpful (and it's a known way to cure writer's block!) I will write the plot, create the characters (I can even include reference images albeit my art skills are lacking) and come up with an outline, all in one gig! I can even help come up with a detailed setting! As this gig might require detailed communication, please know that I might send frequent updates/questions as I work on your piece!",
// 		imgUrls: [
// 			'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/9377852/original/7fa1ab489ad31ef89c2f5c7eea6870cadd4fe27d/design-an-awesome-vintage-or-retro-logo-88d601db-60fd-43f1-9778-0bd57e615805.jpg',
// 		],
// 		tags: ['artisitic', 'proffesional'],
// 		chosenTag: '',
// 		faqs: [
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
// 			{
// 				question: 'Do you offer revisions?',
// 				answer: "Yes, I offer a certain number of revisions based on the package you choose. Client satisfaction is my top priority, and I'm always open to making adjustments to ensure you are happy with the final result.",
// 				isOpen: false,
// 			},
// 			{
// 				question: 'What payment methods do you accept?',
// 				answer: 'I accept payments through PayPal and credit/debit cards. All payments are securely processed to protect your financial information.',
// 				isOpen: false,
// 			},
// 			{
// 				question: 'Can I see samples of your previous work?',
// 				answer: 'Absolutely! I have a portfolio showcasing some of my previous projects. Please feel free to check it out to get an idea of my style and the quality of my work.',
// 				isOpen: false,
// 			},
// 		],
// 		likedByUsers: ['mini-user'],
// 		reviews: [
// 			{
// 				id: utilService.makeId(),
// 				txt: 'Amazing work, and beautiful person',
// 				rate: 4,
// 				createdAt: new Date(),
// 				by: {
// 					_id: 'u107',
// 					fullname: 'California love',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/3117f94ffeecab5deb8b391a4896369c-1656262932417/44ecb256-12e6-4e39-a663-9f9a411296ce.jpg',
// 					country: 'United-States',
// 				},
// 			},
// 			{
// 				id: utilService.makeId(),
// 				txt: 'Bad service',
// 				rate: 2,
// 				createdAt: new Date(),
// 				by: {
// 					_id: 'u108',
// 					fullname: 'Moshe Simha',
// 					imgUrl: 'https://ca.slack-edge.com/T04U05NLZ2M-U0511SL2JAE-5a79c2b1c487-512',
// 					country: 'Israel',
// 				},
// 			},
// 		],
// 	}),
// 		await storageService.post(STORAGE_KEY, {
// 			_id: 'i103',
// 			title: 'I will create professional video animations',
// 			price: 40,
// 			owner: {
// 				_id: 'u106',
// 				fullname: 'Leonardo Fernandez',
// 				moto: 'Every frame matters!',
// 				instagram: '@LeoAnimations',
// 				imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1690559773/user_profiles/itgf5bodttnrz8jxpil5.jpg',
// 				level: 'basic',
// 				rate: 4.5,
// 				country: 'Argentina',
// 				language: ['Spanish', 'English'],
// 				since: 'March 2022',
// 				lastDelivery: '1 day ago',
// 				averageResponse: '2 hours',
// 				about: "I'm Leo, an experienced animator with a love for storytelling. For over 7 years, I've been bringing visuals to life, from commercials to personal projects. My goal is to make your ideas move in captivating ways!",
// 			},
// 			daysToMake: 7,
// 			description:
// 				"I will create stunning video animations tailored to your narrative or brand. Specializing in 2D and 3D animation, I ensure that every project captures the viewer's attention. Services include: Storyboarding, Voice-over sync, Custom graphics, and HD Quality. The final product will be delivered in MP4 or any preferred format, ensuring compatibility with all platforms.",
// 			imgUrls: [
// 				'https://res.cloudinary.com/djm30uwim/image/upload/v1690559803/freelancer_profiles/r8hqlhzwg7wkt3slw8yj.jpg',
// 			],
// 			tags: [
// 				'video-animation',
// 				'2D-animation',
// 				'3D-animation',
// 				'custom-graphics',
// 			],
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
// 					question: 'How long does it take to complete a project?',
// 					answer: 'The project completion time varies depending on the complexity of the project. However, I strive to deliver high-quality work within the agreed-upon timeframe.',
// 					isOpen: false,
// 				},
// 				{
// 					question: 'Do you offer revisions?',
// 					answer: "Yes, I offer a certain number of revisions based on the package you choose. Client satisfaction is my top priority, and I'm always open to making adjustments to ensure you are happy with the final result.",
// 					isOpen: false,
// 				},
// 				{
// 					question: 'What payment methods do you accept?',
// 					answer: 'I accept payments through PayPal and credit/debit cards. All payments are securely processed to protect your financial information.',
// 					isOpen: false,
// 				},
// 			],
// 			likedByUsers: ['user-x'],
// 			reviews: [
// 				{
// 					id: utilService.makeId(),
// 					txt: 'The animation was mesmerizing. Thank you, Leo!',
// 					rate: 5,
// 					createdAt: new Date(),
// 					by: {
// 						_id: 'u107',
// 						fullname: 'Rosa Diaz',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/sampleimg_rosadiaz.jpg',
// 						country: 'Chile',
// 					},
// 				},
// 				{
// 					id: utilService.makeId(),
// 					txt: 'Professional and on-time delivery. Impressed.',
// 					rate: 4.5,
// 					createdAt: new Date(),
// 					by: {
// 						_id: 'u108',
// 						fullname: 'Lucas Ortega',
// 						imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/sampleimg_lucasortega.jpg',
// 						country: 'Mexico',
// 					},
// 				},
// 			],
// 		})
// 	await storageService.post(STORAGE_KEY, {
// 		_id: 'i104',
// 		title: 'I will craft captivating content for your blog or website',
// 		price: 30,
// 		owner: {
// 			_id: 'u109',
// 			fullname: 'Aria Walker',
// 			moto: 'Words that resonate!',
// 			instagram: '@AriaWrites',
// 			imgUrl: 'https://res.cloudinary.com/djm30uwim/image/upload/v1690559773/user_profiles/k3qhvh7mulrwpr5xza7c.jpg',
// 			level: 'premium',
// 			rate: 4.8,
// 			country: 'Australia',
// 			language: ['English'],
// 			since: 'February 2022',
// 			lastDelivery: '3 days ago',
// 			averageResponse: '1 hour',
// 			about: "Aria here, a content creator and writer with over 8 years of experience. From blog posts to web content, my writings engage, inform, and inspire. Let's create magic with words together!",
// 		},
// 		daysToMake: 4,
// 		description:
// 			'Looking for content that stands out? I specialize in crafting engaging content tailored to your audience. My services include: SEO optimized articles, Blog posts, Web content, Research-based writings, and more! Each piece will be meticulously researched, ensuring accuracy and relevance. Deliverable will be in DOC or PDF format, and I guarantee top-tier quality.',
// 		imgUrls: [
// 			'https://res.cloudinary.com/djm30uwim/image/upload/v1690559803/freelancer_profiles/lfagvbzm7qefoodrh7ca.jpg',
// 		],
// 		tags: ['content-writing', 'blog-post', 'SEO-optimized', 'researched'],
// 		chosenTag: '',
// 		faqs: [
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
// 			{
// 				question: 'Can I see samples of your previous work?',
// 				answer: 'Absolutely! I have a portfolio showcasing some of my previous projects. Please feel free to check it out to get an idea of my style and the quality of my work.',
// 				isOpen: false,
// 			},
// 			{
// 				question: 'How can I contact you?',
// 				answer: "You can contact me through the messaging system on my Fiverr profile. I'm always available to discuss your project and answer any questions you may have.",
// 				isOpen: false,
// 			},
// 		],
// 		likedByUsers: ['user-y'],
// 		reviews: [
// 			{
// 				id: utilService.makeId(),
// 				txt: 'Aria delivered top-notch content for my site. Highly recommended!',
// 				rate: 5,
// 				createdAt: new Date(),
// 				by: {
// 					_id: 'u110',
// 					fullname: 'Ethan Moore',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/sampleimg_ethanmoore.jpg',
// 					country: 'UK',
// 				},
// 			},
// 			{
// 				id: utilService.makeId(),
// 				txt: 'Impressive writing style. Very happy with the results.',
// 				rate: 4.7,
// 				createdAt: new Date(),
// 				by: {
// 					_id: 'u111',
// 					fullname: 'Sophia Lee',
// 					imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/sampleimg_sophialee.jpg',
// 					country: 'Canada',
// 				},
// 			},
// 		],
// 	})
// })()

const gig = {
	_id: 'i101',
	title: 'I will design your logo',
	price: 12,
	owner: {
		_id: 'u101',
		fullname: 'Dudu Da',
		instagram: '@DuduCharm123',
		moto: 'Nothing beats the Experience!',
		imgUrl: 'url',
		level: 'basic/premium',
		rate: 4,
		country: 'Israel',
		language: [],
		since: '',
		lastDelivery: '',
		averageResponse: '',
		about: '',
	},
	daysToMake: 3,
	description: 'Make unique logo...',
	imgUrls: [''],
	tags: ['logo-design', 'artisitic', 'proffesional', 'accessible'],
	chosenTag: '',
	faqs: [
		{
			question: 'Do you work with other different styles?',
			answer: 'Yes, I would adapt to the requirements, but also I will give you professional advice on which style fit the most to your brand.',
			isOpen: false,
		},
		{
			question: 'What do i need to get started?',
			answer: 'It was never as easy as placing the order on my gig. You will be asked few basic questions like your logo company name, slogan, color etc after you place the order.',
			isOpen: false,
		},
	],
	likedByUsers: ['mini-user'],
	reviews: [
		{
			id: utilService.makeId(),
			txt: 'Very kind and works fast',
			rate: 4,
			createdAt: new Date(),
			by: {
				_id: 'u101',
				fullname: 'Mamaba Boy',
				imgUrl: '/img/img2.jpg',
				country: 'Belgium',
			},
		},
		{
			id: utilService.makeId(),
			txt: 'I love his work!',
			rate: 5,
			createdAt: new Date(),
			by: {
				_id: 'u102',
				fullname: 'Juliuos Keysar',
				imgUrl: '/img/img2.jpg',
				country: 'Netherlands',
			},
		},
	],
}
