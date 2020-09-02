import PRODUCTS from '../../data/dummy-data'
const initState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(p => p.ownerId === 'u1'),

}

export default (state = initState, action) => {
    return state
}

