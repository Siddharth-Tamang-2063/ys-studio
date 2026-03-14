import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        i => i.id === action.payload.id && i.size === action.payload.size
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id && i.size === action.payload.size
              ? { ...i, qty: i.qty + (action.payload.qty || 1) }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: action.payload.qty || 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => !(i.id === action.payload.id && i.size === action.payload.size)) }
    case 'UPDATE_QTY':
      if (action.payload.qty < 1) {
        return { ...state, items: state.items.filter(i => !(i.id === action.payload.id && i.size === action.payload.size)) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id && i.size === action.payload.size
            ? { ...i, qty: action.payload.qty }
            : i
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, () => {
    try {
      const saved = localStorage.getItem('YS Studio_cart')
      return saved ? JSON.parse(saved) : { items: [] }
    } catch { return { items: [] } }
  })

  useEffect(() => {
    localStorage.setItem('YS Studio_cart', JSON.stringify(state))
  }, [state])

  const addItem = (product, size, qty = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, size, qty } })
  }
  const removeItem = (id, size) => dispatch({ type: 'REMOVE_ITEM', payload: { id, size } })
  const updateQty = (id, size, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, size, qty } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const shipping = subtotal > 300 ? 0 : 15
  const total = subtotal + shipping

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQty, clearCart, itemCount, subtotal, shipping, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
