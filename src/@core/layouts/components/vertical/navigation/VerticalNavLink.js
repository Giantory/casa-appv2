import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse'
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import UserIcon from 'src/layouts/components/UserIcon'
import themeConfig from 'src/configs/themeConfig'
import { handleURLQueries } from 'src/@core/layouts/utils'

const MenuNavLink = styled(ListItemButton)(({ theme }) => ({
  width: '100%',
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.25, 3.5),
  transition: 'opacity .25s ease-in-out',
  '&.active, &.active:hover': {
    boxShadow: theme.shadows[3],
    backgroundImage: `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.main} 0%)`
  },
  '&.active .MuiTypography-root, &.active .MuiSvgIcon-root': {
    color: `${theme.palette.common.white} !important`
  }
}))

const MenuItemTextMetaWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
})

const VerticalNavLink = ({ item, navVisible, toggleNavVisibility }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const IconTag = item.icon

  const handleClick = () => {
    if (item.children) {
      setOpen(!open)
    } else {
      if (navVisible) {
        toggleNavVisibility()
      }
      if (item.path) {
        router.push(item.path)
      }
    }
  }

  const isNavLinkActive = () => {
    if (router.pathname === item.path || handleURLQueries(router, item.path)) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <ListItem
        disablePadding
        className='nav-link'
        disabled={item.disabled || false}
        sx={{ mt: 1.5, px: '0 !important' }}
        onClick={handleClick}
      >
        <MenuNavLink
          component={'div'}
          className={isNavLinkActive() ? 'active' : ''}
          sx={{
            pl: 5.5,
            ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
          }}
        >
          <ListItemIcon
            sx={{
              mr: 2.5,
              color: 'text.primary',
              transition: 'margin .25s ease-in-out'
            }}
          >
            {IconTag && <UserIcon icon={IconTag} />}
          </ListItemIcon>

          <MenuItemTextMetaWrapper>
            <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item.title}</Typography>
            {item.badgeContent ? (
              <Chip
                label={item.badgeContent}
                color={item.badgeColor || 'primary'}
                sx={{
                  height: 20,
                  fontWeight: 500,
                  marginLeft: 1.25,
                  '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                }}
              />
            ) : null}
            {item.children ? open ? <ExpandLess /> : <ExpandMore /> : null}
          </MenuItemTextMetaWrapper>
        </MenuNavLink>
      </ListItem>
      {item.children && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {item.children.map((child, index) => (
              <VerticalNavLink key={index} item={child} navVisible={navVisible} toggleNavVisibility={toggleNavVisibility} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}

export default VerticalNavLink
