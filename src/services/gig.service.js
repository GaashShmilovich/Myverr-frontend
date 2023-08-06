import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

export const gigService = {
	query,
	getById,
	save,
	remove,
	getEmptyGig,
	addGigMsg,
}

window.cs = gigService // for console usage

async function query(
	filterBy = {
		txt: '',
		price: { min: null, max: null },
		delivery: null,
		sortBy: null,
	}
) {
	// Modify your request to incorporate the filter values
	return httpService.get('gig', filterBy)
}
function getById(gigId) {
	return httpService.get(`gig/${gigId}`)
}

async function remove(gigId) {
	return httpService.delete(`gig/${gigId}`)
}
async function save(gig) {
	var savedGig
	if (gig._id) {
		savedGig = await httpService.put(`gig/${gig._id}`, gig)
	} else {
		savedGig = await httpService.post('gig', gig)
	}
	return savedGig
}

async function addGigMsg(gigId, txt) {
	const savedMsg = await httpService.post(`gig/${gigId}/msg`, { txt })
	return savedMsg
}

function getEmptyGig() {
	return {
		vendor: 'Susita-' + (Date.now() % 1000),
		price: utilService.getRandomIntInclusive(1000, 9000),
	}
}
