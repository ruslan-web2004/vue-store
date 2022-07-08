import { createStore } from 'vuex'
import { cartModule } from './cartModule'
import { productsModule } from './productsModule'
import { wishModule } from './wishModule'

export default createStore({
  modules: {
    cart: cartModule,
    products: productsModule,
    wish: wishModule
  }
})
