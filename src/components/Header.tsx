import { FC, useState, MouseEvent, SyntheticEvent } from 'react'
import { Button, Typography, IconButton, Toolbar, AppBar, FormControl, NativeSelect } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { fade, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  exportFileType: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1.0),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }
}))

interface HeaderProps {
  title: string
}

const Header: FC<HeaderProps> = ({ title }) => {
  const classes = useStyles()
  const [state, setState] = useState({
    fileFormat: 'gltf'
  })

  const handleProfileMenuOpen = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {}

  const handleChange = (event: SyntheticEvent) => {
    const changedValue = event.target.value
    setState({
      ...state,
      fileFormat: changedValue
    })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Button variant="contained" color="secondary">
        FileUpload
        </Button>
        <div className={classes.exportFileType}>
          <FormControl>
            <NativeSelect
              value={state.fileFormat}
              onChange={handleChange}
              inputProps={{
                name: 'file-format',
                id: 'file-format-native-label-placeholder'
              }}
            >
              <option value="gltf">GLTF</option>
              <option value="glb">GLB</option>
            </NativeSelect>
          </FormControl>
        </div>
        <div className={classes.sectionDesktop}>
          <Button variant="contained" color="secondary">
            Export
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
