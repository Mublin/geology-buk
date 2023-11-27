import React from 'react'


export const getError = ({error}: any) => {
  return (
    error.response && error.response.data ? error.response.data.message : error.message
  )
}

