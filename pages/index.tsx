import type { NextPage } from 'next'
import { useEffect } from 'react'
import Router from 'next/router'
import Sidebar from '../components/Sidebar'
import ThemeToggle from '../components/ThemeToggle'
import { authCheck } from '../api/AuthFunction'
import Tasks from '../components/Tasks'
import TaskDetail from '../components/TaskDetail'
import AddCategoryPopup from '../components/AddCategoryPopup'
import AddTaskPopup from '../components/AddTaskPopup'
import Navbar from '../components/Navbar'
import Head from 'next/head'

const Home: NextPage = () => {
  useEffect(() => {
    const runAuthCheck = async () => {
      const haveUser = await authCheck()
      if (!haveUser) Router.push('/login')
    }
    runAuthCheck()
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row bg-light-1 dark:bg-dark-1">
      <Head>
        <title>Todo List</title>
      </Head>
      <AddCategoryPopup />
      <AddTaskPopup />
      <ThemeToggle />
      <Navbar />
      <Sidebar />
      <Tasks />
      <TaskDetail />
    </div>
  )
}

export default Home
