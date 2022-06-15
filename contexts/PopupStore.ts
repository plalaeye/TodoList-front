import { action, makeObservable, observable } from 'mobx'

export class popupStore {
  isAddCategory: boolean = false
  isAddTask: boolean = false

  constructor() {
    makeObservable(this, {
      isAddCategory: observable,
      isAddTask: observable,
      openAddCategory: action,
      closeAddCategory: action,
      openAddTask: action,
      closeAddTask: action,
    })
  }

  openAddCategory() {
    this.isAddCategory = true
  }

  closeAddCategory() {
    this.isAddCategory = false
  }

  openAddTask() {
    this.isAddTask = true
  }

  closeAddTask() {
    this.isAddTask = false
  }
}

const popupStoreInstance = new popupStore()

export default popupStoreInstance
