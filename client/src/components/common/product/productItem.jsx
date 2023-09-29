import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../icon'
import useStore from '../../../store/createStore'
import userService from '../../../service/user.service'

const ProductItem = ({ item, onClick }) => {
  const { _id, name, preview, title, price, type } = item
  const navigate = useNavigate()
  const { authedUser, updAuthedUser } = useStore()
  const isBookmarked = authedUser?.bookmarks.includes(_id)

  const openItemPage = (e) => {
    e.stopPropagation()
    navigate(`/category/${type}/${_id}`)
  }

  // const toggleBookmark = async (e, item) => {
    // console.log('e.target :>> ', e.target)
    // console.log('item :>> ', item)
    // e.stopPropagation()
    // const newItemData = {
    //   ...item,
    //   bookmark: item.bookmark === true ? false : true
    // }
    // try {
    //   const { content } = await productService.toggleBookmark(newItemData)
    //   setBookmarkForProduct(content)
    // } catch (e) {
    //   console.log('e :>> ', e)
    // }
  // }

  const toggleBookmark = async (e, id) => {
    e.stopPropagation()
    try {
      const newUserData = {
        ...authedUser,
        bookmarks: authedUser.bookmarks.includes(id)
          ? authedUser.bookmarks.filter(item => item !== id)
          : [...authedUser.bookmarks, id]
      }
      const { content } = await userService.updateUser(newUserData)
      updAuthedUser(content)
    } catch (e) {
      console.log('e :>> ', e)
    }
  }

  return (
    <div key={_id} className="popular-item">
      <div onClick={openItemPage} className="popular-item__img">
        <img src={preview} alt={title} />
        <div className="popular-item__img-popap">
          <button onClick={onClick}>
            <Icon id='view' data-modal='1'/>
          </button>
          <button>
            <Icon id='cart'/>
          </button>
        </div>
      </div>

      <div className="popular-item__content">
        <div className="popular-item__title">
          <Link to={`/category/${item.type}/${item._id}`}>{name}</Link>
          <button onClick={(e) => toggleBookmark(e, item._id)} className='w-[24px] h-[24px] z-10'>
            <Icon id='heart' fill={isBookmarked && '#000'}/>
          </button>
        </div>
        <p className="popular-item__price">${price}.00</p>
      </div>
    </div>
  )
}

export default ProductItem
