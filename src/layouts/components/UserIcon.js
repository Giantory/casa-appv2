import React from 'react'

const UserIcon = props => {
  const { icon: IconTag, iconProps } = props

  if (!IconTag) {
    return null
  }

  return <IconTag {...iconProps} />
}

export default UserIcon
