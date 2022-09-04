import { createStore } from 'vuex'
import { cartModule } from './cartModule'
import { productsModule } from './productsModule'
import { wishesModule } from './wishModule'
import { currentProductModule } from './currentProductModule'

export default createStore({
  modules: {
    cart: cartModule,
    products: productsModule,
    wishes: wishesModule,
    currentProduct: currentProductModule
  }
})
