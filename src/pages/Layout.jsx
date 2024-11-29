import PropTypes from 'prop-types'
import React from 'react'
import CustomNavbar from '../components/partials/CustomNavbar'


function Layout({children}) {
  return (
    <>
        <CustomNavbar/>
        <div className='mt-5'>
            {children}
        </div>
    </>
  )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout