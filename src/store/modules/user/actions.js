import { GET_USER_MSG } from '@/store/modules/user/constant'

export default {
  async [GET_USER_MSG] ({
    commit
  }, payload) {
    let res = await new Promise((resolve, reject) => {
      return setTimeout(() => {
        resolve({
          status: 200,
          msg: 'success'
        })
      }, 0)
    })
    res = { ...res, ...payload }
    commit(GET_USER_MSG, res)
  }
}
