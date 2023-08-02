import { gigService } from '../services/gig.service.local'
// import { gigService } from '../services/gig.service'

export function getActionRemoveGig(gigId) {
	return {
		type: 'removeGig',
		gigId,
	}
}
export function getActionAddGig(gig) {
	return {
		type: 'addGig',
		gig,
	}
}
export function getActionUpdateGig(gig) {
	return {
		type: 'updateGig',
		gig,
	}
}
export function getActionAddGigMsg(gigId) {
	return {
		type: 'addGigMsg',
		gigId,
		txt: 'Stam txt',
	}
}

export const gigStore = {
	state: {
		gigs: [],
		filterBy: {
			budget: { min: 0, max: 10000 },
			delivery: null,
		},
	},
	getters: {
		gigs({ gigs }) {
			return gigs
		},
		filterBy({ filterBy }) {
			return filterBy
		},
	},
	mutations: {
		setGigs(state, { gigs }) {
			state.gigs = gigs
		},
		addGig(state, { gig }) {
			state.gigs.push(gig)
		},
		updateGig(state, { gig }) {
			const idx = state.gigs.findIndex((c) => c._id === gig._id)
			state.gigs.splice(idx, 1, gig)
		},
		removeGig(state, { gigId }) {
			state.gigs = state.gigs.filter((gig) => gig._id !== gigId)
		},
		addGigMsg(state, { gigId, msg }) {
			const gig = state.gigs.find((gig) => gig._id === gigId)
			if (!gig.msgs) gig.msgs = []
			gig.msgs.push(msg)
		},
		setFilterBy(state, { filter }) {
			if (filter.type === 'budget') {
				state.filterBy.price.min = filter.min
				state.filterBy.price.max = filter.max
			} else if (filter.type === 'delivery') {
				state.filterBy.delivery = filter.delivery
			}
		},
	},
	actions: {
		async addGig(context, { gig }) {
			try {
				gig = await gigService.save(gig)
				context.commit(getActionAddGig(gig))
				return gig
			} catch (err) {
				console.log('gigStore: Error in addGig', err)
				throw err
			}
		},
		async updateGig(context, { gig }) {
			try {
				gig = await gigService.save(gig)
				context.commit(getActionUpdateGig(gig))
				return gig
			} catch (err) {
				console.log('gigStore: Error in updateGig', err)
				throw err
			}
		},
		async loadGigs(context, { filterBy, sortBy = 'Highest Rating' }) {
			try {
				const gigs = await gigService.query(filterBy, sortBy)
				context.commit({ type: 'setGigs', gigs })
			} catch (err) {
				console.log('gigStore: Error in loadGigs', err)
				throw err
			}
		},

		async removeGig(context, { gigId }) {
			try {
				await gigService.remove(gigId)
				context.commit(getActionRemoveGig(gigId))
			} catch (err) {
				console.log('gigStore: Error in removeGig', err)
				throw err
			}
		},
		async addGigMsg(context, { gigId, txt }) {
			try {
				const msg = await gigService.addGigMsg(gigId, txt)
				context.commit({ type: 'addGigMsg', gigId, msg })
			} catch (err) {
				console.log('gigStore: Error in addGigMsg', err)
				throw err
			}
		},
	},
}
