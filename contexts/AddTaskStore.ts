import { action, makeObservable, observable } from 'mobx'

export class addTaskStore {
  _id: string | undefined = undefined
  title: string | undefined = undefined
  dueDate: string | undefined = undefined
  detail: string | undefined = undefined
  isEdit: boolean = false

  constructor() {
    makeObservable(this, {
      _id: observable,
      title: observable,
      dueDate: observable,
      detail: observable,
      isEdit: observable,
      setAdd: action,
      setEdit: action,
      setId: action,
      setTitle: action,
      setDueDate: action,
      setDetail: action,
      clear: action,
    })
  }

  setAdd() {
    this.isEdit = false
  }

  setEdit() {
    this.isEdit = true
  }

  setId(id: string) {
    this._id = id
  }

  setTitle(title: string) {
    this.title = title
  }

  setDueDate(dueDate: string | undefined) {
    this.dueDate = dueDate
  }

  setDetail(detail: string | undefined) {
    this.detail = detail
  }

  clear() {
    this._id = undefined
    this.title = undefined
    this.dueDate = undefined
    this.detail = undefined
    this.isEdit = false
  }
}

const addTaskStoreInstance = new addTaskStore()

export default addTaskStoreInstance
