/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'

const AdminLayout: NextPage = ({ children }: any) => {
  return (
    <Fragment>
      <Fragment>
        <h1 className='mb-6'>Admin Layout</h1>
        <div className="flex gap-3 mb-8">
          <Link href="/">Home</Link>
          <Link href="/admin/admin-dashboard">Dashboard</Link>
          <Link href="/users">Users</Link>
          <Link href="/test">Test</Link>
        </div>
        {children}
      </Fragment>
    </Fragment>
  )
}

export default AdminLayout
