import React from 'react'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <>
      <div className='sidebar-wrapper'>
        <nav id='sidebar'>
          <ul className='list-unstyled components'>
            <li>
              <Link href='/admin/dashboard'>
                <a>
                  <i className='fa fa-tachometer'></i> Dashboard
                </a>
              </Link>
            </li>

            <li>
              <a
                href='#productSubmenu'
                data-toggle='collapse'
                aria-expanded='false'
                className='dropdown-toggle'
              >
                <i className='fa fa-product-hunt'></i> Products
              </a>
              <ul className='collapse list-unstyled' id='productSubmenu'>
                <li>
                  <Link href='/admin/products'>
                    <a>
                      <i className='fa fa-clipboard'></i> All
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href='/admin/products/new'>
                    <a>
                      <i className='fa fa-plus'></i> Create
                    </a>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link href='/admin/orders'>
                <a>
                  <i className='fa fa-shopping-basket'></i> Orders
                </a>
              </Link>
            </li>

            <li>
              <Link href='/admin/users'>
                <a>
                  <i className='fa fa-users'></i> Users
                </a>
              </Link>
            </li>

            <li>
              <Link href='/admin/reveiws'>
                <a>
                  <i className='fa fa-star'></i> Reviews
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
